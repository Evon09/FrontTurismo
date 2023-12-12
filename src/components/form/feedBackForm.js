import React, { useState, useContext, useEffect } from 'react';
import {
  FormControl,
  Button,
  VStack,
  Textarea,
  useColorMode,
} from '@chakra-ui/react';
import ClickStarRating from '../commons/clickStarRating';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import { PostFeedback } from '../../contexts/utils';

export default function FeedBackForm({ idPacote, nome }) {
  const { colorMode } = useColorMode();
  const auth = useContext(AuthContext);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const [user, setUser] = useState({});
  const [DoComment, setDoComment] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const user = await auth.UserInfo(auth.token, auth.id);
        const DoComment = await auth.doFeedback(auth.id, idPacote);
        setUser(user);
        setDoComment(DoComment);
        setFeedbackSubmitted(DoComment);
        console.log(user);
      } catch (error) {
        setUser(null);
        console.error('Erro ao verificar se o usuário é administrador:', error);
      }
    };

    checkAdminStatus();
  }, [auth, idPacote]);

  const handleRatingChange = newRating => {
    console.log('Nova avaliação:', newRating);
    setRating(newRating);
  };

  const handleCommentChange = event => {
    console.log('Novo comentário:', event.target.value);
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log('FeedBackForm está sendo executado.');
      setIsLoading(true);
      // Aqui você faria a requisição para o seu backend para salvar o feedback
      // Substitua a URL e o método de requisição conforme necessário
      // console.log('Enviando feedback:', { rating, comment });

      const response = await PostFeedback(
        auth.id,
        idPacote,
        user.nome,
        rating,
        comment
      );

      // Verifica se a requisição foi bem-sucedida
      if (response.ok) {
        console.log('Feedback enviado com sucesso!');
        setFeedbackSubmitted(true);
        // Você pode querer adicionar lógica adicional após o envio bem-sucedido
      } else {
        // Trate erros aqui, por exemplo, exibindo uma mensagem de erro ao usuário
        console.error('Erro ao enviar feedback:', response.statusText);
      }
      window.location.reload();
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack
      bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
      p="50px"
      borderRadius="10px"
      align="start"
      gap="10px"
    >
      <h2>De seu comentário sobre o Tour</h2>

      <ClickStarRating onChange={handleRatingChange} />

      <FormControl>
        <Textarea
          placeholder="Nos fale como foi 😄"
          value={comment}
          onChange={handleCommentChange}
        />
      </FormControl>

      {auth.id ? (
        DoComment ? (
          <Button variant="solid" colorScheme="blue">
            Voce já comentou
          </Button>
        ) : (
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={feedbackSubmitted}
          >
            {feedbackSubmitted ? 'Feedback enviado' : 'Comentar'}
          </Button>
        )
      ) : (
        <Button as={Link} to="/login" variant="solid" colorScheme="blue">
          Login
        </Button>
      )}
    </VStack>
  );
}
