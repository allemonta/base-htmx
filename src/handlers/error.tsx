import { ZodFastifyInstance } from "../types"
import MainLayout from "../client/layouts/MainLayout"
import { FastifyError } from "fastify"

export default (server: ZodFastifyInstance) => {
  server.setErrorHandler((error: FastifyError, _req, reply) => {
    server.log.error(error)
    console.error("[ERROR]", error.statusCode ?? 500, error.message)
    reply.status(error.statusCode ?? 500)
    return reply.html(
      <MainLayout head={{ title: "Errore" }}>
        <div class="container">
          <h1>{error.statusCode ?? 500}</h1>
          <p>{error.message || "Errore interno del server."}</p>
          <a href="/">Torna alla homepage</a>
        </div>
      </MainLayout>
    )
  })
}
