import { Rating, Grid, Modal, Badge, Box, Button, Divider, IconButton, Stack, Typography, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { blue, grey, green, yellow, pink } from '@mui/material/colors'
import { useState } from 'react';
import { MdOutlineMessage, MdPersonSearch, MdClose, MdSend, MdTransgender, MdOutlineCake, MdOutlineHome, MdOutlinePhone, MdOutlineStarBorder, MdOutlinePortrait, MdOutlineLoyalty, MdCommute } from "react-icons/md";

/* myMessage=true thì sẽ ở bên phải, không thì ở bên trái */
const messagesData = [
  {
    myMessage: false,
    time: '11:09pm',
    message: 'Xin chào bạn! Tôi Sẽ Hướng Dẫn Bạn'
  },
  {
    myMessage: true,
    time: '11:09pm',
    message: 'Tôi cần đi đến bến xe gấp'
  },
  {
    myMessage: false,
    time: '11:09pm',
    message: 'Xin chào bạn! Tôi Sẽ Hướng Dẫn Bạn'
  },
  {
    myMessage: true,
    time: '11:09pm',
    message: 'Tôi cần đi đến bến xe gấp'
  },
  {
    myMessage: false,
    time: '11:09pm',
    message: 'Xin chào bạn! Tôi Sẽ Hướng Dẫn Bạn'
  },
  {
    myMessage: true,
    time: '11:09pm',
    message: 'Tôi cần đi đến bến xe gấp'
  },
  {
    myMessage: false,
    time: '11:09pm',
    message: 'Xin chào bạn! Tôi Sẽ Hướng Dẫn Bạn'
  },
  {
    myMessage: true,
    time: '11:09pm',
    message: 'Tôi cần đi đến bến xe gấp'
  },
]

const MessageForm = ({ open, setOpenMessage }) => {
  const handleCloseMessage = () => {
    setOpenMessage(false);
  };

  return (
    <Modal open={open} onClose={handleCloseMessage} sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: {
        xs: "100vw",
        md: "100%",
        sm: "100%"
      },
      height: {
        xs: "100vh",
        md: "100%",
        sm: "100%"
      }
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: 'column',
        width: {
          xs: "100%",
          md: "50%",
          sm: "50%"
        },
        height: {
          xs: "100%",
          md: "80%",
          sm: "80%"
        },
        bgcolor: "white",
        borderRadius: "16px"
      }}>
        {/* Header Message */}
        <Grid xs={12} sm={12} md={12} sx={{
          borderRadius: "16px"
        }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/368021133_1726419231151489_6853635133763153961_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXc4Y4B9SC2Fny3yA8N-CUBC9cMpZD2bwEL1wylkPZvD4bJYKXx2IP8953lqBULM1Rvddh6Q3aEhnBc6AwmJmM&_nc_ohc=FgYf9CMpRYQAX9gLkse&_nc_ht=scontent.fhan20-1.fna&oh=00_AfB2TLCI9muhPj0U1P7214_AGbdtYYO_693BJyqBRJvr7g&oe=655C28D8">
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Trần Trung Hiếu" secondary="Online" />
            <IconButton onClick={handleCloseMessage}>
              <MdClose />
            </IconButton>
          </ListItem>
          <Divider />
        </Grid>
        { /* Content conversation and Infomation  */ }
        { /* Thay thế bằng data API */ }
        <Grid xs={12} sm={12} md={12} sx={{
          paddingBottom: 1.5,
          height: "85%",
          overflowY: "scroll",
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}>
          {/* render message textbox theo điều kiện myMessage */}
          {messagesData.map(({myMessage, time, message}) => 
            <Box>
              <Stack direction="row" justifyContent={myMessage ? "end" : 'start'}>
                <Box mt={1.5} ml={3} mr={3} sx={{
                  width: "max-content"
                }}>
                  <Typography variant="caption" color={grey[400]}>
                    {time}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" justifyContent={myMessage ? "end" : 'start'}>
                <Box p={1.5} ml={1.5} mr={1.5} sx={{
                  bgcolor: (myMessage ? green[100] : grey[100]),
                  borderRadius: "16px",
                  width: "max-content"
                }}>
                  <Typography variant='body 2'>
                    {message}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          )}
        </Grid>
        { /* Footer conversation */ }
        <Grid xs={12} sm={12} md={12} sx={{}}>
          <Divider />
          <ListItem>
            <TextField fullWidth placeholder='Nhập tin nhắn' InputProps={{
              sx: {
                borderRadius: '16px'
              }
            }}>
            </TextField>
            <IconButton sx={{
              color: blue[400]
            }}>
              <MdSend />
            </IconButton>
          </ListItem>
        </Grid>
      </Box>
    </Modal>);
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
      <Button variant='outlined' onClick={handleOpen} size='small' startIcon={<MdPersonSearch />}>Thông Tin Chi Tiết</Button>
      {/* Form InfoDetail */}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "100vw", md: "100%", sm: "100%" },
          height: { xs: "100vh", md: "100%", sm: "100%" },
        }}
      >
        <Box
          sx={{
            display: "flex", flexDirection: 'column',
            width: { xs: "100%", md: "30%", sm: "30%" },
            height: { xs: "100%", md: "80%", sm: "80%" },
            bgcolor: "white", borderRadius: "16px",
            overflowY: 'scroll',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
          }}
        >
          <IconButton
            sx={{
              ml: "auto",
            }}
            onClick={handleClose}>
            <MdClose />
          </IconButton>

          <Grid xs={12} sm={12} md={12} sx={{ height: "15%", width: "30%", ml: "auto", mr: "auto" }} >
            <Avatar
              sx={{
                height: "100%",
                width: "100%"
              }}
              src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/368021133_1726419231151489_6853635133763153961_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHXc4Y4B9SC2Fny3yA8N-CUBC9cMpZD2bwEL1wylkPZvD4bJYKXx2IP8953lqBULM1Rvddh6Q3aEhnBc6AwmJmM&_nc_ohc=FgYf9CMpRYQAX9gLkse&_nc_ht=scontent.fhan20-1.fna&oh=00_AfB2TLCI9muhPj0U1P7214_AGbdtYYO_693BJyqBRJvr7g&oe=655C28D8">
            </Avatar>
          </Grid>
          <Divider>Trần Trung Hiếu</Divider>
          <Table size='small'>
            <TableBody>
              <TableRow sx={{ padding: "8px 0px" }}>
                <TableCell component="th" scope="row" >
                  <IconButton sx={{ pointerEvents: 'none', color: blue[700] }}><MdOutlinePortrait /></IconButton>
                  Nghề Nghiệp</TableCell>
                <TableCell variant='head' align='right'>Tài Xế</TableCell>
              </TableRow >
              <TableRow >
                <TableCell component="th" scope="row" >
                  <IconButton sx={{ pointerEvents: 'none', color: pink[400] }}><MdOutlineCake /></IconButton>
                  Ngày Sinh</TableCell>
                <TableCell variant='head' align='right' >23/08/2002</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <IconButton sx={{ pointerEvents: 'none', }}><MdOutlineHome /></IconButton>
                  Quê Quán</TableCell>
                <TableCell variant='head' align='right'>Quảng Trị</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <IconButton sx={{ pointerEvents: 'none', color: blue[700] }}><MdTransgender /></IconButton>
                  Giới Tính</TableCell>
                <TableCell variant='head' align='right'>Nam</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <IconButton sx={{ pointerEvents: 'none' }}><MdCommute /></IconButton>
                  Loại Phương Tiện</TableCell>
                <TableCell variant='head' align='right'>Xe Máy</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <IconButton sx={{ pointerEvents: 'none', color: blue[700] }}><MdOutlinePhone /></IconButton>
                  Số Điện Thoại</TableCell>
                <TableCell variant='head' align='right'>0829837123</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <IconButton sx={{ pointerEvents: 'none', color: green[300] }}><MdOutlineLoyalty /></IconButton>
                  Biển Số Xe</TableCell>
                <TableCell variant='head' align='right'>43P1-0877</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <IconButton sx={{ pointerEvents: 'none', color: yellow[500] }}><MdOutlineStarBorder /></IconButton>
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

export const DriverInfo = () => {
  const [openMessage, setOpenMessage] = useState(false);
  const handleOpenMessage = () => {
    setOpenMessage(true);
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
        <IconButton onClick={handleOpenMessage}>
          <Badge badgeContent={10} color="error">
            <MdOutlineMessage />
          </Badge>
        </IconButton>
        {/* MessageConversation Form */}
        <MessageForm open={openMessage} setOpenMessage={setOpenMessage} />
      </ListItem>
      <DriverInfoDetail />
    </Stack>
  )
}