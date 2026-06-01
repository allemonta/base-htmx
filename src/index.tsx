import env from "./utils/env"
import { join } from "path"
import { buildSync } from "esbuild"

/* Fastify Stuffs */
import Fastify from "fastify"
import fastifyHtml from "@kitajs/fastify-html-plugin"
import { validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod"
import fastifySession from "@fastify/session"
import fastifyCookie from "@fastify/cookie"
import fastifyMultipart from "@fastify/multipart"
import fastifyStatic from "@fastify/static"
import fastifyFormbody from "@fastify/formbody"

/* Router */
import clientRouter from "./client/router"

/* Handlers */
import notFoundHandler from "./handlers/notFound"
import errorHandler from "./handlers/error"

const server = (
  Fastify()
    .withTypeProvider<ZodTypeProvider>()
    .setValidatorCompiler(validatorCompiler)
)

server.register(fastifyCookie)
server.register(fastifySession, {
  secret: env.SESSION_SECRET,
  cookie: { secure: false },
})
server.register(fastifyHtml)
server.register(fastifyMultipart)
server.register(fastifyFormbody)
server.register(fastifyStatic, {
  root: join(import.meta.dirname, "..", "public"),
  prefix: "/public/"
})

/* Register handlers */
notFoundHandler(server)
errorHandler(server)

/* Register routes */
clientRouter(server)

/* 
  Build and serve the client script on the fly. 
  In production, you should pre-build this and serve it as a static file with "build:client" script in package.json
*/
server.get("/live-script", (_req, reply) => {
  const result = buildSync({
    entryPoints: [join(import.meta.dirname, "client", "index.ts")],
    bundle: true,
    minify: true,
    write: false,
    format: "esm",
  })

  const script = result.outputFiles[0].text
  return reply
    .type("application/javascript")
    .send(script)
})

server.listen({ port: +env.PORT, host: "0.0.0.0" })
console.log(`
App is listening on port ${env.PORT}
Try http://localhost:${env.PORT}
`)
