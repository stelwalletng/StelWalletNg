import { Hero } from "@/components/layout/landing/hero";
import { Features } from "@/components/layout/landing/features";
import { GetStarted } from "@/components/layout/landing/get-started";
import { Footer } from "@/components/layout/landing/footer";
export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <Features />
      <GetStarted />
      <Footer />
    </div>
  );
}
