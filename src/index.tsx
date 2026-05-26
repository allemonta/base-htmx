import Fastify from "fastify"
import fastifyHtml from "@kitajs/fastify-html-plugin"

import Counter from "./components/Counter"

const app = Fastify()

await app.register(fastifyHtml)

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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
        <p>
          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam
          varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus
          magna felis sollicitudin mauris. Integer in mauris eu nibh euismod
          gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis
          risus a elit. Etiam tempor. Ut ullamcorper, ligula ut dictum pharetra,
          nisi nunc fringilla magna, in commodo elit erat nec turpis.
        </p>
      </body>
    </html>
  )
})

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

app.listen({ port: 3000, host: "0.0.0.0" })
console.log("App is listening on port 3000")
