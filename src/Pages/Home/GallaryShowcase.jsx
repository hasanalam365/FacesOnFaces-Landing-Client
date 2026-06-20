import React from "react";

const GallaryShowcase = () => {
  const images = {
    large:
      "https://i.ibb.co.com/k6h526HM/faces3.jpg",
    topRight1:
      "https://i.ibb.co.com/k7DPcB9/faces1.jpg",
    topRight2:
      "https://i.ibb.co.com/mM4p59N/faces2.jpg",
    bottomLeft:
      "https://i.ibb.co.com/r23Q8mNP/faces6.jpg",
      
    center:
      "https://i.ibb.co.com/vCT1qBMp/faces3.jpg",
    rightBottom1:
      "https://i.ibb.co.com/jPjnCTZw/faces1.jpg",
    rightBottom2:
      "https://i.ibb.co.com/v46d24Wv/faces4.jpg",
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
              className="w-full h-[480px] object-cover rounded-xl"
            />
          </div>

          {/* Top Right Images */}
          <div className="col-span-6 md:col-span-5">
            <img
              src={images.topRight1}
              alt=""
              className="w-full h-[250px] md:h-[200px] lg:h-[200px] object-cover rounded-xl"
            />
          </div>

          <div className="col-span-6 md:col-span-5">
            <img
              src={images.topRight2}
              alt=""
              className="w-full h-[250px] object-cover rounded-xl"
            />
          </div>

          {/* Bottom Left */}
          <div className="col-span-12 md:col-span-3">
            <img
              src={images.bottomLeft}
              alt=""
              className="w-full h-[376px] object-cover rounded-xl"
            />
          </div>

          {/* Bottom Center */}
          <div className="col-span-12 md:col-span-6">
            <img
              src={images.center}
              alt=""
            className="w-full h-[376px] object-cover rounded-xl"
            />
          </div>

          {/* Bottom Right - Two Vertical Images */}
          <div className="flex flex-row col-span-12 gap-4 md:flex-col lg:flex-col md:col-span-3">
            <img
              src={images.rightBottom1}
              alt=""
              className="w-full h-[180px] object-cover rounded-xl"
            />

            <img
              src={images.rightBottom2}
              alt=""
              className="w-full h-[180px] object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallaryShowcase;