import { Api, Api2 } from '../service/api';
import qs from 'qs';

export function setUserLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem('user');

  if (!json) {
    return null;
  }
  const user = JSON.parse(json);

  return user || null;
}

export async function LoginRequest(username, password) {
  try {
    const request = await Api.post('auth', { username, password });

    return request.data;
  } catch (error) {
    return null;
  }
}

export async function RegisterRequest(nome, email, cpfCnpj, tipo, senha) {
  try {
    await Api.post('/person', {
      nome,
      email,

      cpfCnpj,
      tipo,
      senha,
    });

    return null;
  } catch (error) {
    throw error;
  }
}
export async function TourRegisterRequest(
  token,
  preco,
  itinerario,
  destino,
  agenciaId,
  imagem,
  dataIda,
  dataVolta
) {
  try {
    await Api.post(
      '/tour',
      {
        preco,
        itinerario,
        destino,
        agenciaId,
        imagem,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return null;
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
  }
}

export async function GetUser(token, id) {
  try {
    const response = await Api.get(`/person/${id}`, {
      params: {}, // Se precisar enviar parâmetros, coloque-os aqui
      paramsSerializer: params => qs.stringify(params, { indices: false }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data; // Retorna os dados da pessoa
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
    throw error; // Lança a exceção novamente para que a chamada do código possa tratá-la
  }
}

export async function IsAdm(token, id) {
  try {
    if (token === undefined) {
      return false;
    } else {
      const response = await Api.get(`/person/${id}`, {
        params: {}, // Se precisar enviar parâmetros, coloque-os aqui
        paramsSerializer: params => qs.stringify(params, { indices: false }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data.tipo === 'AGENCIA_VIAGEM' ? true : false;
    }
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
    throw error; // Lança a exceção novamente para que a chamada do código possa tratá-la
  }
}

export async function GetPacotes() {
  try {
    const response = await Api.get(`/booking`, {
      params: {}, // Se precisar enviar parâmetros, coloque-os aqui
      paramsSerializer: params => qs.stringify(params, { indices: false }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data; // Retorna os dados da pessoa
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
    throw error; // Lança a exceção novamente para que a chamada do código possa tratá-la
  }
}

export async function GetPacote(id) {
  try {
    const response = await Api.get(`/booking/${id}`, {
      params: {}, // Se precisar enviar parâmetros, coloque-os aqui
      paramsSerializer: params => qs.stringify(params, { indices: false }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data; // Retorna os dados da pessoa
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
    throw error; // Lança a exceção novamente para que a chamada do código possa tratá-la
  }
}

export async function GetTours(token) {
  try {
    const response = await Api.get(`/tour`, {
      params: {}, // Se precisar enviar parâmetros, coloque-os aqui
      paramsSerializer: params => qs.stringify(params, { indices: false }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data; // Retorna os dados da pessoa
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
    throw error; // Lança a exceção novamente para que a chamada do código possa tratá-la
  }
}

export async function DeleteTour(token, id) {
  try {
    await Api.delete(`/tour/${id}`, {
      params: {}, // Se precisar enviar parâmetros, coloque-os aqui
      paramsSerializer: params => qs.stringify(params, { indices: false }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
    throw error; // Lança a exceção novamente para que a chamada do código possa tratá-la
  }
}

export async function CadPacote(
  token,
  // nome,
  agenciaId,
  dataInicial,
  dataFinal,
  passeiosIds
) {
  try {
    await Api.post(
      '/booking',
      {
        // nome,
        agenciaId,
        dataInicial,
        dataFinal,
        passeiosIds,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return null;
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
    throw error; // Lança a exceção novamente para que a chamada do código possa tratá-la
  }
}

export async function ReservaPacote(token, id, clientes) {
  try {
    await Api.post(
      `/booking/${id}/addUser/${clientes}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return null;
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
    throw error; // Lança a exceção novamente para que a chamada do código possa tratá-la
  }
}

export async function PacotesUser(token, id) {
  try {
    const response = await Api.get(`/booking/person/${id}`, {
      params: {}, // Se precisar enviar parâmetros, coloque-os aqui
      paramsSerializer: params => qs.stringify(params, { indices: false }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data; // Retorna os dados da pessoa
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
    throw error; // Lança a exceção novamente para que a chamada do código possa tratá-la
  }
}

export async function ReservaAgencia(token, id) {
  try {
    const response = await Api.get(
      `/booking/agency/${id}/packages-with-clients`,
      {
        params: {}, // Se precisar enviar parâmetros, coloque-os aqui
        paramsSerializer: params => qs.stringify(params, { indices: false }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data; // Retorna os dados da pessoa
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
    throw error; // Lança a exceção novamente para que a chamada do código possa tratá-la
  }
}

export async function DeletePacote(token, id) {
  try {
    await Api.delete(`/booking/${id}`, {
      params: {}, // Se precisar enviar parâmetros, coloque-os aqui
      paramsSerializer: params => qs.stringify(params, { indices: false }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
    throw error; // Lança a exceção novamente para que a chamada do código possa tratá-la
  }
}

export async function PostFeedback(
  userId,
  tourId,
  userName,
  stars,
  description
) {
  try {
    const response = await Api2.post(
      `/feedback`,
      {
        userId,
        tourId,
        userName,
        stars,
        description,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        paramsSerializer: params => qs.stringify(params, { indices: false }),
      }
    );
    return response;
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
    throw error;
  }
}

export async function DoFeedback(userId, tourId) {
  try {
    const response = await Api2.get(
      `/feedback/check/${userId}/${tourId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        paramsSerializer: params => qs.stringify(params, { indices: false }),
      }
    );

    // Certifique-se de que você está acessando a propriedade correta na resposta
    const hasFeedback = response.data.hasFeedback; // ou response.hasFeedback dependendo da estrutura da resposta

    return hasFeedback;
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
    throw error;
  }
}

export async function FeedbacksTour(tourId) {
  try {
    const response = await Api2.get(
      `/feedback/tour/${tourId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        paramsSerializer: params => qs.stringify(params, { indices: false }),
      }
    );
    return response;
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
    throw error;
  }
}

export async function DeleteFeedback(_id) {
  try {
    const response = await Api2.delete(
      `/feedback/${_id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        paramsSerializer: params => qs.stringify(params, { indices: false }),
      }
    );
    return response;
  } catch (error) {
    console.error('Erro:', error);
    console.error('Detalhes da resposta:', error.response);
    throw error;
  }
}
