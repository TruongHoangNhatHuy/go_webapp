import { Autocomplete, Box, Button, Divider, Drawer, IconButton, InputAdornment, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RouteIcon from '@mui/icons-material/Route';
import PaidIcon from '@mui/icons-material/Paid';
import { debounce } from '@mui/material/utils'
import { getLocationsByAddress, getCoordinatesByRefid } from '../utils/vietmap_geocode.js';
import { getLocation } from '../utils/test_geocode_data.js';
import { useState, useRef, useEffect } from 'react';
import { getRoute } from '../utils/vietmap_route.js';
import dayjs from 'dayjs';

const SearchBox = (props) => {
  const { setLocation, setMapCenterRef, ...tfProps } = props;
  const [options, setOptions] = useState([]);
  // Thông tin địa điểm được chọn
  const locationRef = useRef(null);

  // Request API lấy danh sách địa chỉ gợi ý
  // chỉ thực hiện sau khi người dùng ngừng nhập 1s
  const queryOptions = debounce((_, value) => {
    // setOptions(getLocation(value.trim())) // dùng test function để thử nghiệm, không gọi vietmap API
    setOptions(getLocationsByAddress(value.trim())) // Gọi vietmap API
  }, 1000);

  // Khi chọn 1 địa điểm:
  const handleChange = (_, item) => {
    // console.log('item', item)
    if (item !== null) {
      // lấy tọa độ
      const locationCoordinates = getCoordinatesByRefid(item.ref_id);
      locationRef.current = {
        'location': item,
        'coordinates': locationCoordinates
      }
      // console.log('locationInput', locationRef.current);
    }
    else
      locationRef.current = null;
    // và gửi thông tin địa điểm để hiển thị marker
    setLocation(locationRef.current);
  };

  const handleCenterMap = () => {
    if (locationRef.current) {
      var lngLat = [locationRef.current.coordinates.lng, locationRef.current.coordinates.lat];
      setMapCenterRef.current.setMapCenter(lngLat);
    }
  }

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
            <PlaceIcon sx={{ color: 'gray' }} />
          </Box>
          <Box>
            <Typography variant='body1'>{option.name}</Typography>
            <Typography variant='body2' color='GrayText'>{option.address}</Typography>
          </Box>
        </li>
      )}
      componentsProps={{
        popper: {
          modifiers: [
            { name: 'flip', enabled: false }
          ]
        } // Dropdown alway open under textbox
      }}
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
              <InputAdornment position='start' sx={{ margin: 0 }}>
                <IconButton sx={{ padding: 0 }}
                  onClick={handleCenterMap}
                >
                  <PlaceIcon sx={{ color: tfProps.id === "startLocation" ? 'green' : 'red' }} />
                </IconButton>
              </InputAdornment>
          }}
        />
      }
    />
  )
}

