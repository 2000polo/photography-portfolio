import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { urlForImage } from "@/sanity/lib/image";
import type { PhotographDocument } from "@/sanity/lib/types";

export function FieldworkSection({ photographs }: { photographs: PhotographDocument[] }) {
  const selections = photographs.filter((photo) => photo.image?.asset).slice(0, 3);

  return (
    <section className="overflow-hidden bg-[#eae6dc] px-6 py-20 sm:px-12 sm:py-28 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 grid gap-6 border-t border-black/15 pt-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="eyebrow text-[#77786d]">A FEW FRAMES FROM THE FIELD</p>
              <h2 className="display mt-4 max-w-3xl text-5xl leading-[.98] sm:text-6xl lg:text-7xl">
                Small wonders. <span className="italic text-[#777d68]">Wild places.</span>
              </h2>
            </div>
            <div className="md:col-span-5 md:justify-self-end">
              <p className="max-w-sm text-sm leading-7 text-[#65655d]">
                The moments that make you stop, look closer, and remember why being out there matters.
              </p>
              <Link href="/photography" className="editorial-link mt-5">
                Explore the field archive <ArrowDownRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>

        {selections.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-12">
            {selections[0] && (
              <Reveal className="md:col-span-7">
                <Link href="/photography" className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#d5d0c4] sm:aspect-[5/4]">
                    <Image
                      src={urlForImage(selections[0].image).width(1500).quality(88).url()}
                      alt={selections[0].alt || selections[0].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 58vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute left-4 top-4 border border-white/65 px-3 py-2 text-[9px] tracking-[.2em] text-white">01 / FIELD FRAME</span>
                    <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border border-white/65 text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#191a16]"><ArrowUpRight size={17} /></span>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow flex items-center gap-2 text-[#77786d]">
                        {selections[0].location ? <><MapPin size={11} /> {selections[0].location}</> : selections[0].category || "FIELD NOTES"}
                      </p>
                      <h3 className="display mt-2 text-3xl sm:text-4xl">{selections[0].title}</h3>
                      {selections[0].caption && <p className="mt-2 max-w-lg text-sm leading-6 text-[#65655d]">{selections[0].caption}</p>}
                    </div>
                    {selections[0].category && selections[0].location && <span className="eyebrow mt-1 shrink-0 text-[#77786d]">{selections[0].category}</span>}
                  </div>
                </Link>
              </Reveal>
            )}

            {selections.length > 1 && (
              <div className="grid content-start gap-7 md:col-span-5">
                {selections.slice(1).map((photo, index) => (
                  <Reveal key={photo._id} delay={(index + 1) * 0.1}>
                    <Link href="/photography" className="group block">
                      <div className="relative aspect-[5/3] overflow-hidden bg-[#d5d0c4]">
                        <Image
                          src={urlForImage(photo.image).width(1100).quality(88).url()}
                          alt={photo.alt || photo.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 42vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                        <span className="absolute left-4 top-4 border border-white/65 px-3 py-2 text-[9px] tracking-[.2em] text-white">{String(index + 2).padStart(2, "0")} / FIELD FRAME</span>
                        <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border border-white/65 text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#191a16]"><ArrowUpRight size={17} /></span>
                      </div>
                      <div className="mt-3 flex items-start justify-between gap-4">
                        <div>
                          <p className="eyebrow flex items-center gap-2 text-[#77786d]">
                            {photo.location ? <><MapPin size={11} /> {photo.location}</> : photo.category || "FIELD NOTES"}
                          </p>
                          <h3 className="display mt-2 text-2xl sm:text-3xl">{photo.title}</h3>
                          {photo.caption && <p className="mt-2 max-w-lg text-sm leading-6 text-[#65655d]">{photo.caption}</p>}
                        </div>
                        {photo.category && photo.location && <span className="eyebrow mt-1 shrink-0 text-[#77786d]">{photo.category}</span>}
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="border-y border-black/15 py-10">
            <p className="display text-3xl sm:text-4xl">The field archive is taking shape.</p>
            <p className="mt-3 max-w-lg text-sm leading-7 text-[#65655d]">
              Publish photographs in Studio and mark a few as featured to bring these moments to the homepage.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
