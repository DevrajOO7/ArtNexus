import { useState, useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase, handleSupabaseError } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { marketplaceItems } from '@/data/marketplaceData';
import { motion } from 'framer-motion'; // Add the missing import

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArtCard from '@/components/ArtCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Search,
  Sliders,
  Grid2X2,
  LayoutGrid,
  Loader2,
  FilterX
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Number of items per page
const ITEMS_PER_PAGE = 12;

// Fetch artworks from mock data
const fetchArtworks = async ({
  page = 1,
  category = null,
  searchQuery = '',
  sortBy = 'newest'
}) => {
  try {
    // Use marketplace items as our data source
    let filteredArtworks = [...marketplaceItems];

    // Apply category filter
    if (category) {
      filteredArtworks = filteredArtworks.filter(artwork =>
        artwork.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredArtworks = filteredArtworks.filter(artwork =>
        artwork.title.toLowerCase().includes(query) ||
        artwork.description.toLowerCase().includes(query) ||
        artwork.medium.toLowerCase().includes(query) ||
        artwork.artist.name.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filteredArtworks.sort((a, b) => new Date(b.year).getTime() - new Date(a.year).getTime());
        break;
      case 'oldest':
        filteredArtworks.sort((a, b) => new Date(a.year).getTime() - new Date(b.year).getTime());
        break;
      case 'price-high':
        filteredArtworks.sort((a, b) => parseFloat(b.price.replace(/[₹,]/g, '')) - parseFloat(a.price.replace(/[₹,]/g, '')));
        break;
      case 'price-low':
        filteredArtworks.sort((a, b) => parseFloat(a.price.replace(/[₹,]/g, '')) - parseFloat(b.price.replace(/[₹,]/g, '')));
        break;
      default:
        filteredArtworks.sort((a, b) => new Date(b.year).getTime() - new Date(a.year).getTime());
        break;
    }

    // Calculate pagination values
    const totalCount = filteredArtworks.length;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedArtworks = filteredArtworks.slice(startIndex, endIndex);

    // Add delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));

    // Convert marketplace items to the format expected by ArtCard
    return {
      artworks: paginatedArtworks.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        price: item.price,
        medium: item.medium,
        artistId: item.artist.id, // Add the missing artistId property
        artist: {
          id: item.artist.id,
          name: item.artist.name,
          profileImage: item.artist.photo, // Map photo to profileImage
          coverImage: "", // Add required properties
          bio: "",
          location: "",
          followers: 0,
          following: 0
        },
        categories: [item.category],
        createdAt: new Date().toISOString(), // Using current date as fallback
        likes: 0,
        comments: 0
      })),
      count: totalCount,
      totalPages: totalPages
    };
  } catch (error) {
    console.error('Error fetching artworks:', error);
    throw error;
  }
};

