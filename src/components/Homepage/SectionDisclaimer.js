import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Cube, Flask } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

function SectionDisclaimer() {
  const disclaimerTitleRef = useRef();
  const disclaimerTextRef = useRef();

  useGSAP(() => {
    gsap.fromTo(
      disclaimerTitleRef.current,
      { opacity: 0, y: 70 },
      // { autoAlpha: 0, y: 70 },
      {
        opacity: 1,
        // autoAlpha: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: disclaimerTitleRef.current,
          start: "top bottom-=100",
          end: "bottom top+=100",
          toggleActions: "play none none reverse",
          // markers: true,
        },
      }
    );
    gsap.fromTo(
      disclaimerTextRef.current,
      { opacity: 0, y: 70 },
      // { autoAlpha: 0, y: 70 },
      {
        opacity: 1,
        // autoAlpha: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: disclaimerTextRef.current,
          start: "top bottom-=100",
          end: "bottom top+=100",
          toggleActions: "play none none reverse",
          // markers: true,
        },
      }
    );
  }, []);

  return (
    <div className="min-h-[80vh] flex justify-center items-center text-center bg-gray-50 dark:bg-gray-700 pt-24 p-12">
      <div className="flex flex-col justify-center items-center text-gray-800 dark:text-gray-100">
        <h1
          ref={disclaimerTitleRef}
          className="font-bold text-5xl tracking-tighter my-6"
        >
          A Journey of Exploration and Innovation
        </h1>
        <div
          ref={disclaimerTextRef}
          className="mt-6 max-w-4xl text-gray-600 dark:text-gray-200 text-xl rounded-xl"
        >
          <div className="mb-12 mt-4">
            Welcome to Genavigate, a creative playground that merges the beauty
            of Geneva with the thrill of virtual exploration.
          </div>
          <div className="grid md:grid-cols-2 text-base text-left">
            <div className="relative subsection border border-gray-200 dark:border-gray-600 rounded-md p-12 my-12 md:mx-6 shadow bg-white dark:bg-gray-800">
              <div className="w-20 aspect-square p-4 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 dark:border-gray-600 shadow rounded-md z-10 flex justify-center items-center bg-gradient-to-br from-orange-500 to-orange-100 text-white">
                <Cube size={32} />
              </div>
              <h3 className="font-medium my-4">Digital Canvas</h3>
              <p className="text-gray-400 dark:text-gray-400">
                Here, we bring to life an array of vehicles, not as tangible
                entities, but as digital models representing the diversity of
                transportation. <br /> While these vehicles are not real, they
                embody a canvas for showcasing web technologies and 3D modeling
                skills.
              </p>
            </div>
            <div className="relative subsection border border-gray-200 dark:border-gray-600 rounded-md p-12 my-12 md:mx-6 shadow bg-white dark:bg-gray-800">
              <div className="w-20 aspect-square p-4 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 dark:border-gray-600 shadow rounded-md z-10 flex justify-center items-center bg-gradient-to-br from-teal-500 to-teal-100 text-white">
                <Flask size={32} />
              </div>
              <h3 className="font-medium my-4">Journey of Innovation</h3>
              <p className="text-gray-400 dark:text-gray-400">
                This site is a playground for learning and experimenting, one of
                many projects in my journey as a developer. <br /> As you
                navigate through Genavigate, you're not just exploring a
                fictional Geneva - you're witnessing a portfolio of skills,
                ideas, and possibilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionDisclaimer;
