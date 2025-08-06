import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  layout('./auth/layout.tsx', [
    route('signup', 'auth/signup.tsx'),
    route('login', 'auth/login.tsx'),
  ]),
  ...prefix('notes', [
    index('./notes/home.tsx'),
    route(':id', './notes/note.tsx'),
  ]),
] satisfies RouteConfig
