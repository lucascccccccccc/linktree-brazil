"use client"

import { useEffect, useState } from "react"
import { HomeButton, Navigation } from "@/components/navigation"
import { UserProfile } from "@/components/user-profile"
import axios from "axios"
import { useParams } from "next/navigation"

interface Profile {
  id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  description: string;
}

export default function UserPage() {
  const params = useParams();
  const username = params?.username as string | undefined;
  // const [user, setUser] = useState(null)
  const [links, setLinks] = useState([])
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState(false);


  useEffect(() => {
    if (!username || typeof username !== "string") return;

    async function fetchUser() {
      try {
        const res = await axios.get(`http://localhost:3001/api/users/username/${username}`);
        setProfile(res.data);
        setLinks(res.data.links);
      } catch {
        setError(true);
      }
    }

    fetchUser();
  }, [username]);

  if (error) {
    return (
      <main className="flex items-center justify-center h-screen text-center">
        <p className="text-red-500 text-2xl font-semibold">user not found - 404</p><br /><br /><br />
        <a href="/">go home</a>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex items-center justify-center h-screen text-center">
        <p className="text-gray-500 text-lg">Carregando perfil...</p>
      </main>
    );
  }

  return (
    <>
      <HomeButton />
      <UserProfile user={profile} links={links} />
    </>
  )
}
