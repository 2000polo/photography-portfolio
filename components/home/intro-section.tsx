import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function IntroSection() {
  return (
    <section id="discover" className="bg-[#f4f1e9] px-6 py-24 sm:px-12 sm:py-36 lg:px-20">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-7">
          <p className="eyebrow mb-6 text-[#77786d]">A PHOTOGRAPHIC JOURNAL</p>
          <h2 className="display max-w-3xl text-6xl leading-[.98] sm:text-7xl lg:text-8xl">
            The world is vast.
            <br />
            <span className="italic text-[#777d68]">Stay curious.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="md:col-span-5 md:pb-2">
          <p className="max-w-lg text-sm leading-7 text-[#65655d] sm:text-base">
            A growing collection of journeys, wildlife encounters, distant landscapes,
            and the quiet moments in between. Stories told through photographs,
            one journey at a time.
          </p>
          <Link href="/photography" className="editorial-link mt-8">
            Discover the photographs <ArrowDownRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function FeaturedStories() {
  const stories = [
    {
      number: "01",
      category: "FIELD NOTES",
      title: "Learning to look closer",
      description: "Small details, quiet encounters, and the practice of paying attention.",
      href: "/stories",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1300&q=85",
      alt: "Sunlight filtering through forest trees"
    },
    {
      number: "02",
      category: "TRAVEL JOURNAL",
      title: "The long way around",
      description: "A collection of moments from roads that were never just about the destination.",
      href: "/stories",
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1300&q=85",
      alt: "Mountain lake beneath a cloudy sky"
    }
  ];

  return (
    <section className="bg-[#eae6dc] px-6 py-24 sm:px-12 sm:py-32 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-[#77786d]">NOTES FROM THE ROAD</p>
              <h2 className="display mt-4 text-5xl sm:text-6xl">Every image has a story.</h2>
            </div>
            <Link href="/stories" className="editorial-link w-fit">All stories <ArrowUpRight size={15} /></Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
          {stories.map((story, index) => (
            <Reveal key={story.number} delay={index * 0.12}>
              <Link href={story.href} className="group block">
                <div className="relative aspect-[5/4] overflow-hidden bg-[#d8d4ca]">
                  {/* Remote images are used as decorative story placeholders. */}
                  <div
                    role="img"
                    aria-label={story.alt}
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.035]"
                    style={{ backgroundImage: `url("${story.image}")` }}
                  />
                  <span className="absolute left-4 top-4 border border-white/60 px-3 py-2 text-[9px] tracking-[.18em] text-white">{story.number}</span>
                </div>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="eyebrow text-[#77786d]">{story.category}</p>
                  <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <h3 className="display mt-3 text-4xl sm:text-5xl">{story.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-[#65655d]">{story.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
