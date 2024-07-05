import React, { useEffect, useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.css'

export default function GoogleMap({
  branchName = '',
  openTime = '',
  closeTime = '',
  branchPhone = '',
  branchAddress = '',
  mapSrc = '',
}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '80px',
        alignItems: 'center',
      }}
    >
      <div className="col-6">
        <ul>
          <div
            style={{
              marginBottom: '196px',
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#D9D9D9',
            }}
          >
            {branchName}
          </div>
          <li
            style={{
              marginBottom: '18px',
              color: '#D9D9D9',
            }}
          >
            營業時間&nbsp; {openTime}-{closeTime}（預約洽詢時間）
          </li>
          <li
            style={{
              marginBottom: '18px',
              color: '#D9D9D9',
            }}
          >
            電話 &nbsp;&ensp;&ensp;&ensp; {branchPhone}
          </li>
          <li style={{ color: '#D9D9D9' }}>
            地址 &nbsp;&ensp;&ensp;&ensp; {branchAddress}
          </li>
        </ul>
      </div>
      <iframe
        className="col-6"
        title="Google Map"
        src={mapSrc}
        width="570"
        height="380"
        style={{ border: 0, borderRadius: '10px' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  )
}
