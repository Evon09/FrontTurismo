import { Center, Flex } from '@chakra-ui/react';

import Header from '../components/commons/Header';
import CadastroForm from '../components/form/cadastro';

export default function UserForm() {
  return (
    <>
      <Header />

      <Flex align="center" justify="center">
        <Center style={{ height: '80vh' }}>
          <CadastroForm />
        </Center>
      </Flex>
    </>
  );
}
