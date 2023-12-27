import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import MacbookGLTF from "./MacbookGLTF";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MyContentOne from "./MyContentOne";
import LoaderClassic from "../../assets/LoaderClassic";

import useScrollTracking from "../Hooks/useScrollTracking";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: 1,
    title: "Discover Genavigate",
    macbookModel: "Closed",
    subtitle: "Embark on Your Digital Adventure",
    content: {
      introduction:
        "Welcome to Genavigate, your gateway to exploring the digital roads of Geneva. Curious about how it works? Let's dive in!",
      highlights: [
        "A virtual exploration of Geneva's transportation.",
        "Find and experience diverse vehicles digitally.",
        "Interactive and user-friendly interface.",
      ],
    },
  },
  {
    id: 2,
    title: "Explore the Collections",
    macbookModel: "Open",
    screenshot: "CollectionsPage",
    subtitle: "Your Catalog of Virtual Vehicles",
    content: {
      introduction:
        "On the 'Collections' page, discover a world of vehicles waiting for your command. From sleek cars to majestic boats, the choice is yours!",
      highlights: [
        "Browse various vehicle categories: Cars, Bikes, Boats, Planes.",
        "View images and descriptions of each vehicle.",
        "Select any vehicle to learn more and begin your digital journey.",
      ],
    },
  },
  {
    id: 3,
    title: "Customize and Favorites",
    macbookModel: "Open",
    screenshot: "DetailedPage",
    subtitle: "Personalize Your Experience",
    content: {
      introduction:
        "Dive into the details of your chosen vehicle. Customize, explore, and even add to your favorites for later adventures.",
      highlights: [
        "Customize vehicle colors and explore detailed features.",
        "See the vehicle’s location on a map and understand its unique story.",
        "Add vehicles to your favorites for easy access in the future.",
      ],
    },
  },
];

export default function GLTFViewer2(props) {
  const section3Ref = useRef(null);
  const scrollProgress = useScrollTracking(section3Ref);

  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center">
          <LoaderClassic color={"orange"} size={10} marginTop={40} />
        </div>
      }
    >
      {/* <div className="flex" ref={section3Ref}> */}
      {/* <div className="flex-1 shrink sticky top-0 h-screen w-[50vw]"> */}
      <div className="w-full ">
        <div className="grid grid-cols-6 gap-1" ref={section3Ref}>
          <div className="col-span-3 md:col-span-3 sticky top-0 h-screen">
            <Canvas
              shadows
              dpr={[1, 2]}
              camera={{
                fov: 30,
                zoom: 0.7,
              }}
            >
              <Stage
                preset="rembrandt"
                intensity={1}
                environment="city"
                adjustCamera={false}
              >
                <MacbookGLTF scrollProgress={scrollProgress} />
              </Stage>
            </Canvas>
          </div>
          <div className="col-span-3 md:col-span-3">
            <div className="h-[50vh]"></div>
            {sections.map((section, idx) => (
              <MyContentOne key={idx} data={section} />
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
