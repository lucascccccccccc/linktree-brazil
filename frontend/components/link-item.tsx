"use client"

import type React from "react"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Link = {
  id: string
  title: string
  url: string
  description?: string
}

interface LinkItemProps {
  link: Link
  onDelete: () => void
}

export function LinkItem({ link, onDelete }: LinkItemProps) {
  return (
    <div className="flex items-center justify-between rounded-md border border-zinc-200 bg-white p-3">
      <div className="flex-1 truncate">
        <p className="font-medium">{link.title}</p>
        <p className="truncate text-sm text-zinc-500">{link.url}</p>
        {link.description && <p className="mt-1 text-xs text-zinc-400 line-clamp-1">{link.description}</p>}
      </div>
      <Button variant="ghost" size="icon" onClick={onDelete} className="text-zinc-500 hover:text-red-500">
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  )
}

interface LinkItemFormProps {
  onSubmit: (link: { title: string; url: string; description?: string }) => void
}

export function LinkItemForm({ onSubmit }: LinkItemFormProps) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!title.trim() || !url.trim()) return

    // Ensure URL has protocol
    let formattedUrl = url
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = `https://${url}`
    }

    onSubmit({
      title,
      url: formattedUrl,
      description: description.trim() ? description : undefined,
    })

    setTitle("")
    setUrl("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Link Title</Label>
        <Input id="title" placeholder="My Website" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="A short description of this link"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </div>
      <Button type="submit" className="w-full">
        Add Link
      </Button>
    </form>
  )
}
