import { Avatar, Card, CardActionArea, CardMedia, CircularProgress, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react"
import { ZoomableImage } from "components/ZoomableImage";
import { useUserContext } from "contexts/UserContext";
import { getDriverDetail } from "../services/be_server/api_account_for_admin";
import dayjs from "dayjs";

export const DriverManageDetail = ({ openDetail, setOpenDetail }) => {
  const [user,] = useUserContext();
  const [driverDetail, setDriverDetail] = useState(null);
  const [openImage, setOpenImage] = useState(null);

  // fetch detail by driver id
  const fetchDetail = async () => {
    await getDriverDetail(user.token, openDetail.id)
      .then(result => {
        console.log('driver detail', result);
        setDriverDetail(result);
      })
      .catch(error => {
        alert('Lấy dữ liệu thất bại.');
      })
  }
  useEffect(() => {
    if (openDetail !== null) {
      fetchDetail();
    }
  }, [openDetail])

  const handleOpenImage = (src) => {
    setOpenImage(src);
  }
  const handleClose = () => {
    setOpenDetail(null);
    setDriverDetail(null);
  }

  return (
    <Dialog open={openDetail !== null} maxWidth='100vw' onClose={handleClose}>
      <ZoomableImage image={openImage} setImage={setOpenImage}/>
      <DialogTitle>
        <Stack direction='row' spacing={2} justifyContent='space-between'>
          <Typography variant="h6" fontWeight='bold' sx={{ color: 'green' }}>
            Thông tin tài xế
          </Typography>
          {/* action group */}
          <IconButton onClick={handleClose} sx={{ padding: 0 }}>
            <CloseIcon/>
          </IconButton>
        </Stack>
      </DialogTitle>
      {driverDetail ? (
        <DialogContent>
          <Grid container spacing={2}>
            {/* upper */}
            <Grid item xs={12} lg={12} container spacing={2}>
              <Grid item xs={2} lg={4}/>
              <Grid item xs={4} lg={2}>
                <Avatar src={driverDetail.avtUrl}
                  sx={{ width: 100, height: 100, boxShadow: 1 }}
                />
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
                <Typography>{driverDetail.male ? 'Nam' : 'Nữ'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight='bold'>Ngày sinh</Typography>
                <Typography>{dayjs(driverDetail.dateOfBirth).format("DD-MM-YYYY")}</Typography>
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
                  <CardActionArea onClick={() => handleOpenImage(driverDetail.cardId1)}>
                    <CardMedia component='img'
                      src={driverDetail.cardId1}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight='bold'>Căn cước công dân mặt sau</Typography>
                <Card sx={{ width: 250, height: 150 }}>
                  <CardActionArea onClick={() => handleOpenImage(driverDetail.cardId2)}>
                    <CardMedia component='img'
                      src={driverDetail.cardId2}
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
                  <CardActionArea onClick={() => handleOpenImage(driverDetail.drivingLicenseImg1)}>
                    <CardMedia component='img'
                      src={driverDetail.drivingLicenseImg1}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight='bold'>Giấy phép lái xe mặt sau</Typography>
                <Card sx={{ width: 250, height: 150 }}>
                  <CardActionArea onClick={() => handleOpenImage(driverDetail.drivingLicenseImg2)}>
                    <CardMedia component='img'
                      src={driverDetail.drivingLicenseImg2}
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