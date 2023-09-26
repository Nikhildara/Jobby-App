import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLaunch} from 'react-icons/md'

import Header from '../Header'
import SkillsItem from '../SkillsItem'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  noJobs: 'NO_RESULTS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobData: {},
    lifeCom: {},
    similarJobs: [],
    currentStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({currentStatus: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    // console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const jobData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebSiteUrl: data.job_details.company_website_url,
        employType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDes: data.job_details.job_description,
        lifeAtComp: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        title: data.job_details.title,
      }
      console.log(data.similar_jobs)
      const lifeCom = {
        description: jobData.lifeAtComp.description,
        imageUrl: jobData.lifeAtComp.image_url,
      }

      this.setState({
        jobData,
        lifeCom,
        similarJobs: data.similar_jobs,
        currentStatus: apiStatus.success,
      })
    }
    if (response.ok === false) {
      this.setState({currentStatus: apiStatus.failure})
    }
  }

  renderSuccess = () => {
    const {jobData, lifeCom, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebSiteUrl,
      employType,
      jobDes,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobData
    const {description, imageUrl} = lifeCom
    return (
      <>
        <div className="detail-con">
          <div className="job-details">
            <div className="title-logo-con">
              <img
                src={companyLogoUrl}
                alt="compony logo"
                className="company-logo"
              />
              <div className="title-con">
                <h1 className="title">{title}</h1>
                <div className="rating-con">
                  <AiFillStar className="star" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="loca-empType-lpa-con">
              <div className="loca-empType-con">
                <div className="loca-con">
                  <TiLocation className="loc-emp-icon" />
                  <p className="loc-emp-des">{location}</p>
                </div>
                <div className="loca-con">
                  <BsBriefcaseFill className="loc-emp-icon" />
                  <p className="loc-emp-des">{employType}</p>
                </div>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
            <hr />
            <div className="des-vis-con">
              <h1 className="des-head">Description</h1>
              <a href={companyWebSiteUrl} className="launch">
                Visit <MdLaunch />{' '}
              </a>
            </div>
            <p className="des">{jobDes}</p>
            <h1 className="des-head">Skills</h1>

            <ul className="skill-con">
              {Array.isArray(skills)
                ? skills.map(e => <SkillsItem key={e.id} item={e} />)
                : 'No skills available'}
            </ul>
            <div className="life-com-con">
              <div className="">
                <h1 className="des-head">Life at Company</h1>
                <p className="des">{description}</p>
              </div>
              <img src={imageUrl} alt="companyImage" className="life-img" />
            </div>
          </div>
        </div>
        <ul className="similar_jobs-con">
          {similarJobs.map(e => (
            <SimilarJobItem key={e.id} item={e} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container-job-details" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="retry-con-all-jobDetails">
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

  renderInfo = () => {
    const {currentStatus} = this.state
    // console.log(currentStatus)

    switch (currentStatus) {
      case apiStatus.success:
        // console.log('inSwitch')
        return this.renderSuccess()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    // const {jobData, lifeCom, similarJobs} = this.state
    // //  console.log(jobData)

    // const {
    //   companyLogoUrl,
    //   companyWebSiteUrl,
    //   employType,
    //   jobDes,
    //   location,
    //   packagePerAnnum,
    //   rating,
    //   skills,
    //   title,
    // } = jobData
    // // const lifeImg = lifeAtComp.image_url
    // // const lifeDes = lifeAtComp.description
    // const {description, imageUrl} = lifeCom

    return (
      <div className="jobDetails-con">
        <Header />
        {this.renderInfo()}
      </div>
    )
  }
}

export default JobDetails
