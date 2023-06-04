import { createContext, useContext, useState } from "react";
import { api } from '../server/api'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [data, setData] = useState({});


  async function signIn({ email, password }) {
    const response = await api.post("authenticate", { email, password });
    const { id, name, token } = response.data;
    const user = { id, name }

    localStorage.setItem("@telosflix:user", JSON.stringify(user));
    localStorage.setItem("telosflix:token", token)

    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ user, token })
    console.log(response)
  }

  async function updateProfile({ id, name, email, age }) {
    try {
      await api.put(`users/${id}`, { name, email, age, password: null }).then(response => {
        const { token } = JSON.parse(localStorage.getItem("user"));
        response.data.token = token

        localStorage.setItem("user", JSON.stringify(response.data))
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function updateProfilePassword({ id, password, confirmPassword }) {
    try {
      await api.put(`users/${id}`, { password, confirmPassword });

    } catch (err) {
      console.log(err)
    }
  }


  async function addMovies({ movie }) {
    try {
      await api.post(`movies`, movie);

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <AuthContext.Provider value={{ signIn, updateProfile, addMovies, updateProfilePassword, user: data.user }}>
      {children}
    </AuthContext.Provider>

  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context;
}

export { AuthProvider, useAuth };