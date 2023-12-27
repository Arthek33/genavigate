import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Tooltip } from "react-tooltip";

gsap.registerPlugin(ScrollTrigger);

function SectionTechno() {
  const disclaimerTitleRef = useRef();
  const disclaimerTextRef = useRef();
  const technologies = {
    front: [
      {
        alt: "React",
        src: "./frameworks/react.png",
      },
      {
        alt: "ThreeJS",
        src: "./frameworks/three.png",
      },
      {
        alt: "TailwindCSS",
        src: "./frameworks/tailwindcss.svg",
      },
      {
        alt: "Leaflet",
        src: "./frameworks/leaflet4.png",
      },
      {
        alt: "gsap",
        src: "./frameworks/gsap.svg",
      },
    ],
    back: [
      {
        alt: "NodeJS",
        src: "./frameworks/node.png",
      },
      {
        alt: "Express",
        src: "./frameworks/express4.png",
      },
      {
        alt: "MongoDB",
        src: "./frameworks/mongo.png",
      },
      {
        alt: "Mongoose",
        src: "./frameworks/mongoose2.png",
      },
    ],
  };

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
    <div className=" w-full flex justify-center bg-gray-50 dark:bg-gray-700 px-12 pb-16">
      <div className="max-h-screen max-w-screen-xl flex justify-self-center justify-center items-center text-center relative rounded-lg overflow-hidden p-12 border border-gray-200 dark:border-gray-500 shadow-inner dark:bg-gray-900 bg-white">
        <div className="absolute h-full w-full bg-box-pattern bg-gradient-to-r from-purple-500 to-pink-500 "></div>
        <div className="flex flex-col justify-center items-center text-gray-800 dark:text-gray-100">
          <h1
            ref={disclaimerTitleRef}
            className="p-4 font-bold text-3xl sm:text-6xl tracking-tighter drop-shadow-md mb-6 bg-gradient-to-br bg-clip-text text-transparent from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-100 "
          >
            Technologies
          </h1>

          <div
            ref={disclaimerTextRef}
            className="w-full grid lg:grid-cols-2 gap-0 sm:gap-12 my-10 text-center"
          >
            <div className="flex flex-col justify-center items-center text-xl z-10 relative">
              <h2 className="font-medium text-xl sm:text-2xl techno-title drop-shadow-md">
                Front-end
              </h2>
              <div className="flex items-center justify-center p-4 border-t border-gray-300">
                {technologies.front.map((tech, index) => (
                  <div
                    key={`fe_${index}`}
                    className="h-10 sm:h-20 mx-2 aspect-square flex items-center p-2 rounded bg-gray-100 dark:bg-gray-300 shadow-md hover:shadow-lg"
                    data-tooltip-id="techno-tooltip"
                    data-tooltip-content={tech.alt}
                    data-tooltip-place="bottom"
                  >
                    <img
                      alt={tech.alt}
                      src={tech.src}
                      className="object-contain h-full"
                    ></img>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center text-xl z-10 relative">
              <h2 className="font-medium text-xl sm:text-2xl techno-title drop-shadow-md">
                Back-end
              </h2>
              <div className="flex items-center justify-center p-4 border-t border-gray-300">
                {technologies.back.map((tech, index) => (
                  <div
                    key={`be_${index}`}
                    className=" h-10 sm:h-20 mx-2 aspect-square flex items-center p-2 rounded bg-gray-100 dark:bg-gray-300 shadow-md hover:shadow-lg"
                    data-tooltip-id="techno-tooltip"
                    data-tooltip-content={tech.alt}
                    data-tooltip-place="bottom"
                  >
                    <img
                      alt={tech.alt}
                      src={tech.src}
                      className="object-contain h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tooltip id="techno-tooltip" className="tooltip-custom" />
    </div>
  );
}

export default SectionTechno;
