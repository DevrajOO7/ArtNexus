import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Calendar,
  Ruler,
  Box
} from 'lucide-react';
import { marketplaceItems } from '@/data/marketplaceData';

const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<typeof marketplaceItems[0] | null>(null);
  const [comments, setComments] = useState<Array<{
    id: string;
    userName: string;
    userImage: string;
    content: string;
    createdAt: string;
  }>>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (id) {
      const foundArtwork = marketplaceItems.find(item => item.id === id);
      if (foundArtwork) {
        setArtwork(foundArtwork);
        // Initialize with some sample comments
        setComments([
          {
            id: '1',
            userName: 'Sarah Johnson',
            userImage: 'https://randomuser.me/api/portraits/women/32.jpg',
            content: 'I love the use of color in this piece! The way you\'ve captured the energy is remarkable.',
            createdAt: '2023-11-10T14:32:00Z',
          },
          {
            id: '2',
            userName: 'David Chen',
            userImage: 'https://randomuser.me/api/portraits/men/68.jpg',
            content: 'The composition is so dynamic. I can feel the movement just by looking at it.',
            createdAt: '2023-11-11T09:15:00Z',
          }
        ]);
      }
    }
  }, [id]);

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: `temp-${Date.now()}`,
      userName: 'You',
      userImage: 'https://randomuser.me/api/portraits/women/90.jpg',
      content: commentText,
      createdAt: new Date().toISOString(),
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  if (!artwork) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Artwork not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Artwork image */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-auto object-contain max-h-[70vh]"
              />

              <div className="p-4 flex justify-between items-center">
                <div className="flex space-x-4">
                  <Link
                    to="/ar-webxr"
                    state={{ artwork: artwork, mode: 'wall' }}
                    className="flex items-center gap-2 bg-artnexus-purple text-white px-4 py-2 rounded-md hover:bg-artnexus-purple/90 transition-colors text-sm font-medium"
                  >
                    <Box className="h-4 w-4" />
                    View in AR
                  </Link>

                  <button
                    className={`flex items-center space-x-1 ${isLiked ? 'text-artnexus-rose' : 'text-muted-foreground'}`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-artnexus-rose' : ''}`} />
                    <span>{isLiked ? 1 : 0}</span>
                  </button>

                  <button className="flex items-center space-x-1 text-muted-foreground">
                    <MessageCircle className="h-5 w-5" />
                    <span>{comments.length}</span>
                  </button>
                </div>

                <div className="flex space-x-4">
                  <button className="text-muted-foreground hover:text-foreground">
                    <Share2 className="h-5 w-5" />
                  </button>

                  <button
                    className={`${isSaved ? 'text-artnexus-amber' : 'text-muted-foreground'}`}
                    onClick={() => setIsSaved(!isSaved)}
                  >
                    <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-artnexus-amber' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Comments section */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-6">Comments</h3>

              <div className="mb-6">
                <Textarea
                  placeholder="Add a comment..."
                  className="resize-none mb-2"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className="bg-artnexus-purple hover:bg-artnexus-purple/90"
                >
                  Post Comment
                </Button>
              </div>

              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <img
                      src={comment.userImage}
                      alt={comment.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-grow">
                      <div className="flex items-baseline justify-between">
                        <h4 className="font-medium">{comment.userName}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}

                {comments.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Artwork info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold mb-2">{artwork.title}</h1>

              <Link
                to={`/artist/${artwork.artist.id}`}
                className="flex items-center space-x-2 mb-4 hover:text-artnexus-purple transition-colors"
              >
                <img
                  src={artwork.artist.photo}
                  alt={artwork.artist.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{artwork.artist.name}</span>
              </Link>

              <Separator className="my-4" />

              <p className="text-muted-foreground mb-6">
                {artwork.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Year: </span>
                  <span className="ml-auto">{artwork.year}</span>
                </div>

                {artwork.dimensions && (
                  <div className="flex items-center text-sm">
                    <Ruler className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Dimensions: </span>
                    <span className="ml-auto">{artwork.dimensions}</span>
                  </div>
                )}

                {artwork.medium && (
                  <div className="flex items-center text-sm">
                    <span className="text-muted-foreground">Medium: </span>
                    <span className="ml-auto">{artwork.medium}</span>
                  </div>
                )}

                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground">Price: </span>
                  <span className="ml-auto font-medium">{artwork.price}</span>
                </div>

                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground">Status: </span>
                  <span className={`ml-auto ${artwork.status === 'available' ? 'text-green-500' : 'text-red-500'}`}>
                    {artwork.status.charAt(0).toUpperCase() + artwork.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Category</h4>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/discover?category=${artwork.category}`}
                    className="text-xs bg-muted px-2 py-1 rounded-full hover:bg-muted/80 transition-colors"
                  >
                    {artwork.category}
                  </Link>
                </div>
              </div>
            </div>

            {/* Artist info card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">About the Artist</h3>

              <Link
                to={`/artist/${artwork.artist.id}`}
                className="flex items-center space-x-3 mb-4 hover:text-artnexus-purple transition-colors"
              >
                <img
                  src={artwork.artist.photo}
                  alt={artwork.artist.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium">{artwork.artist.name}</h4>
                </div>
              </Link>

              <Link
                to={`/artist/${artwork.artist.id}`}
                className="text-sm text-artnexus-purple hover:text-artnexus-teal font-medium transition-colors"
              >
                View Full Profile
              </Link>
            </div>

            {/* More from this artist */}
            {marketplaceItems.filter(item =>
              item.artist.id === artwork.artist.id &&
              item.id !== artwork.id
            ).length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold mb-4">More from this Artist</h3>

                  <div className="grid grid-cols-1 gap-4">
                    {marketplaceItems
                      .filter(item =>
                        item.artist.id === artwork.artist.id &&
                        item.id !== artwork.id
                      )
                      .slice(0, 2)
                      .map((item) => (
                        <Link
                          key={item.id}
                          to={`/artwork/${item.id}`}
                          className="flex items-center space-x-3 group"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-md group-hover:opacity-80 transition-opacity"
                          />
                          <div>
                            <h4 className="font-medium group-hover:text-artnexus-purple transition-colors">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.category}</p>
                          </div>
                        </Link>
                      ))}
                  </div>

                  <Link
                    to={`/artist/${artwork.artist.id}`}
                    className="block text-center text-sm text-artnexus-purple hover:text-artnexus-teal font-medium mt-4 transition-colors"
                  >
                    View All Artwork
                  </Link>
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ArtworkDetail;
