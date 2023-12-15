import { Stack, Modal, Rating, ListItemText, Button, Grid, Box, TextField, Typography, MenuItem, Avatar, Divider, ListItemAvatar, ImageList, ImageListItem, InputAdornment, ListItem, IconButton } from "@mui/material"
import { MdOutlineSearch, MdOutlineVisibility, MdDelete } from "react-icons/md";
import Chip from '@mui/material-next/Chip';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect,useState } from "react";
import { useUserContext } from 'contexts/UserContext';
import { getAllOrders } from 'services/be_server/api_orders';


const Orders = () => {
  const [user, setUser] = useUserContext();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [filterModel, setFilterModel] = useState({
    items: [],
  });
  const setColor = (statusTitle) =>{
    if (statusTitle == "ON_RIDE") return 'warning'
    if (statusTitle == "COMPLETE") return 'success'
    if (statusTitle == "CANCELLED") return 'error'
    return null
  }
  const setTitleStatus = (statusTitle) =>{
    if (statusTitle == "ON_RIDE") return 'Đang Chạy'
    if (statusTitle == "COMPLETE") return 'Đã Hoàn Thành'
    if (statusTitle == "CANCELLED") return 'Đã Hủy'
    return null
  }
  const [sortModel, setSortModel] = useState([]);

  const handleChangeData =  async () => {
    getAllOrders(user.token).then(result =>{
      setRows(result)
    })
    .catch(err => console.log(err))
  };

  useEffect(() => { 
    handleChangeData()
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      field: 'name', headerName: 'Tài Xế', flex: 1, headerAlign: 'center',
      renderCell: (rowData) =>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={rowData.row.avatar}>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={rowData.row.driverId} secondary={rowData.row.license} />
        </ListItem>,
    },
    {
      field: 'startDate', headerName: 'Thời Gian Đặt', flex: 0.7, headerAlign: 'center', type: 'dateTime', align: 'center',
      valueGetter: ({ value }) => value && new Date(value),
      // valueformatter: params => 
      //   moment(params?.value).format("dd/mm/yyyy hh:mm a"),
    },
    {
      field: 'amount', headerName: 'Giá Tiền (VNĐ)', flex: 0.7, headerAlign: 'center', align: 'center',
      valueFormatter: (params) => {
        if (params.value == null) {
          return '';
        }
        return `$${params.value.toLocaleString()}`;
      },
    },
    {
      field: 'rating', headerName: 'Đánh Giá', flex: 0.7, headerAlign: 'center',
      renderCell: (rowData) =>
        <Rating defaultValue={rowData.row.rating} readOnly />, align: 'center'
    },
    {
      field: 'status', headerName: 'Trạng Thái', flex: 0.5, headerAlign: 'center',
      renderCell: (rowData) =>
        <Chip
          color={setColor(rowData.row.status)}
          disabled={false}
          size="medium"
          variant="filled"
          label={setTitleStatus(rowData.row.status)}
        />, align: 'center',
    },
    {
      field: 'action', headerName: 'Hành Động', flex: 0.5, headerAlign: 'center', type: 'actions',
      getActions: (params) =>
        [
          <GridActionsCellItem
            icon={
              <IconButton onClick={handleOpen}
                sx={{
                  color: 'rgb(33, 150, 243)',
                }}>
                <MdOutlineVisibility />
              </IconButton>
            }
            label="View"
          // onClick={handleOpen}
          />,
        ]
    }
    ,
  ]



  return (
    <Grid container height={"100%"} width={"90vw"} p={4} spacing={1} flexDirection={"row"}  borderRadius={4} border={"1px solid"} borderColor={"grey.300"} >
      <Grid item container sm={9}>
        <Grid item sm={6} >
          <TextField
            InputProps=
            {{
              sx: { borderRadius: '12px' },
              startAdornment: (<InputAdornment position="start" >
                <MdOutlineSearch />
              </InputAdornment>)
            }}
            id="Search" label="Tìm Kiếm Tài Xế Trong Hóa Đơn" variant="outlined" fullWidth />
        </Grid>
        <Grid item sm={3} pl={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb' fullWidth>
            <DatePicker disableFuture
              slotProps={{
                textField: {
                  variant: "outlined",
                  fullWidth: true,
                  id: "StartDate",
                  label: "Từ Ngày",
                  InputProps: { sx: { borderRadius: '12px', } }
                },
              }}
            />
          </LocalizationProvider>

        </Grid>
        <Grid item sm={3} pl={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb' fullWidth>
            <DatePicker disableFuture
              slotProps={{
                textField: {
                  variant: "outlined",
                  fullWidth: true,
                  id: "EndDate",
                  label: "Đến Ngày",
                  InputProps: { sx: { borderRadius: '12px', } }
                },
              }}
            />
          </LocalizationProvider>

        </Grid>
      </Grid>
      <Grid item sm={3}/>
      <Grid item sm={12} borderRadius={4} px={2} pb={2} minWidth={"100%"}>
        <DataGrid
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#F4F6F8',
            }
          }}
          autoHeight
          autoWidth
          columns={columns}
          rows={rows}
          rowHeight={80}
          initialState={{
            pagination: {paginationModel}
          }}
          pageSizeOptions={[5]}
          checkboxSelection
        >
        </DataGrid>
        <Stack >
          <Modal
            open={open}
            onClose={handleClose}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100vw", md: "100%", sm: "100%" },
              height: { xs: "100vh", md: "100%", sm: "100%" }
            }}
          >
            <Box
              sx={{
                display: "flex", flexDirection: 'column',
                width: { xs: "100%", md: "30%", sm: "30%" },
                height: { xs: "100%", md: "80%", sm: "80%" },
                bgcolor: "white", borderRadius: "16px"
              }}
            >
            </Box>
          </Modal>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Orders