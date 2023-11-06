import { AppBar, Autocomplete, Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { debounce } from '@mui/material/utils'
import { getLocationsByAddress, getCoordinatesByRefid } from '../utils/vietmap_geocode.js';
import { getLocation } from '../utils/test_geocode_data.js';
import { useState } from 'react';

const SearchBox = (props) => {
  const { setLocationInfo, ...tfProps } = props;
  const [options, setOptions] = useState([]);

  // Request API lấy danh sách địa chỉ gợi ý
  // chỉ thực hiện sau khi người dùng ngừng nhập 1s
  const queryOptions = debounce((value) => {
    setOptions(getLocation(value)) // dùng test function để thử nghiệm, không gọi vietmap API
    // setOptions(getLocationsByAddress(value)) // Gọi vietmap API
  }, 1000);

  // Khi chọn 1 địa điểm:
  const handleChange = (_, item) => {
    // console.log('item', item)
    if (item !== null) {
      // lấy tọa độ
      const locationCoordinates = getCoordinatesByRefid(item.ref_id);
      console.log('locationCoordinates', locationCoordinates);
      // và gửi thông tin địa điểm để hiển thị marker
      setLocationInfo({
        'location': item,
        'coordinates': locationCoordinates
      });
    }
    else
      setLocationInfo(null);
  };

  return (
    <Autocomplete
      disablePortal
      forcePopupIcon={false}
      onInputChange={queryOptions}
      onChange={handleChange}
      getOptionLabel={(option) => option.name}
      options={options}
      noOptionsText="Không có địa điểm gợi ý"
      // filterOptions={(x) => x}
      renderOption={(props, option) => (
        <li {...props} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Box padding={1} paddingLeft={0.75}>
            <PlaceIcon sx={{ color: 'gray' }}/>
          </Box>
          <Box>
            <Typography variant='body1'>{option.name}</Typography>
            <Typography variant='body2' color='GrayText'>{option.address}</Typography>
          </Box>
        </li>
      )}
      renderInput={(params) => 
        <TextField
          {...params}
          {...tfProps}
          required
          fullWidth
          size='small'
          sx={{ bgcolor: 'white' }}
          InputProps={{
            ...params.InputProps,
            startAdornment:
              <InputAdornment sx={{ margin: 0 }}>
                <IconButton sx={{ padding: 0 }}
                  // onClick={}
                >
                  <PlaceIcon sx={{ color: tfProps.id === "startLocation" ? 'lightgreen' : 'darkgreen' }}/>
                </IconButton>
              </InputAdornment>
          }}
        />
      }
    />
  )
}

// Thanh nhập địa chỉ
export const LocationInput = ({ bookingRef, setStartLocationInfo, setEndLocationInfo, setBookingForm }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    bookingRef.current.startLocation = data.get('startLocation');
    bookingRef.current.endLocation = data.get('endLocation');
    setBookingForm(true);
  };

  return (
    <AppBar position='static' color='transparent'>
      <Box component='form' id='locationInput' onSubmit={handleSubmit}>
        <Grid container flexDirection='row' alignItems='center' spacing={0.5} padding={1}>
          <Grid item xs={6} lg>
            <SearchBox
              id='startLocation'
              name='startLocation'
              placeholder='Nhập điểm đi'
              setLocationInfo={setStartLocationInfo}
            />
          </Grid>
          <Grid item xs={6} lg>
            <SearchBox
              id='endLocation'
              name='endLocation'
              placeholder='Nhập điểm đến'
              setLocationInfo={setEndLocationInfo}
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