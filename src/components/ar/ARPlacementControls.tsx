import React from 'react';
import { Button } from '@/components/ui/button';
import { Maximize, RotateCcw, X, Info } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface ARPlacementControlsProps {
    onReset: () => void;
    onClose: () => void;
    mode: 'wall' | 'floor';
}

const ARPlacementControls: React.FC<ARPlacementControlsProps> = ({
    onReset,
    onClose,
    mode
}) => {
    return (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 z-50 pointer-events-none">
            <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 pointer-events-auto">
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={onClose}
                    className="rounded-full h-12 w-12 bg-white/10 hover:bg-white/20 text-white border-none"
                >
                    <X className="h-6 w-6" />
                </Button>

                <Button
                    variant="secondary"
                    size="icon"
                    onClick={onReset}
                    className="rounded-full h-12 w-12 bg-white/10 hover:bg-white/20 text-white border-none"
                >
                    <RotateCcw className="h-6 w-6" />
                </Button>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full h-12 w-12 bg-white/10 hover:bg-white/20 text-white border-none"
                        >
                            <Info className="h-6 w-6" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60 bg-black/80 border-white/10 text-white backdrop-blur-xl">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">AR Help</h4>
                            <p className="text-sm text-white/70">
                                {mode === 'wall'
                                    ? "Point your camera at a vertical wall. Move slowly side-to-side to detect the surface."
                                    : "Point your camera at the floor or a flat table. Move slowly to detect the surface."}
                            </p>
                            <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                                <li>One finger to drag/move</li>
                                <li>Two fingers to rotate</li>
                                <li>Pinch to scale size</li>
                            </ul>
                        </div>
                    </PopoverContent>
                </Popover>

                {/* The model-viewer component handles the "Activate AR" button internally slot="ar-button", 
            but we provide these extra controls for the overlay */}
            </div>
        </div>
    );
};

export default ARPlacementControls;
