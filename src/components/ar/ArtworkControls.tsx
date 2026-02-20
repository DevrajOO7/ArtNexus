
import React from 'react';
import { Camera, Upload, Save, Share2, Layers } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface ArtworkControlsProps {
  scale: number[];
  position: { x: number; y: number };
  highQuality: boolean;
  onScaleChange: (value: number[]) => void;
  onPositionChange: (axis: 'x' | 'y', value: number[]) => void;
  onQualityChange: (value: boolean) => void;
  onRetake: () => void;
  onUpload: () => void;
  onSave: () => void;
  onShare: () => void;
  onPlace: () => void;
}

const ArtworkControls = ({
  scale,
  position,
  highQuality,
  onScaleChange,
  onPositionChange,
  onQualityChange,
  onRetake,
  onUpload,
  onSave,
  onShare,
  onPlace,
}: ArtworkControlsProps) => {
  return (
    <div className="mt-6 grid grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium mb-3">Adjust Artwork</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="size">Size</Label>
                <span className="text-sm text-muted-foreground">{scale[0]}%</span>
              </div>
              <Slider 
                id="size"
                min={50} 
                max={400} 
                step={1} 
                value={scale} 
                onValueChange={onScaleChange} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position-x">Horizontal</Label>
                <Slider 
                  id="position-x"
                  min={0} 
                  max={100} 
                  step={1} 
                  value={[position.x]} 
                  onValueChange={(value) => onPositionChange('x', value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position-y">Vertical</Label>
                <Slider 
                  id="position-y"
                  min={0} 
                  max={100} 
                  step={1} 
                  value={[position.y]} 
                  onValueChange={(value) => onPositionChange('y', value)} 
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="high-quality">High quality rendering</Label>
              <Switch 
                id="high-quality"
                checked={highQuality}
                onCheckedChange={onQualityChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium mb-3">Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={onRetake}
            >
              <Camera className="h-4 w-4" />
              Retake
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={onUpload}
            >
              <Upload className="h-4 w-4" />
              Upload
            </Button>
            <Button 
              className="w-full flex items-center justify-center gap-2"
              onClick={onSave}
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button 
              className="w-full flex items-center justify-center gap-2"
              onClick={onShare}
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          <div className="text-center">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onPlace}
            >
              <Layers className="h-4 w-4 mr-2" />
              Place Artwork
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtworkControls;
