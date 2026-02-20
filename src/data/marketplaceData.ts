export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  type: "original" | "print" | "digital";
  status: "available" | "sold" | "reserved";
  artist: {
    id: string;
    name: string;
    photo: string;
  };
  medium: string;
  dimensions?: string;
  year: string;
  category: string;
}

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: "item-1",
    title: "Serenity in Blue",
    description: "An abstract expressionist painting exploring themes of tranquility and introspection through shades of blue and subtle textures.",
    image: "https://www.dailyartmagazine.com/wp-content/uploads/2021/12/Ed-Wheeler_Starry-Night-e1669811289339-768x518.jpg",
    price: "₹207,500",
    type: "original",
    status: "available",
    artist: {
      id: "artist-1",
      name: "Elena Rodriguez",
      photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Oil on canvas",
    dimensions: "36 × 48 inches",
    year: "2023",
    category: "painting"
  },
  {
    id: "item-2",
    title: "Urban Reflections",
    description: "A contemporary photograph capturing the interplay of light and architecture in an urban landscape, printed on premium archival paper.",
    image: "https://images.unsplash.com/photo-1514924801778-1db0aba75e9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    price: "₹70,550",
    type: "print",
    status: "available",
    artist: {
      id: "artist-2",
      name: "James Wilson",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Archival pigment print",
    dimensions: "24 × 36 inches",
    year: "2022",
    category: "photography"
  },
  {
    id: "item-3",
    title: "Digital Dreamscape",
    description: "A surreal digital illustration that blends organic and mechanical elements to create a dreamlike landscape of imagination.",
    image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    price: "₹29,050",
    type: "digital",
    status: "available",
    artist: {
      id: "artist-3",
      name: "Sophia Lee",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Digital art",
    year: "2023",
    category: "digital"
  },
  {
    id: "item-4",
    title: "Emergence",
    description: "A sculptural piece exploring themes of growth and transformation through the interplay of bronze and negative space.",
    image: "https://as2.ftcdn.net/v2/jpg/03/45/71/43/1000_F_345714376_WMLWkglvYuWEGpHFfrh8hbLX0jUSTJrp.jpg ",
    price: "₹315,400",
    type: "original",
    status: "available",
    artist: {
      id: "artist-4",
      name: "Marcus Chen",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Bronze",
    dimensions: "18 × 12 × 8 inches",
    year: "2022",
    category: "sculpture"
  },
  {
    id: "item-5",
    title: "Golden Hour",
    description: "A vibrant landscape capturing the magical light of sunset over rolling hills, painted with expressive brushwork and warm colors.",
    image: "https://as2.ftcdn.net/v2/jpg/01/51/73/99/1000_F_151739953_JPPanj2yWJKzb30lSYHwyvaG2TFqggDq.jpg",
    price: "₹145,250",
    type: "original",
    status: "available",
    artist: {
      id: "artist-1",
      name: "Elena Rodriguez",
      photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Acrylic on canvas",
    dimensions: "30 × 40 inches",
    year: "2022",
    category: "painting"
  },
  {
    id: "item-6",
    title: "Textural Study #7",
    description: "A mixed media piece exploring textures and patterns found in nature, combining handmade paper, natural fibers, and subtle pigments.",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    price: "₹99,600",
    type: "original",
    status: "available",
    artist: {
      id: "artist-5",
      name: "Olivia Parker",
      photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Mixed media on panel",
    dimensions: "24 × 24 inches",
    year: "2023",
    category: "mixed-media"
  },
  {
    id: "item-7",
    title: "Chromatic Symphony",
    description: "A bold abstract painting exploring the relationships between colors and forms, creating a dynamic visual rhythm across the canvas.",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    price: "₹265,600",
    type: "original",
    status: "available",
    artist: {
      id: "artist-6",
      name: "David Hernandez",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Oil and acrylic on canvas",
    dimensions: "48 × 60 inches",
    year: "2023",
    category: "painting"
  },
  {
    id: "item-8",
    title: "Veiled Reflections",
    description: "A hauntingly beautiful portrait that uses translucent layers to create a sense of depth and mystery, inviting viewers to look beyond the surface.",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    price: "₹232,400",
    type: "original",
    status: "available",
    artist: {
      id: "artist-7",
      name: "Amara Johnson",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Oil on linen",
    dimensions: "30 × 40 inches",
    year: "2022",
    category: "painting"
  },
  {
    id: "item-9",
    title: "Urban Wilderness",
    description: "A series of street photography capturing unexpected moments of nature reclaiming urban spaces, printed as a limited edition collection.",
    image: "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    price: "₹91,300",
    type: "print",
    status: "available",
    artist: {
      id: "artist-2",
      name: "James Wilson",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Archival pigment print",
    dimensions: "20 × 30 inches (set of 3)",
    year: "2023",
    category: "photography"
  },
  {
    id: "item-10",
    title: "Quantum Fragments",
    description: "A digital artwork exploring the intersection of quantum physics and visual art, rendered with cutting-edge algorithms and printed on metal.",
    image: "https://as1.ftcdn.net/v2/jpg/02/73/19/68/1000_F_273196818_1G0xad8eq4WrN0huhxUhS45v1yuJusYm.jpg",
    price: "₹78,850",
    type: "digital",
    status: "available",
    artist: {
      id: "artist-8",
      name: "Ray Zhang",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Digital art printed on aluminum",
    dimensions: "36 × 36 inches",
    year: "2023",
    category: "digital"
  },
  {
    id: "item-11",
    title: "Ethereal Garden",
    description: "A delicate watercolor series depicting imaginary botanical specimens that blend reality and fantasy, exploring the beauty of the natural world.",
    image: "https://as1.ftcdn.net/v2/jpg/02/73/19/68/1000_F_273196818_1G0xad8eq4WrN0huhxUhS45v1yuJusYm.jpg ",
    price: "₹116,200",
    type: "original",
    status: "available",
    artist: {
      id: "artist-9",
      name: "Lila Patel",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Watercolor on paper",
    dimensions: "18 × 24 inches (set of 3)",
    year: "2022",
    category: "painting"
  },
  {
    id: "item-12",
    title: "Tectonic Forces",
    description: "A monumental ceramic sculpture inspired by geological formations and tectonic plate movements, glazed with earth tones and metallic finishes.",
    image: "https://as2.ftcdn.net/v2/jpg/03/01/30/71/1000_F_301307179_iuQ5eoVL8HR01HDdZYmBcxIyKUyCb9kA.jpg",
    price: "₹373,500",
    type: "original",
    status: "available",
    artist: {
      id: "artist-10",
      name: "Hiroshi Tanaka",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Stoneware ceramic with custom glazes",
    dimensions: "24 × 18 × 16 inches",
    year: "2023",
    category: "sculpture"
  },
  {
    id: "item-13",
    title: "Nocturnal Reverie",
    description: "A moody nightscape painted with deep blues and purples, capturing the mysterious atmosphere of twilight and the emotions it evokes.",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    price: "₹153,550",
    type: "original",
    status: "available",
    artist: {
      id: "artist-1",
      name: "Elena Rodriguez",
      photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Oil on canvas",
    dimensions: "36 × 48 inches",
    year: "2023",
    category: "painting"
  },
  {
    id: "item-14",
    title: "Kaleidoscopic Dreams",
    description: "A vibrant digital artwork inspired by the patterns and symmetries of kaleidoscopes, exploring the boundaries between chaos and order.",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    price: "₹53,950",
    type: "digital",
    status: "available",
    artist: {
      id: "artist-3",
      name: "Sophia Lee",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Digital art",
    year: "2023",
    category: "digital"
  },
  {
    id: "item-15",
    title: "Memory Traces",
    description: "A mixed media collage incorporating personal photographs, vintage ephemera, and abstract painting elements to explore themes of memory and time.",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    price: "₹132,800",
    type: "original",
    status: "available",
    artist: {
      id: "artist-5",
      name: "Olivia Parker",
      photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Mixed media collage on panel",
    dimensions: "24 × 36 inches",
    year: "2022",
    category: "mixed-media"
  },
  {
    id: "item-16",
    title: "Architectural Abstractions",
    description: "A series of minimalist black and white photographs exploring the geometric patterns and forms found in modern architecture.",
    image: "https://as1.ftcdn.net/v2/jpg/06/12/86/78/1000_F_612867815_qY5wXoC3xGe49yyGa9j7TNtv2ioK4DnI.jpg",
    price: "₹74,700",
    type: "print",
    status: "available",
    artist: {
      id: "artist-2",
      name: "James Wilson",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Silver gelatin print",
    dimensions: "16 × 20 inches (set of 4)",
    year: "2023",
    category: "photography"
  },
  {
    id: "item-17",
    title: "Cybernetic Landscape",
    description: "A futuristic digital artwork exploring the intersection of technology and nature, rendered in neon colors and geometric patterns.",
    image: "https://as2.ftcdn.net/v2/jpg/01/33/94/81/1000_F_133948127_PCGut1Bi3fu27nvRpMSLQ7N02HTsm1A2.jpg",
    price: "₹62,250",
    type: "digital",
    status: "available",
    artist: {
      id: "artist-3",
      name: "Sophia Lee",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Digital art",
    year: "2023",
    category: "digital"
  },
  {
    id: "item-18",
    title: "Urban Canvas",
    description: "A street art inspired piece capturing the energy and rhythm of city life through bold strokes and vivid colors.",
    image: "https://images.unsplash.com/photo-1523554888454-84137e72c3ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    price: "₹149,400",
    type: "original",
    status: "available",
    artist: {
      id: "artist-11",
      name: "Marco Rivera",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Mixed media on canvas",
    dimensions: "48 × 36 inches",
    year: "2022",
    category: "mixed-media"
  },
  {
    id: "item-19",
    title: "Monochrome Study",
    description: "A series of minimalist black and white photographs exploring textures and shadows in everyday objects.",
    image: "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    price: "₹78,850",
    type: "print",
    status: "available",
    artist: {
      id: "artist-2",
      name: "James Wilson",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Silver gelatin print",
    dimensions: "20 × 16 inches (set of 3)",
    year: "2023",
    category: "photography"
  },
  {
    id: "item-20",
    title: "Terra Forma",
    description: "A ceramic sculpture inspired by geological formations and ancient earthworks, glazed in earth tones and metallic accents.",
    image: "https://as1.ftcdn.net/v2/jpg/01/40/47/42/1000_F_140474254_8xWO8gem5DqbiKrGkOhghLI1MlDyoSRm.jpg",
    price: "₹199,200",
    type: "original",
    status: "available",
    artist: {
      id: "artist-10",
      name: "Hiroshi Tanaka",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Stoneware ceramic",
    dimensions: "18 × 16 × 14 inches",
    year: "2023",
    category: "sculpture"
  },
  {
    id: "item-21",
    title: "Quantum Entanglement",
    description: "An abstract digital artwork visualizing quantum physics concepts through fractal patterns and vibrant color interactions.",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    price: "₹48,140",
    type: "digital",
    status: "available",
    artist: {
      id: "artist-8",
      name: "Ray Zhang",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Digital art",
    year: "2023",
    category: "digital"
  },
  {
    id: "item-22",
    title: "Coastal Memories",
    description: "A series of impressionistic watercolors capturing the light and atmosphere of coastal landscapes at different times of day.",
    image: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    price: "₹99,600",
    type: "original",
    status: "available",
    artist: {
      id: "artist-9",
      name: "Lila Patel",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Watercolor on paper",
    dimensions: "15 × 11 inches (set of 4)",
    year: "2022",
    category: "painting"
  },
  {
    id: "item-23",
    title: "Industrial Evolution",
    description: "A large-scale sculpture constructed from reclaimed industrial materials, commenting on the relationship between humanity and technology.",
    image: "https://as1.ftcdn.net/v2/jpg/05/65/58/20/1000_F_565582008_x9FxYg5EBvUgOYZgruWI9sH25AKLYvuR.jpg",
    price: "₹315,400",
    type: "original",
    status: "available",
    artist: {
      id: "artist-4",
      name: "Marcus Chen",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Mixed media sculpture",
    dimensions: "30 × 22 × 18 inches",
    year: "2023",
    category: "sculpture"
  },
  {
    id: "item-24",
    title: "Dreamscape Portal",
    description: "A surreal digital collage blending photography and digital painting to create a portal to imaginary worlds and states of consciousness.",
    image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    price: "₹57,270",
    type: "digital",
    status: "available",
    artist: {
      id: "artist-3",
      name: "Sophia Lee",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    medium: "Digital art",
    year: "2023",
    category: "digital"
  }
];
