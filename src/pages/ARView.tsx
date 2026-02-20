import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ARSceneRenderer from '@/components/ar/ARSceneRenderer';
import ArtworkControls from '@/components/ar/ArtworkControls';
import ArtworkGallery from '@/components/ar/ArtworkGallery';
import { Input } from '@/components/ui/input';
import { Search, Palette, BookmarkPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import SaveToCollectionDialog from '@/components/ar/SaveToCollectionDialog';

import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

// Use this as fallback/initial data
const sampleArtworks = [
  {
    id: 1,
    name: "Starry Night",
    artist: "Vincent van Gogh",
    image: "https://images.unsplash.com/photo-1541680670548-88e8cd23c0f4?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "The Persistence of Memory",
    artist: "Salvador Dalí",
    image: "https://images.unsplash.com/photo-1579783483458-83d02161294e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Water Lilies",
    artist: "Claude Monet",
    image: "https://images.unsplash.com/photo-1579541814924-49fef17c5be5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Abstract Composition",
    artist: "Modern Art",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop"
  }
];

const ARView = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scale, setScale] = useState([100]);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [highQuality, setHighQuality] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { id } = useParams();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  // Fetch items from Supabase to populate the gallery
  const { data: dbArtworks = [], isLoading } = useQuery({
    queryKey: ['ar-artworks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artworks')
        .select(`
          *,
          artist:artists (*)
        `)
        .limit(20);

      if (error) {
        console.error("Error fetching artworks for AR:", error);
        return [];
      }

      return data.map((item: any) => ({
        id: item.id,
        name: item.title,
        artist: item.artist?.name || 'Unknown Artist',
        image: item.image,
      }));
    }
  });

  // Combine sample and DB artworks, favoring DB ones
  const availableArtworks = dbArtworks.length > 0 ? dbArtworks : sampleArtworks;

  useEffect(() => {
    if (id) {
      // Check if ID is numeric (sample) or UUID (Supabase)
      const isNumeric = /^\d+$/.test(id);

      if (isNumeric) {
        // Fallback for sample data IDs
        const artwork = sampleArtworks.find(a => a.id.toString() === id);
        if (artwork) {
          setSelectedImage(artwork.image);
          toast("Artwork selected", {
            description: `${artwork.name} by ${artwork.artist} is ready to place.`,
          });
        }
      } else {
        // Fetch specific artwork by ID from Supabase
        const fetchArtwork = async () => {
          const { data, error } = await supabase
            .from('artworks')
            .select('*')
            .eq('id', id)
            .single();

          if (data && !error) {
            setSelectedImage(data.image);
            toast("Artwork selected", {
              description: `${data.title} is ready to place.`,
            });
          }
        };
        fetchArtwork();
      }
    }
  }, [id]);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
      videoRef.current.play().catch(err => {
        console.error('Error playing video:', err);
        toast.error("Camera Error", {
          description: "Unable to start camera preview",
        });
      });
    }
  }, [videoStream]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.match('image.*')) {
        toast.error("Invalid file type", {
          description: "Please upload an image file (JPG, PNG, etc.)",
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Please upload an image smaller than 10MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        toast("Artwork uploaded", {
          description: "Now capture or upload a photo of your space",
        });
      };
      reader.onerror = () => {
        toast.error("Upload failed", {
          description: "Could not read the file. Please try again.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      setIsProcessing(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });

      setVideoStream(stream);

      setVideoStream(stream);

      toast("Camera activated", {
        description: "Camera feed is now active. Click 'Capture' when ready.",
      });
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error("Camera Error", {
        description: "Unable to access your camera. Please check permissions.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !videoStream) return;

    try {
      const canvas = document.createElement('canvas');
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.95);
      setCapturedImage(imageDataUrl);

      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      toast("Photo captured", {
        description: selectedImage
          ? "Now you can place your artwork in the scene"
          : "Select an artwork to place in your scene",
      });

      if (selectedImage) {
        handlePlaceArtwork();
      }
    } catch (error) {
      console.error('Error capturing image:', error);
      toast.error("Capture Error", {
        description: "Failed to capture image. Please try again.",
      });
    }
  };

  const handleSelectArtwork = (imageUrl: string) => {
    setSelectedImage(imageUrl);

    if (!capturedImage) {
      toast("Artwork selected", {
        description: "Now capture or upload a photo of your space to place the artwork",
      });
    } else {
      toast("Artwork selected", {
        description: "Placing artwork in your space...",
      });
      setTimeout(() => handlePlaceArtwork(), 100);
    }
  };

  const handlePlaceArtwork = () => {
    if (!selectedImage || !capturedImage) {
      toast.error("Missing content", {
        description: "Please select an artwork and capture your environment first",
      });
      return;
    }

    setPosition({ x: 50, y: 50 });
    setScale([100]);

    toast("Artwork placed", {
      description: "You can now adjust the position and size of the artwork",
    });
  };

  const handleSaveScene = () => {
    if (!capturedImage || !selectedImage) {
      toast.error("Missing content", {
        description: "Please capture an image and select an artwork first",
      });
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const img = new Image();
      const artwork = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(img, 0, 0);

          artwork.onload = () => {
            const artworkWidth = (scale[0] / 100) * canvas.width * 0.8;
            const artworkHeight = (artworkWidth * artwork.height) / artwork.width;
            const x = (position.x / 100) * canvas.width - artworkWidth / 2;
            const y = (position.y / 100) * canvas.height - artworkHeight / 2;

            ctx.drawImage(artwork, x, y, artworkWidth, artworkHeight);

            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'ar-scene.jpg';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                toast("Scene saved", {
                  description: "Your AR scene has been downloaded",
                });
              }
            }, 'image/jpeg', 0.95);
          };
          artwork.src = selectedImage;
        }
      };
      img.src = capturedImage;
    } catch (error) {
      console.error('Error saving scene:', error);
      toast.error("Save failed", {
        description: "Could not save the scene. Please try again.",
      });
    }
  };

  const handleShareScene = () => {
    if (!capturedImage || !selectedImage) {
      toast.error("Missing content", {
        description: "Please capture an image and select an artwork first",
      });
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const img = new Image();
      const artwork = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(img, 0, 0);

          artwork.onload = () => {
            const artworkWidth = (scale[0] / 100) * canvas.width * 0.8;
            const artworkHeight = (artworkWidth * artwork.height) / artwork.width;
            const x = (position.x / 100) * canvas.width - artworkWidth / 2;
            const y = (position.y / 100) * canvas.height - artworkHeight / 2;

            ctx.drawImage(artwork, x, y, artworkWidth, artworkHeight);

            canvas.toBlob((blob) => {
              if (blob) {
                if (navigator.share) {
                  const file = new File([blob], 'ar-scene.jpg', { type: 'image/jpeg' });
                  navigator.share({
                    title: 'My AR Art Scene',
                    text: 'Check out my augmented reality art scene!',
                    files: [file],
                  }).catch((error) => {
                    console.error('Error sharing:', error);
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'ar-scene.jpg';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);

                    toast("Share not supported", {
                      description: "Scene downloaded instead. You can share it manually.",
                    });
                  });
                } else {
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'ar-scene.jpg';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);

                  toast("Share not supported", {
                    description: "Scene downloaded instead. You can share it manually.",
                  });
                }
              }
            }, 'image/jpeg', 0.95);
          };
          artwork.src = selectedImage;
        }
      };
      img.src = capturedImage;
    } catch (error) {
      console.error('Error sharing scene:', error);
      toast.error("Share failed", {
        description: "Could not share the scene. Please try again.",
      });
    }
  };

  const handleRetake = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCapturedImage(null);

    toast("Ready to retake", {
      description: "Click 'Activate Camera' to take a new photo",
    });
  };

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleZoomIn = () => {
    setScale(prev => [Math.min(prev[0] + 10, 400)]);
  };

  const handleZoomOut = () => {
    setScale(prev => [Math.max(prev[0] - 10, 50)]);
  };

  const handleRedo = () => {
    setPosition({ x: 50, y: 50 });
    setScale([100]);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredArtworks = availableArtworks.filter(artwork =>
    artwork.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artwork.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBrowseMore = () => {
    toast("Browse More Artworks", {
      description: "This feature will be available soon!",
    });
  };

  const handleSaveToCollection = () => {
    if (!selectedImage) {
      toast.error("No artwork selected", {
        description: "Please select an artwork to save to your collection",
      });
      return;
    }

    setSaveDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-artistic-cream/20">
      <Navbar />
      <div className="pt-16 md:pt-24 px-2 md:px-6 max-w-7xl mx-auto pb-16">
        <div className="text-center mb-6 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-artistic-purple via-artistic-teal to-artistic-coral bg-clip-text text-transparent">
            Augmented Reality Gallery
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Place artwork in your real environment to visualize how it would look in your space.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <ARSceneRenderer
              capturedImage={capturedImage}
              selectedImage={selectedImage}
              videoStream={videoStream}
              videoRef={videoRef}
              position={position}
              scale={scale}
              isProcessing={isProcessing}
              onCameraCapture={handleCameraCapture}
              onCapture={handleCapture}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onRedo={handleRedo}
            />

            {capturedImage && selectedImage && (
              <ArtworkControls
                scale={scale}
                position={position}
                highQuality={highQuality}
                onScaleChange={setScale}
                onPositionChange={(axis, value) =>
                  setPosition(prev => ({ ...prev, [axis]: value[0] }))
                }
                onQualityChange={setHighQuality}
                onRetake={handleRetake}
                onUpload={handleUpload}
                onSave={handleSaveScene}
                onShare={handleShareScene}
                onPlace={handlePlaceArtwork}
              />
            )}
          </div>

          <div className="order-1 lg:order-2">
            <Tabs defaultValue="gallery">
              <TabsList className="flex justify-between">
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="camera">Camera</TabsTrigger>
              </TabsList>

              <TabsContent value="gallery" className="mt-4">
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      placeholder="Search artworks..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {filteredArtworks.map((artwork) => (
                      <Card
                        key={artwork.id}
                        className={`overflow-hidden cursor-pointer border transition-all ${selectedImage === artwork.image ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
                        onClick={() => handleSelectArtwork(artwork.image)}
                      >
                        <div className="aspect-square relative">
                          <img
                            src={artwork.image}
                            alt={artwork.name}
                            className="w-full h-full object-cover"
                          />
                          {selectedImage === artwork.image && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <Badge variant="default">Selected</Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-sm font-medium line-clamp-1">{artwork.name}</h3>
                              <p className="text-xs text-muted-foreground">{artwork.artist}</p>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(artwork.image);
                                setSaveDialogOpen(true);
                              }}
                            >
                              <BookmarkPlus className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleBrowseMore}
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Browse More Artworks
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="upload" className="mt-4">
                <div className="space-y-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium mb-2">Upload Artwork</h3>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={handleUpload}
                    >
                      <Palette className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium mb-2">Upload Environment</h3>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={handleCameraCapture}
                    >
                      <Palette className="h-4 w-4 mr-2" />
                      Activate Camera
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="camera" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium mb-2">Camera</h3>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={handleCameraCapture}
                    >
                      <Palette className="h-4 w-4 mr-2" />
                      Activate Camera
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {capturedImage && selectedImage && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">AR Preview Tips</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Badge className="mt-0.5">1</Badge>
                      <span>Use good lighting for better AR placement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge className="mt-0.5">2</Badge>
                      <span>Adjust size and position using the sliders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge className="mt-0.5">3</Badge>
                      <span>Try different artworks to find the perfect match</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge className="mt-0.5">4</Badge>
                      <span>Save your scene to reference later</span>
                    </li>
                    <li className="flex items-start gap-2 mt-2">
                      <Button
                        size="sm"
                        onClick={handleSaveToCollection}
                        className="w-full"
                      >
                        <BookmarkPlus className="h-4 w-4 mr-2" />
                        Save to Collection
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <SaveToCollectionDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        artworkId={selectedImage || ""}
      />

      <Footer />
    </div>
  );
};

export default ARView;
