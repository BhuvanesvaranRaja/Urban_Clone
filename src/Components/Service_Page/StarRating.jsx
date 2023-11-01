import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { FaStar, FaStarHalf } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const maxRating = 5; // Define the maximum rating

  const renderStars = () => {
    const stars = [];

    // Calculate the number of full stars and half stars
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 1; i <= maxRating; i++) {
      if (i <= fullStars) {
        stars.push(<Icon as={FaStar} key={i} color="yellow.500" />);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(<Icon as={FaStarHalf} key={i} color="yellow.500" />);
      } else {
        stars.push(<Icon as={FaStar} key={i} color="gray.300" />);
      }
    }

    return stars;
  };

  return <Box>{renderStars()}</Box>;
};

export default StarRating;
