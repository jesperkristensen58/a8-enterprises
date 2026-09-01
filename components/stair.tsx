import Image from "next/image";

export function Stair() {
  return (
    <figure className="relative h-[min(70vh,40rem)] min-h-[22rem] w-full border-t border-line">
      <Image
        src="/stair.jpg"
        alt="Gallery stairwell in cool daylight"
        fill
        sizes="100vw"
        className="object-cover"
      />
    </figure>
  );
}
