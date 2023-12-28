import { StatisticForm } from "features/statistic"
import {Box} from '@mui/material';

const Statistic = () => {
  return (
    <Box
    height={"100%"}
    width={"100%"} 
    sx={{
      overflowY: 'scroll',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
      display: 'none'
    },
    }}>
      <StatisticForm/>
    </Box>
  )
}

export default Statistic