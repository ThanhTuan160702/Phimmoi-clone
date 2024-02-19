import React from 'react'
import { useParams } from 'react-router-dom'
import { nation } from '../../utils/contants'
import { formatSlug } from '../../utils/helper'

const NationMovie = () => {

  const { nationParams } = useParams()
  const nationByText = nation.find(el => formatSlug(el.text) === nationParams)

  return (
    <div>
      {nationByText.text}
    </div>
  )
}

export default NationMovie