import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Center,
  TableContainer,
  Select,
  Button,
  Flex,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../AppConsts';

const Pagination = ({ pages, changeActivePage, changePerPage, activePage }) => {
  const listItems = [];

  for (let i = 0; i < pages; i++)
    listItems.push(
      <Button
        variant={activePage === i + 1 ? 'solid' : 'outline'}
        type="button"
        className="page-link"
        onClick={() => changeActivePage(i + 1)}
      >
        {i + 1}
      </Button>
    );

  const perPage = [5, 10, 15].map(e => (
    <option color="black" key={e} value={e}>
      {e}
    </option>
  ));
  console.log(listItems);
  return (
    <Center p="1" color="white" axis="both">
      <Flex alignItems="center" gap="5">
        {listItems}

        <Select w="23" color="black" onChange={changePerPage}>
          {perPage}
        </Select>
      </Flex>
    </Center>
  );
};

export default function UserList() {
  const [activePage, setActivePage] = useState(1); // Estado: gerenciar a página ativa
  const [perPage, setPerPage] = useState(5); // Estado: gerenciar a quantidade de resultados por página
  const [data, setData] = useState({} | []); // Estado: armazenar os dados obtidos da API
  const nav = useNavigate(); // Navegação
  useEffect(() => {
    fetch(`${API_URL}/users?page=${activePage}&per_page=${perPage}`)
      .then(response => response.json())
      .then(data => setData(data));
  }, [activePage, perPage]);

  /**
   * Função para alterar o valor (estado) da página ativa.
   *
   * @param {Number} page
   */
  function changeActivePage(page = 1) {
    setActivePage(page);
  }

  /**
   * Função para alterar o valor (estado) da quantidade de resultados por página.
   *
   * @param {Number} event
   */
  function changePerPage(event) {
    setPerPage(event.target.value);
  }

  /**
   * Variável (array) que armazena as linhas para mostrar na tabela de usuários.
   */
  let userItems = data.data?.map(item => (
    <Tr key={item.id}>
      <Td>{item.id}</Td>
      <Td>
        <img className="avatar" src={item.avatar} alt={item.fisrt_name} />
      </Td>
      <Td>
        {item.first_name} {item.last_name}
      </Td>
      <Td>{item.email}</Td>
    </Tr>
  ));

  return (
    <>
      <button className="btn btn-primary ms-2" onClick={() => nav('/cadastro')}>
        <i className="fas fa-plus-circle"></i> New
      </button>
      <TableContainer>
        <Table variant="striped">
          <TableCaption>Usuarios Cadastrados</TableCaption>

          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Avatar</Th>
              <Th>Nome</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>{userItems}</Tbody>
          <Tfoot>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Pagination
        pages={data.total_pages}
        changeActivePage={changeActivePage}
        changePerPage={changePerPage}
        activePage={activePage}
      />
    </>
  );
}
