import { Box, Flex } from '@chakra-ui/react';
import Comentario from './comentario';

export default function FeedBacks() {
  const lista = [
    { id: 123, value: '123' },
    { id: 12312, value: '123' },
    { id: 1, value: '123' },
    { id: 1231, value: '123' },
    { id: 12, value: '123' },
  ];

  return (
    <>
      <Flex align="center" direction="column">
        {lista.map(item => (
          <Box key={item.id} p={4}>
            <Comentario />
          </Box>
        ))}
      </Flex>
    </>
  );
}
