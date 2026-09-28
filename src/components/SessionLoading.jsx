import Spinner from './Spinner.jsx'

// Lo que se ve mientras Firebase decide si hay sesion. No redirige: todavia no
// sabe, y mandarlo a /login antes de tiempo seria expulsar a un cajero que si
// esta autenticado.
export default function SessionLoading() {
  return (
    <div className="login-page">
      <Spinner label="Verificando sesión…" />
    </div>
  )
}
