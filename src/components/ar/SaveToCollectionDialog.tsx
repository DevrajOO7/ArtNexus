
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { List, CheckCircle } from 'lucide-react';
import { toast } from "sonner";
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Collection {
  id: string;
  name: string;
  description: string | null;
  cover_image: string | null;
  created_at: string;
}

interface SaveToCollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  artworkId: string;
}

const SaveToCollectionDialog = ({
  open,
  onOpenChange,
  artworkId,
}: SaveToCollectionDialogProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch user session
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      
      if (!data.session) {
        toast.error("Please sign in to save to collections");
        onOpenChange(false);
      }
    };
    
    checkAuth();
  }, [onOpenChange]);

  // Fetch collections
  const { data: collections, isLoading } = useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('collections')
        .select(`
          id,
          name,
          description,
          cover_image,
          created_at,
          collection_items!inner (artwork_id)
        `);

      if (error) throw error;
      return data || [];
    },
    enabled: isAuthenticated === true,
  });

  // Add to collection mutation
  const addToCollection = useMutation({
    mutationFn: async (collectionId: string) => {
      const { error } = await supabase
        .from('collection_items')
        .insert({ collection_id: collectionId, artwork_id: artworkId });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      toast.success("Added to collection");
      onOpenChange(false);
    },
    onError: (error) => {
      console.error('Error adding to collection:', error);
      toast.error("Failed to add to collection");
      setSelectedId(null);
    },
  });

  const handleSaveToCollection = async (collectionId: string) => {
    setSelectedId(collectionId);
    addToCollection.mutate(collectionId);
  };

  if (isAuthenticated === false) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save to Collection</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
              <p className="text-muted-foreground mt-2">Loading collections...</p>
            </div>
          ) : collections?.length === 0 ? (
            <div className="text-center py-8">
              <List className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">You don't have any collections yet.</p>
              <Button 
                asChild
                onClick={() => onOpenChange(false)}
              >
                <a href="/collections">Create Collection</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {collections?.map(collection => (
                <div 
                  key={collection.id}
                  className={`flex items-center space-x-3 p-2 hover:bg-muted rounded-md cursor-pointer transition-all ${selectedId === collection.id ? 'bg-primary/10' : ''}`}
                  onClick={() => handleSaveToCollection(collection.id)}
                >
                  <div className="h-12 w-12 rounded overflow-hidden">
                    <img 
                      src={collection.cover_image || '/placeholder.svg'} 
                      alt={collection.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{collection.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {collection.collection_items?.length || 0} {collection.collection_items?.length === 1 ? 'artwork' : 'artworks'}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="pointer-events-none">
                    {collection.collection_items?.some(item => item.artwork_id === artworkId) ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : selectedId === collection.id ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    ) : (
                      'Add'
                    )}
                  </Button>
                </div>
              ))}

              <div className="pt-2 text-center">
                <Button variant="outline" asChild>
                  <a href="/collections">Manage Collections</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveToCollectionDialog;
