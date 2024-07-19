import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiTypography from '@mui/material/Typography'
import { PiTextAlignCenter } from 'react-icons/pi'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  background: `#333333`,
  color: `#B99755`,
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  () => ({
    '& .MuiAccordionSummary-content': {
      margin: '0 auto',
      fontSize: '22px',
      textAlign: 'center',
    },
  })
)
// const AccordionSummary = styled(MuiAccordionSummary)({
//   content: {
//     margin: '0 auto',
//     fontSize: '22px',
//   },
// })

const AccordionDetails = styled(MuiAccordionDetails)({
  // 這裡可以添加更多樣式
})

// const Typography = styled(MuiTypography)({
//   textAlign: 'center',
// 這裡可以添加更多樣式
// })

const Typography = styled((props) => <MuiTypography {...props} />)(() => ({
  '& .MuiTypography-body1': {
    margin: '0 auto',
    fontSize: '22px',
  },
}))

export { Accordion, AccordionSummary, AccordionDetails, Typography }
