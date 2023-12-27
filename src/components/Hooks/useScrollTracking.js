import { useState, useEffect, useMemo } from "react";

function useScrollTracking(ref) {
  const [scrollProgress, setScrollProgress] = useState(0);

  // useMemo(() => {
  //   console.log("hook scrollprogress", scrollProgress);
  // }, [scrollProgress]);
  useEffect(() => {
    const handleScroll = () => {
      const section = ref.current;
      // console.log("hook scrollprogress 2", scrollProgress);
      // console.log(section);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        const sectionTopOffset = section.offsetTop + viewportHeight / 2;
        const sectionBottomOffset =
          section.offsetTop + sectionHeight - 2 * viewportHeight;
        if (scrollPosition < sectionTopOffset) {
          setScrollProgress(0);
        } else if (scrollPosition > sectionBottomOffset) {
          setScrollProgress(1);
        } else if (
          scrollPosition >= sectionTopOffset &&
          scrollPosition <= sectionBottomOffset
        ) {
          const progress =
            Math.round(
              ((scrollPosition - sectionTopOffset) /
                (sectionBottomOffset - sectionTopOffset)) *
                100
            ) / 100;
          setScrollProgress(progress); // 0 at the top of the section, 1 at the bottom
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);
  // console.log("hook scrollprogress 3", scrollProgress);
  return scrollProgress;
}

export default useScrollTracking;
