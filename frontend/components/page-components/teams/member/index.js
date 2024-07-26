import React, { useState, useEffect } from 'react'
import { API_SERVER, GET_MEMBER, MANAGE_MEMBER } from '@/configs/api-path'
import Image from 'next/image'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

const TeamMemberComponent = ({
  team_id,
  team_limit = 0,
  onMemberCountChange,
}) => {
  const [memberData, setMemberData] = useState([])
  const [selectedCount, setSelectedCount] = useState(0)

  const fetchMemberData = async (team_id) => {
    const url = GET_MEMBER + team_id
    try {
      const res = await fetch(url)
      const data = await res.json()

      if (data.success) {
        setMemberData(data.data)
        onMemberCountChange(data.data.length)
        const initialCount = data.data.filter(
          (member) => member.m_status === 1
        ).length
        setSelectedCount(initialCount)
        console.log('成功取得團員資料', data.data)
      } else {
        console.error('團員資料取得失敗:', data.error)
      }
    } catch (error) {
      console.error('取得團員資料時發生錯誤:', error)
    }
  }

  useEffect(() => {
    if (team_id) {
      fetchMemberData(team_id)
    }
  }, [team_id])

  const handleRadioChange = (no, value) => {
    const memberAccept = parseInt(value)
    setMemberData((prevMembers) => {
      return prevMembers.map((member) => {
        if (member.no === no) {
          if (member.m_status !== memberAccept) {
            if (memberAccept === 1) {
              setSelectedCount((prevCount) => prevCount + 1)
            } else if (member.m_status === 1) {
              setSelectedCount((prevCount) => prevCount - 1)
            }
          }
          return { ...member, m_status: memberAccept }
        }
        return member
      })
    })
  }

  const handleSubmit = async () => {
    const dataToSubmit = memberData.map((member) => ({
      no: member.no,
      m_status: member.m_status,
    }))
    console.log('提交資料:', dataToSubmit)

    try {
      const response = fetch(MANAGE_MEMBER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      })

      const result = await response.json()
      if (response.ok) {
        alert('已修改')
      } else {
        alert('未進行修改')
      }
    } catch (error) {
      console.error('提交資料時發生錯誤:', error)
    }
  }
  return (
    <div>
      <h4>目前申請加入的使用者</h4>
      {memberData.map((member) => (
        <div key={member.join_user_id}>
          <Image
            src={member.avatar ? `${API_SERVER}/avatar/${member.avatar}` : ''}
            height={40}
            width={40}
            alt={`${member.nick_name} avatar`}
          />
          {member.nick_name}
          <div>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name={`radio-${member.no}`}
              value={member.m_status === 1 ? '1' : '0'}
              onChange={(e) => handleRadioChange(member.no, e.target.value)}
            >
              <FormControlLabel value="1" control={<Radio />} label="Y" />
              <FormControlLabel value="0" control={<Radio />} label="N" />
            </RadioGroup>
          </div>
        </div>
      ))}
      <div style={{ textAlign: 'center' }}>
        團員/上限: {selectedCount} / {team_limit}
        {selectedCount > team_limit && (
          <div style={{ color: 'red', textAlign: 'center' }}>
            人數超過上限，請重新設定
          </div>
        )}{' '}
      </div>
      <button onClick={handleSubmit} disabled={selectedCount > team_limit}>
        管理完畢
      </button>
    </div>
  )
}

export default TeamMemberComponent