export const LocationInputSide = (props) => {
  const { bookingRef, startLocation, setStartLocation, endLocation, setEndLocation, vehicleRoute, setVehicleRoute, setMapCenterRef, setBookingForm } = props;

  const drawerWidth = 320;
  // Đóng mở drawer
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(prev => !prev)
  }

  // Lưu thông tin các tuyến đường
  const vehicleRouteRef = useRef(null);
  // Phượng tiện đã chọn
  const [vehicle, setVehicle] = useState('motorcycle');
  // Ẩn hiện bảng chọn tuyến đường
  const [vehicleSelect, setVehicleSelect] = useState(false);

  useEffect(() => {
    if (startLocation && endLocation) {
      vehicleRouteRef.current = {};
      var startLatLng = [startLocation.coordinates.lat, startLocation.coordinates.lng].toString();
      var endLatLng = [endLocation.coordinates.lat, endLocation.coordinates.lng].toString();
      vehicleRouteRef.current.motorcycle = getRoute(startLatLng, endLatLng, 'motorcycle');
      vehicleRouteRef.current.car = getRoute(startLatLng, endLatLng, 'car');
      setVehicleRoute(vehicleRouteRef.current.motorcycle);
      setVehicleSelect(true);
    } else {
      vehicleRouteRef.current = null;
      setVehicleSelect(false);
    }
    console.log('vehicleRouteRef', vehicleRouteRef.current);
  }, [startLocation, endLocation])

  const handleVehicleChange = (_, value) => {
    setVehicle(value);
    if (value === 'motorcycle') {
      setVehicleRoute(vehicleRouteRef.current.motorcycle)
    } 
    else if (value === 'car') {
      setVehicleRoute(vehicleRouteRef.current.car)
    }
    else {
      setVehicleRoute(null)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    bookingRef.current.startLocation = data.get('startLocation');
    bookingRef.current.endLocation = data.get('endLocation');
    setBookingForm(true);
  };

  return (
    <Stack flexDirection='row' height='100vh' alignItems={'center'}>
      <IconButton onClick={handleOpen}
        sx={{
          bgcolor: 'white', borderRadius: 2, boxShadow: 5,
          paddingX: 0.5, paddingY: 8, margin: 0.5,
          ":hover": { bgcolor: 'lightgray' }
        }}
      >
        <KeyboardDoubleArrowLeftIcon sx={{ transform: 'rotate(180deg)' }} />
      </IconButton>
      <Drawer
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: 'white',
            border: 0,
            boxShadow: 10
          }
        }}
        variant="persistent"
        anchor="left"
      >
        <Box component='form' id='locationInput' onSubmit={handleSubmit}>
          <Stack minWidth='90%' spacing={1} padding={1}>
            <IconButton onClick={handleOpen} sx={{ padding: 0.5, borderRadius: 1 }}>
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
            <SearchBox
              id='startLocation'
              name='startLocation'
              placeholder='Nhập điểm đi'
              setLocation={setStartLocation}
              setMapCenterRef={setMapCenterRef}
            />
            <SearchBox
              id='endLocation'
              name='endLocation'
              placeholder='Nhập điểm đến'
              setLocation={setEndLocation}
              setMapCenterRef={setMapCenterRef}
            />
          </Stack>
          <Divider />
          {!vehicleSelect ? (
            <Typography color='gray' align='center' marginTop={1}>
              <i>Chọn điểm đi và điểm đến</i>
            </Typography>
          ) : (
            <Stack minWidth='90%' spacing={1} padding={1} display='flex'>
              <ToggleButtonGroup
                orientation='vertical'
                exclusive
                color='primary'
                value={vehicle}
                onChange={handleVehicleChange}
              >
                <Box component={ToggleButton}
                  value='motorcycle'
                  fullWidth
                  variant='outlined'
                  justifyContent='flex-start'
                  sx={{ '&.Mui-selected': { color: 'green' } }}
                >
                  <TwoWheelerIcon sx={{ height: 40, width: 40, marginRight: 1 }}/>
                  <Stack flexDirection='column' alignItems='flex-start' spacing={1}>
                    <Stack flexDirection='row'>
                      <AccessTimeIcon sx={{ marginRight: 1 }}/>
                      <Typography variant='body'>
                        {dayjs(vehicleRouteRef.current.motorcycle.paths[0].time).format('HH[ tiếng ]mm[ phút ]ss[ giây ]')}
                      </Typography>
                    </Stack>
                    <Stack flexDirection='row'>
                      <RouteIcon sx={{ marginRight: 1 }}/>
                      <Typography variant='body'>
                        {vehicleRouteRef.current.motorcycle.paths[0].distance} mét
                      </Typography>
                    </Stack>
                    <Stack flexDirection='row'>
                      <PaidIcon sx={{ marginRight: 1 }}/>
                      <Typography variant='body'>Giá tiền</Typography>
                    </Stack>
                  </Stack>
                </Box>
                <Box component={ToggleButton}
                  value='car'
                  fullWidth
                  variant='outlined'
                  justifyContent='flex-start'
                  sx={{ '&.Mui-selected': { color: 'green' } }}
                >
                  <DirectionsCarIcon sx={{ height: 40, width: 40, marginRight: 1 }} />
                  <Stack flexDirection='column' alignItems='flex-start' spacing={1}>
                    <Stack flexDirection='row'>
                      <AccessTimeIcon sx={{ marginRight: 1 }}/>
                      <Typography variant='body'>
                        {dayjs(vehicleRouteRef.current.car.paths[0].time).format('HH[ tiếng ]mm[ phút ]ss[ giây ]')}
                      </Typography>
                    </Stack>
                    <Stack flexDirection='row'>
                      <RouteIcon sx={{ marginRight: 1 }}/>
                      <Typography variant='body'>
                        {vehicleRouteRef.current.car.paths[0].distance} mét
                      </Typography>
                    </Stack>
                    <Stack flexDirection='row'>
                      <PaidIcon sx={{ marginRight: 1 }}/>
                      <Typography variant='body'>Giá tiền</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </ToggleButtonGroup>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                children='Đặt xe'
              />
            </Stack>
          )}
        </Box>
      </Drawer>
    </Stack>
  )
}