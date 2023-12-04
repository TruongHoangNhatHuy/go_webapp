import { useState } from "react"
import { Button, Grid, Box, TextField, Typography, MenuItem, Avatar,Divider,ListItemAvatar,ImageList,ImageListItem } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { grey,red } from '@mui/material/colors'
import dayjs from "dayjs";
import { MdCloudUpload,MdChangeCircle } from "react-icons/md"
import 'dayjs/locale/en-gb';


const AccountInfo = () => {
  return (
    <Grid container flexDirection={"column"} borderRadius={4} border={"1px solid"}  borderColor={"grey.300"} height={"100%"} minWidth={"100%"}
    >
          <Grid item xs={2} sm={1} minWidth={"100%"} >
            <Box 
            sx={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              textAlign: "center",
            }}
            >
            <Typography variant="h7" fontWeight={450} width={"100%"} > Profile Picture</Typography>
            </Box>
          <Divider ></Divider>
          </Grid>
          <Grid item container flexDirection={"column"} xs={10} sm={11} minWidth={"100%"}>
           <Grid item xs={7} sm={6} minWidth={"100%"}>
              <ListItemAvatar
                sx={{
                  display:"flex",
                  alignItems: "end",
                  justifyContent: "center",
                  height:"100%"
                }}
              >
                  <Avatar 
                  sx={{
                    minHeight:{xs:"90%",sm:"50%"},
                    minWidth:{xs:"40%",sm:"50%"},
                  }}
                    src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/368021133_1726419231151489_6853635133763153961_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXc4Y4B9SC2Fny3yA8N-CUBC9cMpZD2bwEL1wylkPZvD4bJYKXx2IP8953lqBULM1Rvddh6Q3aEhnBc6AwmJmM&_nc_ohc=IlgaZzcSEqYAX87rjIK&_nc_ht=scontent.fhan14-1.fna&oh=00_AfCU8ygDPwHLiD3tAzBm42R61PpBmeuRJkvO7H6OcX2lNA&oe=656A1716"
                  >
                  </Avatar>
              </ListItemAvatar>
           </Grid>
           <Grid item xs={2} sm={1} minWidth={"100%"}>
           <Box 
            sx={{
              height: "100%",
              textAlign: "center",
              display: "flex",
              alignItems: "center"
            }}
            >
            <Typography variant="h7" fontWeight={100} width={"100%"} >Upload/Change Your Profile Image</Typography>
            </Box>
           </Grid>
           <Grid item xs={2} sm={1} minWidth={"100%"} textAlign={"center"}>
                <Button variant="contained" startIcon={<MdCloudUpload />}>
                  Upload file
                </Button>
           </Grid>
          </Grid>
    </Grid>
  )
}

const PersonalInfo = () => {
  const [edit, setEdit] = useState(false);

  return (
    <Grid container  flexDirection={"column"}  borderRadius={4} border={"1px solid"}  borderColor={"grey.300"} height={"100%"} minWidth={"100%"} overflowY={"scroll"}>
      <Grid item xs={1} sm={1} minWidth={"100%"} >
        <Box 
        sx={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          textAlign: "center",
        }}
        >
        <Typography variant="h7" fontWeight={450} width={"100%"} >Account Details</Typography>
        </Box>
      <Divider ></Divider>
      </Grid>
      <Grid item xs={1} sm={1} minWidth={"100%"}  px={"12px"} pt={"24px"}>
          <TextField InputProps={{sx: {borderRadius: '12px', }}} defaultValue={'Trần Trung Hiếu'} id="Name" label="Họ tên" variant="outlined" fullWidth required="true"/>
      </Grid>
      <Grid item xs={1} sm={1} minWidth={"100%"}  px={"12px"} pt={"24px"}>
          <TextField InputProps={{sx: {borderRadius: '12px', }}}  defaultValue={'anhemmotnha@gmail.com'} id="Gmail" label="Gmail" variant="outlined" fullWidth/>
      </Grid>
      <Grid item container flexDirection={"row"}  minWidth={"100%"} spacing={2} px={"12px"} pt={"24px"}>
        <Grid item xs={6} sm={6}>
          <TextField InputProps={{sx: {borderRadius: '12px', }}} defaultValue={'0975114060'}  id="Phone" label="Số điện thoại" variant="outlined" fullWidth required="true"/>
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField InputProps={{sx: {borderRadius: '12px', }}} defaultValue={'82 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng'} id="Location" label="Địa chỉ thường trú" variant="outlined" fullWidth/>
        </Grid>
      </Grid>
      <Grid item container flexDirection={"row"}  minWidth={"100%"} spacing={2} px={"12px"} pt={"24px"}>
        <Grid item xs={6} sm={6}>
          <TextField InputProps={{sx: {borderRadius: '12px', }}} defaultValue={'43P1-0877'}  id="License" label="Biển số xe" variant="outlined" fullWidth required="true"/>
        </Grid>
        <Grid item xs={6} sm={6}>
        <TextField InputProps={{sx: {borderRadius: '12px', }}}
          id="Vehicle" label="Loại Phương Tiện" select defaultValue="motobike" fullWidth
          >
            <MenuItem value={'motobike'}>Xe Máy</MenuItem>
            <MenuItem value={'car'}>Ô Tô</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Grid item container  flexDirection={"row"}  minWidth={"100%"} spacing={2} px={"12px"} pt={"24px"}>
        <Grid item xs={6} >
          <TextField InputProps={{sx: {borderRadius: '12px', }}}
          id="Gender" label="Giới tính" select defaultValue="male" fullWidth
          >
            <MenuItem value={'male'}>Nam</MenuItem>
            <MenuItem value={'female'}>Nữ</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb' fullWidth>
            <DatePicker disableFuture
              defaultValue={dayjs('2002-03-17')}
              slotProps={{
                textField: {
                  variant: "outlined",
                  required: true,
                  fullWidth: true,
                  id: "birthday",
                  name: "birthday",
                  label: "Ngày sinh",
                  InputProps:{sx: {borderRadius: '12px', }}
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid item xs={2} md={1} sm={2} lg={3} minWidth={"100%"}  px={"12px"} pt={"24px"}>
        <TextField
            InputProps={{sx: {borderRadius: '12px', }}}
            id="about"
            label="Thông tin thêm"
            multiline
            fullWidth
            rows={4}
            defaultValue="Đây là một tài xế với hơn 30 năm kinh nghiệm, thông thạo nhiều thứ tiếng"
          />


      </Grid>
      <Grid item xs={1} sm={1} minWidth={"100%"} textAlign={"end"}  pr={"12px"}
      sx={{pt:{md:"12px",xs:"12px"}}}
      >
          <Button variant="contained" startIcon={<MdChangeCircle />}>
            Save Changes
          </Button>
      </Grid>
    </Grid>
  )
}

const Account = () => {
  return (
      <Grid container height ={"100%"} width={"100%"} spacing={1} p={1} flexDirection={"row"}
        sx={{overflowY:{ xs: "scroll"}}}
      >
        <Grid item xs={12} sm={4} sx={{height:{xs:"40%",sm:"100%"}}}>
          <AccountInfo/>
        </Grid>
        <Grid item xs={12} sm={8} sx={{height:{xs:"110%",sm:"100%"}}}>
          <PersonalInfo/>
        </Grid> 
      </Grid>
  )
}

export default Account