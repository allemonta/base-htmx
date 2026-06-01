import { PropsWithChildren } from "@kitajs/html"

type InputProps = PropsWithChildren<{
  head?: {
    title?: string
  }
}>

export default (props: InputProps) => {
  const { children } = props
  const title = props.head?.title || "My Webapp"

  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background: #f8f9fa;
            padding: 2rem;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
          }
          h1 {
            font-size: 2rem;
            margin-bottom: 1.5rem;
          }
          .counter-wrapper {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          #counter {
            font-size: 1.25rem;
            font-weight: 500;
          }
          button {
            padding: 0.5rem 1rem;
            font-size: 1rem;
            border: none;
            border-radius: 6px;
            background: #2563eb;
            color: white;
            cursor: pointer;
            transition: background 0.15s;
          }
          button:hover {
            background: #1d4ed8;
          }
          button:active {
            background: #1e40af;
          }
          .form-group {
            margin-bottom: 1rem;
          }
          .form-group label {
            display: block;
            font-weight: 500;
            margin-bottom: 0.25rem;
          }
          .form-group input {
            width: 100%;
            max-width: 300px;
            padding: 0.5rem 0.75rem;
            font-size: 1rem;
            border: 1px solid #d1d5db;
            border-radius: 6px;
          }
          .form-group input:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
          }
          .error {
            color: #dc2626;
            margin-bottom: 1rem;
            font-weight: 500;
          }
          form button {
            margin-top: 0.5rem;
          }
        `}</style>
      </head>

      <body>
        {children}
        <script src="/live-script"></script>
      </body>
    </html>
  )
}