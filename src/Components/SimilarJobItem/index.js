import {AiFillStar} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {item} = props
  const jobData = {
    companyLogoUrl: item.company_logo_url,
    employType: item.employment_type,
    jobDes: item.job_description,
    location: item.location,
    rating: item.rating,
    title: item.title,
  }
  const {companyLogoUrl, employType, jobDes, location, rating, title} = jobData
  return (
    <li className="simi-job-con">
      <div className="title-logo-con">
        <img src={companyLogoUrl} alt="compony logo" className="company-logo" />
        <div className="title-con">
          <h1 className="title">{title}</h1>
          <div className="rating-con">
            <AiFillStar className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="des-head">Description</h1>
      <p className="des">{jobDes}</p>
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
    </li>
  )
}

export default SimilarJobItem
