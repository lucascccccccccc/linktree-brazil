"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import Cookies from "js-cookie"
import axios from "axios"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [photo, setPhoto] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [description, setDescription] = useState("")
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')

    if (token) {
      router.push('/dashboard')
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', { name, username, email, password, photo, description })
      const { message } = response.data

      setErrorMessage(message)
      // alert(message)
      router.push('/login')
    } catch (err: any) {
      // console.log('Erro no login:', err)
      // setErrorMessage(err?.response?.data?.message || 'Erro interno!')
      setErrorMessage(err?.response?.data?.message || 'internal error')
      // alert('Erro ao fazer login: ' + (err?.response?.data?.message || 'Erro interno'))
    }
  }

  if (isLoading) {
    return <p className="text-center mt-20">Verificando autenticação...</p>
  }

  return (
    <>
      <Navigation />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photoURL">Photo URL</Label>
                <Input
                  id="photoURL"
                  placeholder="https://example.com/photo.jpg"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={description}
                  placeholder="Describe yourself"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>

              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Register"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-zinc-900 hover:underline">
                  Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  )
}
