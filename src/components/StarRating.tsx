import { useEffect, useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

interface StarRatingProps {
  rating: string;
}

export const StarRating = ({ rating }: StarRatingProps) => {
  const [numStars, setNumStars] = useState([0, 0]);

  useEffect(() => {
    const ratingParts = rating.split(".");
    if (ratingParts.length === 1) {
      setNumStars([Number(ratingParts[0]), 0]);
    } else {
      const decicmalPart = Number(ratingParts[1]);
      if (decicmalPart < 2) {
        setNumStars([Number(ratingParts[0]), 0]);
      } else if (decicmalPart > 2 && decicmalPart < 7) {
        setNumStars([Number(ratingParts[0]), 1]);
      } else {
        setNumStars([Number(ratingParts[0]) + 1, 0]);
      }
    }
  }, [rating]);

  return (
    <div className="flex text-toast-orange">
      {[...Array(numStars[0])].map((_, i) => (
        <FaStar size={16} />
      ))}
      {numStars[1] === 1 && <FaStarHalf size={16} />}
    </div>
  );
};
