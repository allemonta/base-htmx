import Fastify from "fastify"
import fastifyHtml from "@kitajs/fastify-html-plugin"
import { readFileSync, statSync, existsSync } from "node:fs"
import path from "node:path"
import { db } from "./db"
import { usersTable } from "./db/schema"
import { validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'

import Counter from "./components/Counter"
import MainLayout from "./layouts/MainLayout"
import { el } from "zod/locales"

const app = Fastify().withTypeProvider<ZodTypeProvider>().setValidatorCompiler(validatorCompiler)

app.register(fastifyHtml)

const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
sint occaecat cupidatat non proident, sunt in culpa qui officia
deserunt mollit anim id est laborum.
`

app.get("/", (req, reply) => {
  return reply.html(
    <html lang="it">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lorem Ipsum</title>
        <style>{`
          h1 { color: red }
        `}</style>
      </head>
      <body>
        <h1>Lorem Ipsum</h1>
        <p> {loremIpsum} </p>
        <p> {loremIpsum} </p>
      </body>
    </html>
  )
})

// app.get("/riccardo", (req, reply) => {
//   return reply.html(
//     <html>
//       <body>
//         <h1>Riccardo</h1>
//       </body>
//     </html>
//   )
// })

let count = 0
app.get("/count", (req, reply) => {
    count++
    
    return reply.html(
        <html>
            <body>
                <Counter 
                    count={count}
                />
            </body>
        </html>
    )
})

app.get("/carlo", (req, reply) => {
  return reply.html(
    <MainLayout>
      <h1>Carlo</h1>
      <img
        src="/public/carlo.jpg"
      />
    </MainLayout>
  )
})

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
}

app.get("/public/*", (req, reply) => {
  const target = (req.params as { "*": string })["*"]
  const filePath = path.resolve(process.cwd(), "public", target)

  const exists = existsSync(filePath)
  if (!exists) {
    return reply.status(404).send("Not found :(")
  }

  const ext = target.split(".")[1].toLowerCase()
  const contentType = MIME_TYPES[ext]

  const content = readFileSync(filePath)
  return reply
    .type(contentType)
    .send(content)
})


const createUserSchema = {
  body: z.object({
    name: z.string(),
    email: z.email(),
    lastName: z.string(),
    userName: z.string()
  })
}

app.post("/createUser", {
  schema: createUserSchema
}, async(req, res) => {
  const body = req.body

  await db.insert(usersTable).values(body)
})

app.get("/listUsers", async(req, res) => {
    const result = await db.query.usersTable.findMany()

    return res.html(
      <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>User Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {result.map(user => (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.lastName}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
    )
})
app.listen({ port: 3001, host: "0.0.0.0" })
console.log("App is listening on port 3001")
