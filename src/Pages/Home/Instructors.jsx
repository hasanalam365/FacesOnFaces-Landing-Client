import React, { useRef, useEffect, useState } from "react";

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

const InstructorCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
      className={`group relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
    >
      <img
        src={item.image}
        className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/90" />

      {/* Name */}
      <div className="absolute bottom-0 p-6 text-white transition-transform duration-500 ease-out translate-y-2 group-hover:translate-y-0">
        <div className="w-10 h-[2px] bg-cyan-400 mb-3 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
        <h3 className="text-2xl font-light">{item.name}</h3>
      </div>
    </div>
  );
};

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
          {instructors.map((item, index) => (
            <InstructorCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;