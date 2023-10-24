import { Avatar, Flex, Icon, Text, Box, Progress } from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa";

const Reviews = ({ UserReviews }) => {
  // Initialize an array to store the count of each star rating
  const starCounts = [0, 0, 0, 0, 0];

  // Loop through reviews and update starCounts
  UserReviews.reviews?.forEach((review) => {
    starCounts[review.stars - 1]++;
  });

  // Calculate the total number of reviews
  const totalReviews = UserReviews.reviews?.length || 0;

  // Calculate the average star rating
  let totalStars = 0;
  for (let i = 0; i < starCounts.length; i++) {
    totalStars += (i + 1) * starCounts[i];
  }
  const averageRating = totalStars / totalReviews;

  return (
    <>
      <Text
        fontSize="x-large"
        fontWeight="bold"
        color={"blackAlpha"}
        marginTop={"7"}>
        Customer Reviews:
      </Text>
      <Text
        fontWeight="bold"
        color="black"
        mt={2}
        display={"flex"}
        alignItems={"center"}>
        <Icon as={FaStar} color="black" mx={"4"} />
        <span className="fs-1">{averageRating.toFixed(2)}</span>
      </Text>
      <Text mx={"5"} mb={"5"}>
        {totalReviews} reviews
      </Text>
      {starCounts.map((count, index) => (
        <Flex key={index} alignItems="center" mt={2}>
          <Icon as={FaStar} color="black" mx={2} />
          <Text fontWeight="bold">{`${index + 1}`}</Text>
          <Progress
            flex="1"
            ml={4}
            value={(count / totalReviews) * 100}
            colorScheme="blackAlpha"
          />
          <Text mx={8}>{count}</Text>
        </Flex>
      ))}

      {UserReviews.reviews?.map((review, index) => (
        <div key={index} className="m-4">
          <Flex alignItems="center" justifyContent={"space-between"}>
            <Flex mt={5}>
              <Avatar src={review.avatar} mr={5} />
              <Text className="mt-2" fontWeight="bold">
                {review.name}
              </Text>
            </Flex>

            <Flex alignItems={"center "} gap={"2"}>
              <Icon as={FaStar} color="yellow.400" />
              <span>{review.stars}</span>
            </Flex>
          </Flex>
          <Text textAlign={"left"} flexGrow={1} marginTop={"15px"}>
            {review.text}
          </Text>
        </div>
      ))}
    </>
  );
};

export default Reviews;
