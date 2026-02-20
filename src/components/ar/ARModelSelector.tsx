
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Box, Package, Info, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { toast } from "sonner";

export interface ARModel {
  id: string;
  name: string;
  src: string;
  thumbnail: string;
  description: string;
  creator: string;
  sketchfabId?: string;
}

export interface ARModelSelectorProps {
  models: ARModel[];
  selectedModel: ARModel;
  onModelChange: (model: ARModel) => void;
}

export const MODEL_OPTIONS: ARModel[] = [
  {
    id: '1',
    name: 'Madonna Sculpture',
    src: 'https://sketchfab.com/models/5e16f3cd478e4c8cb32dede7446a83fb/embed?autostart=1&ui_hint=0&autospin=1&preload=1&transparent=1',
    thumbnail: 'https://images.unsplash.com/photo-1569292560006-92ee85635959?auto=format&fit=crop&w=150&q=80',
    description: 'A detailed Madonna sculpture with intricate details',
    creator: 'jan.zachar',
    sketchfabId: '5e16f3cd478e4c8cb32dede7446a83fb'
  },
  {
    id: '2',
    name: 'Greek Antique Vase',
    src: 'https://sketchfab.com/models/94d1b11f5397484990f8a56e4df191b9/embed?autostart=1&ui_hint=0&autospin=1&preload=1&transparent=1',
    thumbnail: 'https://images.unsplash.com/photo-1580974852861-c381510bc98a?auto=format&fit=crop&w=150&q=80',
    description: 'Ancient Greek pottery vase with traditional patterns',
    creator: 'Tavernier Amaury',
    sketchfabId: '94d1b11f5397484990f8a56e4df191b9'
  },
  {
    id: '3',
    name: 'Victorian Framed Painting',
    src: 'https://sketchfab.com/models/b2895c1c3b42401a949deac049e0051d/embed?autostart=1&ui_hint=0&autospin=1&preload=1&transparent=1',
    thumbnail: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=150&q=80',
    description: 'PBR Game Ready Victorian era framed painting with ornate gold frame',
    creator: 'Matthew Collings',
    sketchfabId: 'b2895c1c3b42401a949deac049e0051d'
  },
  {
    id: '4',
    name: 'Blind Ambition',
    src: '/models/painting_-_digital_art_-_blind_ambition.glb',
    thumbnail: '/models/blind_ambition_img.png',
    description: 'Digital art painting titled Blind Ambition',
    creator: 'Unknown',
    sketchfabId: ''
  },
  {
    id: '5',
    name: 'Beksinski Painting',
    src: '/models/painting_by_zdzislaw_beksinski_4.glb',
    thumbnail: '/models/beksinki_painting_img.png',
    description: 'Surrealist painting by Zdzisław Beksiński',
    creator: 'Zdzisław Beksiński',
    sketchfabId: ''
  },
  {
    id: '6',
    name: 'Art Frame',
    src: '/models/art_frame.glb',
    thumbnail: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=150&q=80',
    description: 'A decorative art frame',
    creator: 'rigart',
    sketchfabId: 'ec04d1c7db2e442e89e243f4b39d458c'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const ARModelSelector = ({ models, selectedModel, onModelChange }: ARModelSelectorProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'featured' | 'all'>('featured');

  const featuredModels = models.slice(0, 6);
  const allModels = models;

  const openSketchfabPage = (e: React.MouseEvent, sketchfabId?: string) => {
    e.stopPropagation();
    if (sketchfabId) {
      window.open(`https://sketchfab.com/3d-models/${sketchfabId}`, '_blank');
    }
  };

  const handleTryWebXR = () => {
    toast.success("Opening WebXR Experience", {
      description: "Get ready to interact with 3D models in augmented reality",
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="flex justify-between items-center mb-5">
        <motion.h3
          className="text-lg font-medium flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Package className="h-5 w-5 mr-2 text-primary" />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">3D Model Gallery</span>
        </motion.h3>
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs flex items-center"
            >
              <Info className="h-3 w-3 mr-1" />
              {showDetails ? 'Hide details' : 'Show details'}
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="text-xs flex items-center border-dashed bg-gradient-to-r from-primary/10 to-secondary/10 hover:bg-primary/20 transition-all duration-300"
              asChild
            >
              <Link to="/ar-webxr" onClick={handleTryWebXR}>
                <Box className="h-3 w-3 mr-1" />
                Try WebXR Experience
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as 'featured' | 'all')}
        className="mb-4"
      >
        <TabsList className="w-full bg-gray-100/80 dark:bg-gray-800/80 p-1 rounded-lg">
          <TabsTrigger value="featured" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md data-[state=active]:shadow-sm transition-all">Featured Models</TabsTrigger>
          <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md data-[state=active]:shadow-sm transition-all">All Models</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="mt-4">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {featuredModels.map(model => (
              <motion.div key={model.id} variants={itemVariants}>
                <ModelCard
                  model={model}
                  isSelected={selectedModel.id === model.id}
                  showDetails={showDetails}
                  onSelect={() => onModelChange(model)}
                  onOpenSketchfab={(e) => openSketchfabPage(e, model.sketchfabId)}
                />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="all" className="mt-4">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {allModels.map(model => (
              <motion.div key={model.id} variants={itemVariants}>
                <ModelCard
                  model={model}
                  isSelected={selectedModel.id === model.id}
                  showDetails={showDetails}
                  onSelect={() => onModelChange(model)}
                  onOpenSketchfab={(e) => openSketchfabPage(e, model.sketchfabId)}
                />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

interface ModelCardProps {
  model: ARModel;
  isSelected: boolean;
  showDetails: boolean;
  onSelect: () => void;
  onOpenSketchfab: (e: React.MouseEvent) => void;
}

const ModelCard = ({ model, isSelected, showDetails, onSelect, onOpenSketchfab }: ModelCardProps) => {
  return (
    <motion.div
      className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${isSelected
        ? 'ring-2 ring-primary shadow-lg shadow-primary/20'
        : 'hover:border-primary hover:shadow-md'
        }`}
      onClick={onSelect}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="aspect-square relative group">
        <img
          src={model.thumbnail}
          alt={model.name}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 h-7 w-7 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onOpenSketchfab}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-3">
        <p className="text-sm font-medium">{model.name}</p>
        <p className="text-xs text-muted-foreground truncate">{model.creator}</p>

        {showDetails && isSelected && (
          <motion.div
            className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-muted-foreground">{model.description}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ARModelSelector;
