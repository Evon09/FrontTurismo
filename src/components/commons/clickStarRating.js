import { Box, Icon, Stack } from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useState } from 'react';

const ClickStarRating = ({
  totalStars = 5,
  size = '1rem',
  color = 'teal',
  onChange,
}) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = selectedRating => {
    setRating(selectedRating);
    if (onChange) {
      onChange(selectedRating);
    }
  };

  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    const isHalfStar = i - 0.5 <= rating && rating < i;
    const isFilledStar = i <= rating;

    stars.push(
      <Box key={i} onClick={() => handleStarClick(i)}>
        <Icon
          as={isHalfStar ? FaStarHalfAlt : FaStar}
          boxSize={size}
          color={isFilledStar || isHalfStar ? color : 'gray.300'}
          cursor="pointer"
        />
      </Box>
    );
  }

  return <Stack direction="row">{stars}</Stack>;
};

export default ClickStarRating;
