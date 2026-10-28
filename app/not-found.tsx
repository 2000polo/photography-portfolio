import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f4f1e9] px-6 text-center">
      <p className="eyebrow text-[#77786d]">404 — OFF THE MAP</p>
      <h1 className="display mt-5 text-6xl">This trail ends here.</h1>
      <p className="mt-4 text-sm text-[#65655d]">The page you’re looking for could not be found.</p>
      <Link href="/" className="editorial-link mt-8">Return home ↗</Link>
    </main>
  );
}
