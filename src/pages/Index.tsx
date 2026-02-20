/**
 * ArtNexus - Home Page Component
 * 
 * @author Prompt007dev
 * @created 2024
 * @description Landing page component with featured content and navigation
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ArrowRight, Palette, Layers, Eye, Rocket, SparkleIcon,
  Star, Camera, Paintbrush, Lightbulb, Users, HelpCircle, MessageCircle
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleWelcomeToast = () => {
    toast.success("Welcome to ArtNexus!", {
      description: "Discover, create and experience art in new ways.",
      duration: 5000,
    });
  };

  const handleTryAR = () => {
    navigate('/ar-models');
    toast.info("AR Experience Loading", {
      description: "Get ready to view amazing 3D art in your space!",
      duration: 3000,
    });
  };

  useEffect(() => {
    // Show welcome toast when component mounts
    handleWelcomeToast();
    setIsLoaded(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-indigo-950/30 dark:to-gray-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10 dark:opacity-20">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-purple-400 filter blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-blue-400 filter blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-pink-400 filter blur-3xl"></div>
          </div>
        </div>

        <div className="container relative px-4 md:px-6 z-10">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block p-1.5 px-3 mb-2 text-xs font-medium uppercase rounded-full bg-artnexus-purple/10 text-artnexus-purple">
              Experience Art Like Never Before
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-artnexus-purple via-artnexus-teal to-artnexus-purple bg-clip-text text-transparent">
              Art Beyond Boundaries
            </h1>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Discover digital masterpieces, connect with artists, and experience art through augmented reality.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="gap-2 bg-artnexus-purple hover:bg-artnexus-purple/90 shadow-lg" asChild>
                <Link to="/discover">
                  Start Exploring <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button onClick={handleTryAR} variant="outline" size="lg" className="border-artnexus-purple text-artnexus-purple hover:bg-artnexus-purple/10">
                Try AR Experience
              </Button>
            </div>
          </motion.div>

          {/* Floating 3D objects */}
          <div className="mt-16 relative w-full max-w-4xl mx-auto">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="row-span-2 col-span-2">
                <img 
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5" 
                  alt="Art Piece" 
                  className="w-full h-full object-cover rounded-lg shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <img 
                  src="https://images.unsplash.com/photo-1579783928621-7a13d66a62d1" 
                  alt="Art Piece" 
                  className="w-full aspect-square object-cover rounded-lg shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <img 
                  src="https://www.dailyartmagazine.com/wp-content/uploads/2021/12/Ed-Wheeler_Starry-Night-e1669811289339-768x518.jpg " 
                  alt="Art Piece" 
                  className="w-full aspect-square object-cover rounded-lg shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <img 
                  src="https://as1.ftcdn.net/v2/jpg/05/57/67/86/1000_F_557678693_Qpd9lTBcYKB3XtQpcyG5V61yGYFLje5B.jpg" 
                  alt="Art Piece" 
                  className="w-full aspect-square object-cover rounded-lg shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <img 
                  src="https://as1.ftcdn.net/v2/jpg/02/73/22/74/1000_F_273227473_N0WRQuX3uZCJJxlHKYZF44uaJAkh2xLG.jpg" 
                  alt="Art Piece" 
                  className="w-full aspect-square object-cover rounded-lg shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block p-1 px-3 mb-2 text-xs font-medium uppercase rounded-full bg-artnexus-teal/10 text-artnexus-teal">
              Innovative Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why ArtNexus?
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Bridging the gap between traditional art and cutting-edge technology.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-950 h-full">
                <CardContent className="flex flex-col items-center space-y-4 p-6 h-full">
                  <div className="p-3 rounded-full bg-artnexus-purple/10">
                    <Palette className="h-8 w-8 text-artnexus-purple" />
                  </div>
                  <h3 className="text-xl font-bold">Discover Art</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Browse curated collections from artists around the world. Find your next favorite piece with our powerful search tools.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-teal-50 dark:from-gray-900 dark:to-gray-950 h-full">
                <CardContent className="flex flex-col items-center space-y-4 p-6 h-full">
                  <div className="p-3 rounded-full bg-artnexus-teal/10">
                    <Layers className="h-8 w-8 text-artnexus-teal" />
                  </div>
                  <h3 className="text-xl font-bold">Digital Marketplace</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Buy, sell, and trade digital art securely on our platform. Support artists directly and build your collection.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-rose-50 dark:from-gray-900 dark:to-gray-950 h-full">
                <CardContent className="flex flex-col items-center space-y-4 p-6 h-full">
                  <div className="p-3 rounded-full bg-artnexus-rose/10">
                    <Eye className="h-8 w-8 text-artnexus-rose" />
                  </div>
                  <h3 className="text-xl font-bold">AR Visualization</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    See how artwork looks in your space with augmented reality. Experience art in a whole new dimension.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-amber-50 dark:from-gray-900 dark:to-gray-950 h-full">
                <CardContent className="flex flex-col items-center space-y-4 p-6 h-full">
                  <div className="p-3 rounded-full bg-artnexus-amber/10">
                    <Rocket className="h-8 w-8 text-artnexus-amber" />
                  </div>
                  <h3 className="text-xl font-bold">Creative Community</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Connect with artists and art enthusiasts from around the globe. Share insights and inspiration.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 h-full">
                <CardContent className="flex flex-col items-center space-y-4 p-6 h-full">
                  <div className="p-3 rounded-full bg-blue-500/10">
                    <Lightbulb className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold">Art Classes</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Learn from talented artists with interactive online classes. Master new techniques and express your creativity.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-950 h-full">
                <CardContent className="flex flex-col items-center space-y-4 p-6 h-full">
                  <div className="p-3 rounded-full bg-green-500/10">
                    <MessageCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold">Discussion Forums</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Engage in meaningful conversations about art, techniques, and trends. Share your knowledge and learn from others.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block p-1 px-3 mb-2 text-xs font-medium uppercase rounded-full bg-artnexus-rose/10 text-artnexus-rose">
              Curated Selection
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Featured Experiences
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore some of our most popular art experiences.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Link to="/ar-models" className="group block">
                <Card className="overflow-hidden transition-all hover:shadow-lg border-0 shadow-md">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                      alt="AR Gallery" 
                      className="aspect-video object-cover w-full transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <p className="font-bold">Available in AR</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold group-hover:text-artnexus-purple transition-colors">AR Gallery Tour</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      Tour virtual galleries with augmented reality.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link to="/performances" className="group block">
                <Card className="overflow-hidden transition-all hover:shadow-lg border-0 shadow-md">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                      alt="Digital Performances" 
                      className="aspect-video object-cover w-full transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <p className="font-bold">Live Events</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold group-hover:text-artnexus-teal transition-colors">Digital Performances</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      Experience live digital art performances.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link to="/art-classes" className="group block">
                <Card className="overflow-hidden transition-all hover:shadow-lg border-0 shadow-md">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                      alt="Art Classes" 
                      className="aspect-video object-cover w-full transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <p className="font-bold">Interactive Learning</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold group-hover:text-artnexus-rose transition-colors">Art Classes</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      Learn from talented artists in interactive classes.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Separator />
      
      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-artnexus-purple/5 to-artnexus-teal/5 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block p-1 px-3 mb-2 text-xs font-medium uppercase rounded-full bg-artnexus-amber/10 text-artnexus-amber">
              Join Today
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Join our community of artists and art enthusiasts today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="gap-2 bg-artnexus-purple hover:bg-artnexus-purple/90 shadow-lg">
                  Create Account <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="outline" size="lg" className="border-artnexus-teal text-artnexus-teal hover:bg-artnexus-teal/10">
                  Browse Marketplace
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
