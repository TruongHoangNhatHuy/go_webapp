import {Rating,Grid,Modal,CircularProgress,Badge,Box, Button, Divider, Drawer, IconButton, Paper, Stack, Typography,ListItem,ListItemAvatar,Avatar,ListItemText,TextField,Table, TableBody, TableCell, TableRow,TableContainer } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { BookingDetail } from '..';
import { blue,grey,green,red,yellow,pink} from '@mui/material/colors'
import { useState } from 'react';
import { MdDeleteOutline,MdOutlineMessage,MdPersonSearch,MdClose,MdSend,MdTransgender,MdOutlineCake,MdOutlineHome,MdOutlinePhone,MdOutlineStarBorder,MdOutlinePortrait,MdOutlineLoyalty,MdCommute } from "react-icons/md";

const DriverInfo = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Stack spacing={1} padding={1}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/368021133_1726419231151489_6853635133763153961_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXc4Y4B9SC2Fny3yA8N-CUBC9cMpZD2bwEL1wylkPZvD4bJYKXx2IP8953lqBULM1Rvddh6Q3aEhnBc6AwmJmM&_nc_ohc=FgYf9CMpRYQAX9gLkse&_nc_ht=scontent.fhan20-1.fna&oh=00_AfB2TLCI9muhPj0U1P7214_AGbdtYYO_693BJyqBRJvr7g&oe=655C28D8">
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Trần Trung Hiếu" secondary="43P1-0877" />
        
         {/* ở dưới là button tin nhắn */}
         <IconButton onClick={handleOpen}>
            <Badge badgeContent={10} color="error">
            <MdOutlineMessage />
            </Badge>
          </IconButton>
        {/* MessageConversation Form */}
          <Modal
            open={open}
            onClose={handleClose}
            sx ={{
              display:"flex",justifyContent:"center",alignItems:"center",width: { xs: "100vw", md: "100%", sm: "100%" },height: { xs: "100vh", md: "100%", sm: "100%" }
            }}
          >
           <Box sx ={{display:"flex", flexDirection: 'column' ,width: { xs: "100%", md: "50%", sm: "50%" },height: { xs: "100%", md: "80%", sm: "80%" }, bgcolor:"white",borderRadius:"16px"}}>
                {/* Header Message */}
                  <Grid xs={12} sm={12} md={12} 
                  sx={{
                    borderRadius: "16px",
                  }}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/368021133_1726419231151489_6853635133763153961_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXc4Y4B9SC2Fny3yA8N-CUBC9cMpZD2bwEL1wylkPZvD4bJYKXx2IP8953lqBULM1Rvddh6Q3aEhnBc6AwmJmM&_nc_ohc=FgYf9CMpRYQAX9gLkse&_nc_ht=scontent.fhan20-1.fna&oh=00_AfB2TLCI9muhPj0U1P7214_AGbdtYYO_693BJyqBRJvr7g&oe=655C28D8">
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Trần Trung Hiếu" secondary="Online" />
                      <IconButton onClick={handleClose}>
                       <MdClose />
                     </IconButton>
                    </ListItem>
                    <Divider/>   
                  </Grid >
                    {/* Content conversation and Infomation  */}
                    {/* Thay thế bằng data API */}
                  <Grid xs={12} sm={12} md={12} 
                  sx={{
                    height:"85%",
                    overflowY:"scroll",
                    msOverflowStyle:'none',
                    scrollbarWidth:'none',
                    '&::-webkit-scrollbar':{
                     display:'none'
                    },
                    }} >
                  <Stack direction = "row" justifyContent={"start"}>
                    <Box
                        mt={1.5}
                        ml={3}
                      sx={{
                        width: "max-content",
                      }}
                      >
                    <Typography variant="caption" color={grey[400]}>
                    11:09pm
                  </Typography>
                      </Box>
                    </Stack>
                    <Stack direction = "row" justifyContent={"start"}>
                      <Box
                        p={1.5}
                        ml={1.5}
                      sx={{
                        bgcolor: grey[100],
                        borderRadius: "16px",
                        width: "max-content",
                      }}
                      >
                        <Typography variant='body 2'>
                        Xin chào bạn! Tôi Sẽ Hướng Dẫn Bạn
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction = "row" justifyContent={"end"}>
                    <Box
                        mt={1.5}
                        mr={3}
                      sx={{
                        width: "max-content",
                      }}
                      >
                    <Typography variant="caption" color={grey[400]}>
                    11:09pm
                  </Typography>
                      </Box>
                    </Stack>
                    <Stack direction = "row" justifyContent={"end"}>
                      <Box
                        p={1.5}
                        mr={1.5}
                      sx={{
                        bgcolor: green[100],
                        borderRadius: "16px",
                        width: "max-content",
                      }}
                      >
                        <Typography variant='body 2'>
                        Tôi cần một chuyến ra bến xe gấp
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction = "row" justifyContent={"start"}>
                    <Box
                        mt={1.5}
                        ml={3}
                      sx={{
                        width: "max-content",
                      }}
                      >
                    <Typography variant="caption" color={grey[400]}>
                    11:09pm
                  </Typography>
                      </Box>
                    </Stack>
                    <Stack direction = "row" justifyContent={"start"}>
                      <Box
                        p={1.5}
                        ml={1.5}
                      sx={{
                        bgcolor: grey[100],
                        borderRadius: "16px",
                        width: "max-content",
                      }}
                      >
                        <Typography variant='body 2'>
                        Xin chào bạn! Tôi Sẽ Hướng Dẫn Bạn
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction = "row" justifyContent={"end"}>
                    <Box
                        mt={1.5}
                        mr={3}
                      sx={{
                        width: "max-content",
                      }}
                      >
                    <Typography variant="caption" color={grey[400]}>
                    11:09pm
                  </Typography>
                      </Box>
                    </Stack>
                    <Stack direction = "row" justifyContent={"end"}>
                      <Box
                        p={1.5}
                        mr={1.5}
                      sx={{
                        bgcolor: green[100],
                        borderRadius: "16px",
                        width: "max-content",
                      }}
                      >
                        <Typography variant='body 2'>
                        Tôi cần một chuyến ra bến xe gấp
                        </Typography>
                      </Box>
                    </Stack><Stack direction = "row" justifyContent={"start"}>
                    <Box
                        mt={1.5}
                        ml={3}
                      sx={{
                        width: "max-content",
                      }}
                      >
                    <Typography variant="caption" color={grey[400]}>
                    11:09pm
                  </Typography>
                      </Box>
                    </Stack>
                    <Stack direction = "row" justifyContent={"start"}>
                      <Box
                        p={1.5}
                        ml={1.5}
                      sx={{
                        bgcolor: grey[100],
                        borderRadius: "16px",
                        width: "max-content",
                      }}
                      >
                        <Typography variant='body 2'>
                        Xin chào bạn! Tôi Sẽ Hướng Dẫn Bạn
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction = "row" justifyContent={"end"}>
                    <Box
                        mt={1.5}
                        mr={3}
                      sx={{
                        width: "max-content",
                      }}
                      >
                    <Typography variant="caption" color={grey[400]}>
                    11:09pm
                  </Typography>
                      </Box>
                    </Stack>
                    <Stack direction = "row" justifyContent={"end"}>
                      <Box
                        p={1.5}
                        mr={1.5}
                      sx={{
                        bgcolor: green[100],
                        borderRadius: "16px",
                        width: "max-content",
                      }}
                      >
                        <Typography variant='body 2'>
                        Tôi cần một chuyến ra bến xe gấp
                        </Typography>
                      </Box>
                    </Stack><Stack direction = "row" justifyContent={"start"}>
                    <Box
                        mt={1.5}
                        ml={3}
                      sx={{
                        width: "max-content",
                      }}
                      >
                    <Typography variant="caption" color={grey[400]}>
                    11:09pm
                  </Typography>
                      </Box>
                    </Stack>
                    <Stack direction = "row" justifyContent={"start"}>
                      <Box
                        p={1.5}
                        ml={1.5}
                      sx={{
                        bgcolor: grey[100],
                        borderRadius: "16px",
                        width: "max-content",
                      }}
                      >
                        <Typography variant='body 2'>
                        Xin chào bạn! Tôi Sẽ Hướng Dẫn Bạn
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction = "row" justifyContent={"end"}>
                    <Box
                        mt={1.5}
                        mr={3}
                      sx={{
                        width: "max-content",
                      }}
                      >
                    <Typography variant="caption" color={grey[400]}>
                    11:09pm
                  </Typography>
                      </Box>
                    </Stack>
                    <Stack direction = "row" justifyContent={"end"}>
                      <Box
                        p={1.5}
                        mr={1.5}
                      sx={{
                        bgcolor: green[100],
                        borderRadius: "16px",
                        width: "max-content",
                      }}
                      >
                        <Typography variant='body 2'>
                        Tôi cần một chuyến ra bến xe gấp
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  
                  {/* Footer conversation */}
                  <Grid xs={12} sm={12} md={12} sx={{}} >
                  <Divider/>
                  <ListItem >
                  <TextField
                  fullWidth
                  placeholder='Nhập tin nhắn'
                  InputProps={{
                    sx: {
                      borderRadius: '16px', 
                    },
                  }}
                  >
                  </TextField>
                  <IconButton sx={{color: blue[400]}}>
                       <MdSend />
                  </IconButton>
                  </ListItem>
                  </Grid>
            </Box>
          </Modal>
      </ListItem>
      <DriverInfoDetail />
    </Stack>
  )
}

