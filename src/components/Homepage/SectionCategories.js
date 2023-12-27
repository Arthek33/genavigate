import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HexagonGrid from "./HexagonGrid/HexagonGrid";

import { Car, Bicycle, Boat, Airplane } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

function SectionCategories() {
  const categories = [
    {
      title: "Sky High Adventures",
      description:
        "Explore the skies of Geneva with our selection of planes for an unforgettable aerial experience.",
      icon: Airplane,
    },
    {
      title: "Road Explorers",
      description:
        "Navigate the city streets or venture into the countryside with our range of cars.",
      icon: Car,
    },
    {
      title: "Pedal Power",
      description:
        "Get up close and personal with Geneva on our bikes, ideal for leisurely rides or quicker commutes.",
      icon: Bicycle,
    },
    {
      title: "Sail the Serene Waters",
      description:
        "Experience the tranquility of Geneva’s waters with our variety of boats.",
      icon: Boat,
    },
  ];

  const categoryTitleRef = useRef();
  const categoryRef = useRef([]);
  categoryRef.current = [];

  const addToRefs = (el) => {
    if (el && !categoryRef.current.includes(el)) {
      categoryRef.current.push(el);
    }
  };

  useGSAP(() => {
    gsap.fromTo(
      categoryTitleRef.current,
      { opacity: 0, y: 70 },
      // { autoAlpha: 0, y: 70 },
      {
        opacity: 1,
        // autoAlpha: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: categoryTitleRef.current,
          start: "top bottom-=100",
          end: "bottom top+=100",
          toggleActions: "play none none reverse",
          // markers: true,
        },
      }
    );

    categoryRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 70 },
        // { autoAlpha: 0, y: 70 },
        {
          opacity: 1,
          // autoAlpha: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=100",
            end: "bottom top+=100",
            toggleActions: "play none none reverse",
            // markers: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className="grid md:grid-cols-2 md:h-[150vh] bg-gray-50 dark:bg-gray-700">
      <div className="flex flex-col justify-center">
        <HexagonGrid />
      </div>
      <div className="flex flex-col justify-center m-4 text-gray-800 dark:text-gray-100 p-8">
        <div>
          <h1
            ref={categoryTitleRef}
            className="font-bold text-5xl tracking-tighter"
          >
            Explore Geneva Your Way
          </h1>
        </div>
        <div className="flex flex-col justify-center items-start space-y-6 pr-4 my-12">
          {categories.map((category, index) => (
            <div ref={addToRefs} key={index} className="flex">
              <div className="aspect-square w-14 h-14 flex items-center justify-center bg-gray-100 rounded-lg shadow-lg bg-gradient-to-br from-orange-400 to-red-500 text-gray-100/90">
                {/* <category.icon className="w-6 h-6 text-orange-600" /> */}
                <category.icon className="w-8 h-8" />
              </div>
              <div className="mx-4">
                <h3 className="font-semibold tracking-tight">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SectionCategories;
