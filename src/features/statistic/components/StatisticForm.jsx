import { useState } from 'react';
import { Button, Grid, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material"
import { BarPlot, ChartsXAxis, ChartsYAxis, LinePlot, PieChart, pieArcLabelClasses, ResponsiveChartContainer, ChartsTooltip, MarkPlot } from "@mui/x-charts"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CommuteIcon from '@mui/icons-material/Commute';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';

const overview = [
  { 
    label: "Tổng doanh thu", 
    icon: <RequestQuoteIcon sx={{ color: '#25ba80', width: 50, height: 50 }}/>, 
    fontColor: "#004b50",
    bgcolor: "#daf7e9",
    value: 12345 
  },
  { 
    label: "Trung bình doanh thu", 
    icon: <AssessmentIcon sx={{ color: '#20bcd6', width: 50, height: 50 }}/>,
    fontColor: "#003768",
    bgcolor: "#d4f6fa",
    value: 23456 
  },
  { 
    label: "Tổng chuyến xe", 
    icon: <CommuteIcon sx={{ color: '#f6b11f', width: 50, height: 50 }}/>,
    fontColor: "#7a4100",
    bgcolor: "#fff2d4",
    value: 34567 
  },
  { 
    label: "Trung bình chuyến xe", 
    icon: <TwoWheelerIcon sx={{ color: '#f5724f', width: 50, height: 50 }}/>,
    fontColor: "#7a0916",
    bgcolor: "#ffe8e0",
    value: 45678 
  }
]

const series = [
  {
    type: 'bar',
    stack: '',
    yAxisKey: 'eco',
    data: [5, 6, 2, 8, 9],
  },
  {
    type: 'line',
    yAxisKey: 'pib',
    color: 'red',
    data: [1000, 1500, 3000, 5000, 10000],
  },
];

export const StatisticForm = () => {
  const [timeSelect, setTimeSelect] = useState('monthly');
  const [from, setFrom] = useState(dayjs());
  const [to, setTo] = useState(dayjs());
  
  const handleSubmit = () => {
    console.log('statistic', timeSelect, from.format('YYYY-MM-DD'), to?.format('YYYY-MM-DD'));
  }

  return (
    <Grid container padding={2} spacing={1}>
      <Grid item xs={12} md={12} container spacing={2}>
        <Grid item xs={1} md={'auto'}>
          <Button variant='contained' onClick={handleSubmit}><SearchIcon/></Button>
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
        {overview.map(item => (
          <Grid item xs={12} md={true}>
            <Paper 
              component={Stack} direction='row' padding={2} spacing={2} alignItems='center' 
              sx={{ height: 100, bgcolor: item.bgcolor }}
            >
              {item.icon}
              <Stack direction={'column'}>
                <Typography color={item.fontColor} fontWeight='bold'>{item.label}</Typography>
                <Typography color={item.fontColor}>
                  {(overview.indexOf(item) === 0 || overview.indexOf(item) === 1) ?
                    Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND', currencyDisplay: 'code'}).format(item.value)
                    : item.value
                  }
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={{ height: '70vh'}}>
          {/* <Typography>Biểu đồ doanh thu & chuyến xe</Typography> */}
          <ResponsiveChartContainer
            series={series}
            xAxis={[
              {
                id: 'years',
                data: [2010, 2011, 2012, 2013, 2014],
                scaleType: 'band',
                valueFormatter: (value) => value.toString(),
              },
            ]}
            yAxis={[
              {
                id: 'eco',
                scaleType: 'linear',
              },
              {
                id: 'pib',
                scaleType: 'log',
                // showMark: true
              },
            ]}
          >
            <BarPlot/>
            <LinePlot/>
            <MarkPlot/>
            {/* <ChartsXAxis label="Biểu đồ doanh thu & chuyến xe" position="top" disableLine disableTicks tickLabelStyle={{display: 'none'}}/> */}
            <ChartsXAxis label="Thời gian" position="bottom" axisId="years" />
            <ChartsYAxis label="Số chuyến xe" position="left" axisId="eco" />
            <ChartsYAxis label="Doanh thu" position="right" axisId="pib" />
            <ChartsTooltip trigger='axis'/>
          </ResponsiveChartContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ height: '70vh'}}>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label}`,
                arcLabelMinAngle: 45,
                data: [
                  { id: 0, value: 10, label: '5*' },
                  { id: 1, value: 15, label: '4*' },
                  { id: 2, value: 20, label: '3*' },
                ],
              },
            ]}
            // width={400}
            // height={400}
            margin={{ left: 20, right: 20 }}
            slotProps={{
              legend: { hidden: true, position: {vertical: 'middle', horizontal: 'right'} },
            }}
            sx={{
              justifyContent: 'center',
              [`& .${pieArcLabelClasses.root}`]: { fill: 'white', fontWeight: 'bold' },
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}