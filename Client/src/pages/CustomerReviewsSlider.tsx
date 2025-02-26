import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Star } from "lucide-react";
import woman1 from "../assets/image/woman1.jpg";
import woman2 from "../assets/image/woman2.jpg";
import man from "../assets/image/man.jpg";
const reviews = [
  {
    name: "Ekta",
    image: woman1,
    rating: 4.5,
    review: "This is a great stationery shop! They have all kinds of supplies, and the quality is excellent.",
  },
  {
    name: "Moni",
    image: woman2,
    rating: 5,
    review: "Best stationery store in town. Affordable prices and amazing collection!",
  },
  {
    name: "David",
    image: man,
    rating: 4,
    review: "Good collection of art supplies. The staff is very helpful.",
  },
];

export default function CustomerReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-4 mt-8"> {/* max-w-3xl mx-auto সরানো হলো */}
 <h1 className="font-bold text-2xl flex justify-center border-2 rounded-lg border-green-500 pb-2 mb-2">
  Our Website Review</h1>

      <div className="relative h-[250px]  sm:h-[300px]  md:h-[350px]  w-full overflow-hidden rounded-lg">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className={`absolute w-full flex justify-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={index === currentIndex ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 shadow-lg rounded-2xl bg-blue-50 w-full mt-2"> {/* max-w-md সরানো হলো */}
              <CardContent className="flex flex-col items-center text-center">
                <img
                  src={review.image}
                  className="w-24 h-24 rounded-full object-cover shadow-md mb-4"
                  // alt={review.name}
                />
                <h3 className="text-xl font-semibold">{review.name}</h3>
                <div className="flex items-center gap-1 my-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(review.rating) ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                  <span className="text-gray-600 text-sm">({review.rating})</span>
                </div>
                <p className="text-gray-700">{review.review}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center mt-4 gap-2">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-blue-500 w-4 h-4" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
