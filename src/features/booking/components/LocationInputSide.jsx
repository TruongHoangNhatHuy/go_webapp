import { useState, useRef, useEffect } from 'react';
import { Autocomplete, Box, Button, CircularProgress, Divider, Drawer, IconButton, InputAdornment, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RouteIcon from '@mui/icons-material/Route';
import PaidIcon from '@mui/icons-material/Paid';
import { debounce } from '@mui/material/utils'
import { metersToString, milisecondsToString } from '../utils/converter.js';
import { getLocationsByAddress, getCoordinatesByRefid } from '../services/vietmap/api_geocode.js';
import { getLocationByCoordinates } from '../services/vietmap/api_reverse.js';
import { getLocationsAutocomplete } from '../services/vietmap/api_autocomplete.js';
import { getRoute } from '../services/vietmap/api_route.js';
import { getAmount } from '../services/be_server/api_booking.js';
import { useBookingContext } from 'contexts/BookingContext.jsx';
import { useUserContext } from 'contexts/UserContext.jsx';

const SearchBox = (props) => {
  const { userPosition, location, setLocation, setMapCenterRef, ...tfProps } = props;
  const [options, setOptions] = useState([{ "name": "Vị trí người dùng" }]);
  // Thông tin địa điểm được chọn
  const locationRef = useRef(null);

  // Request API lấy danh sách địa chỉ gợi ý
  // chỉ thực hiện sau khi người dùng ngừng nhập 1s
  const queryOptions = debounce((_, value) => {
    if (value === null || value === "") {
      if (userPosition !== null) {
        setOptions([{ "name": "Vị trí người dùng" }])
      }
    } else {
      try {
        const userLatLng = userPosition.toString();
        setOptions(getLocationsAutocomplete(value.trim(), userLatLng));
      } catch (error) {
        setOptions(getLocationsByAddress(value.trim()));
      }
    }
  }, 1000);

  // Khi chọn 1 địa điểm:
  const handleChange = (_, item) => {
    // console.log('item', item)
    if (item !== null) {
      if (item.name === 'Vị trí người dùng') {
        if (userPosition !== null) {
          const [lat, lng] = userPosition;
          const userLocation = getLocationByCoordinates(lng, lat)[0];
          handleChange(_, userLocation);
        }
      }
      else {
        // lấy tọa độ
        const locationCoordinates = getCoordinatesByRefid(item.ref_id);
        locationRef.current = {
          'location': item,
          'coordinates': locationCoordinates
        };
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
            {option.name === 'Vị trí người dùng' ? (<MyLocationIcon sx={{ color: '#1da1f2' }}/>) : (<PlaceIcon sx={{ color: 'gray' }}/>)}
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
          sx={{ bgcolor: 'white'}}
          InputProps={{
            ...params.InputProps,
            sx: {
              borderRadius: '16px' // Giá trị bạn muốn
            },
            startAdornment:
              <InputAdornment position='start' sx={{ margin: 0}}>
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
  const { hidden, userPosition, startLocation, setStartLocation, endLocation, setEndLocation, setVehicleRoute, setMapCenterRef, setBookingForm } = props;
  const [bookingInfo, setBookingInfo] = useBookingContext();
  const [user,] = useUserContext();

  const drawerWidth = 350;
  // Đóng mở drawer
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(prev => !prev)
  }

  const [fetching, setFetching] = useState(false);
  const vehicleRouteRef = useRef(null);   // Lưu thông tin các tuyến đường
  const vehicleAmountRef = useRef(null);  // Lưu giá tiền
  // Phượng tiện đã chọn
  const [vehicle, setVehicle] = useState(null);
  const minDistance = 200;    // 200m
  const maxDistance = 150000; // 150km
  // Ẩn hiện bảng chọn tuyến đường
  const [vehicleSelect, setVehicleSelect] = useState(false);

  useEffect(() => {
    if (startLocation && endLocation) {
      var startLatLng = [startLocation.coordinates.lat, startLocation.coordinates.lng].toString();
      var endLatLng = [endLocation.coordinates.lat, endLocation.coordinates.lng].toString();
      setFetching(true);
      // chờ lấy dữ liệu
      setTimeout(async () => {
        vehicleRouteRef.current = {};
        vehicleRouteRef.current.motorcycle = getRoute(startLatLng, endLatLng, 'motorcycle');
        vehicleRouteRef.current.car = getRoute(startLatLng, endLatLng, 'car');
        await getAmount(user.token, startLatLng, endLatLng)
          .then((result) => {
            vehicleAmountRef.current = result.amounts
            setVehicleSelect(true);
          })
          .catch(error => {
            alert('Vui lòng thử lại.');
          });
        setFetching(false);
      }, 500)
    } else {
      vehicleRouteRef.current = null;
      vehicleAmountRef.current = null;
      setVehicleSelect(false);
    }
    setVehicle(null);
    setVehicleRoute(null);
    // console.log('vehicleRouteRef', vehicleRouteRef.current);
  }, [startLocation, endLocation])

  const handleVehicleChange = (_, value) => {
    switch (value) {
      case 'motorcycle': {
        setVehicle(value);
        setVehicleRoute(vehicleRouteRef.current.motorcycle);
        break;
      }
      case 'car': {
        setVehicle(value);
        setVehicleRoute(vehicleRouteRef.current.car);
        break;
      }
      default: {
        setVehicle(null);
        setVehicleRoute(null);
        break;
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    var updatedBookingInfo = bookingInfo;
    updatedBookingInfo.startLocation = startLocation;
    updatedBookingInfo.endLocation = endLocation;
    updatedBookingInfo.vehicleType = vehicle;
    updatedBookingInfo.paymentAmounts = (vehicle === 'motorcycle' ? vehicleAmountRef.current['1'] : vehicleAmountRef.current['2']);
    setBookingInfo(updatedBookingInfo);
    setBookingForm(true);
  };

  return (
    <Stack display={hidden ? 'none' : 'flex'} flexDirection='row' height='100vh' alignItems={'center'}>
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
          width: { xs: "100vw", md: drawerWidth, sm: drawerWidth },
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: { xs: "100vw", md: drawerWidth, sm: drawerWidth },
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
              placeholder='Tìm điểm đi'
              userPosition={userPosition}
              location={startLocation}
              setLocation={setStartLocation}
              setMapCenterRef={setMapCenterRef}
            />
            <SearchBox
              id='endLocation'
              name='endLocation'
              placeholder='Tìm điểm đến'
              userPosition={userPosition}
              location={endLocation}
              setLocation={setEndLocation}
              setMapCenterRef={setMapCenterRef}
            />
            <Divider />
          </Stack>
          {fetching ? (
            <Stack minWidth='90%' margin={1} alignItems='center'>
              <CircularProgress sx={{ color: 'gray' }}/>
            </Stack>
          ) :
          !vehicleSelect ? (
            <Typography color='gray' align='center'>
              <i>
                Chọn điểm đi và điểm đến.<br/>
                Bật định vị để tìm kiếm các địa điểm lân cận.
              </i>
            </Typography>
          ) : (
            <Stack minWidth='90%' spacing={1} padding={1} paddingTop={0} display='flex'>
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
                  disabled={vehicleRouteRef.current.motorcycle.paths[0].distance <= minDistance || vehicleRouteRef.current.motorcycle.paths[0].distance >= maxDistance}
                  sx={{ '&.Mui-selected': { color: 'green' } }}
                >
                  <TwoWheelerIcon sx={{ height: 40, width: 40, marginRight: 1 }}/>
                  <Stack flexDirection='column' alignItems='flex-start' spacing={1}>
                    <Stack flexDirection='row'>
                      <AccessTimeIcon sx={{ marginRight: 1 }}/>
                      <Typography variant='body'>
                        Khoảng {milisecondsToString(vehicleRouteRef.current.motorcycle.paths[0].time)}
                      </Typography>
                    </Stack>
                    <Stack flexDirection='row'>
                      <RouteIcon sx={{ marginRight: 1 }}/>
                      <Typography variant='body'>
                        {metersToString(vehicleRouteRef.current.motorcycle.paths[0].distance)}
                      </Typography>
                    </Stack>
                    {vehicleRouteRef.current.motorcycle.paths[0].distance <= minDistance ? (
                        <Typography variant='body' color='red'>Khoảng cách quá gần</Typography>
                      ) : vehicleRouteRef.current.motorcycle.paths[0].distance >= maxDistance ? (
                        <Typography variant='body' color='red'>Khoảng cách quá xa</Typography>
                      ) : (
                        <Stack flexDirection='row'>
                          <PaidIcon sx={{ marginRight: 1 }}/>
                          <Typography variant='body'>
                            {Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                              currencyDisplay: 'code'
                            }).format(vehicleAmountRef.current['1'])}
                          </Typography>
                        </Stack>
                      )
                    }
                  </Stack>
                </Box>
                <Box component={ToggleButton}
                  value='car'
                  fullWidth
                  variant='outlined'
                  justifyContent='flex-start'
                  disabled={vehicleRouteRef.current.car.paths[0].distance <= minDistance || vehicleRouteRef.current.car.paths[0].distance >= maxDistance}
                  sx={{ '&.Mui-selected': { color: 'green' } }}
                >
                  <DirectionsCarIcon sx={{ height: 40, width: 40, marginRight: 1 }} />
                  <Stack flexDirection='column' alignItems='flex-start' spacing={1}>
                    <Stack flexDirection='row'>
                      <AccessTimeIcon sx={{ marginRight: 1 }}/>
                      <Typography variant='body'>
                        Khoảng {milisecondsToString(vehicleRouteRef.current.car.paths[0].time)}
                      </Typography>
                    </Stack>
                    <Stack flexDirection='row'>
                      <RouteIcon sx={{ marginRight: 1 }}/>
                      <Typography variant='body'>
                        {metersToString(vehicleRouteRef.current.car.paths[0].distance)}
                      </Typography>
                    </Stack>
                    {vehicleRouteRef.current.car.paths[0].distance <= minDistance ? (
                        <Typography variant='body' color='red'>Khoảng cách quá gần</Typography>
                      ) : vehicleRouteRef.current.car.paths[0].distance >= maxDistance ? (
                        <Typography variant='body' color='red'>Khoảng cách quá xa</Typography>
                      ) : ( 
                        <Stack flexDirection='row'>
                          <PaidIcon sx={{ marginRight: 1 }}/>
                          <Typography variant='body'>
                            {Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                              currencyDisplay: 'code'
                            }).format(vehicleAmountRef.current['2'])}
                          </Typography>
                        </Stack>
                      )
                    }
                  </Stack>
                </Box>
              </ToggleButtonGroup>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                disabled={vehicle === null}
                children='Đặt xe'
              />
            </Stack>
          )}
        </Box>
      </Drawer>
    </Stack>
  )
}