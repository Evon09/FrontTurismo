import React, { useContext } from 'react';
import {
  ChakraProvider,
  CSSReset,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
  RadioGroup,
  Radio,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { RegisterRequest, TourRegisterRequest } from '../../contexts/utils';
import AuthContext from '../../contexts/auth';

const schema = yup.object({
  nome: yup.string().required(),
  email: yup.string().required().email(),
  cpfCnpj: yup.string().required(),

  senha: yup.string().required().min(6),
});

const CadastroForm = () => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, values },
  } = useForm();

  const onSubmit = async formData => {
    toast({
      title: 'Cadastro em andamento...',
      description: 'Por favor, aguarde.',
      status: 'info',
      duration: 500,
      isClosable: false,
    });

    try {
      await schema.validate(formData, { abortEarly: false });

      // Fazer a chamada à API com os dados do formulário
      await RegisterRequest(
        formData?.nome,
        formData?.email,
        formData?.cpfCnpj,
        formData?.tipo,
        formData?.senha
      );

      toast({
        title: 'Cadastro bem-sucedido!',
        description: 'Você foi cadastrado com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Erro no cadastro:', error);

      let errorMessage = 'Ocorreu um erro ao processar o cadastro.';

      toast({
        title: 'Erro no cadastro',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: false,
      });
    }
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box
          p={8}
          maxWidth="md"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.nome}>
              <FormLabel>Nome</FormLabel>
              <Input
                {...register('nome', {
                  required: 'Este campo é obrigatório',
                })}
              />
              {errors.nome && (
                <FormErrorMessage>
                  <span>{errors.nome.message?.toString()}</span>
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                {...register('email', {
                  required: 'Este campo é obrigatório',
                })}
              />
              {errors.email && (
                <FormErrorMessage>
                  <span>{errors.email.message?.toString()}</span>
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={!!errors.cpfCnpj}>
              <FormLabel>CPF/CNPJ</FormLabel>
              <Input
                {...register('cpfCnpj', {
                  required: 'Este campo é obrigatório',
                })}
              />
              {errors.cpfCnpj && (
                <FormErrorMessage>
                  <span>{errors.cpfCnpj.message?.toString()}</span>
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.tipo}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup>
                <Stack spacing={5} direction="row">
                  <Radio
                    {...register('tipo', { required: 'Escolha um tipo' })}
                    value="CLIENTE"
                  >
                    Cliente
                  </Radio>
                  <Radio
                    {...register('tipo', { required: 'Escolha um tipo' })}
                    value="AGENCIA_VIAGEM"
                  >
                    Agência
                  </Radio>
                </Stack>
              </RadioGroup>
              {errors.tipo && (
                <FormErrorMessage>
                  <span>{errors.tipo.message}</span>
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={!!errors.senha}>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                {...register('senha', {
                  required: 'Este campo é obrigatório',
                  minLength: {
                    value: 6,
                    message: 'A senha deve ter pelo menos 6 caracteres',
                  },
                })}
              />
              {errors.senha && (
                <FormErrorMessage>
                  <span>{errors.senha.message?.toString()}</span>
                </FormErrorMessage>
              )}
            </FormControl>

            <Button width="full" mt={4} colorScheme="teal" type="submit">
              Cadastrar
            </Button>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default CadastroForm;
