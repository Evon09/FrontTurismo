import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Input,
  Flex,
  Stack,
  InputGroup,
  InputLeftAddon,
  Spacer,
  useColorMode,
  Button,
} from '@chakra-ui/react';
import AuthContext from '../../contexts/auth';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const { colorMode } = useColorMode();
  const auth = useContext(AuthContext);
  const [adm, setAdm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adm = await auth.isAdm(auth.token, auth.id);
        setAdm(adm);
        console.log(adm);
      } catch (error) {
        setAdm(false);
        console.error('Erro ao obter informações:', error);
      }
    };
    console.log('1');
    fetchData();
  }, [auth.id, auth.token, auth]);

  return (
    <Flex
      direction={['column', 'column', 'row']}
      align={{ base: 'start', sm: 'start', md: 'center' }}
      justify={{ base: 'start', sm: 'start', md: 'center' }}
      p="10px"
      w="100%"
      bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
    >
      <Stack
        spacing="4"
        direction={['column', 'column', 'row']}
        w={{ base: '100%', sm: '100%', md: 'row' }}
        align={{ base: '', sm: '', md: 'center' }}
      >
        <Breadcrumb spacing="8px" separator="|">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/pacotes">Pacotes</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/perfil">Perfil</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        {/* <Flex direction={['column', 'column', 'row']}>
          <InputGroup>
            <InputLeftAddon children="Ida" />
            <Input
              type="datetime-local"
              w={['100%', '100%', '10vw']}
              placeholder="phone number"
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Volta" />
            <Input
              type="datetime-local"
              w={['100%', '100%', '10vw']}
              placeholder="phone number"
            />
          </InputGroup>
          <Input
            w={['100%', '100%', '30vw']}
            variant="outline"
            placeholder="Local"
          />
        </Flex> */}
      </Stack>
      <Flex gap="20px">
        {auth.id ? (
          <Button onClick={auth.logout}>Logout</Button>
        ) : (
          <Button as={Link} to="/login">
            Login
          </Button>
        )}
        {auth.id ? (
          <></>
        ) : (
          <Button as={Link} to="/cadastro">
            Cadastro
          </Button>
        )}
        {adm ? (
          <>
            <Button as={Link} to="/adm/dashboard-agencia/tour">
              Cadastro Tour
            </Button>

            <Button as={Link} to="/adm/dashboard-agencia/pacote">
              Cadastro Pacotes
            </Button>
            <Button as={Link} to="/adm/tours">
              Tours
            </Button>
          </>
        ) : (
          <></>
        )}
      </Flex>
      <Spacer></Spacer>
      <Flex>
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  );
}
