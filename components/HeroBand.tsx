import Image from "next/image";
import { cx } from "@/lib/utils";

export function HeroBand({
  src,
  alt = "",
  children,
  tall = false,
}: {
  src: string;
  alt?: string;
  children: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <section className="bg-cream">
      <div
        className={cx(
          "relative px-5 pb-14 pt-28 md:pb-16 md:pt-32",
          tall && "md:min-h-[100svh] md:pb-20",
        )}
      >
        <div className="absolute inset-0 hidden md:block">
          <Image
            src={src}
            alt=""
            fill
            priority
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/80 via-cream/40 to-cream/15" />
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    </section>
  );
}
