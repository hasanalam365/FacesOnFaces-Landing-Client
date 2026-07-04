import React from "react";

const instructors = [
  {
    id: 1,
    name: "Doctor Vahid",
    image: "https://i.ibb.co.com/F48xW4CC/Dr-Vahid.jpg",
  },
  {
    id: 2,
    name: "Advanced Practitioner Mobina",
    image: "https://i.ibb.co.com/tTbDmTL8/mobina.jpg",
  },
  {
    id: 3,
    name: "Doctor Mario",
    image: "https://i.ibb.co.com/kgSmyHXf/Dr-mario.jpg",
  },
];

const Instructors = () => {
  return (
    <section className="py-24 bg-[#0a0e12]">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="text-cyan-400 text-[11px] tracking-[4px] uppercase mb-3">
            Our Team
          </p>

          <h2 className="text-4xl font-light text-white md:text-6xl">
            Meet Your <span className="italic text-cyan-400">Instructors</span>
          </h2>
        </div>

        {/* GRID (all screen sizes) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {instructors.map((item) => (
            <div
              key={item.id}
              className="relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden"
            >
             <img
                src={item.image}
                className="object-cover w-full h-full transition-transform duration-500 ease-out hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Name */}
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-light">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;