import React from "react";

const GallaryShowcase = () => {
  const images = {
    large:
      "https://i.ibb.co.com/k6h526HM/faces3.jpg",
    topRight1:
      "https://i.ibb.co.com/k7DPcB9/faces1.jpg",
    topRight2:
      "https://i.ibb.co.com/nMdz9x6Z/faces5.jpg",
    bottomLeft:
      "https://i.ibb.co.com/VpLSc3Pf/faces4.jpg",
      
    center:
      "https://i.ibb.co.com/mM4p59N/faces2.jpg",
  
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
  {/* Large Hero Image */}
  <div className="col-span-12 md:col-span-8">
    <img
      src={images.large}
      alt=""
      className="w-full h-[500px] object-cover rounded-xl"
    />
  </div>

  {/* Right Stack */}
  <div className="flex flex-col col-span-12 gap-4 md:col-span-4">
    <img
      src={images.topRight1}
      alt=""
      className="w-full h-[242px] object-cover rounded-xl"
    />

    <img
      src={images.topRight2}
      alt=""
      className="w-full h-[242px] object-cover rounded-xl"
    />
  </div>

  {/* Bottom Row */}
  <div className="col-span-12 md:col-span-6">
    <img
      src={images.bottomLeft}
      alt=""
      className="w-full h-[260px] md:h-[350px] lg:h-[350px] object-cover rounded-xl"
    />
  </div>

  <div className="col-span-12 md:col-span-6">
    <img
      src={images.center}
      alt=""
      className="w-full h-[260px] md:h-[350px] lg:h-[350px] object-cover rounded-xl"
    />
  </div>

  
</div>
      </div>
    </section>
  );
};

export default GallaryShowcase;