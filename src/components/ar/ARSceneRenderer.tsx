import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, ZoomIn, ZoomOut, Move, Redo } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ARSceneRendererProps {
  capturedImage: string | null;
  selectedImage: string | null;
  videoStream: MediaStream | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  position: { x: number; y: number };
  scale: number[];
  isProcessing: boolean;
  onCameraCapture: () => void;
  onCapture: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onRedo?: () => void;
}

const ARSceneRenderer = ({
  capturedImage,
  selectedImage,
  videoStream,
  videoRef,
  position,
  scale,
  isProcessing,
  onCameraCapture,
  onCapture,
  onZoomIn,
  onZoomOut,
  onRedo
}: ARSceneRendererProps) => {
  const isMobile = useIsMobile();

  if (!capturedImage) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-6 md:p-12 text-center min-h-[300px] md:min-h-[400px]">
        {videoStream ? (
          <>
            <div className="relative w-full max-w-lg mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full rounded-lg"
              />
              <Button
                onClick={onCapture}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 hover:bg-white"
              >
                Capture
              </Button>
            </div>
          </>
        ) : (
          <>
            <Camera className={`${isMobile ? 'h-12 w-12' : 'h-16 w-16'} text-artistic-purple mb-4`} />
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium mb-2`}>Capture Your Space</h3>
            <p className="text-muted-foreground mb-6 max-w-md px-4">
              Take a photo of your wall or space where you want to place the artwork
            </p>
            <Button onClick={onCameraCapture} disabled={isProcessing} size={isMobile ? "sm" : "default"}>
              {isProcessing ? 'Processing...' : 'Activate Camera'}
            </Button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden h-[300px] md:h-[500px]">
      <img
        src={capturedImage}
        alt="Captured space"
        className="w-full h-full object-cover"
      />

      {selectedImage && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-move"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            width: `${scale[0]}px`,
            maxWidth: '80%'
          }}
        >
          <img
            src={selectedImage}
            alt="Selected artwork"
            className="w-full h-auto object-contain shadow-lg rounded"
            draggable={false}
          />
        </div>
      )}
    </div>
  );
};

export default ARSceneRenderer;
