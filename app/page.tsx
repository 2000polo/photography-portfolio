import HeroSlider from "@/components/home/hero-slider";
import { FeaturedStories, IntroSection } from "@/components/home/intro-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { getFeaturedStories, getHeroSlides } from "@/sanity/lib/data";
import { urlForImage } from "@/sanity/lib/image";

export default async function HomePage() {
  const [heroDocuments, stories] = await Promise.all([getHeroSlides(), getFeaturedStories()]);
  const slides = heroDocuments.map((slide) => ({
    id: slide._id,
    title: slide.title,
    subtitle: slide.subtitle || "A closer look at the natural world and the journeys that bring us to it.",
    location: slide.location || "Somewhere in the wild",
    category: slide.category || "FIELD NOTES",
    image: urlForImage(slide.image).width(2400).quality(88).url(),
    imageAlt: slide.imageAlt,
    storyHref: slide.storyHref || "/stories",
  }));
  return (
    <main id="top">
      <HeroSlider slides={slides.length ? slides : undefined} />
      <IntroSection />
      <section className="bg-[#f4f1e9] px-6 pb-24 sm:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 border-t border-black/15 pt-8 md:grid-cols-12">
          <p className="eyebrow text-[#77786d] md:col-span-3">SELECTED WORK</p>
          <div className="md:col-span-9">
            <h2 className="display max-w-4xl text-5xl leading-tight sm:text-6xl">
              A collection of places, encounters, and untold stories.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#65655d]">
              The portfolio is growing. Browse the journal to explore the images and stories collected along the way.
            </p>
          </div>
        </div>
      </section>
      <FeaturedStories stories={stories} />
      <section className="bg-[#f4f1e9] px-6 py-24 sm:px-12 sm:py-32 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <p className="eyebrow text-[#77786d]">BEHIND THE LENS</p>
            <h2 className="display mt-5 text-5xl leading-[1.02] sm:text-7xl">
              Not just where I went.
              <br /><span className="italic text-[#777d68]">What I found there.</span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-sm leading-7 text-[#65655d] sm:text-base">
              I’m building a visual record of the natural world and the journeys that bring us closer to it. This is a space for photographs with context, places with character, and stories worth keeping.
            </p>
            <a href="mailto:hello@arunpaul.photo" className="editorial-link mt-7">Editorial & licensing enquiries ↗</a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
