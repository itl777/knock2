import React, { useState } from 'react'
import styles from './reservation-page.module.css'
import ReservationListCards from '../reservation-list-cards'

export default function ReservationPage({ status }) {
  return (
    <div className={styles.listContainer}>
      <ReservationListCards />
      <ReservationListCards />
    </div>
  )
}
