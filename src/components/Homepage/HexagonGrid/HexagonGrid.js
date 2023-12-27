import React from "react";
import "./HexagonGrid.css"; // Assuming CSS is in a separate file

const HexagonGrid = () => {
  const images = [
    // "https://picsum.photos/id/1040/300/300",
    // "https://picsum.photos/id/106/300/300",
    // "https://picsum.photos/id/136/300/300",
    // "https://picsum.photos/id/1039/300/300",
    // "https://picsum.photos/id/110/300/300",
    // "https://picsum.photos/id/1047/300/300",
    // "https://picsum.photos/id/1057/300/300",
    "/Geneva/Geneva-01m.jpg",
    "/Geneva/Geneva-02m.jpg",
    "/Geneva/Geneva-03m.jpg",
    "/Geneva/Geneva-04m.jpg",
    "/Geneva/Geneva-05m.jpeg",
    "/Geneva/Geneva-06m.jpg",
    "/Geneva/Geneva-07m.jpg",
    // Add more image URLs here
  ];

  return (
    <div className="hexagon-grid-container">
      <div className="gallery">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default HexagonGrid;
