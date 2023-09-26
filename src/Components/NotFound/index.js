import './index.css'

const NotFound = () => (
  <div className="notFound">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="notFound-img"
    />
    <h1 className="not_head">Page Not Found</h1>
    <p className="not_des">
      We are sorry, the page you requested could not be found{' '}
    </p>
  </div>
)

export default NotFound
