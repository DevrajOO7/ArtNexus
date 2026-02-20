import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar'; // Keep Navbar for non-AR state
import { Button } from '@/components/ui/button';
import { ArrowLeft, Box, Layers, Maximize } from 'lucide-react';
import ARPlacementControls from '@/components/ar/ARPlacementControls';
import '@google/model-viewer';

// Define type for the custom element to avoid TS errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

const ARWebXR = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { artwork, selectedModel, mode = 'floor' } = location.state || {}; // mode: 'wall' | 'floor'

  // State for the AR session
  const [arSupported, setArSupported] = useState(true); // Assume true initially

  // Decide what to show
  // If artwork (2D) is passed, we might need a "frame" model or just use a simple plane glb
  // For this MVP, we will use a generic "canvas" GLB model and apply the artwork image as a texture
  // OR we can use a flat plane GLB.
  // To make it simple for the user, if it's a 2D artwork, we might default to "floor" placement for now 
  // unless we have a wall-frame GLB. 
  // Let's use a placeholder 'frame.glb' if available, or just the zeus statue for testing if nothing provided.

  const modelSrc = selectedModel?.src ||
    (artwork ? '/models/frame_placeholder.glb' : 'https://modelviewer.dev/shared-assets/models/Astronaut.glb');

  const posterSrc = selectedModel?.thumbnail || artwork?.image || 'https://modelviewer.dev/shared-assets/models/Astronaut.png';

  const arPlacement = mode === 'wall' ? 'wall' : 'floor';

  useEffect(() => {
    // Check if device supports WebXR
    if ('xr' in navigator) {
      // (navigator as any).xr.isSessionSupported('immersive-ar').then((supported: boolean) => setArSupported(supported));
    }
  }, []);

  if (!artwork && !selectedModel && !location.state?.demo) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
        <Box className="h-16 w-16 mb-4 text-gray-500" />
        <h1 className="text-2xl font-bold mb-2">No Content Selected</h1>
        <p className="text-gray-400 mb-6">Please select an artwork or 3D model to view in AR.</p>
        <Button variant="secondary" onClick={() => navigate('/discover')}>
          Go to Discover
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gray-900 overflow-hidden relative">
      <Button
        variant="ghost"
        className="absolute top-4 left-4 z-50 text-white hover:bg-white/20"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      {/* 
        model-viewer configuration:
        - ar: enables AR
        - ar-modes: prioritizes webxr (best), then scene-viewer (android native), then quick-look (ios native)
        - camera-controls: enables touch interaction
        - ar-placement: wall or floor
        - shadow-intensity: makes it look grounded
      */}
      <model-viewer
        src={selectedModel?.glb || modelSrc} // Prefer direct GLB for model-viewer
        poster={posterSrc}
        alt={selectedModel?.name || artwork?.title || "AR Model"}
        shadow-intensity="1"
        camera-controls
        auto-rotate
        ar
        ar-modes="webxr scene-viewer quick-look"
        ar-placement={arPlacement}
        ar-scale="auto"
        style={{ width: '100%', height: '100%' }}
        touch-action="pan-y"
      >
        {/* Helper slot for AR button */}
        <button slot="ar-button" className="absolute bottom-8 right-8 bg-artnexus-purple text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center hover:bg-artnexus-purple/90 transition-all transform hover:scale-105">
          <Maximize className="mr-2 h-5 w-5" /> View in your space
        </button>

        {/* Custom UI overlay inside AR (limited support in some modes, but good for WebXR) */}
        <div id="ar-prompt" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden">
          <img src="https://modelviewer.dev/shared-assets/icons/hand.png" className="w-12 h-12 animate-pulse" />
        </div>

      </model-viewer>

      <div className="absolute top-4 right-4 z-40 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm">
        {mode === 'wall' ? 'Wall Mode' : 'Floor/Table Mode'}
      </div>

      {/* 
         Note: When entering AR on mobile (fullscreen), standard HTML overlays might be hidden 
         depending on the browser/mode (SceneViewer/QuickLook take over full screen).
         WebXR mode keeps the browser UI.
      */}
    </div>
  );
};

export default ARWebXR;
