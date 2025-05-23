"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, User, LogOut, Home, Layout, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Cookies from "js-cookie"

type UserType = {
  id: string
  name: string
  username: string
  email: string
  photo?: string
  description?: string
} | null

interface DashboardHeaderProps {
  user: UserType
}

export function DashboardHeaderr({ user }: DashboardHeaderProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    Cookies.remove("token")
    router.push("/login")
    // console.log("Cookies removed " + Cookies.get("token"))
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <Link href="/dashboard" className="text-xl font-bold">
          LinkTree Clone
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100">
                      <User className="h-4 w-4" />
                    </div>
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <Layout className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/u/${user.username}`} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View your page
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button variant="destructive" size="sm" onClick={handleLogout} className="flex items-center gap-1 ml-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg font-medium flex items-center" onClick={() => setIsOpen(false)}>
                    <Home className="h-5 w-5 mr-2" />
                    Home
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-lg font-medium flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Layout className="h-5 w-5 mr-2" />
                    Dashboard
                  </Link>
                  {user && (
                    <Link
                      href={`/u/${user.username}`}
                      className="text-lg font-medium flex items-center"
                      target="_blank"
                      onClick={() => setIsOpen(false)}
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      View your page
                    </Link>
                  )}
                  <div className="flex flex-col gap-2 mt-4">
                    <Button asChild variant="outline">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        Register
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex items-center justify-center gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
