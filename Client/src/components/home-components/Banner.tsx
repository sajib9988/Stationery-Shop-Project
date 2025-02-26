import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import practractor from "../../assets/image/protractors.jpg"
import notebook from "../../assets/image/notebook.jpg"
import pen from "../../assets/image/pen-and-pencils.jpg"
const bannerSlides = [
  {
    image: practractor,
    offer: "5% OFF",
    product: "Protractors",
  },

  {
    image: notebook,
    offer: "10% OFF",
    product: "Notebooks",
  },
  {
    image: pen,
    offer: "Buy 2 Get 1 Free",
    product: "Pens",
  },
];

const offerVariants = {
  initial: { scale: 0.5, opacity: 0, rotate: -10 },
  animate: {
    scale: [0.5, 1.2, 1],
    opacity: 1,
    rotate: [0, 5, 0],
    transition: { duration: 0.8, times: [0, 0.6, 1], repeat: Infinity, repeatType: "reverse" as const, repeatDelay: 1 },
  },
};

const productVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
};

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerSlides.length);
    }, 5000); // ৫ সেকেন্ড পর স্লাইড পরিবর্তন হবে
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full  mx-auto border-blue-600 mt-12 sm:px-6 lg:px-1 py-8 relative">
      <div className="relative h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden rounded-lg">
        {bannerSlides.map((slide, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center text-white text-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={slide.image} alt={slide.product} className="w-full h-full object-cover rounded-lg" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 px-4 py-2 bg-red-600 rounded-lg shadow-lg"
                variants={offerVariants}
                initial="initial"
                animate={index === currentIndex ? "animate" : "initial"}
              >
                {slide.offer}
              </motion.span>
              <motion.span
                className="text-2xl sm:text-3xl md:text-4xl mt-4 bg-black bg-opacity-50 px-4 py-2 rounded-md"
                variants={productVariants}
                initial="initial"
                animate={index === currentIndex ? "animate" : "initial"}
              >
                {slide.product}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {/* <button
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
      >
        ⬅
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % bannerSlides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
      >
        ➡
      </button> */}
    </div>
  );
}
