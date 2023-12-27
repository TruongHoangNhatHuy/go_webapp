import { StatisticForm } from "features/statistic"

const Statistic = () => {
  return (
    <div style={{ overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none',
      '&::-webkit-scrollbar': { display: 'none' }
    }}>
      <StatisticForm/>
    </div>
  )
}

export default Statistic