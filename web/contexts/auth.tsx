import Cookies from "js-cookie";
import router from "next/router";
import React, { Component, createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/User";
import { api } from "../services/api";
import { parseCookies, setCookie, destroyCookie } from 'nookies'


interface AuthContextData {
  signed: boolean;
  user: IUser | null;
  loading: boolean;
  Login(username: string, password: string): Promise<void>;
  Logout(): Promise<void>;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData)


export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUserFromCookie() {
      const { 'token': token } = parseCookies()
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const { data: user } = await api.post('/users/me')
        if (user) setUser(user)
      }
    }
    loadUserFromCookie()
  })

  async function Login(username: string, password: string) {
    api.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
    api.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    const { data: token } = await api.post('/login', { username, password })
    setCookie(undefined, 'token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const { data: user } = await api.post('/users/me')
    if (user) setUser(user)
    setLoading(false)
    router.push('/dashboard')
  }

  async function Logout() {
    destroyCookie(undefined, 'token')
    setUser(null)
    api.defaults.headers.delete['Authorization']
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, loading, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  )
}
export function useAuth() {
  const context = useContext(AuthContext)

  return context
}





export default AuthContext