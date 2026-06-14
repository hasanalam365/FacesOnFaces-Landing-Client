import React from "react";

const GallaryShowcase = () => {
  const images = {
    large:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
    topRight1:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    topRight2:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800&auto=format&fit=crop",
    bottomLeft:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop",
    center:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    rightBottom1:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop",
    rightBottom2:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl px-4 mx-auto">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-cyan-400 text-sm uppercase tracking-[4px]">
            OUR WORKS
          </p>
          <h2 className="text-4xl font-light text-white md:text-5xl">
            Gallery <span className="italic text-cyan-400">Showcase</span>
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Large Image */}
          <div className="col-span-12 row-span-2 md:col-span-7">
            <img
              src={images.large}
              alt=""
              className="w-full h-[320px] object-cover rounded-xl"
            />
          </div>

          {/* Top Right Images */}
          <div className="col-span-6 md:col-span-5">
            <img
              src={images.topRight1}
              alt=""
              className="w-full h-[150px] object-cover rounded-xl"
            />
          </div>

          <div className="col-span-6 md:col-span-5">
            <img
              src={images.topRight2}
              alt=""
              className="w-full h-[150px] object-cover rounded-xl"
            />
          </div>

          {/* Bottom Left */}
          <div className="col-span-12 md:col-span-3">
            <img
              src={images.bottomLeft}
              alt=""
              className="w-full h-[280px] object-cover rounded-xl"
            />
          </div>

          {/* Bottom Center */}
          <div className="col-span-8 md:col-span-6">
            <img
              src={images.center}
              alt=""
              className="w-full h-[280px] object-cover rounded-xl"
            />
          </div>

          {/* Bottom Right - Two Vertical Images */}
          <div className="flex flex-col col-span-4 gap-4 md:col-span-3">
            <img
              src={images.rightBottom1}
              alt=""
              className="w-full h-[132px] object-cover rounded-xl"
            />

            <img
              src={images.rightBottom2}
              alt=""
              className="w-full h-[132px] object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallaryShowcase;