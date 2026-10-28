export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  category: string;
  image: string;
  imageAlt: string;
  storyHref: string;
};

export const demoSlides: HeroSlide[] = [
  {
    id: "western-ghats",
    title: "Into the wild.",
    subtitle: "Where the mountains breathe and the world slows down.",
    location: "Western Ghats, India",
    category: "LANDSCAPES",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=88",
    imageAlt: "Mountain peaks rising above a dramatic landscape",
    storyHref: "/stories"
  },
  {
    id: "forest-light",
    title: "A world untamed.",
    subtitle: "Quiet encounters with the natural world.",
    location: "Into the wilderness",
    category: "WILDLIFE",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=88",
    imageAlt: "Sunlight falling through a deep green forest",
    storyHref: "/photography"
  },
  {
    id: "the-journey",
    title: "Beyond the trail.",
    subtitle: "Some places stay with us long after we leave.",
    location: "The open road",
    category: "TRAVEL",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=2400&q=88",
    imageAlt: "Wild deer in a natural landscape",
    storyHref: "/stories"
  },
  {
    id: "still-water",
    title: "Find the silence.",
    subtitle: "A little further away from everything familiar.",
    location: "The great outdoors",
    category: "FIELD NOTES",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2400&q=88",
    imageAlt: "Still alpine lake surrounded by mountains",
    storyHref: "/stories"
  }
];
