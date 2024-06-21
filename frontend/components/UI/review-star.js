import { FaStar, FaStarHalf } from 'react-icons/fa6'
import { useState } from 'react'

export default function ReviewStar({ starNum = 3 }) {
  return (
    <>
      <FaStar color="rgba(185, 151, 85, 1)" />
      <FaStar color="rgba(185, 151, 85, 1)" />
      <FaStar color="rgba(185, 151, 85, 1)" />
      <FaStar color="rgba(185, 151, 85, 1)" />
      <FaStarHalf color="rgba(185, 151, 85, 1)" />
    </>
  )
}
