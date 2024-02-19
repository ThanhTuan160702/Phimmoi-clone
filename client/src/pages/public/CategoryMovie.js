import React from 'react'
import { useParams } from 'react-router-dom'
import { category } from '../../utils/contants'
import { formatSlug } from '../../utils/helper'

const CategoryMovie = () => {

  
  const { categoryParams } = useParams()
  const categoryByText = category.find(el => formatSlug(el.text) === categoryParams)

  return (
    <div>
      {categoryByText.text}
    </div>
  )
}

export default CategoryMovie