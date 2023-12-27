import { useEffect, useRef, useState } from 'react';
import { Button, CircularProgress, Grid, IconButton, MenuItem, Paper, Skeleton, Stack, TextField, Typography } from "@mui/material"
import { axisClasses, BarPlot, ChartsXAxis, ChartsYAxis, LinePlot, PieChart, pieArcLabelClasses, ResponsiveChartContainer, ChartsTooltip, MarkPlot } from "@mui/x-charts"
// import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CommuteIcon from '@mui/icons-material/Commute';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import { getStatistic } from '../services/be_server/api_statistic';
import { useUserContext } from 'contexts/UserContext';

const testData = {
  "statisticsPaymentResponse": {
    "amount": 1595318,
    "average": 51461.0,
    "total": 35,
    "details": {
      "timeStamp": ["2023-12-24", "2023-12-25", "2023-12-26", "2023-12-27"],
      "amount": [0, 60961, 741924, 780929],
      "total": [0, 2, 16, 17]
    }
  },
  "statisticsBookingResponse": {
    "total": 36,
    "average": 12,
    "success": 14,
    "cancelled": 22,
    "details": {
      "timeStamp": ["2023-12-25", "2023-12-26", "2023-12-27"],
      "total": [7, 18, 11],
      "success": [3, 5, 6],
      "cancelled": [4, 13, 5]
    }
  },
  "statisticsReviewResponse": {
    "total": 7,
    "average": 4.5,
    "details": {
      "fiveStar": 5,
      "fourStar": 1,
      "threeStar": 1,
      "twoStar": 0,
      "oneStar": 0
  }
  }
}

const mergeArray = (a, b, predicate = (a, b) => a === b) => {
  const c = [...a]; // copy to avoid side effects
  // add all items from B to copy C if they're not already present
  b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
  return c;
}

