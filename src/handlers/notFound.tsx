import { ZodFastifyInstance } from "../types"
import MainLayout from "../client/layouts/MainLayout"

export default (server: ZodFastifyInstance) => {
  server.setNotFoundHandler((_req, reply) => {
    reply.status(404)
    return reply.html(
      <MainLayout head={{ title: "404 - Non trovato" }}>
        <div class="container">
          <h1>404</h1>
          <p>Pagina non trovata.</p>
          <a href="/">Torna alla homepage</a>
        </div>
      </MainLayout>
    )
  })
}
