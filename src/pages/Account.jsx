import {
  Button,
  Grid,
  Box,
  TextField,
  Typography,
  MenuItem,
  Avatar,
  Divider,
  ListItemAvatar,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { MdCloudUpload, MdChangeCircle } from "react-icons/md";
import "dayjs/locale/en-gb";
import { getInfoAccount, updateInfoAccount } from "services/be_server/api_info";
import { useUserContext } from "contexts/UserContext";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material-next/CircularProgress";

const AccountInfo = () => {
  const [user, setUser] = useUserContext();
  // const [name, setName] = useState("");
  const [edit, setEdit] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [inforUser, setInforUser] = useState({
    fullname: "",
    email: "",
    gender: true,
    phone: null,
    avatar: null,
    createAt: null,
    dateOfBirth: null,
  });
  const handleGetData = async () => {
    await getInfoAccount(user.token, user.id)
      .then((result) => {
        console.log("get info account", result);
        setInforUser({
          fullname: result.fullName,
          email: result.email,
          gender: result.gender,
          createAt: result.createAt,
          dateOfBirth: result.dateOfBirth,
          phone: result.phoneNumber,
          avatar: result.avatarUrl
        });
        setFetching(false);
      })
      .catch((err) => console.log(err));
  };
  const handleUpdateData = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("data before update");
    for (var pair of formData.entries()) {
      console.log(JSON.stringify(pair));
    }
    await updateInfoAccount(user.token, user.id, formData)
      .then((result) => {
        console.log("update info account", result);
        setInforUser({
          fullname: result.fullName,
          email: result.email,
          gender: result.gender,
          createAt: result.createAt,
          dateOfBirth: result.dateOfBirth,
          phone: result.phoneNumber,
        });
        setFetching(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleGetData();
  }, [inforUser.fullname,inforUser.avatar]);

  if (fetching) {
    return (
      <Grid
        container
        flexDirection={"column"}
        height={"100%"}
        minWidth={"100%"}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          minWidth={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box>
            <CircularProgress />
          </Box>
        </Grid>
      </Grid>
    );
  } else
    return (
      <Grid
        container
        flexDirection={"column"}
        borderRadius={4}
        border={"1px solid"}
        borderColor={"grey.300"}
        height={"100%"}
        minWidth={"100%"}
        component={"form"}
        onSubmit={handleUpdateData}
      >
        <Grid item xs={1} sm={1} minWidth={"100%"}>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h7" fontWeight={450} width={"100%"}>
              Profile Picture
            </Typography>
          </Box>
          <Divider></Divider>
        </Grid>
        <Grid
          item
          container
          flexDirection={"column"}
          xs={11}
          sm={11}
          minWidth={"100%"}
        >
          <Grid item xs={2} sm={2} minWidth={"100%"}>
            <ListItemAvatar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Avatar
                sx={{
                  minHeight: { xs: "90%", sm: "90%", md: "100%" },
                  minWidth: { xs: "30%", sm: "20%", md: "7%" },
                }}
                src={inforUser.avatar}
              ></Avatar>
            </ListItemAvatar>
          </Grid>
          <Grid item xs={1} sm={1} minWidth={"100%"}>
            <Box
              sx={{
                height: "100%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h7" fontWeight={100} width={"100%"}>
                Upload/Change Your Profile Image
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1} sm={1} minWidth={"100%"} textAlign={"center"}>
            <TextField
              required
              type='file'
              inputProps={{ accept: 'image/*'}}
              id="avatar"
              label="Ảnh chân dung"
              name="avatar"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={1} sm={1} minWidth={"100%"} px={"12px"} pt={"24px"}>
            <TextField
              InputProps={{ sx: { borderRadius: "12px" } }}
              // onChange={(e) => setName(e.target.value)}
              defaultValue={inforUser.fullname}
              // value={name}
              id="Name"
              name="fullName"
              label="Họ tên"
              variant="outlined"
              fullWidth
              required="true"
            />
          </Grid>
          <Grid item xs={1} sm={1} minWidth={"100%"} px={"12px"} pt={"24px"}>
            <TextField
              InputProps={{ sx: { borderRadius: "12px" } }}
              defaultValue={inforUser.email}
              id="Gmail"
              label="Gmail"
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
          <Grid
            item
            container
            flexDirection={"row"}
            minWidth={"100%"}
            spacing={2}
            px={"12px"}
            pt={"24px"}
          >
            <Grid item xs={6} sm={6}>
              <TextField
                InputProps={{ sx: { borderRadius: "12px" } }}
                defaultValue={inforUser.phone}
                id="Phone"
                label="Số điện thoại"
                variant="outlined"
                fullWidth
                required="true"
                disabled
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                InputProps={{ sx: { borderRadius: "12px" } }}
                id="Gender"
                name="gender"
                label="Giới tính"
                select
                defaultValue={inforUser.gender ? true : false}
                fullWidth
              >
                <MenuItem value={true}>Nam</MenuItem>
                <MenuItem value={false}>Nữ</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection={"row"}
            minWidth={"100%"}
            spacing={2}
            px={"12px"}
            pt={"24px"}
          >
            <Grid item xs={6}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
                fullWidth
              >
                <DatePicker
                  disableFuture
                  disabled
                  defaultValue={dayjs(inforUser.createAt)}
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      required: true,
                      fullWidth: true,
                      id: "CreateDate",
                      name: "CreateDate",
                      label: "Ngày Đăng Ký",
                      InputProps: { sx: { borderRadius: "12px" } },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
                fullWidth
              >
                <DatePicker
                  disableFuture
                  format="YYYY-MM-DD"
                  defaultValue={dayjs(inforUser.dateOfBirth)}
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      required: true,
                      fullWidth: true,
                      id: "birthday",
                      name: "dateOfBirth",
                      label: "Ngày sinh",
                      InputProps: { sx: { borderRadius: "12px" } },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid
            item
            xs={1}
            sm={1}
            minWidth={"100%"}
            textAlign={"end"}
            pr={"12px"}
            sx={{ pt: { md: "12px", xs: "12px" } }}
          >
            <Button
              type="submit"
              variant="contained"
              startIcon={<MdChangeCircle />}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
};
const Account = () => {
  return (
    <Grid
      container
      height={"100%"}
      width={"100%"}
      spacing={1}
      p={1}
      flexDirection={"column"}
      sx={{ overflowY: { xs: "scroll" } }}
    >
      <Grid item xs={12} sm={12}>
        <AccountInfo />
      </Grid>
    </Grid>
  );
};

export default Account;
