import DemoCarousel from "@/components/Banner/DemoCarousel";
import Products from "@/components/Products/Products";

export default function Home() {
  return (
    <main>
        <div className="max-w-screen-2xl mx-auto ">
          <DemoCarousel />
          <div className="relative md:-mt-20 lgl:-mt-32">
            <Products />
          </div>
        </div>
    </main>
  )
}
