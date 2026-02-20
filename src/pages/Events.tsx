
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data for events with corrected image URLs
const mockEvents = [
  {
    id: "event-1",
    title: "Modern Art Exhibition: Beyond Boundaries",
    description: "Experience art that pushes the boundaries of traditional forms. This exhibition features works from contemporary artists exploring new mediums and techniques.",
    date: "May 10, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "ArtNexus Gallery, Mumbai",
    image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    featured: true,
    ticketPrice: "₹500"
  },
  {
    id: "event-2",
    title: "Digital Art Workshop",
    description: "Learn digital art techniques from professional artists. This hands-on workshop will cover digital painting, illustration, and graphic design.",
    date: "May 15, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Tech Arts Center, Bangalore",
    image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    featured: true,
    ticketPrice: "₹1200"
  },
  {
    id: "event-3",
    title: "Traditional Crafts Fair",
    description: "Celebrate the rich heritage of Indian crafts. Meet artisans, buy handmade products, and participate in craft-making demonstrations.",
    date: "May 18-20, 2025",
    time: "11:00 AM - 8:00 PM",
    location: "Heritage Center, Delhi",
    image: "https://img.freepik.com/premium-photo/closeup-traditional-craft-fair-with-artisans-displaying-handmade-goods-demonstrating-tec_1327465-26144.jpg?w=1380",
    featured: false,
    ticketPrice: "₹300"
  },
  {
    id: "event-4",
    title: "Photography Master Class",
    description: "Improve your photography skills with this intensive master class. Learn about composition, lighting, and post-processing techniques.",
    date: "May 22, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Creative Studios, Chennai",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    featured: false,
    ticketPrice: "₹1500"
  },
  {
    id: "event-5",
    title: "Sculpture Symposium",
    description: "Watch master sculptors create amazing works of art. This three-day symposium includes live demonstrations and artist talks.",
    date: "May 25-27, 2025",
    time: "9:00 AM - 7:00 PM",
    location: "City Park, Kolkata",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    featured: false,
    ticketPrice: "Free"
  },
  {
    id: "event-6",
    title: "Art History Lecture Series",
    description: "Explore the evolution of art through the ages with this engaging lecture series by prominent art historians and scholars.",
    date: "June 1, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "University Arts Building, Hyderabad",
    image: "https://images.unsplash.com/photo-1551446591-142875a901a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    featured: false,
    ticketPrice: "₹400"
  },
  {
    id: "event-7",
    title: "Children's Art Festival",
    description: "A fun-filled day of art activities for children of all ages. Includes painting, crafts, and interactive art installations.",
    date: "June 5, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "Community Center, Pune",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    featured: false,
    ticketPrice: "₹200"
  },
  {
    id: "event-8",
    title: "Street Art Tour",
    description: "Discover the vibrant street art scene with this guided walking tour. Learn about the artists and the stories behind their work.",
    date: "June 10, 2025",
    time: "5:00 PM - 7:00 PM",
    location: "Downtown District, Mumbai",
    image: "https://dynamic-media.tacdn.com/media/photo-o/2e/eb/a8/5a/caption.jpg?w=1400&h=1000&s=1",
    featured: false,
    ticketPrice: "₹600"
  }
];

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  
  // Fetch events from Supabase
  const { data, isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*');
      
      if (error) {
        console.error('Error fetching events:', error);
        throw error;
      }
      
      return data;
    },
    meta: {
      onError: (error: any) => {
        console.error('Error in events query:', error);
        toast.error('Failed to load events. Using sample data instead.');
      }
    }
  });
  
  // Use mock data if Supabase data is empty or there's an error
  useEffect(() => {
    if (data && data.length > 0) {
      setEvents(data);
    } else if (!isLoading || isError) {
      setEvents(mockEvents);
    }
  }, [data, isLoading, isError]);
  
  const handleRegister = (eventTitle: string) => {
    toast.success(`Registered for ${eventTitle}`, {
      description: "You'll receive confirmation details via email shortly.",
      duration: 5000,
    });
  };
  
  const featuredEvents = events.filter(event => event.featured);
  const regularEvents = events.filter(event => !event.featured);

  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite error loops
    target.src = "/placeholder.svg"; // Fallback image
    console.log("Image failed to load, using placeholder");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 max-w-7xl flex-1">
        <h1 className="text-3xl font-bold mb-2">Art Events</h1>
        <p className="text-gray-500 mb-8">Discover exhibitions, workshops, and art gatherings in your community</p>
        
        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Featured Events</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredEvents.map(event => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-48 object-cover"
                      onError={handleImageError}
                    />
                    <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 m-2 rounded-full text-xs font-bold">
                      Featured
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm font-medium">{event.ticketPrice}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => handleRegister(event.title)}
                    >
                      Register Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        )}
        
        {/* Upcoming Events */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Upcoming Events</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : regularEvents.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No upcoming events</h3>
              <p className="text-gray-500 mt-2">Check back soon for new events</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularEvents.map(event => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-40 object-cover"
                    onError={handleImageError}
                  />
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-bold">{event.title}</h3>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm font-medium">{event.ticketPrice}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleRegister(event.title)}
                    >
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
