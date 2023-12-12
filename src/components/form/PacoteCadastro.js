import React, { useContext, useEffect, useState } from 'react';
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
  Select,
  Flex,
  CloseButton,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { List, ListItem } from '@chakra-ui/react';

import AuthContext from '../../contexts/auth';

const schema = yup.object({
  nome: yup.string().required('Este campo é obrigatório'),
  dataIda: yup.date().required('Campo obrigatório'),
  dataVolta: yup.date().required('Campo obrigatório'),
  selectedOptionsList: yup
    .array()
    .min(1, 'Adicione pelo menos uma opção ao pacote'),
});

const formatarData = data => {
  const dataFormatada = new Date(data);
  return dataFormatada.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
};

const SelectWithAddRemove = ({ options, onAddOption }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleAddOption = () => {
    const selected = options.find(opt => opt.id === selectedOption);
    if (selected) {
      onAddOption(selected);
      setSelectedOption('');
    }
  };

  return (
    <Box>
      <Flex>
        <Select
          placeholder="Selecione uma opção"
          value={selectedOption}
          onChange={e => setSelectedOption(e.target.value)}
        >
          {options.map(option => (
            <option key={option.id} value={option.id}>
              {option.destino}
            </option>
          ))}
        </Select>
        <Button ml={2} onClick={handleAddOption}>
          Adicionar
        </Button>
      </Flex>
    </Box>
  );
};

const PacoteForm = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptionsIds, setSelectedOptionsIds] = useState([]); // Adicionado estado para IDs
  const [passeio, setPasseio] = useState([]);
  const toast = useToast();
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const passeio = await auth.Tours(auth.token);
        setPasseio(passeio);
      } catch (error) {
        console.error('Erro ao obter informações:', error);
      }
    };

    fetchData();
  }, [auth.id, auth.token, auth]);

  const onSubmit = async formData => {
    try {
      await schema.validate(formData, { abortEarly: false });
      formData.dataIda = formatarData(formData.dataIda);
      formData.dataVolta = formatarData(formData.dataVolta);

      await auth.PacoteRegister(
        auth.token,
        auth.id,
        formData?.dataIda,
        formData?.dataVolta,
        selectedOptionsIds // Enviar a lista de IDs
      );

      toast({
        title: 'Cadastro bem-sucedido!',
        description: 'O pacote foi cadastrado com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Erro no cadastro:', error);

      let errorMessage = 'Ocorreu um erro ao processar o cadastro do pacote.';

      toast({
        title: 'Erro no cadastro',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: false,
      });
    }
  };

  const handleAddOption = newOption => {
    setSelectedOptions([...selectedOptions, newOption]);
    setSelectedOptionsIds([...selectedOptionsIds, newOption.id]); // Adicionar apenas o ID
    console.log(selectedOptionsIds);
  };

  const handleRemoveOption = optionToRemove => {
    setSelectedOptions(prevOptions =>
      prevOptions.filter(option => option.id !== optionToRemove.id)
    );
    setSelectedOptionsIds(prevIds =>
      prevIds.filter(id => id !== optionToRemove.id)
    ); // Remover apenas o ID
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
                {...register('nome', { required: 'Este campo é obrigatório' })}
              />
              <FormErrorMessage>{errors.nome?.message}</FormErrorMessage>
            </FormControl>

            <Flex gap="10px">
              <FormControl mt={4} isInvalid={!!errors.dataIda}>
                <FormLabel>Data de Ida</FormLabel>
                <Input
                  type="date"
                  {...register('dataIda', { required: 'Campo obrigatório' })}
                />
                <FormErrorMessage>{errors.dataIda?.message}</FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors.dataVolta}>
                <FormLabel>Data de Volta</FormLabel>
                <Input
                  type="date"
                  {...register('dataVolta', { required: 'Campo obrigatório' })}
                />
                <FormErrorMessage>{errors.dataVolta?.message}</FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl mt={4}>
              <Box p={4} maxW="400px">
                <h1>Selecione as opções:</h1>
                <SelectWithAddRemove
                  options={passeio}
                  onAddOption={handleAddOption}
                />
                <h2>Opções adicionadas:</h2>
                <List>
                  {selectedOptions.map(option => (
                    <ListItem
                      key={option.id}
                      display="flex"
                      alignItems="center"
                    >
                      {option.destino}
                      <CloseButton
                        ml={2}
                        onClick={() => handleRemoveOption(option)}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </FormControl>
            <Button width="full" mt={4} colorScheme="teal" type="submit">
              Cadastrar Pacote
            </Button>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default PacoteForm;
