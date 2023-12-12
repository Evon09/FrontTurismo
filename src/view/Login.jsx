import { Flex } from '@chakra-ui/react';
import LoginForm from '../components/form/login';
import Header from '../components/commons/Header';

export default function Login() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex direction="column" h="100vh" align="center" justify="center">
        <LoginForm></LoginForm>
      </Flex>
    </Flex>
  );
}
