import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MapPin, 
  Globe, 
  Instagram, 
  Twitter, 
  Facebook,
  Heart,
  MessageCircle,
  BookOpen
} from 'lucide-react';
import { marketplaceItems } from '@/data/marketplaceData';
import { artClasses } from '@/data/artClassesData';

const ArtistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<typeof marketplaceItems[0]['artist'] | null>(null);
  const [artworks, setArtworks] = useState<typeof marketplaceItems>([]);
  const [classes, setClasses] = useState<typeof artClasses>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  
  useEffect(() => {
    if (id) {
      // Find the first artwork by this artist to get their details
      const firstArtwork = marketplaceItems.find(item => item.artist.id === id);
      if (firstArtwork) {
        setArtist(firstArtwork.artist);
        // Get all artworks by this artist
        setArtworks(marketplaceItems.filter(item => item.artist.id === id));
      } else {
        // Check if this is a class instructor
        const instructorClass = artClasses.find(cls => cls.instructor.id === id);
        if (instructorClass) {
          setArtist({
            id: instructorClass.instructor.id,
            name: instructorClass.instructor.name,
            photo: instructorClass.instructor.photo,
            bio: "Art instructor with years of experience",
            location: "Location not specified",
            followers: 0,
            social: {}
          });
          // Get all classes by this instructor
          setClasses(artClasses.filter(cls => cls.instructor.id === id));
        }
      }
    }
  }, [id]);
  
  if (!artist) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Artist not found</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Cover image */}
        <div className="h-56 md:h-72 lg:h-80 rounded-lg overflow-hidden relative mb-8">
          <img 
            src={artist.coverImage || "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=890&q=80"} 
            alt={`${artist.name}'s cover`} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Artist info */}
        <div className="flex flex-col md:flex-row md:items-end -mt-20 mb-12 relative">
          <img 
            src={artist.photo} 
            alt={artist.name} 
            className="w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-900 object-cover z-10 mx-auto md:mx-0"
          />
          
          <div className="mt-4 md:mt-0 md:ml-6 flex-grow text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">{artist.name}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start mt-2 gap-2 text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm md:text-base">{artist.location || "Location not specified"}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm md:text-base">{artist.followers?.toLocaleString() || "0"} followers</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex justify-center md:justify-end space-x-2 md:space-x-4">
            <Button 
              variant={isFollowing ? "secondary" : "default"}
              size="sm"
              className={`${isFollowing ? "" : "bg-artnexus-purple hover:bg-artnexus-purple/90"} text-xs md:text-sm`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Button variant="outline" size="sm" className="text-xs md:text-sm">
              Message
            </Button>
          </div>
        </div>
        
        {/* Social links and bio */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 mb-4">
            {artist.website && (
              <a 
                href={`https://${artist.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-artnexus-purple transition-colors text-sm md:text-base"
              >
                <Globe className="h-4 w-4 mr-1" />
                <span>{artist.website}</span>
              </a>
            )}
            {artist.social?.instagram && (
              <a 
                href={`https://instagram.com/${artist.social.instagram.replace('@', '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-artnexus-purple transition-colors text-sm md:text-base"
              >
                <Instagram className="h-4 w-4 mr-1" />
                <span>{artist.social.instagram}</span>
              </a>
            )}
            {artist.social?.twitter && (
              <a 
                href={`https://twitter.com/${artist.social.twitter.replace('@', '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-artnexus-purple transition-colors text-sm md:text-base"
              >
                <Twitter className="h-4 w-4 mr-1" />
                <span>{artist.social.twitter}</span>
              </a>
            )}
            {artist.social?.facebook && (
              <a 
                href={`https://facebook.com/${artist.social.facebook}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-artnexus-purple transition-colors text-sm md:text-base"
              >
                <Facebook className="h-4 w-4 mr-1" />
                <span>{artist.social.facebook}</span>
              </a>
            )}
          </div>
          
          <p className="text-muted-foreground max-w-3xl mx-auto md:mx-0 text-sm md:text-base">
            {artist.bio || "No biography available"}
          </p>
        </div>
        
        {/* Artist content tabs */}
        <Tabs defaultValue={artworks.length > 0 ? "artwork" : "classes"} className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-4 md:mb-8 overflow-x-auto">
            {artworks.length > 0 && (
              <TabsTrigger value="artwork" className="flex-1 text-xs md:text-sm">Artwork</TabsTrigger>
            )}
            {classes.length > 0 && (
              <TabsTrigger value="classes" className="flex-1 text-xs md:text-sm">Classes</TabsTrigger>
            )}
            <TabsTrigger value="about" className="flex-1 text-xs md:text-sm">About</TabsTrigger>
          </TabsList>
          
          {artworks.length > 0 && (
            <TabsContent value="artwork" className="animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {artworks.map((artwork) => (
                  <div key={artwork.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                    <Link to={`/artwork/${artwork.id}`} className="block aspect-square relative group">
                      <img 
                        src={artwork.image} 
                        alt={artwork.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-medium">View Details</span>
                      </div>
                    </Link>
                    <div className="p-3 md:p-4">
                      <Link to={`/artwork/${artwork.id}`} className="block">
                        <h3 className="font-medium hover:text-artnexus-purple transition-colors text-sm md:text-base">{artwork.title}</h3>
                      </Link>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium">{artwork.price}</span>
                        <div className="flex items-center space-x-3 text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3 md:h-4 md:w-4" />
                            <span className="text-xs">0</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
                            <span className="text-xs">0</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground line-clamp-2">
                        {artwork.description || "No description available"}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {artwork.tags?.map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
          
          {classes.length > 0 && (
            <TabsContent value="classes" className="animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {classes.map((cls) => (
                  <div key={cls.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                    <Link to={`/class/${cls.id}`} className="block aspect-video relative group">
                      <img 
                        src={cls.image} 
                        alt={cls.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-medium">View Class</span>
                      </div>
                    </Link>
                    <div className="p-3 md:p-4">
                      <Link to={`/class/${cls.id}`} className="block">
                        <h3 className="font-medium hover:text-artnexus-purple transition-colors text-sm md:text-base">{cls.title}</h3>
                      </Link>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium">{cls.price}</span>
                        <div className="flex items-center space-x-3 text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
                            <span className="text-xs">{cls.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground line-clamp-2">
                        {cls.description}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          {cls.level}
                        </span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          {cls.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
          
          <TabsContent value="about" className="animate-fade-in">
            <div className="max-w-3xl">
              <h3 className="text-lg md:text-xl font-bold mb-4">About {artist.name}</h3>
              <p className="text-muted-foreground mb-6 text-sm md:text-base">
                {artist.bio || "No biography available"}
              </p>
              
              <h4 className="text-base md:text-lg font-semibold mb-2">Location</h4>
              <p className="text-muted-foreground mb-6 text-sm md:text-base">{artist.location || "Location not specified"}</p>
              
              <h4 className="text-base md:text-lg font-semibold mb-2">Member since</h4>
              <p className="text-muted-foreground mb-6 text-sm md:text-base">January 2023</p>
              
              <h4 className="text-base md:text-lg font-semibold mb-2">Contact</h4>
              <p className="text-muted-foreground text-sm md:text-base">
                For inquiries, please use the message feature or contact through social media.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ArtistProfile;
