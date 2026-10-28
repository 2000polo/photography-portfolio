import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#171815] px-6 py-16 text-[#f4f1e9] sm:px-12 sm:py-20 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-white/50">UNTIL THE NEXT JOURNEY</p>
        <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="display max-w-3xl text-5xl leading-[1] sm:text-7xl">
            The world is still out there.
          </h2>
          <Link href="/contact" className="editorial-link w-fit border-white/50">
            Start a conversation <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="my-12 h-px bg-white/20" />
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <p className="eyebrow mb-4 text-white/45">EXPLORE</p>
            <div className="flex flex-col gap-3 text-sm text-white/80">
              <Link href="/photography">Photography</Link>
              <Link href="/stories">Stories</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4 text-white/45">CONNECT</p>
            <div className="flex flex-col gap-3 text-sm text-white/80">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a>
              <a href="mailto:hello@arunpaul.photo">Email ↗</a>
              <Link href="/contact">Licensing & commissions</Link>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="eyebrow mb-4 text-white/45">A PHOTOGRAPHIC JOURNAL</p>
            <p className="max-w-xs text-sm leading-6 text-white/65">
              Documenting the wild, the journey, and the moments in between.
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/20 pt-5 text-[10px] tracking-wider text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ARUN PAUL. ALL RIGHTS RESERVED.</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}
