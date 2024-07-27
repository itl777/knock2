import Avatar from '@mui/joy/Avatar'
import { useAuth } from '@/context/auth-context'
import { API_SERVER } from '@/configs/api-path'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import { useNotifications } from '@/context/notifications-context'

const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: -3,
    color: 'white',
    backgroundColor: 'var(--sec-1)',
  },
}))
export default function AvatarIcon() {
  const { auth } = useAuth()
  const { unreadCount } = useNotifications()
  return (
    <>
      <StyledBadge badgeContent={unreadCount} color="secondary" max={99}>
        <Avatar
          size="md"
          variant="solid"
          alt={auth.nickname}
          src={auth.avatar ? `${API_SERVER}/avatar/${auth.avatar}` : ''}
          sx={{ width: 32, height: 32 }}
        />
      </StyledBadge>
    </>
  )
}
