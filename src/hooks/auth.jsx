import { createContext, useContext, useState } from "react";
import { api } from '../server/api'

export const AuthContext = createContext({})

function AuthProvider({children}){
  const [data, setData] = useState({});


  async function signIn({email, password}){
      const response = await api.post("authenticate", {email, password});
      const {_id, name, token} = response.data;
      const user = {_id, name}

      localStorage.setItem("@telosflix:user", JSON.stringify(user));
      localStorage.setItem("telosflix:token", token)

      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({user, token})
      console.log(response)
  }

  async function updateProfile({id, name, email, birthDate }){
    const response = await api.put(`users/${id}`, {name, email, birthDate});
    const {user, token} = response.data;
    console.log("user teste" + user)

    localStorage.setItem("@telosflix:user", JSON.stringify(user));
    localStorage.setItem("telosflix:token", token)

    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({user, token})
    console.log(response)
}

async function updateProfilePassword({id, password, confirmPassword  }){
  const response = await api.put(`users/${id}`, {password, confirmPassword});
  const {user, token} = response.data;
  console.log("user teste" + user)

  localStorage.setItem("@telosflix:user", JSON.stringify(user));
  localStorage.setItem("telosflix:token", token)

  api.defaults.headers.authorization = `Bearer ${token}`;
  setData({user, token})
  console.log(response)
}




 

  return(
     <AuthContext.Provider value={{signIn, updateProfile, updateProfilePassword, user: data.user}}>
      {children}
     </AuthContext.Provider>
     
  )
}

function useAuth(){
  const context = useContext(AuthContext)
  return context;
}

export { AuthProvider, useAuth };