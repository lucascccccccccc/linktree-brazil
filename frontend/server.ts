import { serve } from "bun"
import { parse } from "url"
import next from "next"

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = 3000

// Initialize Next.js
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  // Create a custom server with Bun
  const server = serve({
    port,
    fetch(req: any) {
      const parsedUrl = parse(req.url, true)

      return new Promise((resolve, reject) => {
        handle(
          req,
          {
            end: (body) => {
              resolve(new Response(body))
            },
            setHeader: () => { },
            write: () => { },
            writeHead: () => { },
          },
          parsedUrl,
        ).catch(reject)
      })
    },
  })

  console.log(`> Ready on http://${hostname}:${port}`)
})
