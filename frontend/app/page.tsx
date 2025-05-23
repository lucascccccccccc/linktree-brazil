import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 p-4">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">LinkTree Clone</h1>
            <p className="text-zinc-500">Share all your links in one simple, easy-to-navigate page.</p>
          </div>
          <div className="flex flex-col space-y-4">
            <Button asChild size="lg" className="w-full">
              <Link href="/register">Get Started</Link>
            </Button>
            <div className="text-sm text-zinc-500">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-zinc-900 hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