const Discover = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get URL query parameters with defaults
  const pageParam = searchParams.get('page');
  const categoryParam = searchParams.get('category');

  // State
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isGridView, setIsGridView] = useState(true);

  // Fetch artworks using React Query
  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['artworks', currentPage, selectedCategory, searchQuery, sortBy],
    queryFn: () => fetchArtworks({
      page: currentPage,
      category: selectedCategory,
      searchQuery,
      sortBy
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Destructure data with fallbacks
  const { artworks = [], count = 0, totalPages = 1 } = data || {};

  // Handle category selection
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes

    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInputValue);
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Update URL params
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);

    // Scroll to top of results
    window.scrollTo({
      top: document.getElementById('results-section')?.offsetTop - 100 || 0,
      behavior: 'smooth'
    });
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setSearchInputValue('');
    setSortBy('newest');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Generate pagination items
  const getPaginationItems = () => {
    // Create array of page numbers
    const items = [];

    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink
          onClick={() => handlePageChange(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // If there are more than 5 pages and we're not close to the start,
    // show ellipsis after first page
    if (totalPages > 5 && currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      // Skip if already added (for edge cases)
      if (i === 1 || i === totalPages) continue;

      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // If there are more than 5 pages and we're not close to the end,
    // show ellipsis before last page
    if (totalPages > 5 && currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  // Show error if fetch fails
  useEffect(() => {
    if (isError) {
      toast.error("Failed to load artworks. Please try again later.");
    }
  }, [isError]);

  // Sync URL with state
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const pageParam = searchParams.get('page');

    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }

    if (pageParam) {
      const page = parseInt(pageParam);
      if (!isNaN(page) && page > 0 && page !== currentPage) {
        setCurrentPage(page);
      }
    }
  }, [searchParams, selectedCategory, currentPage]);

  // Animation variants for results
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-artnexus-purple/10 to-artnexus-teal/10 dark:from-artnexus-purple/30 dark:to-artnexus-teal/20 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Discover Artwork</h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore and discover amazing artwork from talented artists around the world.
            Find unique pieces that inspire you and connect with the creators behind them.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and filter section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-100 dark:border-gray-700">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search by title, artist, or keyword..."
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                className="pl-10 border-gray-200 dark:border-gray-700"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <Button type="submit" className="bg-artnexus-purple hover:bg-artnexus-purple/90">
              Search
            </Button>

            <div className="flex items-center space-x-4">
              <div className="w-40">
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="border-gray-200 dark:border-gray-700">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="price-high">Price High</SelectItem>
                    <SelectItem value="price-low">Price Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className={!isGridView ? "bg-muted" : ""}
                  onClick={() => setIsGridView(false)}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={isGridView ? "bg-muted" : ""}
                  onClick={() => setIsGridView(true)}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>

          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />

          {(selectedCategory || searchQuery) && (
            <div className="mt-4 flex items-center">
              <div className="text-sm text-muted-foreground">Active filters:</div>
              <div className="flex flex-wrap gap-2 ml-2">
                {selectedCategory && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs rounded-full bg-artnexus-purple/10 border-artnexus-purple/20 text-artnexus-purple hover:bg-artnexus-purple/20"
                    onClick={() => handleCategorySelect(null)}
                  >
                    {selectedCategory} <FilterX className="ml-1 h-3 w-3" />
                  </Button>
                )}
                {searchQuery && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs rounded-full bg-artnexus-teal/10 border-artnexus-teal/20 text-artnexus-teal hover:bg-artnexus-teal/20"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchInputValue('');
                    }}
                  >
                    "{searchQuery}" <FilterX className="ml-1 h-3 w-3" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Results section */}
        <div id="results-section">
          {/* Loading state */}
          {isLoading ? (
            <div className={`grid gap-6 ${isGridView
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 md:grid-cols-2"
              }`}>
              {Array(8).fill(0).map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
                  <Skeleton className="w-full h-64" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="mb-4 text-sm text-muted-foreground">
                Showing {artworks.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}-
                {Math.min(currentPage * ITEMS_PER_PAGE, count)} of {count} results
                {(selectedCategory || searchQuery) && (
                  <Button
                    variant="link"
                    onClick={clearFilters}
                    className="ml-2 p-0 h-auto"
                  >
                    Clear filters
                  </Button>
                )}
              </div>

              {/* Results grid */}
              <motion.div
                className={`grid gap-6 ${isGridView
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 md:grid-cols-2"
                  }`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {artworks.length > 0 ? (
                  artworks.map((artwork) => (
                    <motion.div key={artwork.id} variants={childVariants}>
                      <ArtCard
                        artwork={artwork}
                        artist={artwork.artist}
                        isExpanded={!isGridView}
                      />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No artworks found</h3>
                    <p className="text-muted-foreground mb-4">We couldn't find any artworks matching your search criteria</p>
                    <Button onClick={clearFilters} className="bg-artnexus-purple hover:bg-artnexus-purple/90">
                      Clear Filters
                    </Button>
                  </div>
                )}
              </motion.div>

              {/* Pagination */}
              {artworks.length > 0 && totalPages > 1 && (
                <Pagination className="my-8">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                      </PaginationItem>
                    )}

                    {getPaginationItems()}

                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Discover;
