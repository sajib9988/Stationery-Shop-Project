import { Card, CardContent } from "../components/ui/card";
import { Star } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
  {
    name: "Ekta",
    image: "https://via.placeholder.com/100",
    rating: 4.5,
    review: "This is a great stationery shop! They have all kinds of supplies, and the quality is excellent.",
  },
  {
    name: "Rahul",
    image: "https://via.placeholder.com/100",
    rating: 5,
    review: "Best stationery store in town. Affordable prices and amazing collection!",
  },
  {
    name: "Neha",
    image: "https://via.placeholder.com/100",
    rating: 4,
    review: "Good collection of art supplies. The staff is very helpful.",
  },
];

const CustomerReviewsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // Large screens
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768, // Tablets
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 480, // Mobile devices
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="max-w-full mt-4 py-5">
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <Card key={index} className="p-4 shadow-lg rounded-2xl bg-blue-50"> 
            <CardContent className="flex flex-col items-center text-center">
              <img
                src={review.image}
              
                className="w-24 h-24 rounded-full object-cover shadow-md mb-4"
              />
              <h3 className="text-xl font-semibold">{review.name}</h3>
              <div className="flex items-center gap-1 my-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < Math.floor(review.rating) ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
                <span className="text-gray-600 text-sm">({review.rating})</span>
              </div>
              <p className="text-gray-700">{review.review}</p>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </div>
  );
};

export default CustomerReviewsSlider;
