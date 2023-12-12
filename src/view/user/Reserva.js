import { Box, Center, Flex, SimpleGrid } from '@chakra-ui/react';

import Header from '../../components/commons/Header';
import CadastroForm from '../../components/form/cadastro';
import { ShopCart } from '../../components/shop/App';
import SimpleTur from '../../components/cards/simpleTur';

export default function Reserva() {
  const lista = [
    { id: 123, value: '123' },
    { id: 12312, value: '123' },
    { id: 1, value: '123' },
    { id: 1231, value: '123' },
    { id: 12, value: '123' },
  ];
  return (
    <>
      <Header />

      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="20px"
        marginTop="20px"
      >
        {lista.map(item => (
          <SimpleTur></SimpleTur>
        ))}
      </Flex>
    </>
  );
}