const DriverInfoDetail = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };  
  return (
    <Stack spacing={1}>
      <Button variant='outlined' onClick={handleOpen} size='small'startIcon={<MdPersonSearch />}>Thông Tin Chi Tiết</Button>
    {/* Form InfoDetail */}
    <Modal
    open={open}
    onClose={handleClose}
    sx ={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      width: { xs: "100vw", md: "100%", sm: "100%" },
      height: { xs: "100vh", md: "100%", sm: "100%" }
    }}
    >
      <Box
      sx ={{
        display:"flex", flexDirection: 'column' ,
        width: { xs: "100%", md: "30%", sm: "30%" },
        height: { xs: "100%", md: "80%", sm: "80%" },
         bgcolor:"white",borderRadius:"16px"}}
      >
        <IconButton
        sx={{
          ml: "auto",
        }}
        onClick={handleClose}>
          <MdClose />
        </IconButton>

        <Grid xs={12} sm={12} md={12} sx={{height:"15%", width:"30%", ml:"auto", mr:"auto"}} >
            <Avatar 
            sx={{
              height:"100%",
              width:"100%"
            }}
            src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/368021133_1726419231151489_6853635133763153961_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXc4Y4B9SC2Fny3yA8N-CUBC9cMpZD2bwEL1wylkPZvD4bJYKXx2IP8953lqBULM1Rvddh6Q3aEhnBc6AwmJmM&_nc_ohc=FgYf9CMpRYQAX9gLkse&_nc_ht=scontent.fhan20-1.fna&oh=00_AfB2TLCI9muhPj0U1P7214_AGbdtYYO_693BJyqBRJvr7g&oe=655C28D8">
            </Avatar>
        </Grid>
            <Divider>Trần Trung Hiếu</Divider>  
        <Table size='small'>
          <TableBody>
            <TableRow sx={{padding:"8px 0px"}}>
              <TableCell component="th" scope="row" >
              <IconButton sx={{pointerEvents: 'none', color: blue[700]}}><MdOutlinePortrait /></IconButton>
                Nghề Nghiệp</TableCell>
              <TableCell variant='head' align='right'>Tài Xế</TableCell>
            </TableRow >
            <TableRow >
              <TableCell component="th" scope="row" >
              <IconButton sx={{pointerEvents: 'none', color: pink[400]}}><MdOutlineCake/></IconButton>
                Ngày Sinh</TableCell>
              <TableCell variant='head' align='right' >23/08/2002</TableCell>
            </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                <IconButton sx={{pointerEvents: 'none', }}><MdOutlineHome /></IconButton>
                Quê Quán</TableCell>
                <TableCell variant='head' align='right'>Quảng Trị</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                <IconButton sx={{pointerEvents: 'none', color: blue[700]}}><MdTransgender /></IconButton>
                Giới Tính</TableCell>
                <TableCell variant='head' align='right'>Nam</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                <IconButton sx={{pointerEvents: 'none'}}><MdCommute /></IconButton>
                Loại Phương Tiện</TableCell>
                <TableCell variant='head' align='right'>Xe Máy</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                <IconButton sx={{pointerEvents: 'none', color: blue[700]}}><MdOutlinePhone /></IconButton>
                Số Điện Thoại</TableCell>
                <TableCell variant='head' align='right'>0829837123</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                <IconButton sx={{pointerEvents: 'none', color: green[300]}}><MdOutlineLoyalty /></IconButton>
                Biển Số Xe</TableCell>
                <TableCell variant='head' align='right'>43P1-0877</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                <IconButton sx={{pointerEvents: 'none', color: yellow[500]}}><MdOutlineStarBorder /></IconButton>
                Điểm Đánh Giá</TableCell>
                <TableCell variant='head' align='right'><Rating defaultValue={3} readOnly /></TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Modal>
    </Stack>
  )
}





export const BookingInfoSide = ({ bookingRef, handleBookingCancel }) => {

  const drawerWidth = 350;
  // Đóng mở drawer
  const [open, setOpen] = useState(true);

  const handleCancel = () => {
    if (window.confirm('Xác nhận hủy đặt xe?')) {
      setOpen(false)
      handleBookingCancel()
    }
  }
  const handleOpen = () => {
    setOpen(prev => !prev)
  }

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
        <Stack minWidth='90%' spacing={1} padding={1}>
          <IconButton onClick={handleOpen} sx={{ padding: 0.5, borderRadius: 1 }}>
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
          <Divider/>
          <Typography variant='h6'>Thông Tin Tài Xế <CircularProgress  size={16}/></Typography>
          <DriverInfo/>
          <Divider/>
          <Typography variant='h6'>Chi Tiết Đặt Xe</Typography>
          <BookingDetail bookingRef={bookingRef}/>
          <Divider/>
          <Button variant='outlined' size='small' color='error' onClick={handleCancel} startIcon={<MdDeleteOutline />}>Hủy đơn</Button>
        </Stack>
      </Drawer>
    </Stack>
  )
}