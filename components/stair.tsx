import Image from "next/image";

export function Stair() {
  return (
    <figure className="content-auto relative h-[min(50vh,28rem)] min-h-[16rem] w-full border-t border-line md:h-[min(70vh,40rem)] md:min-h-[22rem]">
      <Image
        src="/stair.webp"
        alt="Gallery stairwell in cool daylight"
        fill
        sizes="(max-width: 768px) 100vw, 1400px"
        quality={65}
        className="object-cover"
      />
    </figure>
  );
}
