import { createContext, useContext, useState } from "react";
import { api } from '../server/api'

export const AuthContext = createContext({})

function AuthProvider({children}){
  const [data, setData] = useState({});

  async function signIn({email, password}){
      const response = await api.post("authenticate", {email, password});
      const {user, token} = response.data;

      localStorage.setItem("@telosflix:user", JSON.stringify(user));
      localStorage.setItem("telosflix:token", token)

      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({user, token})
      console.log(response)
  }


  async function updateProfile({ user }){
    try{
       await api.put("/users", user);
       localStorage.setItem("telosflix:token", JSON.stringify(user));
       setData({user, token: data.token});
       alert("Perfil atualizado!")

    }catch(error){
      if(error.response){
        alert(error.response.data.message)
      }else{
        alert("Não foi possivel atualizar o perfil")
      }
    }
}

  return(
     <AuthContext.Provider value={{signIn, updateProfile, user: data.user}}>
      {children}
     </AuthContext.Provider>
     
  )
}

function useAuth(){
  const context = useContext(AuthContext)
  return context;
}

export { AuthProvider, useAuth };