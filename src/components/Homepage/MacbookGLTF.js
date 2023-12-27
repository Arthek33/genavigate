import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { DoubleSide, MathUtils, AddOperation, MultiplyOperation } from "three";

export default function MacbookGLTF({ scrollProgress }) {
  const groupMac = useRef();
  const groupBackScreen = useRef();
  const materialRef = useRef();
  const colorMap = useTexture("chimp2.jpeg");
  const openPageCollection = useTexture("ss_collection2.png");
  const openPageVehicle = useTexture("ss_vehicle3.png");
  colorMap.flipY = false;
  openPageCollection.flipY = false;
  openPageVehicle.flipY = false;

  const { nodes, materials } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );

  const { camera, gl, viewport, scene } = useThree();
  const environment = scene.environment;
  // const bounds = useBounds();

  // const resizeListener = () => {
  //   // Update camera aspect ratio and renderer size
  //   camera.aspect = window.innerWidth / window.innerHeight;
  //   camera.updateProjectionMatrix();
  //   gl.setSize(window.innerWidth, window.innerHeight);
  // };

  const [targetOpacity, setTargetOpacity] = useState(0);
  const [targetScreenRotation, setTargetScreenRotation] = useState(0);
  const [targetMacRotation, setTargetMacRotation] = useState(0);
  const [targetScreenshot, setTargetScreenshot] = useState();

  useEffect(() => {
    setTargetScreenshot(
      scrollProgress >= 1 ? openPageVehicle : openPageCollection
    );
    setTargetOpacity(scrollProgress > 0.5 ? 1 : scrollProgress * 2);

    const openAngle = 1.31; // Fully open
    const closedAngle = 3.14; // Fully closed

    setTargetScreenRotation(
      scrollProgress > 0.5
        ? openAngle
        : closedAngle + (openAngle - closedAngle) * scrollProgress * 2
    );

    const macRotation = scrollProgress > 0.5 ? scrollProgress - 0.5 : 0;
    setTargetMacRotation(macRotation);

    camera.position.set(0, 1, 8);
    camera.updateProjectionMatrix();

    const handleResize = () => {
      console.log("aspect", camera.aspect);
      console.log("zoom", camera.zoom);
      if (camera.aspect < 0.7) {
        camera.zoom = camera.aspect;
      } else camera.zoom = 0.7;
      // camera.updateProjectionMatrix();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollProgress, camera, gl, viewport, environment]);

  useFrame(() => {
    if (
      (scrollProgress > 0 && scrollProgress < 1) ||
      (groupBackScreen.current.rotation.x > 1.32 &&
        groupBackScreen.current.rotation.x < 3.13)
    ) {
      // SCREEN OPACITY LOGIC
      if (materialRef.current) {
        materialRef.current.opacity = MathUtils.lerp(
          materialRef.current.opacity,
          targetOpacity,
          0.1
        );
      }

      // SCREEN ROTATION LOGIC
      if (groupBackScreen.current) {
        groupBackScreen.current.rotation.x = MathUtils.lerp(
          groupBackScreen.current.rotation.x,
          targetScreenRotation,
          0.1
        );
      }

      // MAC ROTATION LOGIC

      if (groupMac.current) {
        groupMac.current.rotation.y = MathUtils.lerp(
          groupMac.current.rotation.y,
          targetMacRotation,
          0.1
        );
      }
    }
  });

  return (
    <group ref={groupMac} dispose={null}>
      <group position={[0, 0.52, 0]} scale={[0.1, 0.1, 0.1]}>
        <mesh
          geometry={nodes.Circle001.geometry}
          material={nodes.Circle001.material}
        />
        <mesh
          geometry={nodes.Circle001_1.geometry}
          material={nodes.Circle001_1.material}
        />
        <mesh
          geometry={nodes.Circle001_2.geometry}
          material={materials.HeadPhoneHole}
        />
        <mesh
          geometry={nodes.Circle001_3.geometry}
          material={nodes.Circle001_3.material}
        />
        <mesh
          geometry={nodes.Circle001_4.geometry}
          material={nodes.Circle001_4.material}
        />
        <mesh
          geometry={nodes.Circle001_5.geometry}
          material={materials.TouchbarBorder}
        />
        <mesh
          geometry={nodes.Circle001_6.geometry}
          material={materials.Keyboard}
        />
        <mesh
          geometry={nodes.KeyboardKeyHole.geometry}
          material={nodes.KeyboardKeyHole.material}
          position={[-11.79, -0.15, -8.3]}
          scale={5.8}
        />
        <mesh
          geometry={nodes.RubberFoot.geometry}
          material={materials.DarkRubber}
          position={[-11.95, -0.75, 7.86]}
          scale={5.8}
        />
        <group position={[0.01, -0.21, -10.56]} scale={5.8}>
          <mesh
            geometry={nodes.Circle012.geometry}
            material={materials.HingeBlack}
          />
          <mesh
            geometry={nodes.Circle012_1.geometry}
            material={materials.HingeMetal}
          />
        </group>
        <group position={[0, -0.51, 0]} scale={5.8}>
          <mesh
            geometry={nodes.Circle006.geometry}
            material={nodes.Circle006.material}
          />
          <mesh
            geometry={nodes.Circle006_1.geometry}
            material={nodes.Circle006_1.material}
          />
        </group>
        <group position={[-11.79, -0.15, -8.3]} scale={5.8}>
          <mesh
            geometry={nodes.Circle.geometry}
            material={nodes.Circle.material}
          />
          <mesh geometry={nodes.Circle_1.geometry} material={materials.Key} />
          <mesh
            geometry={nodes.Circle_2.geometry}
            material={materials.Touchbar}
          />
        </group>
        <group
          ref={groupBackScreen}
          position={[0.01, -0.47, -10.61]}
          rotation={[3.13, 0, 0]}
          scale={5.8}
        >
          <mesh
            geometry={nodes.Circle002.geometry}
            material={nodes.Circle002.material}
          />
          <mesh
            geometry={nodes.Circle002_1.geometry}
            material={materials.Screen}
          />
          <mesh
            geometry={nodes.Circle002_2.geometry}
            material={materials.ScreenGlass}
          />
          <mesh
            geometry={nodes.Circle002_3.geometry}
            material={materials.Rubber}
          />
          <mesh
            position={[0, -0.02, 0]}
            geometry={nodes.Circle002_4.geometry}
            material={materials.ScreenGlass}
          />
          <mesh position={[0, -0.05, -1.83]} rotation={[1.57, 0, 0]}>
            <planeGeometry args={[5.05, 3.31]} />
            <meshBasicMaterial
              ref={materialRef}
              side={DoubleSide}
              map={targetScreenshot}
              toneMapped={false}
              color="white"
              transparent={true}
              envMap={environment}
              combine={MultiplyOperation}
              reflectivity={0.1}
            />
          </mesh>
          <mesh
            geometry={nodes.AppleLogo000.geometry}
            material={materials["AppleLogo.004"]}
            position={[0, -0.12, -1.9]}
            rotation={[Math.PI, Math.PI, Math.PI]}
            scale={[0.58, 0.58, 0.58]}
          />
        </group>
        <group position={[12.2, 0.03, 0.6]} scale={5.8}>
          <mesh
            geometry={nodes.Circle003.geometry}
            material={nodes.Circle003.material}
          />
          <mesh
            geometry={nodes.Circle003_1.geometry}
            material={nodes.Circle003_1.material}
          />
        </group>
        <group position={[-15.03, 0.03, 0.6]} scale={5.8}>
          <mesh
            geometry={nodes.Circle009.geometry}
            material={nodes.Circle009.material}
          />
          <mesh
            geometry={nodes.Circle009_1.geometry}
            material={nodes.Circle009_1.material}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
);
