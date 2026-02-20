/**
 * ArtNexus - AR View Controls Component
 * 
 * @author Prompt007dev
 * @created 2024
 * @description Controls for manipulating AR artwork view including zoom, rotation, and movement
 */

import { Button } from '@/components/ui/button';
import { 
  ZoomIn, ZoomOut, RotateCcw, RotateCw, 
  Camera, Save, ArrowDown, ArrowUp, 
  ArrowLeft, ArrowRight, RefreshCw 
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ARViewControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onReset: () => void;
  onTakeScreenshot: () => void;
  onSave: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  cameraActive?: boolean;
  onToggleCamera?: () => void;
}

const ARViewControls = ({
  onZoomIn,
  onZoomOut,
  onRotateLeft,
  onRotateRight,
  onReset,
  onTakeScreenshot,
  onSave,
  onMoveUp,
  onMoveDown,
  onMoveLeft,
  onMoveRight,
  cameraActive = false,
  onToggleCamera
}: ARViewControlsProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative w-full h-full">
      <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 ${isMobile ? 'w-[90%]' : 'w-auto'}`}>
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2 grid grid-cols-3 gap-2">
          <Button size="icon" variant="ghost" className="h-10 w-10 text-white" onClick={onZoomIn}>
            <ZoomIn className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost" className="h-10 w-10 text-white" onClick={onReset}>
            <RefreshCw className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost" className="h-10 w-10 text-white" onClick={onZoomOut}>
            <ZoomOut className="h-5 w-5" />
          </Button>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2">
          <div className="grid grid-cols-3 gap-2">
            <div />
            <Button size="icon" variant="ghost" className="h-10 w-10 text-white" onClick={onMoveUp}>
              <ArrowUp className="h-5 w-5" />
            </Button>
            <div />
            <Button size="icon" variant="ghost" className="h-10 w-10 text-white" onClick={onMoveLeft}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="h-10 w-10 text-white" onClick={onRotateLeft}>
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="h-10 w-10 text-white" onClick={onMoveRight}>
              <ArrowRight className="h-5 w-5" />
            </Button>
            <div />
            <Button size="icon" variant="ghost" className="h-10 w-10 text-white" onClick={onMoveDown}>
              <ArrowDown className="h-5 w-5" />
            </Button>
            <div />
          </div>
        </div>
      </div>

      <div className={`fixed top-4 left-4 flex ${isMobile ? 'flex-col' : ''} gap-2`}>
        {onToggleCamera && (
          <Button
            variant="ghost"
            className={`h-10 ${cameraActive ? 'bg-green-500/70' : 'bg-black/40'} backdrop-blur-sm text-white hover:bg-black/60`}
            onClick={onToggleCamera}
          >
            <Camera className="h-5 w-5 mr-2" />
            {!isMobile && (cameraActive ? "Camera On" : "Activate Camera")}
          </Button>
        )}
        <Button 
          variant="ghost" 
          className="h-10 bg-black/40 backdrop-blur-sm text-white hover:bg-black/60"
          onClick={onTakeScreenshot}
        >
          <Camera className="h-5 w-5 mr-2" />
          {!isMobile && "Capture"}
        </Button>
        <Button 
          variant="ghost" 
          className="h-10 bg-black/40 backdrop-blur-sm text-white hover:bg-black/60"
          onClick={onSave}
        >
          <Save className="h-5 w-5 mr-2" />
          {!isMobile && "Save"}
        </Button>
      </div>
    </div>
  );
};

export default ARViewControls;
