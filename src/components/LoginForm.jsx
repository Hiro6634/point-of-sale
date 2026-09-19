import { useState } from 'react'
import { signInAuthUserWithEmailAndPassword } from '../firebase/firebase.utils.js'
import { AUTH_ERROR_MESSAGES } from '../lib/auth-errors.js'
import FormInput from './form-input/FormInput.jsx'

const MIN_PASSWORD_LENGTH = 6

export default function LoginForm({ onSignIn }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(event) {
    const { value, name } = event.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const email = credentials.email.trim()
    const password = credentials.password

    if (!email || !password) {
      setError('Ingresá tu email y contraseña.')
      return
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`)
      return
    }

    setSubmitting(true)
    try {
      const user = await signInAuthUserWithEmailAndPassword({ email, password })
      onSignIn(user)
    } catch (firebaseError) {
      setError(
        AUTH_ERROR_MESSAGES[firebaseError.code] ??
          'No se pudo iniciar sesión. Intentalo de nuevo.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="login-page">
      <div className="sign-in-container">
        <h2>Ingrese su email y password</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            name="email"
            type="email"
            label="Email"
            value={credentials.email}
            handleChange={handleChange}
            autoComplete="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            label="Password"
            value={credentials.password}
            handleChange={handleChange}
            autoComplete="current-password"
            required
          />
          {error && <p className="login-error" role="alert">{error}</p>}
          {submitting && <p className="login-submitting">Verificando…</p>}
          <button type="submit" className="login-button" disabled={submitting}>
            Ingresar
          </button>
        </form>
      </div>
    </section>
  )
}
