import { createContext, useContext, useState } from "react";
import { api } from '../server/api'
import { AuthenticateContext } from "../contexts/AuthenticateContext";

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const { savedUser } = useContext(AuthenticateContext)
  const [data, setData] = useState({});

  const Authorization = savedUser ? {
    'Authorization': 'Bearer ' + savedUser.token
  } : {}


  async function signIn({ email, password }) {
    const response = await api.post("authenticate", { email, password });
    const { id, name, token } = response.data;
    const user = { id, name }

    localStorage.setItem("@telosflix:user", JSON.stringify(user));
    localStorage.setItem("telosflix:token", token)

    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ user, token })
  }

  async function addMovies({ movie }) {
    try {
      await api.post(`movies`, movie);
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <AuthContext.Provider value={{ signIn, addMovies, user: data.user }}>
      {children}
    </AuthContext.Provider>

  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context;
}

export { AuthProvider, useAuth };