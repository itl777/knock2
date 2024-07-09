import styled from '@emotion/styled'
import { API_SERVER } from '@/configs/api-path'

export default function AvatarFormItem({ avatar = '', open }) {
  const AvatarFormItem = styled.button`
    width: 250px;
    height: 250px;
    border-radius: 125px;
    background: ${avatar !== '' ? `url('${API_SERVER}/avatar/${avatar}')` : ''}
      no-repeat #222222;
    background-size: contain;
    background-position: center;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.25);
  `

  return <AvatarFormItem onClick={open} />
}
