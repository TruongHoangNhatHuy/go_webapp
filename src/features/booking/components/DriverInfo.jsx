import { Rating, Grid, Modal, Badge, Box, Button, Divider, IconButton, Stack, Typography, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { blue, grey, green, yellow, pink } from '@mui/material/colors'
import { useBookingContext } from 'contexts/BookingContext';
import dayjs from 'dayjs';
import { useState,useEffect,useRef } from 'react';
import { MdOutlineMessage, MdPersonSearch, MdClose, MdSend, MdTransgender, MdOutlineCake, MdOutlineHome, MdOutlinePhone, MdOutlineStarBorder, MdOutlinePortrait, MdOutlineLoyalty, MdCommute } from "react-icons/md";
import { SocketSubscriber, SocketUnsubscribe, useSocketClient,SocketPublish } from 'services/websocket/StompOverSockJS';
import ScrollableFeed from 'react-scrollable-feed'
import { useNotifyContext } from 'layouts/MainLayout';

const MessageForm = ({ open, setOpenMessage, driverInfo, conversation }) => {
  const [contentMessage,setContentMessage] = useState("")
  const socketClient = useSocketClient()
	// const endOfMessagesRef = useRef(null)
	// const scrollToBottom = () => {
	// 	endOfMessagesRef.current?.scrollIntoView({behavior: 'smooth'})
	// }
  const handleCreateMessage = (body) =>{
    SocketPublish(socketClient, '/app/message_send',body);
  }
  const handleCloseMessage = () => {
    setOpenMessage(false);
  };
  const handleSend = () => {
    if (contentMessage === '' || contentMessage === null) return
    const body = {
      conversationId: conversation.id_booking,
      receiverId: conversation.id_receiver,
      senderId: conversation.id_sender, 
      content: contentMessage
    }
    handleCreateMessage(body)
    console.log('Send:', body)
    setContentMessage("")
    // scrollToBottom()
  }

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
              <Avatar src={driverInfo.avtUrl}>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={driverInfo.fullName} />
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
          <Box sx={{height:"100%"}}>
          <ScrollableFeed>
          {conversation.messagesData.map(({time, content, senderId}) => 
            <Box>
              <Stack direction="row" justifyContent={(senderId === conversation.id_sender)? "end" : 'start'}>
                <Box mt={1.5} ml={3} mr={3} sx={{
                  width: "max-content"
                }}>
                  <Typography variant="caption" color={grey[400]}>
                    {dayjs(time).format('HH:mm[ ]A')}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" justifyContent={(senderId === conversation.id_sender) ? "end" : 'start'}>
                <Box p={1.5} ml={1.5} mr={1.5} sx={{
                  bgcolor: ((senderId === conversation.id_sender) ? green[100] : grey[100]),
                  borderRadius: "16px",
                  width: "max-content"
                }}>
                  <Typography variant='body 2'>
                    {content}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          )}
          </ScrollableFeed>
          </Box>
          
          {/* <Box ref={endOfMessagesRef} /> */}
        </Grid>
        { /* Footer conversation */ }
        <Grid xs={12} sm={12} md={12} sx={{}}>
          <Divider />
          <ListItem>
            <TextField fullWidth placeholder='Nhập tin nhắn' 
            onChange={(e) => setContentMessage(e.target.value)}
            value={contentMessage}
            onKeyDown={(e) =>{
              if(e.key == 'Enter') { handleSend() }
            }}
             InputProps={{
              sx: {
                borderRadius: '16px'
              }
            }}>
            </TextField>
            <IconButton 
            onClick={(e) => handleSend()}
            sx={{
              color: blue[400]
            }}>
              <MdSend />
            </IconButton>
          </ListItem>
        </Grid>
      </Box>
    </Modal>);
}

