import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Inquiry } from "@/components/inquiry";
import { Nav } from "@/components/nav";
import { Practice } from "@/components/practice";
import { Stair } from "@/components/stair";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="content">
        <Hero />
        <Practice />
        <Work />
        <Stair />
        <Inquiry />
      </main>
      <Footer />
    </>
  );
}
