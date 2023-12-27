import React, { useRef } from "react";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import ScrollSmoother from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

import { Check } from "@phosphor-icons/react";

export const MyContentOne = ({ data }) => {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const container = useRef();
  const textContainer = useRef();
  const parentContainer = useRef();

  useGSAP(
    () => {
      ScrollTrigger.defaults({
        toggleActions: "play restart restart none",
        // markers: true,
      });

      gsap.from(textContainer.current, {
        scrollTrigger: {
          trigger: parentContainer.current,
          start: "clamp(top center)",
          // end: "clamp(bottom center)",
          toggleActions: "restart resume resume reset",
        },
        y: 50,
        opacity: 0,
        duration: 2,
      });
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container}>
        <section
          className="h-[150vh] flex flex-col justify-center"
          style={{ opacity: 1 }}
        >
          <div
            ref={parentContainer}
            className="h-screen md:mx-6 flex flex-col justify-center items-start text-gray-800 dark:text-gray-100 p-6 md:p-12 text-left"
          >
            <div ref={textContainer} className="space-y-8">
              <h2
                ref={titleRef}
                className="text-2xl md:text-5xl my-4 tracking-tight font-bold"
              >
                {data.id}. {data.title}
              </h2>
              <h3 className="text-lg md:text-xl my-4 font-medium">
                {data.subtitle}
              </h3>
              <p ref={textRef} className="text-sm md:text-lg text-gray-500">
                {data.content.introduction}
              </p>
              <ul className="space-y-4 text-sm md:text-md">
                {data.content.highlights.map((point, index) => (
                  <li key={`li_${index}`} className="flex">
                    <Check size={24} className="text-orange-600 mr-4" /> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default MyContentOne;
