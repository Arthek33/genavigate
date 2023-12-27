import React, { useRef, useState } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { RocketLaunch } from "@phosphor-icons/react";

function SmoothScrolling({ children }) {
  const [showRocket, setShowRocket] = useState(false);
  const lenisRef = useRef(null);

  useLenis(({ scroll }) => {
    // Check if scrolled past 100vh (height of the viewport)
    if (scroll > window.innerHeight) {
      setShowRocket(true);
    } else {
      setShowRocket(false);
    }
  });

  const scrollToTop = () => {
    lenisRef.current.scrollTo("top", { duration: 4 });
  };

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}
    >
      {children}
      <div
        className={`go-up fixed bottom-5 hover:bottom-6 right-5 cursor-pointer transition-all duration-400 rounded-full overflow-hidden bg-gray-100/10 p-2 drop-shadow-lg ${
          showRocket ? "opacity-100" : "opacity-0"
        }`}
        onClick={scrollToTop}
      >
        <RocketLaunch
          size={40}
          className="text-orange-600 -rotate-45 drop-shadow-lg"
          weight="light"
        />
      </div>
    </ReactLenis>
  );
}

export default SmoothScrolling;
