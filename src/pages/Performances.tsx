import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { performances as performanceData } from '@/data/performanceData';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Performance {
  id: string;
  title: string;
  description: string;
  image: string;
  artist: string;
  date: string;
  video_url: string;
  category?: string;
  featured?: boolean;
}

export default function Performances() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['performances'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performances')
        .select('*');

      if (error) {
        console.error('Error fetching performances:', error);
        throw error;
      }

      return data;
    },
    meta: {
      onError: (error: any) => {
        console.error('Error in performances query:', error);
        toast.error('Failed to load performances. Using sample data instead.');
      }
    }
  });

  const performanceItems = (data && data.length > 0) ? data : performanceData;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="container mx-auto py-8 px-4 flex-1">
        <h1 className="text-3xl font-bold mb-2">Art Performances</h1>
        <p className="text-gray-500 mb-8">Explore captivating performances from talented artists around the world</p>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-full flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : performanceItems
                .filter(performance => performance.featured)
                .map((performance: Performance) => (
                  <Card key={performance.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <img 
                        src={performance.image} 
                        alt={performance.title}
                        className="w-full h-48 object-cover"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-bold mb-2">{performance.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{performance.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{performance.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{performance.artist}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-full flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : performanceItems
                .filter(performance => new Date(performance.date) > new Date())
                .map((performance: Performance) => (
                  <Card key={performance.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <img 
                        src={performance.image} 
                        alt={performance.title}
                        className="w-full h-48 object-cover"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold mb-2">{performance.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{performance.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{performance.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{performance.artist}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Book Now</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-full flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : performanceItems
                .filter(performance => new Date(performance.date) <= new Date())
                .map((performance: Performance) => (
                  <Card key={performance.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <img 
                        src={performance.image} 
                        alt={performance.title}
                        className="w-full h-48 object-cover opacity-75"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold mb-2">{performance.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{performance.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{performance.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{performance.artist}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Watch Recording</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}