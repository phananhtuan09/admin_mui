import React, { useState } from 'react'

import './CardImage.scss'
export default function CardImage(props: any) {
  const [isSelected, setIsSelected] = useState(false)
  const { path, id } = props
  const handelClick = () => {
    setIsSelected(!isSelected)
  }
  return (
    <div className="card-container" onClick={handelClick}>
      <img className="card-image" src={path} alt="picture by a tuan" />
      <input
        type="checkbox"
        className="card-checkbox"
        id={id}
        name={id}
        value={id}
        checked={isSelected}
      />
      <label htmlFor={id} className="card-label"></label>
    </div>
  )
}
