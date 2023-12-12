import React, { Suspense, useRef } from "react";
import HashLoader from "react-spinners/HashLoader";

export default function LoaderSpinner() {
  const ref = useRef();

  return (
    <Suspense fallback={<HashLoader color="#f45008" size={150} />}>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
        {/* <Suspense fallback={<HashLoader color="#d67436" className="my-30" />}> */}
        <Stage
          controls={ref}
          preset="rembrandt"
          intensity={1}
          environment="city"
        >
          <GLTFModel />
        </Stage>
        <OrbitControls ref={ref} autoRotate />
      </Canvas>
    </Suspense>
  );
}
