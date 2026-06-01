import { Session } from "fastify"

type InputProps = {
  session?: Session
  error?: string
}

const ProfileSection = ({ session, error }: InputProps) => {
  if (session?.username) {
    return (
      <div id="profile-section">
        <p class="text-lg">
          Logged in as <strong>{session.username}</strong>
        </p>
        <button
          class="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"
          hx-post="/logout"
          hx-target="#profile-section"
          hx-swap="outerHTML"
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <div id="profile-section">
      {error && <p class="text-red-600 font-medium mb-4">{error}</p>}
      <form hx-post="/login" hx-target="#profile-section" hx-swap="outerHTML">
        <div class="mb-4">
          <label class="block font-medium mb-1" for="username">
            Username
          </label>
          <input
            class="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            id="username"
            name="username"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1" for="password">
            Password
          </label>
          <input
            class="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default ProfileSection
