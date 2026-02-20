/**
 * ArtNexus - Main Application Component
 * 
 * @author Prompt007dev
 * @created 2024
 * @description Main application component that sets up routing and providers
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "sonner";
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

import Index from '@/pages/Index';
import Discover from '@/pages/Discover';
import Marketplace from '@/pages/Marketplace';
import Collections from '@/pages/Collections';
import ARView from '@/pages/ARView';
import ARModels from '@/pages/ARModels';
import ARGallery from '@/pages/ARGallery';
import ARWebXR from '@/pages/ARWebXR';
import ArtworkDetail from '@/pages/ArtworkDetail';
import ArtistProfile from '@/pages/ArtistProfile';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import Events from '@/pages/Events';
import Forum from '@/pages/Forum';
import ForumTopic from '@/pages/ForumTopic';
import ArtClasses from '@/pages/ArtClasses';
import ClassDetail from '@/pages/ClassDetail';
import Performances from '@/pages/Performances';
import NotFound from '@/pages/NotFound';

import ErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="artnexus-theme">
      <ErrorBoundary>
        <CartProvider>
          <BrowserRouter>
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/ar-view/:id" element={<ARView />} />
                  <Route path="/ar-models" element={<ARModels />} />
                  <Route path="/ar-gallery" element={<ARGallery />} />
                  <Route path="/ar-webxr" element={<ARWebXR />} />
                  <Route path="/artwork/:id" element={<ArtworkDetail />} />
                  <Route path="/artist/:id" element={<ArtistProfile />} />
                  <Route path="/login" element={<Auth />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/forum" element={<Forum />} />
                  <Route path="/forum/:id" element={<ForumTopic />} />
                  <Route path="/art-classes" element={<ArtClasses />} />
                  <Route path="/class/:id" element={<ClassDetail />} />
                  <Route path="/performances" element={<Performances />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </QueryClientProvider>
            </AuthProvider>
          </BrowserRouter>
        </CartProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
