import { getArtworkImage, getArtistImage } from '@/utils/imageUtils';

export interface Artist {
  id: string;
  name: string;
  profileImage: string;
  coverImage: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
  website?: string;
  social?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface Artwork {
  id: string;
  title: string;
  image: string;
  description: string;
  artistId: string;
  createdAt: string;
  likes: number;
  comments: number;
  categories: string[];
  dimensions?: string;
  medium?: string;
  price?: string;
  onSale?: boolean;
}

export interface Comment {
  id: string;
  artworkId: string;
  userId: string;
  userName: string;
  userImage: string;
  content: string;
  createdAt: string;
}

export const artists: Artist[] = [
  {
    id: "1",
    name: "Elena Rodriguez",
    profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=890&q=80",
    bio: "Contemporary artist exploring the intersection of digital and traditional media. My work reflects the harmony and chaos of urban environments.",
    location: "Barcelona, Spain",
    followers: 2478,
    following: 312,
    website: "elenaart.com",
    social: {
      instagram: "@elena_creates",
      twitter: "@elena_rodriguez",
    },
  },
  {
    id: "2",
    name: "Marcus Chen",
    profileImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    coverImage: "https://images.unsplash.com/photo-1551913902-c92207136625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=890&q=80",
    bio: "Abstract expressionist painter focusing on emotions through color and form. My paintings are a window into the subconscious mind.",
    location: "New York, USA",
    followers: 5121,
    following: 487,
    website: "marcuschen.art",
    social: {
      instagram: "@marcus_abstracts",
      facebook: "MarcusChenArt",
    },
  },
  {
    id: "3",
    name: "Aisha Patel",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    coverImage: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=890&q=80",
    bio: "Photographer and mixed media artist exploring cultural identity and displacement. My art is a dialogue between heritage and modernity.",
    location: "London, UK",
    followers: 3689,
    following: 521,
    social: {
      instagram: "@aisha_lens",
      twitter: "@aisha_creates",
    },
  },
  {
    id: "4",
    name: "Hiroshi Tanaka",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    coverImage: "https://images.unsplash.com/photo-1606819717115-9159c900370b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=890&q=80",
    bio: "Sculptor and installation artist exploring the relationship between space, light, and perception. My work invites viewers to experience familiar environments in new ways.",
    location: "Tokyo, Japan",
    followers: 4233,
    following: 198,
    website: "hiroshitanaka.co.jp",
    social: {
      instagram: "@hiroshi_sculptures",
    },
  },
  {
    id: "5",
    name: "Sophia Williams",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=890&q=80",
    bio: "Digital artist and animator creating immersive experiences that blend technology with traditional storytelling. My work explores themes of identity in the digital age.",
    location: "Berlin, Germany",
    followers: 3127,
    following: 287,
    website: "sophiawilliams.de",
    social: {
      instagram: "@sophia_digitalart",
      twitter: "@sophia_creates",
    },
  }
];

export const artworks: Artwork[] = Array.from({ length: 50 }, (_, i) => ({
  id: `artwork-${i + 1}`,
  title: [
    "Harmony in Blue", "Abstract Dreams", "Urban Vision", "Serenity",
    "Cosmic Journey", "Ethereal Light", "Vivid Memories", "Structural Patterns",
    "Whispering Nature", "Chromatic Symphony", "Tranquil Waters", "Digital Frontier",
    "Sculptural Form", "Interstellar Voyage", "Fluid Dynamics", "Geometric Reflections",
    "Radiant Perspective", "Textural Study", "Luminous Shadows", "Organic Cycles",
    "Prismatic Vision", "Dimensional Shift", "Celestial Rhythm", "Fragmented Reality",
    "Ephemeral Moment", "Vibrant Echo", "Synthetic Organism", "Crystal Formation",
    "Temporal Distortion", "Molecular Structure", "Quantum Field", "Liquid State",
    "Spatial Divide", "Infinite Horizon", "Neural Pattern", "Color Cascade",
    "Photonic Wave", "Gravitational Pull", "Spectral Analysis", "Dynamic Equilibrium",
    "Particle Dance", "Harmonic Convergence", "Fractal Dimension", "Tectonic Shift",
    "Nebula Formation", "Resonant Frequency", "Digital Abstraction", "Optical Illusion",
    "Suspended Animation", "Thermal Gradient"
  ][i % 50],
  description: "An exploration of form, color and emotion in a contemporary context.",
  image: getArtworkImage(i),
  artistId: `artist-${(i % 10) + 1}`,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  likes: Math.floor(Math.random() * 200),
  comments: Math.floor(Math.random() * 50),
  categories: [
    ["Abstract", "Contemporary", "Modern"],
    ["Portrait", "Figurative", "Realism"],
    ["Landscape", "Nature", "Impressionism"],
    ["Digital", "Generative", "Tech Art"],
    ["Sculpture", "3D", "Installation"],
    ["Photography", "Documentary", "Black & White"],
    ["Textile", "Fiber", "Woven"],
    ["Drawing", "Sketch", "Illustration"],
    ["Mixed Media", "Collage", "Assemblage"],
    ["Printmaking", "Woodcut", "Etching"]
  ][i % 10],
  medium: [
    "Oil on canvas", "Acrylic on canvas", "Digital", "Watercolor",
    "Mixed media", "Sculpture", "Photograph", "Drawing",
    "Installation", "Video", "Performance", "Textile",
    "Printmaking", "Ceramics", "Glass", "Metal"
  ][i % 16],
  dimensions: [
    "24 x 36 inches", "30 x 40 inches", "18 x 24 inches", "48 x 60 inches",
    "12 x 16 inches", "36 x 48 inches", "20 x 24 inches", "40 x 50 inches"
  ][i % 8],
  price: `$${(Math.floor(Math.random() * 50) + 5) * 100}`,
  onSale: Math.random() > 0.3
}));

export const comments: Comment[] = [
  {
    id: "1",
    artworkId: "1",
    userId: "user1",
    userName: "Sarah Johnson",
    userImage: "https://randomuser.me/api/portraits/women/32.jpg",
    content: "I love the use of color in this piece! The way you've captured the energy of the city is remarkable.",
    createdAt: "2023-11-10T14:32:00Z",
  },
  {
    id: "2",
    artworkId: "1",
    userId: "user2",
    userName: "David Chen",
    userImage: "https://randomuser.me/api/portraits/men/68.jpg",
    content: "The composition is so dynamic. I can feel the movement just by looking at it.",
    createdAt: "2023-11-11T09:15:00Z",
  },
  {
    id: "3",
    artworkId: "3",
    userId: "user3",
    userName: "Amelia Park",
    userImage: "https://randomuser.me/api/portraits/women/45.jpg",
    content: "The emotional depth in this piece is incredible. I find something new every time I look at it.",
    createdAt: "2023-11-15T16:48:00Z",
  },
];

export const categories = [
  "Abstract",
  "Portraits",
  "Landscape",
  "Urban",
  "Surrealism",
  "Digital",
  "Photography",
  "Installation",
  "Expressionism",
  "Conceptual",
  "Minimalism",
  "Mixed Media",
  "Sculpture",
  "Illustration",
  "Street Art",
  "Painting",
  "Sculpture",
  "Digital Art",
  "Photography",
  "Mixed Media",
  "Drawing",
  "Printmaking",
  "Textile",
];

export const getArtistById = (id: string): Artist | undefined => {
  return artists.find(artist => artist.id === id);
};

export const getArtworkById = (id: string): Artwork | undefined => {
  return artworks.find(artwork => artwork.id === id);
};

export const getArtworksByArtist = (artistId: string): Artwork[] => {
  return artworks.filter(artwork => artwork.artistId === artistId);
};

export const getCommentsByArtwork = (artworkId: string): Comment[] => {
  return comments.filter(comment => comment.artworkId === artworkId);
};

export const getArtworksByCategory = (category: string): Artwork[] => {
  return artworks.filter(artwork => artwork.categories.includes(category));
};

export const getArtworksByCategories = (categories: string[]): Artwork[] => {
  if (categories.length === 0) return artworks;
  return artworks.filter(artwork => 
    categories.some(category => artwork.categories.includes(category))
  );
};

export const getRecommendedArtworks = (artworkId: string, limit: number = 4): Artwork[] => {
  const artwork = getArtworkById(artworkId);
  if (!artwork) return [];
  
  const similar = artworks
    .filter(a => a.id !== artworkId && a.categories.some(cat => artwork.categories.includes(cat)))
    .sort((a, b) => {
      const aMatches = a.categories.filter(cat => artwork.categories.includes(cat)).length;
      const bMatches = b.categories.filter(cat => artwork.categories.includes(cat)).length;
      return bMatches - aMatches;
    })
    .slice(0, limit);
    
  return similar;
};

export const getMoreArtworks = (count: number = 50): Artwork[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `extended-artwork-${i + 1}`,
    title: [
      "Spectral Harmony", "Textural Resonance", "Geometric Abstraction", "Botanical Study",
      "Kinetic Movement", "Circular Reasoning", "Linear Progression", "Vibrational Field",
      "Horizon Line", "Chromatic Flow", "Digital Dream", "Organic Mutation",
      "Crystalline Structure", "Fluid Motion", "Recursive Pattern", "Spatial Tension",
      "Ambient Light", "Reflective Surface", "Transparent Layer", "Opaque Form",
      "Gravitational Force", "Magnetic Pull", "Electric Current", "Thermal Gradient",
      "Wave Function", "Particle System", "Molecular Bond", "Atomic Resonance",
      "Quantum Matrix", "Cosmic Dust", "Solar Flare", "Lunar Cycle",
      "Oceanic Current", "Mountain Range", "Forest Density", "Desert Expanse",
      "Urban Grid", "Rural Landscape", "Industrial Complex", "Architectural Detail",
      "Human Form", "Animal Motion", "Botanical Growth", "Geological Formation",
      "Weather System", "Climate Shift", "Seasonal Change", "Temporal Distortion",
      "Memory Fragment", "Emotional Response", "Cognitive Process", "Sensory Input"
    ][i % 50],
    description: "A contemporary exploration of form and space through artistic expression.",
    image: getArtworkImage(i + 50),
    artistId: `artist-${(i % 10) + 1}`,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    likes: Math.floor(Math.random() * 200),
    comments: Math.floor(Math.random() * 50),
    categories: [
      ["Abstract", "Contemporary", "Modern"],
      ["Portrait", "Figurative", "Realism"],
      ["Landscape", "Nature", "Impressionism"],
      ["Digital", "Generative", "Tech Art"],
      ["Sculpture", "3D", "Installation"],
      ["Photography", "Documentary", "Black & White"],
      ["Textile", "Fiber", "Woven"],
      ["Drawing", "Sketch", "Illustration"],
      ["Mixed Media", "Collage", "Assemblage"],
      ["Printmaking", "Woodcut", "Etching"]
    ][i % 10],
    medium: [
      "Oil on canvas", "Acrylic on canvas", "Digital", "Watercolor",
      "Mixed media", "Sculpture", "Photograph", "Drawing",
      "Installation", "Video", "Performance", "Textile",
      "Printmaking", "Ceramics", "Glass", "Metal"
    ][i % 16],
    dimensions: [
      "24 x 36 inches", "30 x 40 inches", "18 x 24 inches", "48 x 60 inches",
      "12 x 16 inches", "36 x 48 inches", "20 x 24 inches", "40 x 50 inches"
    ][i % 8],
    price: `$${(Math.floor(Math.random() * 50) + 5) * 100}`,
    onSale: Math.random() > 0.3
  }));
};

