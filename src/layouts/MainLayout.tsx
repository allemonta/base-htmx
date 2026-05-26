import { PropsWithChildren } from "@kitajs/html"

type InputProps = PropsWithChildren<{}>

export default ({ children }: InputProps) => (
  <html>
    <head>
    </head>

    <body>
      {children}
    </body>
  </html>
)