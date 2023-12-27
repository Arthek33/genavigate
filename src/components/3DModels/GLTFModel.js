import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { Color } from "three";

// function findChildren(parent) {
//   return [
//     parent.name,
//     parent.children.map((c) => {
//       return findChildren(c);
//     }),
//   ];
// }
function generateGL(materials, element, index) {
  if (!element.children.length) {
    return (
      <mesh
        key={element.name + index.toString()}
        castShadow={true}
        receiveShadow={true}
        geometry={element.geometry}
        material={materials[element.material.name]}
        position={Object.values(element.position)}
        scale={Object.values(element.scale)}
        rotation={[element.rotation.x, element.rotation.y, element.rotation.z]}
      ></mesh>
    );
  }
  const children = element.children.map((c, i) => {
    return generateGL(materials, c, i);
  });
  if (element.type === "Mesh") {
    return (
      <mesh
        key={element.name + index.toString()}
        castShadow={true}
        receiveShadow={true}
        geometry={element.geometry}
        material={materials[element.material.name]}
        position={Object.values(element.position)}
        scale={Object.values(element.scale)}
        rotation={[element.rotation.x, element.rotation.y, element.rotation.z]}
      >
        {children}
      </mesh>
    );
  }
  return (
    <group
      key={element.name + index.toString()}
      position={Object.values(element.position)}
      scale={Object.values(element.scale)}
      rotation={[element.rotation.x, element.rotation.y, element.rotation.z]}
    >
      {children}
    </group>
  );
}

export default function Model(props) {
  const group = useRef();
  const API_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
  // const API_BASE_URL ="http://localhost:3000/";
  // const imageURL = `${API_BASE_URL}img/vehicles/${vehicle.imageCover}`;
  const { nodes, materials } = useGLTF(`${API_BASE_URL}/gltf/${props.gltf}`);
  // const { nodes, materials } = useGLTF(`${API_BASE_URL}/gltf/model-mac.gltf`);
  useControls(
    "Customization",
    () => {
      return Object.keys(materials).reduce(
        (acc, m) =>
          Object.assign(acc, {
            [m]: {
              value: "#" + new Color(materials[m].color).getHexString(),
              order: -1,
              onChange: (v) => {
                materials[m].color = new Color(v);
              },
            },
          }),
        {
          rotation: {
            value: true,
            onChange: (v) => {
              props.toggleRotation(v);
            },
            order: -1,
          },
        }
      );
    },
    [nodes]
  );
  let node_root = Object.values(nodes).find(
    (n) => n.type === "Group" && !n.parent
  );

  if (node_root.children.length === 1) node_root = node_root.children[0];
  const nodes_parsed = generateGL(materials, node_root, 0);
  const final = (
    <group ref={group} {...props} dispose={null}>
      {nodes_parsed}
    </group>
  );

  return final;
}
