import { Link } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
const Logo = require("../images/job-search-logo.png")


const Navbar = () => {
  const { logout } = useLogout( )
  const { user } = useAuthContext()
  const { login } = useLogin()

  const handleClick = () => {
    logout()
  }

  const handleLoginDemo = async (e) => {
    e.preventDefault()
    await login("sampleuser123@gmail.com", "sampleuser")
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <div className="logo-header">
            <img className="nav-logo" src={Logo} alt="Job-Search-Logo" />
            <h1>Job Search Helper</h1>
          </div>
        </Link>
        <nav>
          {user && (
            <div>
            <span>{user.email}</span>
            <button onClick={handleClick}>Log Out</button>
          </div>
          )}
          {!user && (
            <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <button onClick={handleLoginDemo}>Login as Demo User</button>
          </div>
          )}
          
        </nav>
      </div>
    </header>
  )
}

export default Navbar