import './index.css'

const SkillsItem = props => {
  const {item} = props
  const skills = {
    name: item.name,
    imageUrl: item.image_url,
  }
  const {name, imageUrl} = skills
  return (
    <li className="skill-item">
      <img src={imageUrl} alt={name} className="skill-img" />
      <p className="skill">{name}</p>
    </li>
  )
}

export default SkillsItem
