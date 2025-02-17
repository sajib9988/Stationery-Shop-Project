import Slider from "react-slick"
import { motion, Variants } from "framer-motion"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const bannerSlides = [
  {
    image: "https://i.ibb.co.com/wZsBzKzY/Protractors.jpg",
    offer: "5% OFF",
    product: "Protractors",
  },
  {
    image: "https://i.ibb.co.com/XZ95b6yz/notebook.jpg",
    offer: "10% OFF",
    product: "Notebooks",
  },
  {
    image: "https://i.ibb.co.com/JWZh2Y8Z/School-pens-and-pencils-set.jpg",
    offer: "Buy 2 Get 1 Free",
    product: "Pens",
  },
]

// ✅ Fixed: Added explicit type "Variants" to match Framer Motion's expectations
const offerVariants: Variants = {
  initial: { scale: 0.5, opacity: 0, rotate: -10 },
  animate: {
    scale: [0.5, 1.2, 1], 
    opacity: 1,
    rotate: [0, 5, 0], 
    transition: {
      duration: 0.8,
      times: [0, 0.6, 1],
      repeat: Infinity,
      repeatType: "reverse", // ✅ Changed from "loop" to "reverse" (loop doesn't exist in Framer Motion)
      repeatDelay: 1,
    },
  },
}

const productVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.5, delay: 0.4 } 
  },
}

export default function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000, 
    lazyLoad: "ondemand" as "ondemand" | "progressive", // ✅ Fixed TypeScript error
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-4 sm:px-6 lg:px-8 py-8">
      <div className="relative">
        <Slider {...settings}>
          {bannerSlides.map((slide, index) => (
            <div key={index} className="relative h-[200px] sm:h-[300px] md:h-[400px]">
              <img
                src={slide.image || "/placeholder.svg"}
                alt={`Exclusive Offer on ${slide.product}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <motion.span
                  className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 px-4 py-2 bg-red-600 rounded-lg shadow-lg"
                  variants={offerVariants}
                  initial="initial"
                  animate="animate"
                >
                  {slide.offer}
                </motion.span>
                <motion.span
                  className="text-2xl sm:text-3xl md:text-4xl mt-4 bg-black bg-opacity-50 px-4 py-2 rounded-md"
                  variants={productVariants}
                  initial="initial"
                  animate="animate"
                >
                  {slide.product}
                </motion.span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
