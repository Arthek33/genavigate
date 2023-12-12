import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import GLTFModel from "./GLTFModel";
import HashLoader from "react-spinners/HashLoader";
import { useControls } from "leva";

export default function GLTFViewer(props) {
  const [rotation, setRotation] = useState(false);
  const ref = useRef();

  function toggleRotation(rotate) {
    setRotation(rotate);
  }

  // const options = useControls(
  //   "Customization",
  //   () => ({
  //     rotation: {
  //       value: true,
  //       order: -2,
  //     },
  //   }),
  //   [props]
  // );

  // console.log("options Viewer", options);
  // const options = useControls();

  return (
    <Suspense fallback={<HashLoader color="#f45008" size={150} />}>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 45, zoom: 0.7 }}>
        {/* <Suspense fallback={<HashLoader color="#d67436" className="my-30" />}> */}
        <Stage
          controls={ref}
          preset="rembrandt"
          intensity={1}
          environment="city"
        >
          <GLTFModel gltf={props.gltf} toggleRotation={toggleRotation} />
        </Stage>
        <OrbitControls ref={ref} enableZoom={false} autoRotate={rotation} />
      </Canvas>
    </Suspense>
  );
}
