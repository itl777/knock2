import React, { useState, useEffect } from 'react'
import styles from './invoice-paper.module.css'
import { useAuth } from '@/context/auth-context'
import useFetchOrderData from '@/hooks/fetchOrderDetails'
import Barcode from 'react-barcode'
import QRCode from 'react-qr-code'
import { useRouter } from 'next/router'

export default function InvoicePaper({ order_id }) {
  const router = useRouter()
  const { auth, authIsReady } = useAuth()
  const { order, detail, fetchOrderData } = useFetchOrderData()
  const [fetchReady, setFetchReady] = useState(false)

  const formatDateRange = (value) => {
    const date = new Date(value)
    // 計算民國年份（西元年 - 1911）
    const taiwanYear = date.getFullYear() - 1911
    // 獲取月份（JavaScript 中月份是 0-11）
    const month = date.getMonth() + 1
    // 計算下一個月
    const nextMonth = month === 12 ? 1 : month + 1
    return `${taiwanYear}年 ${month}月-${nextMonth}月`
  }

  // const formatInvoiceNo = (value) => {
  //   return `${value.slice(0, 2)}-${value.slice(2)}`
  // }

  const getBarcodeDate = (value) => {
    const date = new Date(value)
    const taiwanYear = date.getFullYear() - 1911
    const month = date.getMonth() + 1
    return `${taiwanYear}${month}`
  }

  useEffect(() => {
    if (router.isReady && authIsReady && auth.id) {
      if (order_id > 0) {
        fetchOrderData(order_id)
        setFetchReady(true)
      }
    }
  }, [auth.id, router.isReady, authIsReady])

  return (
    <div className={styles.taiwanInvoice}>
      <div className={styles.invoiceHeader}>
        <img src="/home/LOGO.svg" />
        <div className={styles.invoiceTitle}>電子發票證明聯</div>
        <div className={styles.invoiceSubTitle}>
          {formatDateRange(order.invoice_date)}
        </div>
        <div className={styles.invoiceSubTitle}>{order.invoice_no}</div>
      </div>
      <div className={styles.invoiceInfo}>
        <div className={styles.row}>
          <div>{order.invoice_date}</div>
          <div>格式：25</div>
        </div>
        <div className={styles.row}>
          <div>隨機碼：{order.invoice_random_number}</div>
          <div>總計：{order.total_price}</div>
        </div>
        <div>賣方：66666666</div>
      </div>

      <div className={styles.qrcodeBox}>
        <QRCode
          value={`${order.invoice_date},${order.invoice_random_number}`}
          size={80}
        />
        <QRCode
          value={`${order.invoice_date},${order.invoice_random_number}`}
          size={80}
        />
        <QRCode
          value={`${order.invoice_date},${order.invoice_random_number}`}
          size={80}
        />
      </div>
        <Barcode
        format="CODE39"
          height={30}
          displayValue={false}
          value={getBarcodeDate(order.invoice_date)}
        />
    </div>
  )
}
