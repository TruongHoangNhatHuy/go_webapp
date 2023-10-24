import { useState } from "react"
import { Button, Grid, Box, TextField, Typography, MenuItem, Avatar } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import 'dayjs/locale/en-gb';

const AccountInfo = () => {
  return (
    <Grid container flexDirection={"row"} maxWidth={"98%"} justifyContent={"center"} alignItems={"center"} rowSpacing={1} bgcolor="white" margin={1} paddingTop={1} paddingBottom={2} borderRadius={2} boxShadow={2} >
      <Grid item xs={2} md={1} align={"center"}>
        <Avatar>H</Avatar>
      </Grid>
      <Grid item container flexDirection={"column"} xs={8} md={8} >
        <Grid item xs={12}>
          <Typography variant="h6">Nhat Huy</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">huy@gmail.com</Typography>
        </Grid>
      </Grid>
      <Grid item xs={2} md={1}>
        <Typography variant="h6" fontWeight={"regular"}>Tài xế</Typography>
      </Grid>
      <Grid item xs={12} md align={"center"}>
        <Button variant="outlined">Đăng xuất</Button>
      </Grid>
    </Grid>
  )
}

const PersonalInfo = () => {
  const [edit, setEdit] = useState(false);

  return (
    <Grid container flexDirection={"column"} maxWidth={"98%"} rowSpacing={1} bgcolor="white" margin={1} padding={2} paddingTop={1} borderRadius={2} boxShadow={2} >
      <Grid item xs={12}>
        <Typography variant="h4" color="green" fontWeight="bold">Thông tin cá nhân</Typography>
      </Grid>
      <Grid item container flexDirection={"row"} alignItems={"center"} >
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Họ tên</Typography>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField 
            fullWidth
            size="small"
            variant={ edit ? "outlined" : "standard" }
            disabled={ edit ? false : true }
            defaultValue={'Trương Hoàng Nhật Huy'}
          />
        </Grid>
      </Grid>
      <Grid item container flexDirection={"row"} alignItems={"center"} >
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Giới tính</Typography>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField 
            select
            fullWidth
            size="small"
            variant={ edit ? "outlined" : "standard" }
            disabled={ edit ? false : true }
            defaultValue={'male'}
          >
            <MenuItem value={'male'}>Nam</MenuItem>
            <MenuItem value={'female'}>Nữ</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Grid item container flexDirection={"row"} alignItems={"center"} >
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Ngày sinh</Typography>
        </Grid>
        <Grid item xs={12} sm={5}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
            <DatePicker disableFuture
              disabled={ edit ? false : true }
              defaultValue={dayjs('2002-03-17')}
              slotProps={{
                textField: {
                  variant: edit ? "outlined" : "standard",
                  required: true,
                  fullWidth: true,
                  size: "small",
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
      </Grid>
      <Grid item container flexDirection={"row"} alignItems={"center"} >
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Số điện thoại</Typography>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField 
            fullWidth
            size="small"
            variant={ edit ? "outlined" : "standard" }
            disabled={ edit ? false : true }
            defaultValue={'0987654321'}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}  align={"center"}> 
        { 
          edit ? (
            <Box>
              <Button sx={{ mr: 1}} variant="contained" onClick={()=> setEdit(false)}>Xong</Button>
              <Button variant="outlined" onClick={()=> setEdit(false)}>Hủy</Button>
            </Box>
          ) : (
            <Button variant="outlined" onClick={()=> setEdit(true)}>Chỉnh sửa</Button>
          )
        } 
      </Grid>
    </Grid>
  )
}

const DriverInfo = () => {
  return (
    <Grid container flexDirection={"column"} maxWidth={"98%"} rowSpacing={1} bgcolor="white" margin={1} padding={2} paddingTop={1} borderRadius={2} boxShadow={2} >
      <Grid item xs={12}>
        <Typography variant="h4" color="green" fontWeight="bold">Thông tin tài xế</Typography>
      </Grid>
      <Grid item container flexDirection={"row"} alignItems={"center"}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6">Số căn cước công dân</Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField 
            fullWidth
            variant="standard"
            disabled
            defaultValue={'01234567890'}
          />
        </Grid>
      </Grid>
      <Grid item container flexDirection={"row"} alignItems={"center"}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6">Địa chỉ</Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField 
            fullWidth
            multiline
            rows={2}
            variant="standard"
            disabled
            defaultValue={'Kiệt 82, đường Nguyễn Lương Bằng, quận Liên Chiểu, Đà Nẵng'}
          />
        </Grid>
      </Grid>
      <Grid item container flexDirection={"row"} alignItems={"center"}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6">Loại phương tiện</Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField 
            fullWidth
            variant="standard"
            disabled
            defaultValue={'Ôtô 4 chỗ'}
          />
        </Grid>
      </Grid>
      <Grid item container flexDirection={"row"} alignItems={"center"}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6">Ngày bắt đầu làm việc</Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField 
            fullWidth
            variant="standard"
            disabled
            defaultValue={'10/10/2023'}
          />
        </Grid>
      </Grid>
      <Grid item container xs={12} flexDirection={"row"} rowSpacing={1} alignItems={"center"}>
        <Grid item container xs={12} md={6} flexDirection={"column"}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Ảnh chân dung</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{
                height: 250,
                width: 250,
              }}
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} md={6} flexDirection={"column"}>
          <Grid item xs={12} md>
            <Typography variant="h6">Ảnh mặt trước giấy phép lái xe</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{
                height: 250,
                width: 350,
              }}
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const Account = () => {
  return (
    <Box sx={{maxHeight: '100vh', overflow: 'auto'}}>
      <AccountInfo/>
      <PersonalInfo/>
      <DriverInfo/>
    </Box>
  )
}

export default Account