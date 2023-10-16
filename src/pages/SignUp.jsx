import { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, MenuItem, Link, Grid, Box, Typography, Container, FormControlLabel, Checkbox } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/en-gb';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        PBL6
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignUpForm = () => {
  const [driverForm, setDriverForm] = useState(false);
  const navigate = useNavigate();

  const handleDriverSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      gender: data.get('gender'),
      birthday: data.get('birthday'),
      phoneNumber: data.get('phoneNumber'),
      citizenId: data.get('citizenId'),
      address: data.get('address'),
      portraitImage: data.get('portraitImage'),
      licenseImage: data.get('licenseImage'),
    });
  };

  if (!driverForm)
    return (
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ mb: 2 }}>
          Chào mừng bạn đến với Go. Bạn đăng kí với vai trò gì.
        </Typography>
        <Button fullWidth variant="outlined" sx={{ mb: 2 }} onClick={() => navigate('/app/booking')}>
          Tôi là khách hàng
        </Button>
        <Button fullWidth variant="outlined" sx={{ mb: 2 }} onClick={() => setDriverForm(true)}>
          Tôi là tài xế
        </Button>
      </Box>
    )
  else // Form đăng kí của tài xế
    return (
      <Box component="form" onSubmit={handleDriverSubmit} sx={{ mt: 2 }}>
        <Typography sx={{ mb: 2 }}>
          Xin vui lòng cung cấp thông tin của tài xế.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Họ"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="firstName"
              label="Tên"
              name="firstName"
              autoComplete="given-name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              required
              fullWidth
              id="gender"
              label="Giới tính"
              name="gender"
              autoComplete='sex'
            >
              <MenuItem value={'male'}>Nam</MenuItem>
              <MenuItem value={'female'}>Nữ</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
              <DatePicker label="Ngày sinh" disableFuture
                slotProps={{
                  textField: {
                    required: true,
                    fullWidth: true,
                    id: "birthday",
                    name: "birthday"
                  },
                  actionBar: {
                    actions: ['clear']
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="phoneNumber"
              label="Số điện thoại"
              name="phoneNumber"
              autoComplete="tel"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="citizenId"
              label="Số căn cước công dân"
              name="citizenId"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="address"
              label="Địa chỉ"
              name="address"
              autoComplete="address-line1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type='file'
              inputProps={{ accept: 'image/*'}}
              id="portraitImage"
              label="Ảnh chân dung"
              name="portraitImage"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type='file'
              inputProps={{ accept: 'image/*'}}
              id="licenseImage"
              label="Ảnh mặt trước giấy phép lái xe"
              name="licenseImage"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox required value="allowExtraEmails" color="primary"/>}
              label="Tôi đã đọc và đồng ý với Chính sách của công ty"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Đăng kí
        </Button>
        <Button
          type="reset"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={()=> setDriverForm(false)}
        >
          Hủy
        </Button>
      </Box>
    )
}

const defaultTheme = createTheme();

export default function SignUp() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth='sm'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <SignUpForm/>
        </Box>
        <Copyright sx={{ mt: 5, mb: 2 }} />
      </Container>
    </ThemeProvider>
  );
}