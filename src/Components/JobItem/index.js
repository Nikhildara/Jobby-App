import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const jobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDes,
    location,
    packagePerAnnual,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`jobs/${id}`} className="link-items">
      <li className="job-item">
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
              <p className="loc-emp-des">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnual}</p>
        </div>
        <hr />
        <h1 className="des-head">Description</h1>
        <p className="des">{jobDes}</p>
      </li>
    </Link>
  )
}

export default jobItem
