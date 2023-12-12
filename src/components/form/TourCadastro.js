import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  CheckboxIcon,
  Button,
  useToast,
} from '@chakra-ui/react';
import ImageUploader from '../commons/imageUpload';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import AuthContext from '../../contexts/auth';
import { useContext } from 'react';

const schema = yup.object({
  nomeLocal: yup.string().required('Nome do local é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória'),

  valor: yup
    .number()
    .required('Valor é obrigatório')
    .min(0, 'O valor deve ser maior ou igual a 0'),
  imagemUrl: yup.string().url('A URL da imagem deve ser válida'),
});

export default function TourCadastro() {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const auth = useContext(AuthContext);

  const onSubmit = formData => {
    toast({
      title: 'Cadastro em andamento...',
      description: 'Por favor, aguarde.',
      status: 'info',
      duration: 500,
      isClosable: false,
    });

    try {
      schema.validateSync(formData, { abortEarly: false });
      auth.tourRegister(
        auth.token,
        formData.valor,
        formData.descricao,
        formData.nomeLocal,
        auth.id,
        formData.imagemUrl
      );
      console.log(
        auth.token,
        formData.valor,
        formData.descricao,
        auth.id,
        formData.imagemUrl
      );
      toast({
        title: 'Cadastro bem-sucedido!',
        description: 'O tour foi cadastrado com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Tratamento de erros de validação do Yup
        const validationErrors = {};
        error.inner.forEach(e => {
          validationErrors[e.path] = e.message;
        });
        console.error('Erros de validação:', validationErrors);
      } else {
        // Tratamento de outros erros
        console.error('Erro:', error);
      }

      toast({
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao processar o cadastro.',
        status: 'error',
        duration: 5000,
        isClosable: false,
      });
    }
  };

  return (
    <>
      <VStack bg="#f4f8fb" p="50px" borderRadius="10px">
        <h2>Cadastrar novo Tour</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap="20px">
            <FormControl w="xl">
              <FormLabel>Nome do local</FormLabel>
              <Input type="text" {...register('nomeLocal')} />
              {errors.nomeLocal && (
                <span style={{ color: 'red' }}>{errors.nomeLocal.message}</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Descricao</FormLabel>
              <Textarea
                placeholder="Nos fale como é 😄"
                {...register('descricao')}
              />
              {errors.descricao && (
                <span style={{ color: 'red' }}>{errors.descricao.message}</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Valor</FormLabel>
              <InputGroup>
                <InputLeftAddon children="$" />
                <Input
                  placeholder="Enter amount"
                  {...register('valor', { valueAsNumber: true })}
                />
                <InputRightElement>
                  <CheckboxIcon color="green.500" />
                </InputRightElement>
              </InputGroup>
              {errors.valor && (
                <span style={{ color: 'red' }}>{errors.valor.message}</span>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Imagem (URL)</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Insira sua URL da imagem"
                  {...register('imagemUrl')} // Adicione o campo de registro para a imagemUrl
                />
                <InputRightElement>
                  <img
                    src="https://img.icons8.com/ios/50/image--v1.png"
                    width="20px"
                    alt="Ícone"
                  />
                </InputRightElement>
              </InputGroup>
              {errors.imagemUrl && (
                <span style={{ color: 'red' }}>{errors.imagemUrl.message}</span>
              )}
            </FormControl>

            <Button colorScheme="blue" type="submit">
              Cadastrar
            </Button>
          </VStack>
        </form>
      </VStack>
    </>
  );
}
