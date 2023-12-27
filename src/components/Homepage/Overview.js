import React from "react";
import GLTFViewer2 from "./GLTFViewer2";
import SmoothScrolling from "./SmoothScrolling";
import OverviewHeader from "./OverviewHeader";
import SectionCategories from "./SectionCategories";
import SectionDisclaimer from "./SectionDisclaimer";
import SectionTechno from "./SectionTechno";
import SectionFooter from "./SectionFooter";

function Overview() {
  // useEffect(() => {}, []);
  // const imageUrl = `${process.env.PUBLIC_URL}/geneva-1.jpeg`; // Path to your image in the public folder

  return (
    <div className="-ml-[15px]">
      <SmoothScrolling>
        <OverviewHeader />
        <SectionCategories />
        <div className="">
          <GLTFViewer2 />
        </div>
        <div>
          <SectionDisclaimer />
        </div>
        <div>
          <SectionTechno />
        </div>
        <div>
          <SectionFooter />
        </div>
      </SmoothScrolling>
    </div>
  );
}

export default Overview;
