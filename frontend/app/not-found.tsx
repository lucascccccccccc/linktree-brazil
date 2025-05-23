import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-zinc-500">The page you are looking for doesn't exist or has been moved.</p>
      <Button asChild className="mt-8">
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  )
}