export const extendedArtists = Array.from({ length: 40 }, (_, i) => ({
  id: `extended-artist-${i + 1}`,
  name: [
    "Emma Gallagher", "Marcus Chen", "Sophia Rodriguez", "Jamal Williams", 
    "Olivia Kim", "Alejandro Paz", "Priya Patel", "Liam O'Connor",
    "Zoe Nakamura", "Andre Johnson", "Isabella Moreno", "Gabriel Wong",
    "Mia Thompson", "Ravi Sharma", "Camille Laurent", "Dante Rossi",
    "Nina Petrov", "Tao Lin", "Amara Okafor", "Mateo Suarez",
    "Freya Andersson", "Jun Tanaka", "Leila Al-Fahim", "Diego Mendoza",
    "Yuna Park", "Omar Hassan", "Ava Sinclair", "Kai Matsumoto",
    "Nora Reyes", "Eli Cohen", "Chiara Bianchi", "Xavier Dubois",
    "Anika Gupta", "Santiago Cruz", "Mei-Ling Wu", "Leo van der Berg",
    "Aisha Rahman", "Felix Nielsen", "Valentina Romano", "Theo Adeyemi"
  ][i % 40],
  profileImage: getArtistImage(i),
  bio: "Contemporary artist exploring the boundaries between digital and physical realms through innovative techniques and materials.",
  location: [
    "New York, USA", "London, UK", "Tokyo, Japan", "Paris, France",
    "Berlin, Germany", "Barcelona, Spain", "Melbourne, Australia", "Toronto, Canada",
    "Seoul, South Korea", "Cape Town, South Africa", "Mexico City, Mexico", "Mumbai, India",
    "Dubai, UAE", "Stockholm, Sweden", "São Paulo, Brazil", "Amsterdam, Netherlands"
  ][i % 16],
  website: `https://artist-portfolio-${i}.com`,
  social: {
    instagram: `@artist${i}`,
    twitter: `@artist${i}`,
    facebook: `artist.${i}`
  },
  followers: Math.floor(Math.random() * 50000),
  artworks: Math.floor(Math.random() * 100) + 10
}));

export const getAllArtworks = () => {
  return [...artworks, ...getMoreArtworks(100)];
};

export const getAllArtists = () => {
  return [...artists, ...extendedArtists];
};
