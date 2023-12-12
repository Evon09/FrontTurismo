import { Icon, Stack } from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({
  rating,
  totalStars = 5,
  size = '1rem',
  color = 'teal',
}) => {
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    const isHalfStar = i - 0.5 <= rating && rating < i;
    const isFilledStar = i <= rating;

    stars.push(
      <Icon
        key={i}
        as={isHalfStar ? FaStarHalfAlt : FaStar}
        boxSize={size}
        color={isFilledStar || isHalfStar ? color : 'gray.300'}
      />
    );
  }

  return <Stack direction="row">{stars}</Stack>;
};

export default StarRating;
