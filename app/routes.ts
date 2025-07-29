import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  layout('./auth/layout.tsx', [
    route('signup', 'auth/signup.tsx'),
    route('login', 'auth/login.tsx'),
  ]),
] satisfies RouteConfig
