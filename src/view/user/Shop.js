import { Center, Flex } from '@chakra-ui/react';

import Header from '../../components/commons/Header';
import CadastroForm from '../../components/form/cadastro';
import { ShopCart } from '../../components/shop/App';

export default function Shop() {
  return (
    <>
      <Header />

      <Flex align="center" justify="center">
        <ShopCart></ShopCart>
      </Flex>
    </>
  );
}