export const StatisticForm = () => {
  const [user,] = useUserContext();
  
  const [fetching, setFetching] = useState(true);
  const [timeSelect, setTimeSelect] = useState('monthly');
  const [from, setFrom] = useState(dayjs());
  const [to, setTo] = useState(dayjs());
  const [yearLabel, setYearLabel] = useState(null);
  
  const overview = useRef([
    { 
      label: "Tổng doanh thu", 
      icon: <RequestQuoteIcon sx={{ color: '#25ba80', width: 40, height: 40 }}/>, 
      fontColor: "#004b50",
      bgcolor: "#daf7e9",
      value: null,
      unit: ''
    },
    { 
      label: "Trung bình doanh thu", 
      icon: <AssessmentIcon sx={{ color: '#25ba80', width: 40, height: 40 }}/>,
      fontColor: "#004b50",
      bgcolor: "#daf7e9",
      value: null,
      unit: ''
    },
    { 
      label: "Tổng chuyến xe", 
      icon: <CommuteIcon sx={{ color: '#20bcd6', width: 40, height: 40 }}/>,
      fontColor: "#003768",
      bgcolor: "#d4f6fa",
      value: null,
      unit: ' chuyến'
    },
    { 
      label: "Trung bình chuyến xe", 
      icon: <TwoWheelerIcon sx={{ color: '#20bcd6', width: 40, height: 40 }}/>,
      fontColor: "#003768",
      bgcolor: "#d4f6fa",
      value: null,
      unit: ' chuyến/ngày'
    },
    { 
      label: "Số lượng đánh giá", 
      icon: <StarIcon sx={{ color: '#f6b11f', width: 40, height: 40 }}/>,
      fontColor: "#7a4100",
      bgcolor: "#fff2d4",
      value: null,
      unit: ''
    },
    { 
      label: "Trung bình đánh giá", 
      icon: <StarOutlineIcon sx={{ color: '#f6b11f', width: 40, height: 40 }}/>,
      fontColor: "#7a4100",
      bgcolor: "#fff2d4",
      value: null,
      unit: '★'
    }
  ])
  const timeData = useRef([
    {
      id: 'timeUnit',
      scaleType: 'band',
      valueFormatter: (value) => dayjs(value).format('DD/MM'),
      data: []
    }
  ]);
  const bookingsAndSaleData = useRef([
    {
      id: 'successBookings',
      label: 'Chuyến xe thực hiện',
      yAxisKey: 'bookingsAxis',
      type: 'bar',
      stack: '',
      data: [],
    },
    {
      id: 'cancelledBookings',
      label: 'Chuyến xe bị hủy',
      yAxisKey: 'bookingsAxis',
      type: 'bar',
      stack: '',
      data: [],
    },
    {
      id: 'sale',
      label: 'Doanh thu',
      yAxisKey: 'saleAxis',
      type: 'line',
      color: 'red',
      data: [],
    },
  ]);
  const reviewData = useRef([
    {
      arcLabel: (item) => `${item.label}`,
      arcLabelMinAngle: 20,
      data: [],
    }
  ]);

  const handleStatisticData = (data) => {
    const bookings = data.statisticsBookingResponse;
    const sale = data.statisticsPaymentResponse;
    const reviews = data.statisticsReviewResponse;
    // overview
    overview.current[0].value = sale.amount;
    overview.current[1].value = sale.average;
    overview.current[2].value = bookings.total;
    overview.current[3].value = bookings.average;
    if (timeSelect === 'annually')
      overview.current[3].unit = ' chuyến/tháng';
    else
      overview.current[3].unit = ' chuyến/ngày';
    overview.current[4].value = reviews.total;
    overview.current[5].value = reviews.average;
    // composite chart
    const timestamp = [], successBookings = [], cancelledBookings = [], saleArray = [];
    const dates = mergeArray(sale.details.timeStamp, bookings.details.timeStamp).sort();
    // dates.sort();
    dates.forEach(item => {
      timestamp.push((timeSelect === 'annually') ? item : dayjs(item));
      if (bookings.details.timeStamp.includes(item)) {
        const index = bookings.details.timeStamp.indexOf(item);
        successBookings.push(bookings.details.success[index]);
        cancelledBookings.push(bookings.details.cancelled[index]);
      } else {
        successBookings.push(0);
        cancelledBookings.push(0);
      }
      if (sale.details.timeStamp.includes(item)) {
        const index = sale.details.timeStamp.indexOf(item);
        saleArray.push(sale.details.amount[index]);
      } else {
        saleArray.push(0);
      }
    });
    timeData.current[0].data = timestamp;
    timeData.current[0].valueFormatter = (timeSelect === 'annually') ? (value)=>value : (value)=>dayjs(value).format('DD/MM');
    setYearLabel(timeSelect === 'annually' ? from.format('[Năm ]YYYY') : null)
    bookingsAndSaleData.current[0].data = successBookings;
    bookingsAndSaleData.current[1].data = cancelledBookings;
    bookingsAndSaleData.current[2].data = saleArray;
    // pie chart
    reviewData.current[0].data = [
      { label: '5★', value: reviews.details.fiveStar },
      { label: '4★', value: reviews.details.fourStar },
      { label: '3★', value: reviews.details.threeStar },
      { label: '2★', value: reviews.details.twoStar },
      { label: '1★', value: reviews.details.oneStar },
    ]
  }

  const handleSubmit = async () => {
    setFetching(true);
    const unit = timeSelect;
    const fromStr = from.format('YYYY-MM-DD');
    const toStr = (unit === 'date') ? to.format('YYYY-MM-DD') : null;
    console.log('statistic fetch:', unit, fromStr, toStr);

    await getStatistic(user.token, unit, fromStr, toStr)
      .then(result => {
        console.log('statistic result', result);
        handleStatisticData(result);
        setFetching(false);
      })
      .catch(error => {
        console.log(error);
        alert('Lấy dữ liệu thất bại.');
      })
    // setTimeout(() => {
    //   handleStatisticData(testData);
    //   setFetching(false);
    // }, 3000)
  }

  useEffect(() => {
    handleSubmit();
  }, [])

  return (
    <Grid container padding={2} spacing={1}>
      <Grid item xs={12} md={12} container spacing={2}>
        <Grid item xs={1} md={'auto'}>
          <IconButton onClick={handleSubmit} sx={{ bgcolor: '#1976d2', boxShadow: 3, ":hover": { bgcolor: '#2e96ff' } }}>
            <SearchIcon sx={{ color: 'white' }}/>
          </IconButton>
        </Grid>
        <Grid item xs={11} md={2}>
          <TextField select
            fullWidth
            variant='outlined'
            size='small'
            label='Thống kê theo'
            value={timeSelect}
            onChange={(e) => setTimeSelect(e.target.value)}
          >
            <MenuItem value='monthly'>Tháng</MenuItem>
            <MenuItem value='annually'>Năm</MenuItem>
            <MenuItem value='date'>Các ngày</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={2.25}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
            <DatePicker 
              disableFuture
              label="Từ" 
              views={
                timeSelect === 'monthly' ? ['month', 'year'] :
                timeSelect === 'annually' ? ['year'] :
                ['year', 'month', 'day']
              }
              value={from}
              onChange={(value) => setFrom(value)}
              slotProps={{
                textField: {
                  readOnly: true,
                  required: true,
                  fullWidth: true,
                  size: 'small',
                  id: "from",
                  name: "from"
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={2.25} display={timeSelect === 'date' ? 'flex' : 'none'}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
            <DatePicker 
              disableFuture
              label="Đến" 
              views={['year', 'month', 'day']}
              value={to}
              onChange={(value) => setTo(value)}
              slotProps={{
                textField: {
                  readOnly: true,
                  required: true,
                  fullWidth: true,
                  size: 'small',
                  id: "to",
                  name: "to"
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} container spacing={2}>
        {overview.current.map(item => (
          <Grid item xs={12} md={2}>
            <Paper 
              component={Stack} direction='row' padding={1} spacing={1} alignItems='center' overflow={'clip'}
              sx={{ height: 100, bgcolor: item.bgcolor }}
            >
              {item.icon}
              <Stack direction={'column'}>
                <Typography color={item.fontColor} fontWeight='bold'>{item.label}</Typography>
                {fetching ? (
                  <Skeleton/>
                ) : (
                  <Typography color={item.fontColor} fontSize={15}>
                    {(overview.current.indexOf(item) === 0 || overview.current.indexOf(item) === 1) ?
                      Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(item.value)
                      : item.value + item.unit
                    }
                  </Typography>
                )}
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={{ height: '70vh', paddingY: 1 , display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {fetching ? (
            <CircularProgress/>
          ) : (
            <>
              <Typography fontWeight='bold'>Thống kê chuyến xe & doanh thu</Typography>
              <ResponsiveChartContainer
                series={bookingsAndSaleData.current}
                xAxis={timeData.current}
                yAxis={[
                  { id: 'bookingsAxis', scaleType: 'linear' },
                  { id: 'saleAxis', scaleType: 'linear' },
                ]}
                margin={{ top: 20, right: 100 }}
                sx={{
                  [`.${axisClasses.left} .${axisClasses.label}`]: {
                    transform: 'translate(0, 0)',
                  },
                  [`.${axisClasses.right} .${axisClasses.label}`]: {
                    transform: 'translate(50px, 0)',
                  },
                }}
              >
                <BarPlot/>
                <LinePlot/>
                <MarkPlot/>
                {/* <ChartsXAxis label="Biểu đồ doanh thu & chuyến xe" position="top" disableLine disableTicks tickLabelStyle={{display: 'none'}}/> */}
                <ChartsXAxis axisId="timeUnit" position="bottom" label={yearLabel}/>
                <ChartsYAxis axisId="bookingsAxis" position="left"  label="Số chuyến xe" />
                <ChartsYAxis axisId="saleAxis" position="right" label="Doanh thu" />
                <ChartsTooltip trigger='axis'/>
              </ResponsiveChartContainer>
            </>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ height: '70vh', paddingY: 1 , display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {fetching ? (
            <CircularProgress/>
            ) : (
            <>
              <Typography fontWeight='bold'>Thống kê đánh giá</Typography>
              <PieChart
                series={reviewData.current}
                margin={{ left: 20, right: 20 }}
                slotProps={{
                  legend: { hidden: true, position: {vertical: 'middle', horizontal: 'right'} },
                }}
                sx={{
                  justifyContent: 'center',
                  [`& .${pieArcLabelClasses.root}`]: { fill: 'white', fontWeight: 'bold' },
                }}
              />
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}