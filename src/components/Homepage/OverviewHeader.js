import React, { useRef } from "react";

import { gsap } from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);

export default function OverviewHeader() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageUrl = `${process.env.PUBLIC_URL}/geneva-1.jpeg`; // Path to your image in the public folder
  const tl = useRef();

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "clamp(top bottom)",
            end: "clamp(bottom top)",
            scrub: true,
          },
        })
        .to(containerRef.current, { backgroundPosition: "50% 35%" })
        .to(textRef.current, { y: 30, duration: 1 }, 0); // '0' here ensures both animations start at the same time

      // gsap.to(containerRef.current, {
      //   scrollTrigger: {
      //     trigger: containerRef.current,
      //     start: "clamp(top bottom)", // when the top of the trigger hits the bottom of the viewport
      //     end: "clamp(bottom top)", // when the bottom of the trigger hits the top of the viewport
      //     scrub: true,
      //   },
      //   backgroundPosition: "50% 40%", // Adjust values for desired effect
      // });

      // gsap.to(textRef.current, {
      //   scrollTrigger: {
      //     trigger: containerRef.current,
      //     start: "clamp(top bottom)", // when the top of the trigger hits the bottom of the viewport
      //     end: "clamp(bottom top)", // when the bottom of the trigger hits the top of the viewport
      //     // start: "top bottom",
      //     // end: "bottom top",
      //     scrub: true, // smooth scrubbing, true or a number indicating speed
      //   },
      //   y: 100, // adjust this value for vertical movement
      //   duration: 1,
      // });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="h-128 w-full flex justify-center items-center shadow-[inset_0_-2px_15px_rgba(0,0,0,.2)]"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 87, 34, 0.7), rgba(255, 140, 0, 0.7)), url('${imageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "50% 30%",
      }}
    >
      <div
        ref={textRef}
        // className="text-center text-gray-100 py-20 animate-fade-in-up animation-fill "
        className="text-center text-gray-100 py-20"
      >
        <h1 className="font-bold tracking-tight text-5xl sm:text-8xl transition-all">
          Genavigate
        </h1>
        <p className="font-semibold mt-4 text-gray-100 text-lg sm:text-xl transition-all">
          Find vehicles to explore the beautiful city of Geneva !
        </p>
      </div>
    </div>
  );
}
