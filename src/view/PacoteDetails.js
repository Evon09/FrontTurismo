import React, { useContext, useEffect, useState } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import Header from '../components/commons/Header';
import ExtendedTurCard from '../components/cards/extendedTurCard';
import FeedBackForm from '../components/form/feedBackForm';
import Comentario from '../components/commons/comentario';
import AuthContext from '../contexts/auth';
import { useParams } from 'react-router-dom';

export default function PacoteDetails() {
  let { id } = useParams();
  const auth = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await auth.feedbacksTour(id);
        setFeedbacks(response.data);
        console.log(response.data);
      } catch (error) {
        setFeedbacks([]); // Set to an empty array to avoid 'undefined' in the map
        console.error('Erro ao carregar feedbacks:', error);
      }
    };

    loadData();
  }, []);

  // Função para calcular a média das estrelas
  const calcularMediaEstrelas = () => {
    if (feedbacks.length === 0) {
      return 0; // Se não houver feedbacks, a média é 0
    }

    const totalEstrelas = feedbacks.reduce(
      (acc, feedback) => acc + feedback.stars,
      0
    );
    const media = totalEstrelas / feedbacks.length;
    return media;
  };

  return (
    <Flex
      direction="column"
      h="100vh"
      align="center"
      justify="space-between"
      gap="20px"
    >
      <Header />
      <Flex direction="column" w="95vw" gap="20px">
        <ExtendedTurCard
          id={id}
          nota={calcularMediaEstrelas().toFixed(2)}
        ></ExtendedTurCard>
        <FeedBackForm idPacote={id}></FeedBackForm>
        <Flex align="center" direction="column">
          {Array.isArray(feedbacks) &&
            feedbacks.map(feedback => (
              <Box key={feedback._id} p={4}>
                <Comentario
                  comentario={feedback.description}
                  nome={feedback.userName}
                  nota={feedback.stars}
                  idFeedback={feedback._id}
                  idUser={feedback.userId}
                />
              </Box>
            ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
