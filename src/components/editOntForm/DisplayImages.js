import React from "react";
import DisplayImage from "./DisplayImage";

export default function ImgMediaCards(props) {
  const { images, ontId, setAddress, setImageUrls } = props;

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {images.map((image, index) => (
        <DisplayImage
          image={image}
          key={index}
          ontId={ontId}
          setAddress={setAddress}
          setStateImages={setImageUrls}
          stateImages={images}
        />
      ))}
    </div>
  );
}
