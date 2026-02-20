
import React from 'react';
import { Search, Palette, Camera, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Artwork {
  id: number;
  name: string;
  artist: string;
  image: string;
}

interface ArtworkGalleryProps {
  sampleArtworks: Artwork[];
  selectedImage: string | null;
  onSelectArtwork: (imageUrl: string) => void;
  onUpload: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  capturedImage: string | null;
  isProcessing: boolean;
  onCameraCapture: () => void;
}

const ArtworkGallery = ({
  sampleArtworks,
  selectedImage,
  onSelectArtwork,
  onUpload,
  onFileUpload,
  fileInputRef,
  capturedImage,
  isProcessing,
  onCameraCapture
}: ArtworkGalleryProps) => {
  return (
    <Tabs defaultValue="gallery">
      <TabsList className="grid w-full grid-cols-3">
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
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {sampleArtworks.map((artwork) => (
              <div 
                key={artwork.id} 
                className={`rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === artwork.image ? 'border-artistic-purple' : 'border-transparent'}`}
                onClick={() => onSelectArtwork(artwork.image)}
              >
                <div className="aspect-square relative">
                  <img 
                    src={artwork.image} 
                    alt={artwork.name} 
                    className="w-full h-full object-cover" 
                  />
                  {selectedImage === artwork.image && (
                    <div className="absolute inset-0 bg-artistic-purple/20 flex items-center justify-center">
                      <Badge className="bg-artistic-purple">Selected</Badge>
                    </div>
                  )}
                </div>
                <div className="p-2 bg-white">
                  <h4 className="text-sm font-medium truncate">{artwork.name}</h4>
                  <p className="text-xs text-muted-foreground">{artwork.artist}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button className="w-full" variant="outline">
            <Palette className="h-4 w-4 mr-2" />
            Browse More Artworks
          </Button>
        </div>
      </TabsContent>
      
      <TabsContent value="upload" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <div 
              className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-artistic-purple transition-colors"
              onClick={onUpload}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*" 
                onChange={onFileUpload}
              />
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Upload className="h-8 w-8 text-artistic-purple" />
              </div>
              <h3 className="font-medium mb-1">Upload Your Artwork</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop or click to browse
              </p>
              <Button size="sm">Select File</Button>
              <p className="text-xs text-muted-foreground mt-4">
                Supported formats: JPG, PNG, WebP (Max 10MB)
              </p>
            </div>
            
            {selectedImage && !capturedImage && (
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Artwork selected</p>
                <Button onClick={onCameraCapture}>
                  <Camera className="h-4 w-4 mr-2" />
                  Capture Environment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="camera" className="mt-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="bg-gray-100 rounded-lg p-8 mb-4">
              <Camera className="h-12 w-12 text-artistic-purple mx-auto mb-4" />
              <h3 className="font-medium mb-2">Use Your Camera</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Take a photo of your artwork to place in AR
              </p>
            </div>
            <Button onClick={onCameraCapture} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Activate Camera'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ArtworkGallery;
