import Link from "next/link";
import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowDownRight, ArrowUpRight, Camera, Compass, Footprints } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const interests = [
  { number: "01", icon: Camera, title: "Look closer", description: "Wildlife, tiny details, and the lives unfolding just beyond our usual field of view." },
  { number: "02", icon: Compass, title: "Take the long way", description: "New trails, unfamiliar places, changing light, and the surprises in between." },
  { number: "03", icon: Footprints, title: "Leave room for wonder", description: "Photographs and notes made to remember a feeling, not just a destination." },
];

export function AboutSection() {
  const portraitPath = join(process.cwd(), "public", "images", "arun-portrait.png");
  const hasPortrait = existsSync(portraitPath);

  return (
    <section id="about" className="overflow-hidden bg-[#191a16] px-6 py-24 text-[#f4f1e9] sm:px-12 sm:py-32 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <p className="eyebrow text-[#b5b9a4]">A LITTLE ABOUT THE OBSERVER</p>
              <h2 className="display mt-8 max-w-4xl text-6xl leading-[.94] sm:text-7xl lg:text-[6.5rem]">
                I don’t just want to see the world.
                <span className="mt-2 block italic text-[#b5b9a4]">I want to notice it.</span>
              </h2>
            </div>
            <div className="md:col-span-5 md:pt-16">
              <div className="grid gap-7 sm:grid-cols-[minmax(0,1fr)_minmax(150px,0.72fr)] sm:items-start md:grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(150px,0.72fr)]">
                <div>
                  <p className="text-lg leading-8 text-[#e0ded5] sm:text-xl">
                    Hey, I’m Arun — a curious wanderer with a camera, drawn to wild places, small creatures, mountain air, and the stories a journey leaves behind.
                  </p>
                  <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">
                    This journal is my way of slowing down and paying attention. Some days that means following a trail; other days, it means staying still long enough to notice what was there all along.
                  </p>
                </div>

                <figure className="relative w-full max-w-[260px] sm:justify-self-end md:mt-8 md:max-w-[220px] lg:mt-0">
                  <div className="absolute -right-2 -top-2 h-full w-full border border-[#b5b9a4]/50" aria-hidden="true" />
                  <div className="relative aspect-[4/5] overflow-hidden bg-white/[0.06]">
                    {hasPortrait ? (
                      <Image
                        src="/images/arun-portrait.png"
                        alt="Portrait of Arun"
                        fill
                        sizes="(max-width: 640px) 70vw, 220px"
                        className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center px-5 text-center">
                        <Camera size={25} strokeWidth={1.2} className="text-[#b5b9a4]" />
                        <span className="eyebrow mt-4 text-[#b5b9a4]">YOUR PORTRAIT</span>
                        <span className="mt-2 text-xs leading-5 text-white/45">Add your photo to<br />public/images/arun-portrait.jpg</span>
                      </div>
                    )}
                  </div>
                  <figcaption className="mt-3 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.18em] text-white/45">
                    <span>Behind the lens</span>
                    <span>Arun · 01</span>
                  </figcaption>
                </figure>
              </div>

              <Link href="/stories" className="mt-8 inline-block w-fit border-b border-[#b5b9a4]/70 pb-3 text-sm text-[#f4f1e9] transition-colors hover:text-[#b5b9a4]">
                Get to know the journeys <ArrowUpRight className="ml-3 inline" size={16} />
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid border-t border-white/15 sm:grid-cols-3">
          {interests.map(({ number, icon: Icon, title, description }, index) => (
            <Reveal key={number} delay={index * 0.1} className="border-b border-white/15 py-7 sm:border-b-0 sm:border-r sm:px-6 sm:py-8 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-white/45">{number} / NOTE TO SELF</span>
                <Icon size={18} strokeWidth={1.4} className="text-[#b5b9a4]" />
              </div>
              <h3 className="display mt-8 text-3xl sm:text-4xl">{title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">{description}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col justify-between gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-end">
            <p className="display max-w-2xl text-3xl leading-tight text-white/75 sm:text-4xl">
              The best stories start with <span className="italic text-[#b5b9a4]">a little curiosity.</span>
            </p>
            <Link href="/photography" className="editorial-link w-fit border-white/60 text-[#f4f1e9]">
              Explore my photographs <ArrowDownRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
