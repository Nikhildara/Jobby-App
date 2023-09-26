import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  noJobs: 'NO_RESULTS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    Search: '',
    inSearch: '',
    Profile: {},
    checkedList: [],
    salaryRange: '',
    currentStatus: apiStatus.initial,
    profileStatus: apiStatus.initial,
    jobsData: [],
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  componentDidUpdate(prevProps, prevState) {
    const {checkedList, salaryRange, inSearch} = this.state
    if (
      prevState.checkedList !== checkedList ||
      prevState.salaryRange !== salaryRange ||
      prevState.inSearch !== inSearch
    ) {
      this.getJobs()
    }
  }

  getJobs = async () => {
    this.setState({currentStatus: apiStatus.loading})
    const {checkedList, salaryRange, inSearch} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const empType = checkedList.join(',')
    const API = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${salaryRange}&search=${inSearch}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(API, options)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      const jobsData = data.jobs.map(e => ({
        companyLogoUrl: e.company_logo_url,
        employmentType: e.employment_type,
        id: e.id,
        jobDes: e.job_description,
        location: e.location,
        packagePerAnnual: e.package_per_annum,
        rating: e.rating,
        title: e.title,
      }))
      // console.log(jobsData)
      if (jobsData.length !== 0) {
        this.setState({currentStatus: apiStatus.success, jobsData})
      } else {
        this.setState({currentStatus: apiStatus.noJobs})
      }
    }
    if (response.ok === false) {
      this.setState({currentStatus: apiStatus.failure})
    }
  }

  getProfile = async () => {
    this.setState({profileStatus: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      const Profile = {
        name: data.profile_details.name,
        profileImgUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({Profile, profileStatus: apiStatus.success})
    }
    if (response.status === 400) {
      this.setState({profileStatus: apiStatus.failure})
    }
  }

  checkBoxChange = e => {
    const {checkedList} = this.state
    // console.log(e.target.checked)

    if (e.target.checked) {
      this.setState(prevState => ({
        checkedList: [...prevState.checkedList, e.target.value],
      }))
    } else {
      const updateCheckList = checkedList.filter(
        item => item !== e.target.value,
      )
      this.setState({checkedList: updateCheckList})
    }
  }

  radioChange = e => {
    // console.log(e.target.value)
    this.setState({salaryRange: e.target.value})
  }

  searchInput = e => {
    this.setState({Search: e.target.value})
  }

  searchJobs = () => {
    this.setState(
      prevState => ({inSearch: prevState.Search, Search: ''}),
      this.getJobs,
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoResults = () => (
    <div className="retry-con-all">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-res-head">No Jobs Found</h1>
      <p className="no-res-des">
        We could not found any jobs. Try other filters
      </p>
    </div>
  )

  renderFailureView = () => (
    <div className="retry-con-all">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="no-jobs-img"
      />
      <h1 className="no-res-head">Oops! Something Went Wrong</h1>
      <p className="no-res-des">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={() => {
          this.getJobs()
        }}
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {jobsData} = this.state
    // console.log('suceesIN')

    return (
      <>
        <ul className="jobs-list">
          {jobsData.map(e => (
            <JobItem key={e.id} jobDetails={e} />
          ))}
        </ul>
      </>
    )
  }

  renderInfo = () => {
    const {currentStatus} = this.state
    // console.log(currentStatus)

    switch (currentStatus) {
      case apiStatus.success:
        // console.log('inSwitch')
        return this.renderSuccess()
      case apiStatus.noJobs:
        return this.renderNoResults()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderProfile = () => {
    const {Profile} = this.state
    const {name, profileImgUrl, shortBio} = Profile
    return (
      <div className="profile-con">
        <img src={profileImgUrl} alt="profile" className="profile" />
        <h1 className="pro-name">DARA NIKHIL</h1>
        <p className="pro-des">Full Stack Developer</p>
      </div>
    )
  }

  renderProfileLoader = () => (
    <div className="loader-container-profile" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileRetry = () => (
    <div className="retry-con">
      <button
        className="retry-btn"
        type="button"
        onClick={() => {
          // console.log('retry')

          this.getProfile()
        }}
      >
        Retry
      </button>
    </div>
  )

  renderProfileInfo = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case apiStatus.success:
        return this.renderProfile()
      case apiStatus.loading:
        return this.renderProfileLoader()
      case apiStatus.failure:
        return this.renderProfileRetry()
      default:
        return null
    }
  }

  render() {
    const {Search} = this.state

    // console.log(currentStatus)

    return (
      <div className="job-container">
        <Header />
        <div className="Jobs">
          <div className="search-con for-sm">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              value={Search}
              onChange={this.searchInput}
            />
            <button
              type="submit"
              onClick={this.searchJobs}
              data-testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="filter-items-con">
            {this.renderProfileInfo()}
            <hr />
            <div className="emp-con">
              <h1 className="filter-head">Type of Employment</h1>
              <div className="emp-inputs-con">
                {employmentTypesList.map(e => (
                  <div className="input-filters" key={e.employmentTypeId}>
                    <input
                      type="checkbox"
                      value={e.employmentTypeId}
                      key={e.employmentTypeId}
                      onChange={this.checkBoxChange}
                    />
                    <label
                      htmlFor={e.employmentTypeId}
                      className="filter-label"
                    >
                      {e.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div className="salary-input-con">
              <h1 className="filter-head">Salary Range</h1>
              <div className="emp-inputs-con">
                {salaryRangesList.map(e => (
                  <div className="input-filters" key={e.salaryRangeId}>
                    <input
                      type="radio"
                      value={e.salaryRangeId}
                      key={e.salaryRangeId}
                      onChange={this.radioChange}
                      name="salary"
                    />
                    <label htmlFor={e.salaryRangeId} className="filter-label">
                      {e.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="search-con for-lg">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={Search}
                onChange={this.searchInput}
              />
              <button
                type="submit"
                onClick={this.searchJobs}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderInfo()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
