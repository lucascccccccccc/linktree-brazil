"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Navigation } from "@/components/navigation"
import Cookies from "js-cookie";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      router.push("/dashboard");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password },
      );
      const { token } = response.data;

      if (!token) {
        alert("Login inválido");
        return;
      }

      Cookies.set("token", token, { path: "/", expires: 7 });
      // alert("Login efetuado com sucesso!");
      router.push("/dashboard");
    } catch (err: any) {
      // console.log("Erro no login:", err);
      setErrorMessage(err?.response?.data?.message || "Erro interno!");
      // alert("Erro ao fazer login: " +(err?.response?.data?.message || "Erro interno"), );
    }
  };

  return (
    <>
      <Navigation />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Enter your email and password to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-medium text-zinc-900 hover:underline">
                  Register
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  )
}