const DriverInfoDetail = ({ driverInfo }) => {
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
        }}
      >
        <Box
          sx={{
            display: "flex", flexDirection: 'column',
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
          <Stack direction='row' justifyContent='center' alignItems='center' paddingBottom={1}>
            <Avatar src={driverInfo.avtUrl} sx={{ height: "70px", width: "70px" }}/>
          </Stack>
          <Divider><Typography variant='h6' fontWeight='bold'>
            {driverInfo.fullName}
          </Typography></Divider>
          <Table size='small'>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <IconButton sx={{ pointerEvents: 'none', color: blue[700] }}><MdOutlinePhone /></IconButton>
                  Số Điện Thoại
                </TableCell>
                <TableCell variant='head' align='right'>
                  {driverInfo.phoneNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <IconButton sx={{ pointerEvents: 'none', color: green[300] }}><MdOutlineLoyalty /></IconButton>
                  Biển Số Xe
                </TableCell>
                <TableCell variant='head' align='right'>
                  {driverInfo.licensePlate}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" >
                  <IconButton sx={{ pointerEvents: 'none', color: pink[400] }}><MdOutlineCake /></IconButton>
                  Ngày Sinh
                </TableCell>
                <TableCell variant='head' align='right' >
                  {dayjs(driverInfo.dateOfBirth).format('DD-MM-YYYY')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <IconButton sx={{ pointerEvents: 'none', color: blue[700] }}><MdTransgender /></IconButton>
                  Giới Tính
                </TableCell>
                <TableCell variant='head' align='right'>{driverInfo.male ? 'Nam' : 'Nữ'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <IconButton sx={{ pointerEvents: 'none' }}><MdCommute /></IconButton>
                  Loại Phương Tiện
                </TableCell>
                <TableCell variant='head' align='right'>
                  {driverInfo.vehicleType === 'MOTORCYCLE' ? 'Xe máy' :
                    driverInfo.vehicleType === 'CAR' ? 'Oto' :
                      driverInfo.vehicleType
                  }
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <IconButton sx={{ pointerEvents: 'none', color: yellow[500] }}><MdOutlineStarBorder /></IconButton>
                  Điểm Đánh Giá
                </TableCell>
                <TableCell variant='head' align='right'>
                  <Rating defaultValue={driverInfo.rating} precision={0.5} readOnly />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </Stack>
  )
}

export const DriverInfo = () => {
  const [bookingInfo,] = useBookingContext()
  const driverInfo = (bookingInfo.driverInfo !== null ? bookingInfo.driverInfo :
  { // test data
    avtUrl: 'placeholder',
    dateOfBirth: 1701907200000,
    email: 'example@email.com',
    fullName: 'Placeholder data',
    id: 3,
    licensePlate: '43A1-49053',
    male: true,
    nonBlock: true,
    phoneNumber: '0987654321',
    rating: 4.5,
    vehicleType: 'MOTORCYCLE'
  })
  const conversationData =
  {
    id_booking: bookingInfo.id,
    id_sender: bookingInfo.customerId,
    id_receiver: bookingInfo.driverId,
    messagesData: []
  }
  
  const [openMessage, setOpenMessage] = useState(false);
  const restoredConversation = sessionStorage.getItem('conversationCache');
  const [conversation,setConversation] = useState(
    restoredConversation === null ? conversationData : 
    JSON.parse(restoredConversation)
  );
  const [updated,setUpdated] = useState("") // Trigger rerender
  const [notifyMessage, setNotifyMessage] = useState(false)
  const socketClient = useSocketClient()
  const [, setNotify] = useNotifyContext()

  useEffect(() => {
    if (bookingInfo.status === 'FOUND'|| bookingInfo.status === 'ON_RIDE'|| bookingInfo.status === 'COMPLETE') {
      SocketSubscriber(socketClient,'/user/message_receive',SendMesssageCallback)
    } else {
      SocketUnsubscribe(socketClient, '/user/message_receive')
    }
  },[])

  const SendMesssageCallback = (result) => {
    setNotify('booking');
    setNotifyMessage(true);
    const data = JSON.parse(result);
    console.log("du lieu nhan ve", data);
    const dataConfig = {
      ...data,
      id: conversation.messagesData.length + 1    
    }
    // console.log("du lieu config", dataConfig);
    // console.log('after send', conversation);
    const tempMessageData = conversation
    tempMessageData.messagesData.push(dataConfig) 
    setConversation(tempMessageData);
    sessionStorage.setItem('conversationCache', JSON.stringify(tempMessageData));
    setUpdated(dayjs().toString());
  }
  const handleOpenMessage = () => {
    // setConversation(conversation)
    setNotifyMessage(false)
    setOpenMessage(true)
  };
  return (
    <Stack spacing={1} padding={1}>
      <ListItem sx={{ p: 0 }}>
        <ListItemAvatar>
          <Avatar src={driverInfo.avtUrl} sx={{ height: "50px", width: "50px" }}/>
        </ListItemAvatar>
        <ListItemText primary={<b>{driverInfo.fullName}</b>} secondary={driverInfo.licensePlate} sx={{ pl: 1 }}/>
        {/* ở dưới là button tin nhắn */}
        <IconButton onClick={handleOpenMessage}>
        {/* badgeContent={10} */}
          <Badge color="error" variant='dot' invisible={!notifyMessage}>
            <MdOutlineMessage />
          </Badge>
        </IconButton>
        {/* MessageConversation Form */}
        <MessageForm open={openMessage} setOpenMessage={setOpenMessage} driverInfo={driverInfo} conversation={conversation}/>
      </ListItem>
      <DriverInfoDetail driverInfo={driverInfo}/>
    </Stack>
  )
}