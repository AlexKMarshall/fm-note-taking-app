import { Link } from 'react-router'

export default function Signup() {
  return (
    <>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-gray-950">
          Create Your Account
        </h1>
        <p className="text-sm text-gray-600">
          Sign up to start organizing your notes and boost your productivity.
        </p>
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2.5">
          <label htmlFor="email" className="text-sm text-gray-950">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="email@example.com"
            className="rounded-lg border border-gray-300 px-4 py-3 hover:bg-gray-50 focus-visible:border-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <label htmlFor="password" className="text-sm text-gray-950">
            Password
          </label>
          <input
            id="password"
            type="password"
            aria-describedby="password-description"
            className="rounded-lg border border-gray-300 px-4 py-3 hover:bg-gray-50 focus-visible:border-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
          />
          <p id="password-description" className="text-xs text-gray-600">
            At least 8 characters
          </p>
        </div>
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-blue-500 px-4 py-3 text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gray-400"
        >
          Sign Up
        </button>
      </form>
      <div className="h-px w-full bg-gray-200" />
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-gray-950">
          Login
        </Link>
      </p>
    </>
  )
}
