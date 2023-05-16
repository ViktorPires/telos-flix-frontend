import { createContext, useContext, useState } from "react";
import { api } from '../server/api'

export const AuthContext = createContext({})

function AuthProvider({children}){
  const [data, setData] = useState({});

  async function signIn({email, password}){
      const response = await api.post("/authenticate", {email, password});
      const {user, token} = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({user, token})
      console.log(response)
  }

  return(
     <AuthContext.Provider value={{signIn, user: data.users}}>
      {children}
     </AuthContext.Provider>
     
  )
}

function useAuth(){
  const context = useContext(AuthContext)
  return context;
}

export { AuthProvider, useAuth };