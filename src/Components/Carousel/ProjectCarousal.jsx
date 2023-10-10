import { Carousel } from "@material-tailwind/react";
import React from "react";

export function ProjectCarousal({ projectName, address, images }) {
  const text1 = projectName;
  const text2 = address;
  const text3 = "Az creattion";
  console.log(images, "aaaaaaaaaaaaaaa");

  // Define fixed width and height for the images
  const imageWidth = "100rem"; // Adjust to your desired width
  const imageHeight = "50rem"; // Adjust to your desired height

  return (
    <Carousel
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {images.map((image, index) => (
        <div key={index} className="relative h-full w-full">
          <img
            src={`${import.meta.env.VITE_HOMEOWNER_URL}${image.image}`} // Assuming you have a field called "imageSrc" in your image object
            alt={`image ${index + 1}`}
            style={{ width: imageWidth, height: imageHeight }} // Set fixed width and height here
            className="object-cover"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <p className="text-5xl font-bold">{text1}</p>
            <p className="text-2xl">{text2}</p>
            <p className="text-xl">{text3}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
