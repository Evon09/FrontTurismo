import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import StarRating from '../commons/starRating';
import AuthContext from '../../contexts/auth';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { DeleteIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

function Remove() {
  return (
    <Flex
      position="absolute"
      zIndex="100"
      bg="red"
      w="7"
      h="7"
      borderRadius="50%"
      align="center"
      justify="center"
      top="10px"
      right="10px"
    >
      <Button bg="transparent" _hover={{ bg: 'transparent' }}>
        <DeleteIcon size="10px"></DeleteIcon>
      </Button>
    </Flex>
  );
}

export default function ExtendedTurCard({ id, nota }) {
  const [pacote, setPacote] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);
  const [adm, setAdm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Obter informações do pacote
        const fetchedPacote = await auth.Pacote(id);
        setPacote(fetchedPacote);

        // Verificar se o usuário é administrador
        const adm = await auth.isAdm(auth.token, auth.id);
        setAdm(adm);

        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter informações:', error);
        setError(
          'Erro ao carregar as informações. Por favor, tente novamente.'
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [id, auth]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  // if (error) {
  //   return <Text>{error}</Text>;
  // }
  const somaPrecosPasseios = pacote.passeios
    ? pacote.passeios.reduce((total, passeio) => total + passeio.preco, 0)
    : 0;

  async function Reservar() {
    try {
      await auth.reservaPacote(auth.token, id, auth.id);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      position="relative"
    >
      {adm ? <Remove /> : <></>}

      <Stack maxW={{ base: '100%', sm: '40%' }}>
        <Slider {...sliderSettings}>
          {pacote.passeios.map((passeio, index) => (
            <div key={index} style={{ maxWidth: '200px', height: '200px' }}>
              <img
                src={passeio.imagem}
                alt={`Imagem do passeio ${index + 1}`}
                style={{
                  width: '100%',
                  height: '45vh',
                  objectFit: 'cover',
                }}
              />
            </div>
          ))}
        </Slider>
      </Stack>

      <Stack>
        <CardBody>
          <Heading size="md">
            <Flex
              direction={['column', 'column', 'row']}
              gap={['5px', '5px', '50px']}
            >
              <Text>
                {pacote && pacote.passeios && pacote.passeios.length > 0
                  ? pacote.passeios[0].destino
                  : 'Destino não disponível'}
              </Text>

              <Flex align="center" gap="5px">
                <Text>Nota:</Text>
                <StarRating rating={nota}></StarRating>
              </Flex>
            </Flex>
          </Heading>
          <Text py="2" overflow="scroll" maxH={{ base: '50vh' }}>
            {pacote && pacote.passeios && pacote.passeios.length > 0 ? (
              pacote.passeios.map((item, index) => (
                <div key={index}>
                  <Text fontSize="20px">{item.destino}</Text>
                  <Text fontSize="15px">{item.itinerario}</Text>
                </div>
              ))
            ) : (
              <Text>Ta carregando...</Text>
            )}
          </Text>

          <Flex direction="row" gap="50px">
            <Text>Data: {pacote.dataInicial}</Text>
            <Text>Data: {pacote.dataFinal}</Text>
          </Flex>

          <Text>
            Preço:{' '}
            <Text fontSize={['30px', '30px', '50px']}>
              R${somaPrecosPasseios}
            </Text>
          </Text>
        </CardBody>

        <CardFooter>
          {auth.id ? (
            <Button variant="solid" colorScheme="blue" onClick={Reservar}>
              Reservar
            </Button>
          ) : (
            <Button as={Link} to="/login" variant="solid" colorScheme="blue">
              Login
            </Button>
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
}
