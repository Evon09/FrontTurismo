import React from 'react';
import { Grid, Box, useBreakpointValue, Text, Flex } from '@chakra-ui/react';

import TurCard from '../components/cards/turCard';
import Header from '../components/commons/Header';

export default function Turs() {
  const lista = [
    { id: 123, value: '123' },
    { id: 12312, value: '123' },
    { id: 1, value: '123' },
    { id: 1231, value: '123' },
    { id: 12, value: '123' },
  ];

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 5 });

  return (
    <>
      <Flex
        direction="column"
        h="100vh"
        align="center"
        justify="space-between"
        gap="20px"
      >
        <Header />

        <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={6}>
          {lista.map(item => (
            <Box key={item.id} p={4}>
              <TurCard />
            </Box>
          ))}
        </Grid>
      </Flex>
    </>
  );
}
