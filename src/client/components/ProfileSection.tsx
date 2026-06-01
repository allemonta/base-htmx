import { Session } from "fastify"

type InputProps = {
  session?: Session
  error?: string
}

const ProfileSection = ({ session, error }: InputProps) => {
  if (session?.username) {
    return (
      <div id="profile-section">
        <p>Loggato come <strong>{session.username}</strong></p>
        <button hx-post="/logout" hx-target="#profile-section" hx-swap="outerHTML">
          Logout
        </button>
      </div>
    )
  }

  return (
    <div id="profile-section">
      {error && <p class="error">{error}</p>}
      <form hx-post="/login" hx-target="#profile-section" hx-swap="outerHTML">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default ProfileSection
