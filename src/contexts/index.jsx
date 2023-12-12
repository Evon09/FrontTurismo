import React, { createContext, useEffect, useState } from 'react';
import {
  CadPacote,
  DeleteFeedback,
  DeletePacote,
  DeleteTour,
  DoFeedback,
  FeedbacksTour,
  GetPacote,
  GetPacotes,
  GetTours,
  GetUser,
  IsAdm,
  LoginRequest,
  PacotesUser,
  PostFeedback,
  RegisterRequest,
  ReservaAgencia,
  ReservaPacote,
  TourRegisterRequest,
  getUserLocalStorage,
  setUserLocalStorage,
} from './utils';

import AuthContext from './auth';

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getUserLocalStorage();

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  async function authenticate(username, password) {
    try {
      const response = await LoginRequest(username, password);

      if (response) {
        const token = response?.['jwt-token'] ?? '';
        const userId = response?.user?.id ?? '';

        const payload = {
          token,
          id: userId,
          username,
        };
        setUser(payload);
        setUserLocalStorage(payload);
      } else {
        throw new Error('Erro no processo de autenticação');
      }
    } catch (err) {
      console.error('Erro na autenticação:', err);
      throw err; // Rejoga o erro após o tratamento, se necessário
    }
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  async function register(email, name, password) {
    try {
      await RegisterRequest(email, name, password);
    } catch (err) {
      throw err;
    }
  }

  async function tourRegister(
    token,
    preco,
    itinerario,
    destino,
    agenciaId,
    img,
    dataIda,
    dataVolta
  ) {
    try {
      await TourRegisterRequest(
        token,
        preco,
        itinerario,
        destino,
        agenciaId,
        img,
        dataIda,
        dataVolta
      );
    } catch (err) {
      throw err;
    }
  }

  async function UserInfo(token, id) {
    try {
      const response = await GetUser(token, id);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async function isAdm(token, id) {
    try {
      const response = await IsAdm(token, id);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async function Pacotes(token) {
    try {
      const response = await GetPacotes(token);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async function Pacote(id) {
    try {
      const response = await GetPacote(id);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async function Tours(token) {
    try {
      const response = await GetTours(token);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async function deleteTour(token, id) {
    try {
      await DeleteTour(token, id);
    } catch (err) {
      throw err;
    }
  }
  async function PacoteRegister(
    token,
    // nome,
    agenciaId,
    dataInicial,
    dataFinal,
    passeiosIds
  ) {
    try {
      const response = await CadPacote(
        token,
        // nome,
        agenciaId,
        dataInicial,
        dataFinal,
        passeiosIds
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  async function reservaPacote(token, id, cliente) {
    try {
      const response = await ReservaPacote(token, id, cliente);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async function pacotesUser(token, id) {
    try {
      const response = await PacotesUser(token, id);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async function reservaAgencia(token, id) {
    try {
      const response = await ReservaAgencia(token, id);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async function deletePacote(token, id) {
    try {
      await DeletePacote(token, id);
    } catch (err) {
      throw err;
    }
  }

  async function postFeedback(userId, tourId, userName, stars, description) {
    try {
      const response = await PostFeedback(
        userId,
        tourId,
        userName,
        stars,
        description
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  async function doFeedback(userId, tourId) {
    try {
      const response = await DoFeedback(userId, tourId);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async function feedbacksTour(tourId) {
    try {
      const response = await FeedbacksTour(tourId);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async function deleteFeedback(_id) {
    try {
      const response = await DeleteFeedback(_id);
      return response;
    } catch (err) {
      throw err;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...user,
        authenticate,
        logout,
        register,
        tourRegister,
        UserInfo,
        Pacotes,
        Pacote,
        Tours,
        PacoteRegister,
        isAdm,
        deleteTour,
        deletePacote,
        reservaPacote,
        pacotesUser,
        reservaAgencia,
        postFeedback,
        doFeedback,
        feedbacksTour,
        deleteFeedback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
