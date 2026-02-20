
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MODEL_OPTIONS, ARModel } from '@/components/ar/ARModelSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Box, Search, Filter, Info, Smartphone } from 'lucide-react';
import '@google/model-viewer';

// Define type for the custom element to avoid TS errors
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': any;
        }
    }
}

const ARGallery = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedModel, setSelectedModel] = useState<ARModel | null>(null);
    const [isModelLoading, setIsModelLoading] = useState(false);

    // Filter for ONLY local models (AR Ready)
    const arModels = MODEL_OPTIONS.filter(model => !model.src.includes('sketchfab'));

    // Filter models based on search query
    const filteredModels = arModels.filter(model => {
        return searchQuery === '' ||
            model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            model.description.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const viewInAR = () => {
        if (selectedModel) {
            navigate('/ar-webxr', { state: { selectedModel, mode: 'floor' } });
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="container mx-auto px-4 py-8 flex-grow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center">
                            <Smartphone className="mr-2 h-8 w-8 text-artnexus-purple" />
                            AR Experience Gallery
                        </h1>
                        <p className="text-muted-foreground max-w-2xl">
                            Immersive Augmented Reality experiences. Place these high-quality 3D models in your real-world environment.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {/* Search */}
                        <div className="mb-6 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search AR models..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        {/* Models Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {filteredModels.length > 0 ? (
                                filteredModels.map(model => (
                                    <motion.div
                                        key={model.id}
                                        className={`cursor-pointer rounded-lg overflow-hidden border ${selectedModel?.id === model.id ? 'ring-2 ring-artnexus-purple' : 'hover:border-artnexus-purple'}`}
                                        onClick={() => setSelectedModel(model)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="aspect-square relative">
                                            <img
                                                src={model.thumbnail}
                                                alt={model.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-2 right-2 bg-artnexus-purple/90 text-white text-[10px] px-2 py-0.5 rounded-full">
                                                AR Ready
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-medium">{model.name}</h3>
                                            <p className="text-sm text-muted-foreground">{model.creator}</p>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center">
                                    <p className="text-muted-foreground">No AR models found.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Model Preview */}
                    <div>
                        {selectedModel ? (
                            <div className="sticky top-4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="aspect-video w-full bg-gray-100 dark:bg-gray-900 relative">
                                    <model-viewer
                                        src={selectedModel.src}
                                        poster={selectedModel.thumbnail}
                                        alt={selectedModel.name}
                                        shadow-intensity="1"
                                        camera-controls
                                        auto-rotate
                                        style={{ width: '100%', height: '100%' }}
                                    >
                                        <div className="absolute top-2 left-2 bg-black/40 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                            Interactive Preview
                                        </div>
                                    </model-viewer>
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-2">{selectedModel.name}</h2>
                                    <p className="text-sm text-muted-foreground mb-4">{selectedModel.description}</p>

                                    <div className="space-y-4">
                                        <Button
                                            className="w-full bg-artnexus-purple hover:bg-artnexus-purple/90"
                                            onClick={viewInAR}
                                        >
                                            View in AR
                                        </Button>

                                        <div className="p-3 bg-muted rounded-md text-xs text-muted-foreground flex gap-2">
                                            <Info className="h-4 w-4 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-medium mb-1">How to place in AR:</p>
                                                <ul className="list-disc pl-3 space-y-1">
                                                    <li>Click "View in AR" to open camera</li>
                                                    <li>Point at a flat surface (floor/table)</li>
                                                    <li>Move device slowly to detect planes</li>
                                                    <li>Tap to place the model</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="sticky top-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
                                <Smartphone className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">Select a Model</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Choose an AR-ready model to preview and place in your space.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ARGallery;
