import { AppBar, Box, Button, Grid, TextField } from '@mui/material';
import { getLocationByAddress, getCoordinatesByRefid } from '../utils/vietmap_geocode.js';

// Thanh nhập địa chỉ
export const LocationInput = ({ bookingRef, setBookingForm }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    bookingRef.current.startLocation = data.get('startLocation');
    bookingRef.current.endLocation = data.get('endLocation');

    const locationList = getLocationByAddress(bookingRef.current.startLocation);
    console.log(locationList);
    getCoordinatesByRefid(locationList[0][0])

    // console.log('locationInput', bookingRef.current);
    setBookingForm(true);
  };

  return (
    <AppBar position='static' color='transparent'>
      <Box component='form' id='locationInput' onSubmit={handleSubmit}>
        <Grid container flexDirection='row' alignItems='center' spacing={0.5} padding={1}>
          <Grid item xs={6} lg>
            <TextField
              required
              fullWidth
              size='small'
              id='startLocation'
              name='startLocation'
              placeholder='Nhập điểm đi'
              sx={{ bgcolor: 'white' }}
            />
          </Grid>
          <Grid item xs={6} lg>
            <TextField
              required
              fullWidth
              size='small'
              id='endLocation'
              name='endLocation'
              placeholder='Nhập điểm đến'
              sx={{ bgcolor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} lg={2}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
            >Đặt xe</Button>
          </Grid>
        </Grid>
      </Box>
    </AppBar>
  )
}