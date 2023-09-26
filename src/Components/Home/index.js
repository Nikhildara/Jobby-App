import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {}

  render() {
    const {history} = this.props
    return (
      <div className="home-container">
        <Header />
        <div className="Home">
          <h1 className="home-head">Find The Job That Fits Your Life</h1>
          <p className="home-des">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits yours abilities and
            potential.
          </p>
          <Link to="/jobs" className="link-items">
            <button className="jobsBtn" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
