"use client"

import type React from "react"

import { useState, useEffect } from "react"
import NextLink from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { LinkItem, LinkItemForm } from "@/components/link-item"
import { Navigation } from "@/components/navigation"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

/*
type User = {
  id: string
  name: string
  username: string
  email: string
  photo?: string
  description?: string
}
*/

type LinkType = {
  id: string
  title: string
  url: string
  description?: string
}

interface JwtPayload {
  userId: string;
  name: string;
  username: string;
  email: string;
  exp?: number;
  description: string
  photo: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  // const [error, setError] = useState("");

  const getLinksByUserId = async (userId: string, token: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}/links`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        // alert("Erro ao buscar os links.");
        setLinks([]);
        return;
      }
      const data = await response.json();


      setLinks(data);
    } catch (err) {
      console.error("Erro ao buscar os links:", err);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {

      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        // alert("Sua sessão expirou. Por favor, faça login novamente.");
        Cookies.remove("token");
        router.push("/login");
        return;
      }

      setUser(decoded)
      setUserId(decoded.userId);
      setName(decoded.name);
      setUsername(decoded.username);
      setPhoto(decoded.photo);
      setDescription(decoded.description);
      getLinksByUserId(decoded.userId, token);
    } catch (err) {
      Cookies.remove("token");
      router.push("/login");
    }
  }, [router]);

  if (!user) {
    return <p className="text-center mt-20">Carregando dados do usuário...</p>;
  }


  const handleCreateLink = async (link: { userId: string, title: string; url: string; description?: string }) => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(link),
      });

      if (!response.ok) {
        alert("Erro inesperado ao criar link.");
        Cookies.remove("token");
        router.push("/login");
        return;
      }

      const data = await response.json();
      setLinks([...links, data]);
    } catch (err) {
      console.error("Erro ao criar o link:", err);
    }
  };

  const handleDeleteLink = async (id: string) => {
    setLinks(links.filter((link) => link.id !== id))
  }


  const handleSaveChanges = async () => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          photo,
          name,
          username,
          description
        })
      });

      if (!response.ok) {
        alert("username already exists");
        setUsername(user.username);
        // setError("username already exists");
        setIsUpdating(false);
        return;
      }

      const data = await response.json();
      // alert(data.message + data.user.token);
      Cookies.set("token", data.user.token);
      setUser(data.user.user);
      setTimeout(() => {
        setIsUpdating(false);
      }, 1500);
    } catch (err) {
      console.error("Erro ao atualizar o usuário:", err);
      setIsUpdating(false);
    }
  };


  const handleDeleteUser = async () => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;

    }

    const confirm = window.confirm("Are you sure you want to delete your account?");
    if (!confirm) {
      setIsDeleting(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })

      if (!response.ok) {
        alert("Erro ao deletar o usuário.");
        return;
      }

      setIsDeleting(true);
      Cookies.remove("token");
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err) {
      alert("Erro ao deletar o usuário: " + err);
      setIsDeleting(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navigation />
      <main className="container mx-auto max-w-4xl p-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-zinc-500">Manage your links and profile</p>
          </div>
          {user && (
            <Button asChild>
              <NextLink href={`/u/${user.username}`} target="_blank">
                View your page
              </NextLink>
            </Button>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Links</CardTitle>
                <CardDescription>Add and manage your links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <LinkItemForm onSubmit={(linkData) => handleCreateLink({ ...linkData, userId })} />
                <Separator className="my-4" />
                {links.length === 0 ? (
                  <p className="py-4 text-center text-zinc-500">No links yet. Add your first link above.</p>
                ) : (
                  <div className="space-y-3">
                    {links.map((link) => (
                      <LinkItem key={link.id} link={link} onDelete={() => handleDeleteLink(link.id)} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

          </div>

          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">

                <div className="relative">
                  <img
                    src={user.photo}
                    alt="Foto do usuário"
                    className="flex h-24 w-24 rounded-full object-cover"
                  />
                </div>

                <div className="w-full space-y-2">
                  <Label htmlFor="photo">Profile Photo URL</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="https://example.com/photo.jpg" />
                    </div>
                  </div>
                </div>
              </div>


              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input disabled id="email" type="email" value={user?.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Bio</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              {/* {name} {username} {photo} {description} */}

            </CardContent>
            <CardFooter>
              <Button disabled={isUpdating} className="w-full" onClick={handleSaveChanges}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
            <CardFooter>
              <Button disabled={isDeleting} className="w-full bg-red-500 hover:bg-red-600" onClick={handleDeleteUser}>
                {isDeleting ? "Deleting..." : "Delete Account"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
