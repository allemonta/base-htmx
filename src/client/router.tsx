import { ZodFastifyInstance } from "../types"
import MainLayout from "./layouts/MainLayout"
import Counter from "./components/Counter"
import ProfileSection from "./components/ProfileSection"
import z from "zod"
import env from "../utils/env"

let count = 0

export default (server: ZodFastifyInstance) => {
  server.get("/", (req, reply) => {
    return reply.html(
      <MainLayout>
        <div class="max-w-3xl mx-auto p-8">
          <h1 class="text-3xl font-bold mb-6">Homepage</h1>

          <div class="flex items-center gap-4">
            <Counter count={count} />
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 cursor-pointer"
              hx-post="/count"
              hx-target="#counter"
              hx-swap="outerHTML"
            >
              +1
            </button>
          </div>

          <hr class="my-8" />

          <ProfileSection session={req.session} />
        </div>
      </MainLayout>,
    )
  })

  server.post("/count", (_req, reply) => {
    count++
    return reply.html(<Counter count={count} />)
  })

  server.post(
    "/login",
    {
      schema: {
        body: z.object({
          username: z.string().min(1),
          password: z.string().min(1),
        }),
      },
    },
    (req, reply) => {
      const { username, password } = req.body

      if (password !== env.COMMON_PASSWORD) {
        return reply.html(
          <ProfileSection session={req.session} error="Wrong password" />,
        )
      }

      req.session.username = username
      return reply.html(<ProfileSection session={req.session} />)
    },
  )

  server.post("/logout", async (req, reply) => {
    await req.session.destroy()
    return reply.html(<ProfileSection session={req.session} />)
  })
}
