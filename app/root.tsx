import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import iconHref from './components/icon/sprite.svg'
import type { Route } from './+types/root'
import './app.css'

export const links: Route.LinksFunction = () => [
  // Preload svg sprite as a resource to avoid render blocking
  {
    rel: 'preload',
    href: iconHref,
    as: 'image',
    type: 'image/svg+xml',
  },
  //   { rel: "preconnect", href: "https://fonts.googleapis.com" },
  //   {
  //     rel: "preconnect",
  //     href: "https://fonts.gstatic.com",
  //     crossOrigin: "anonymous",
  //   },
  //   {
  //     rel: "stylesheet",
  //     href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  //   },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
