import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, MarketplaceItem, Artwork, Artist } from '@/integrations/supabase/client';
import { IndianRupee, Search, Filter, ShoppingCart, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cart } from '@/components/Cart';
import { Checkout } from '@/components/Checkout';
import { useCart } from '@/contexts/CartContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MarketplaceArtwork extends Artwork {
  artist: Artist;
  marketplace_item: MarketplaceItem;
  price: string;
  status: string;
}

const Marketplace = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [gridView, setGridView] = useState<'3x3' | '2x2'>('3x3');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { state: cartState, dispatch } = useCart();
  const { toast } = useToast();

  const { data: artworks = [], isLoading, error } = useQuery({
    queryKey: ['marketplace-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select(`
          *,
          artwork:artworks (
            *,
            artist:artists (*)
          )
        `)
        .eq('status', 'available');

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching items",
          description: error.message
        });
        throw error;
      }

      return data.map((item: any) => ({
        ...item.artwork,
        artist: item.artwork.artist,
        marketplace_item: item,
        price: item.price,
        status: item.status,
      })) as MarketplaceArtwork[];
    }
  });

  // Sort artworks by date (newest first)
  const sortedArtworks = [...artworks].sort((a, b) =>
    new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
  );

  // Filter artworks based on search, category, and price range
  const filteredArtworks = sortedArtworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(search.toLowerCase()) ||
      artwork.description?.toLowerCase().includes(search.toLowerCase()) ||
      artwork.artist.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === 'all' || artwork.category === category;

    const price = parseFloat(artwork.price.replace(/[₹,$]/g, ''));
    const matchesPrice = priceRange === 'all' ||
      (priceRange === '0-50000' && price <= 50000) ||
      (priceRange === '50000-100000' && price > 50000 && price <= 100000) ||
      (priceRange === '100000+' && price > 100000);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const uniqueCategories = Array.from(new Set(artworks.map(item => item.category || 'Uncategorized')));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Art Marketplace</h1>
            <Button
              onClick={() => setIsCartOpen(true)}
              variant="outline"
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartState.items.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartState.items.length}
                </Badge>
              )}
            </Button>
          </div>
          <p className="text-muted-foreground mt-2">
            Discover and collect unique artworks from talented artists
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-artnexus-purple" />
          </div>
        )}

        {/* Filters */}
        <div className="bg-card rounded-lg p-4 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search artworks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-50000">Under ₹50,000</SelectItem>
                <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                <SelectItem value="100000+">Above ₹1,00,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''}
          </p>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Filter className="h-4 w-4 mr-2" />
            {category !== 'all' ? `Category: ${category}` : 'All Categories'}
          </Button>
        </div>

        {/* Gallery */}
        <div className={`grid gap-6 ${gridView === '3x3' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
          {filteredArtworks.map((artwork) => (
            <Card key={artwork.id} className="h-full hover:shadow-lg transition-shadow group">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge
                  className="absolute top-2 right-2"
                  variant={artwork.status === 'sold' ? 'destructive' : 'secondary'}
                >
                  {artwork.status === 'sold' ? 'Sold' : 'Available'}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                      {artwork.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{artwork.artist.name}</p>
                  </div>
                  <div className="flex items-center text-sm font-medium">
                    <IndianRupee className="h-3.5 w-3.5 mr-1" />
                    {artwork.price.replace('₹', '')}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{artwork.medium}</p>
                <div className="flex justify-between items-center">
                  <Link to={`/artwork/${artwork.id}`}>
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
                  <Button
                    size="sm"
                    onClick={() => dispatch({ type: 'ADD_TO_CART', payload: artwork })}
                    disabled={artwork.status === 'sold'}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg font-medium mb-2">No artworks found</p>
            <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
          </div>
        )}
      </main>

      <Cart
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <Checkout
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default Marketplace;
