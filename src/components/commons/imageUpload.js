import React from 'react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

const ImageInput = () => {
  return (
    <InputGroup>
      <Input
        type="text"
        placeholder="Insira sua URL da imagem"
        // Adicione outras propriedades conforme necessário
      />
      <InputRightElement>
        <img
          src="https://img.icons8.com/ios/50/image--v1.png"
          width="20px"
          alt="Ícone"
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default ImageInput;
