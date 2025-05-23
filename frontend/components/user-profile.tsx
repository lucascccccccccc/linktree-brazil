"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

type User = {
  id: string
  name: string
  username: string
  email: string
  photo?: string
  description?: string
}

type LinkItem = {
  id: string
  title: string
  url: string
  description?: string
}

interface UserProfileProps {
  user: User
  links: LinkItem[]
}

export function UserProfile({ user, links }: UserProfileProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center bg-gradient-to-b from-zinc-50 to-zinc-100 p-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          {user.photo && !imageError ? (
            <div className="h-24 w-24 overflow-hidden rounded-full">
              <Image
                src={user.photo || "/placeholder.svg"}
                alt={user.name}
                width={96}
                height={96}
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
                unoptimized
              />
            </div>
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-200 text-3xl font-bold text-zinc-800">
              {user.name.charAt(0)}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{user.name}!!!</h1>
            <p className="text-zinc-500">@{user.username}</p>
            {user.description && <p className="mt-2 text-sm text-zinc-600">{user.description}</p>}
          </div>
        </div>

        <div className="space-y-4">
          {links.length === 0 ? (
            <p className="text-center text-zinc-500">No links available</p>
          ) : (
            links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg border border-zinc-200 bg-white p-4 text-center transition-all hover:border-zinc-300 hover:shadow"
              >
                <div className="font-medium">{link.title}</div>
                {link.description && <div className="mt-1 text-sm text-zinc-500">{link.description}</div>}
              </a>
            ))
          )}
        </div>

        <div className="pt-8 text-center text-sm text-zinc-500">
          <p>
            Powered by{" "}
            <Link href="/" className="font-medium hover:underline">
              LinkTree Clone
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
