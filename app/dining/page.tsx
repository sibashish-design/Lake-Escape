import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { getCuisines } from "@/actions/cuisine";
import { formatCurrency } from "@/lib/utils";
import { ChefHat, Flame, Coffee, Sparkles } from "lucide-react";

export default async function DiningPage() {
  const response = await getCuisines();
  const cuisines = response.ok && response.data ? response.data : [];

  // Group cuisines by category
  const categories = ["Breakfast", "Entrée", "Main Course", "Beverages"];

  return (
    <main className="bg-cream">
      {/* Editorial Page Hero */}
      <PageHero 
        eyebrow="Dining" 
        title="Regional plates served with lake light." 
        text="Gourmet local menus prepared by private chefs, crafted around mountain harvests and the fresh catch of Tehri Lake." 
      />

      {/* Culinary Philosophy Section */}
      <section className="section bg-cream text-matte-black border-t border-matte-black/5">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.9fr] items-center">
          
          {/* Left: Philosophy description */}
          <div className="space-y-6">
            <p className="eyebrow">Philosophy</p>
            <h2 className="font-serif text-2xl font-light tracking-wide md:text-3xl text-matte-black">
              Water, Fire, and Soil
            </h2>
            <p className="font-sans text-sm font-light text-matte-black/70 leading-relaxed">
              At Lake Escape, dining is a slow ritual. We partner with local Garhwali farmers to source finger millets, organic pulses, forest herbs, and mountain honey. Evenings focus on wood-fire grills on the open deck under the stars.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 pt-4">
              <div className="flex gap-3 items-start">
                <Coffee size={18} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-normal text-matte-black">Slow Breakfasts</h4>
                  <p className="mt-1 font-sans text-xs text-matte-black/60 leading-relaxed">Served on your deck with early morning mist cruises.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Flame size={18} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-normal text-matte-black">Open Deck Grills</h4>
                  <p className="mt-1 font-sans text-xs text-matte-black/60 leading-relaxed">Live charcoal embers, fresh catches, and marinades.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Asymmetrical image display */}
          <div className="reveal relative aspect-[16/10] overflow-hidden rounded-[8px] border border-matte-black/5 bg-matte-black shadow-sm lg:aspect-[1.2/1]">
            <Image 
              src="/media/tehri-sunset.png" 
              alt="Romantic lake dining setup" 
              fill 
              className="image-cover opacity-90 transition-transform duration-[10000ms] ease-out hover:scale-106 animate-kenburns" 
              sizes="(max-width: 1024px) 100vw, 45vw" 
            />
          </div>

        </div>
      </section>

      {/* Gourmet Menu Showcase */}
      <section className="section bg-beige text-matte-black border-t border-matte-black/5">
        <div className="container max-w-5xl">
          <div className="reveal mb-12 text-center">
            <ChefHat className="text-olive mx-auto mb-4" size={24} />
            <h2 className="font-serif text-2xl font-light tracking-wide md:text-3xl text-matte-black">
              The Lake Escape Menu
            </h2>
            <p className="mt-2 font-sans text-sm font-light text-matte-black/55">
              Taste our signature culinary creations
            </p>
          </div>

          {/* Categorized Menu List */}
          <div className="space-y-12">
            {categories.map((category) => {
              const filteredCuisines = cuisines.filter((c: { category: string }) => c.category === category);
              if (filteredCuisines.length === 0) return null;

              return (
                <div key={category} className="space-y-6">
                  {/* Category Title */}
                  <div className="flex items-center gap-3 border-b border-matte-black/10 pb-2">
                    <span className="font-poppins text-[10px] font-bold uppercase tracking-widest text-olive">
                      {category}
                    </span>
                    <div className="h-px flex-1 bg-matte-black/5" />
                  </div>

                  {/* Dishes Grid */}
                  <div className="grid gap-6 md:grid-cols-2">
                    {filteredCuisines.map((item) => (
                      <div 
                        key={item.id} 
                        className="reveal group flex gap-4 rounded-[8px] border border-matte-black/5 bg-cream/65 p-4 transition duration-300 hover:bg-cream hover:shadow-sm"
                        data-cursor="Gourmet Plate"
                      >
                        {/* Dish Mini Image */}
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[6px] bg-matte-black">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="image-cover opacity-90 transition-transform duration-[6000ms] group-hover:scale-106"
                            sizes="80px"
                          />
                        </div>

                        {/* Dish Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-4">
                              <h4 className="font-serif text-base font-normal text-matte-black leading-snug">
                                {item.name}
                              </h4>
                              <span className="font-serif text-sm text-olive shrink-0 font-light">
                                {formatCurrency(item.price)}
                              </span>
                            </div>
                            <p className="mt-1 font-sans text-xs font-light text-matte-black/60 leading-relaxed line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Box */}
          <div className="reveal mt-16 text-center border-t border-matte-black/10 pt-12">
            <h3 className="font-serif text-lg font-light text-matte-black">
              Planning a celebration or a private buyout?
            </h3>
            <p className="mt-2 font-sans text-xs font-light text-matte-black/60 max-w-md mx-auto leading-relaxed">
              Our chef can curate custom menus, coordinate lake picnics, or bake fresh cakes for your anniversaries and birthdays.
            </p>
            <div className="mt-6">
              <Link href="/contact" className="btn btn-olive">
                <Sparkles size={12} /> Contact Reservations
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
