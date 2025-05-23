"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Cookies from "js-cookie"


export function Navigation() {
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove("token")
    router.push("/login")
    // console.log("Cookies removed " + Cookies.get("token"))
  }

  return (
    <nav className="bg-white border-b py-4">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold">
              LinkTree Clone
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/">Home</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">

            <Button asChild variant="outline" size="sm">
              <Link href="/login">Login</Link>
            </Button>

            <Button asChild variant="outline" size="sm">
              <Link href="/register">Register</Link>
            </Button>

            <Button variant="destructive" size="sm" onClick={handleLogout} className="flex items-center gap-1">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>

          </div>
        </div>
      </div>
    </nav>
  )
}

export function HomeButton() {

  return (
    <nav className="bg-white border-b py-4">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold">
              LinkTree Clone
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
