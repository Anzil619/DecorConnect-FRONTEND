import { Carousel } from "@material-tailwind/react";
import image1 from "../../assets/homepage/homepage.jpg";
import image2 from "../../assets/homepage/imageeee.jpg"
import image3 from "../../assets/homepage/image333.jpg"
 
export function HomepageCarousel() {
  return (
    <Carousel transition={{ duration: 2 }} className="rounded-xl">
      <img
        src={image1}
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src={image2}
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src={image3}
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}