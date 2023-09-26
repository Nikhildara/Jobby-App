import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const {history} = props

  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <div className="nav-details">
        <Link to="/" className="link-items">
          <AiFillHome className="nav-icons" />
        </Link>
        <Link to="/jobs" className="link-items">
          <BsFillBriefcaseFill className="nav-icons" />
        </Link>
        <button type="button" onClick={logout}>
          <FiLogOut className="nav-icons" />
        </button>
      </div>
      <ul className="nav-list-con">
        <Link to="/" className="link-items">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="link-items">
          <li>Jobs</li>
        </Link>
        <button onClick={logout} type="button" className="logout">
          Logout
        </button>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
