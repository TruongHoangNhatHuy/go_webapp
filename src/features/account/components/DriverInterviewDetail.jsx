import { AppBar, Avatar, Box, Card, CardActionArea, CardMedia, Chip, CircularProgress, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Modal, Stack, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import placeholderImg from 'assets/logo512.png'
import { useEffect, useState } from "react"

const testDetailData = {
  id: 0,
  avatar: null,
  fullName: 'Full name',
  email: 'example@email.com',
  isMale: true,
  dateOfBirth: '18-05-2000',
  phoneNumber: '0835674321',
  idCard: '123487654321',
  idCardImg: null,
  vehicleType: 'MOTORCYCLE',
  licensePlate: '75F 49053',
  drivingLicense: '123487654321',
  drivingLicenseImg: null,
  status: null,
}

const ZoomableImage = ({ image = null, setImage }) => {
  
  const handleClose = () => {
    setImage(null)
  }
  const handleZoomIn = () => {}
  const handleZoomOut = () => {}

  return (
    <Modal
      open={image !== null}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <>
        <Box component='img' src={image}bgcolor='white'
          // alignSelf='center'
        />
        <AppBar
          sx={{ 
            position: "fixed", bottom: 0, top: 'auto', left: 'auto', right: 'auto',
            width: 'auto', bgcolor: 'whitesmoke', borderRadius: 10
          }}
        >
          <Stack direction='row' spacing={0.5} padding={0.5}>
            <IconButton onClick={handleZoomIn}><ZoomInIcon/></IconButton>
            <IconButton onClick={handleZoomOut}><ZoomOutIcon/></IconButton>
            <IconButton onClick={handleClose}><CloseIcon/></IconButton>
          </Stack>
        </AppBar>
      </>
    </Modal>
  )
}

export const DriverInterviewDetail = ({ driverRef, open, setOpen, handleCheckOrCancel }) => {
  const [driverDetail, setDriverDetail] = useState(null);
  const [openImage, setOpenImage] = useState(null);

  useEffect(() => {
    if (driverRef.current !== null) {
      // to do: fetch detail by driver id
      var driverData = testDetailData;
      driverData['id'] = driverRef.current.id;
      driverData['fullName'] = driverRef.current.name;
      driverData['status'] = driverRef.current.status;
      setTimeout(() => setDriverDetail(testDetailData), 1000);
    }
  }, [open])

  const handleOpenImage = (src) => {
    setOpenImage(src);
  }
  const handleClose = () => {
    driverRef.current = null;
    setOpen(false);
    setDriverDetail(null);
  }
  const handleCheck = () => {
    const updatedDriverDetail = driverDetail;
    updatedDriverDetail.status = 'checked';
    setDriverDetail(updatedDriverDetail);
    handleCheckOrCancel(driverDetail.id, 'checked');
  }
  const handleCancel = () => {
    const updatedDriverDetail = driverDetail;
    updatedDriverDetail.status = 'cancelled';
    setDriverDetail(updatedDriverDetail);
    handleCheckOrCancel(driverDetail.id, 'cancelled');
  }

  return (
    <Dialog open={open} maxWidth='100vw' onClose={handleClose}>
      <ZoomableImage image={openImage} setImage={setOpenImage}/>
      <DialogTitle>
        <Stack direction='row' spacing={2} justifyContent='space-between'>
          <Typography variant="h6" fontWeight='bold' sx={{ color: 'green' }}>
            Thông tin tài xế
          </Typography>
          {/* action group */}
          <Stack direction='row' spacing={2}>
            {driverDetail && ( 
              driverDetail.status === 'waiting' ? (
                <Stack direction='row' spacing={2}>
                  <IconButton onClick={handleCheck} sx={{ padding: 0 }}>
                    <CheckCircleOutlineIcon sx={{ color: 'green' }}/>
                  </IconButton>
                  <IconButton onClick={handleCancel} sx={{ padding: 0 }}>
                    <BlockIcon sx={{ color: 'red' }}/>
                  </IconButton>
                </Stack>
              ) : driverDetail.status === 'checked' ? (
                <Chip label='Đã duyệt' color="success"/>
              ) : driverDetail.status === 'cancelled' && (
                <Chip label='Đã từ chối' color='error'/>
            ))}
            <IconButton onClick={handleClose} sx={{ padding: 0 }}>
              <CloseIcon/>
            </IconButton>
          </Stack>
        </Stack>
      </DialogTitle>
      {driverDetail ? (
        <DialogContent>
          <Grid container spacing={2}>
            {/* upper */}
            <Grid item xs={12} lg={12} container spacing={2}>
              <Grid item xs={2} lg={4}/>
              <Grid item xs={4} lg={2}>
                <Avatar sx={{ width: 100, height: 100 }}/>
              </Grid>
              <Grid item xs={6} lg={4} alignSelf='center'>
                <Typography variant="h5">{driverDetail.fullName}</Typography>
                <Typography>{driverDetail.email}</Typography>
              </Grid>
            </Grid>
            {/* lower left */}
            <Grid item xs={12} lg={6} container spacing={2}>
              <Grid item xs={12}>
                <Divider><b>Thông tin cá nhân</b></Divider>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight='bold'>Giới tính</Typography>
                <Typography>{driverDetail.isMale ? 'Nam' : 'Nữ'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight='bold'>Ngày sinh</Typography>
                <Typography>{driverDetail.dateOfBirth}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight='bold'>Số điện thoại</Typography>
                <Typography>{driverDetail.phoneNumber}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight='bold'>Số căn cước công dân</Typography>
                <Typography>{driverDetail.idCard}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight='bold'>Căn cước công dân mặt trước</Typography>
                <Card sx={{ width: 250, height: 150 }}>
                  <CardActionArea onClick={() => handleOpenImage(placeholderImg)}>
                    <CardMedia component='img'
                      src={placeholderImg}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight='bold'>Căn cước công dân mặt sau</Typography>
                <Card sx={{ width: 250, height: 150 }}>
                  <CardActionArea onClick={() => handleOpenImage(placeholderImg)}>
                    <CardMedia component='img'
                      src={placeholderImg}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
            {/* lower right */}
            <Grid item xs={12} lg={6} container spacing={2}>
              <Grid item xs={12}>
                <Divider><b>Thông tin tài xế</b></Divider>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight='bold'>Phương tiện</Typography>
                <Typography>
                  {driverDetail.vehicleType === 'MOTORCYCLE' ? 'Xe máy' : 
                    driverDetail.vehicleType === 'CAR' && 'Oto'
                  }
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight='bold'>Biển kiểm soát</Typography>
                <Typography>{driverDetail.licensePlate}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography fontWeight='bold'>Giấy phép lái xe số</Typography>
                <Typography>{driverDetail.drivingLicense}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight='bold'>Giấy phép lái xe mặt trước</Typography>
                <Card sx={{ width: 250, height: 150 }}>
                  <CardActionArea onClick={() => handleOpenImage(placeholderImg)}>
                    <CardMedia component='img'
                      src={placeholderImg}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight='bold'>Giấy phép lái xe mặt sau</Typography>
                <Card sx={{ width: 250, height: 150 }}>
                  <CardActionArea onClick={() => handleOpenImage(placeholderImg)}>
                    <CardMedia component='img'
                      src={placeholderImg}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      ) : (
        <DialogContent>
          <Stack justifyContent='center' alignItems='center'>
            <CircularProgress/>
          </Stack>
        </DialogContent>
      )}
    </Dialog>
  )
}