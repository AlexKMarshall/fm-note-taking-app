import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  layout('./auth/layout.tsx', [
    route('signup', 'auth/signup.tsx'),
    route('login', 'auth/login.tsx'),
  ]),
  layout('routes/layout.tsx', [
    index('routes/home.tsx'),
    layout('./notes/layout.tsx', [
      ...prefix('notes', [
        index('./notes/home.tsx'),
        route('new', './notes/new.tsx'),
        route(':id', './notes/note.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig
