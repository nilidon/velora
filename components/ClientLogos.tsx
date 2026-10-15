import Image from "next/image";

export function ClientLogos() {
  return (
    <section className="bg-cream px-5 py-14">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-[12px] tracking-[0.3em] text-gold">Trusted by</p>
        <Image
          src="/photos/client-logos.jpg"
          alt="Trusted by Airbnb, Allstate, State Farm, RE/MAX, Keller Williams, ABM, Redfin, Ring, Victoria's Secret, and Zara"
          width={1400}
          height={220}
          className="mx-auto mt-6 h-auto w-full max-w-4xl opacity-70"
        />
      </div>
    </section>
  );
}
