import { Rating, ListItemText, Grid, Avatar, ListItemAvatar, ListItem, IconButton } from "@mui/material"
import { MdOutlineVisibility } from "react-icons/md";
import Chip from '@mui/material-next/Chip';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect,useState,useRef } from "react";
import { useUserContext } from 'contexts/UserContext';
import { getAllOrders } from 'features/order/services/api_orders';
import { OrdersDetail } from "features/order";

const Orders = () => {
  const [user, setUser] = useUserContext();
  const [open, setOpen] = useState(false);
  // const [startDate,setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const ordersDetailRef = useRef(null);
  const [pageState,setPageState] = useState({
    isLoading: false,
    content:[],
    totalElements: 0,
    page: 0,
    size: 5,
  })
  const setColor = (statusTitle) =>{
    if (statusTitle == "ON_RIDE") return 'warning'
    if (statusTitle == "COMPLETE") return 'success'
    if (statusTitle == "CANCELLED") return 'error'
    if (statusTitle == "PAID") return 'info'
    if (statusTitle == "WAITING") return 'secondary'
    if (statusTitle == "REFUNDED") return 'info'
    if (statusTitle == "WAITING_REFUND") return 'info'
    if (statusTitle == "FOUND") return 'info'
    return null
  }
  const setTitleStatus = (statusTitle) =>{
    if (statusTitle == "ON_RIDE") return 'Đang Chạy'
    if (statusTitle == "COMPLETE") return 'Đã Hoàn Thành'
    if (statusTitle == "CANCELLED") return 'Đã Hủy'
    if (statusTitle == "WAITING") return 'Chưa Thanh Toán'
    if (statusTitle == "PAID") return 'Đã Thanh Toán'
    if (statusTitle == "REFUNDED") return 'Đã Hoàn Tiền'
    if (statusTitle == "WAITING_REFUND") return 'Chờ Hoàn Tiền'
    if (statusTitle == "FOUND") return 'Đã Tìm Thấy Tài Xế'
    return null
  }

  const handleChangeData =  async (page,size) => {
    setPageState(old=>({...old, isLoading:true}))
    await getAllOrders(user.token,page,size).then(result =>{
      setPageState(old=>({...old, isLoading:false, content:result.content, totalElements:result.totalElements}))
    })
    .catch(err => console.log(err))
  };

  useEffect(() => { 
    handleChangeData(pageState.page,pageState.size)
  }, [pageState.page,pageState.size]);
  const handleOpenDetail = (order) => {
    ordersDetailRef.current = order;
    setOpen(true);
  };

  // const handleDateFilter = (e) => {
  //   setStartDate(e.value)
  //   console.log(e.value);
  // }

  const columns = [
    {
      field: 'name', headerName: 'Tài Xế', flex: 1, headerAlign: 'center',
      renderCell: (rowData) =>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={rowData.row.driver?.avatarUrl}>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={rowData.row.driver?.fullName == null ? "Không tìm thấy tài xế" : rowData.row.driver.fullName} secondary={rowData.row.driver?.licensePlate} />
        </ListItem>,
    },
    {
      field: 'createAt', headerName: 'Thời Gian Đặt', flex: 0.7, headerAlign: 'center', type: 'dateTime', align: 'center',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'amount', headerName: 'Giá Tiền (VNĐ)', flex: 0.7, headerAlign: 'center', align: 'center',
      valueFormatter: (params) => {
        if (params.value == null) {
          return '';
        }
        return Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(params.value);
      },
    },
    {
      field: 'rating', headerName: 'Đánh Giá', flex: 0.7, headerAlign: 'center',
      renderCell: (rowData) =>
        <Rating defaultValue={rowData.row.driver?.rating} readOnly />, align: 'center'
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
      getActions: (rowData) =>
        [
          <GridActionsCellItem
            icon={
              <IconButton onClick={() => handleOpenDetail(rowData.row)}
                sx={{
                  color: 'rgb(33, 150, 243)',
                }}>
                <MdOutlineVisibility />
              </IconButton>
            }
          />,
        ]
    }
    ,
  ]

  return (
    <Grid container height={"100%"} width={"90vw"} p={4} spacing={1} flexDirection={"row"}  borderRadius={4} border={"1px solid"} borderColor={"grey.300"} >
      <Grid item container sm={9}>
        {/* <Grid item sm={6} >
          <TextField
            InputProps=
            {{
              sx: { borderRadius: '12px' },
              startAdornment: (<InputAdornment position="start" >
                <MdOutlineSearch />
              </InputAdornment>)
            }}
            id="Search" label="Tìm Kiếm Tài Xế Trong Hóa Đơn" variant="outlined" fullWidth />
        </Grid> */}
        {/* <Grid item sm={3} pl={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb' fullWidth>
            <DatePicker disableFuture
             onChange={handleDateFilter}
              slotProps={{
                textField: {
                  variant: "outlined",
                  fullWidth: true,
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
            //  onChange={handleDateFilter}
              id="EndDate-sort" 
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

        </Grid> */}
      </Grid>
      <Grid item sm={3}/>
      <Grid item sm={12} borderRadius={4} px={2} pb={2} minWidth={"100%"}>
        <DataGrid
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#F4F6F8',
            },
            "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": { outline: "none" }
          }}
          autoHeight
          autoWidth
          loading={pageState.isLoading}
          columns={columns}
          rows={pageState.content}
          rowCount= {pageState.totalElements}
          paginationMode= "server"
          initialState={{
            pagination:
            { 
              paginationModel:
              {
              page: pageState.page,
              pageSize: pageState.size
              }
            }
          }}
          onPaginationModelChange={ (newPage) => {
            console.log("new page ",newPage)
            setPageState(old => ({...old,page:newPage.page}))
          }}
          onPageSizeChange={(newPageSize) => setPageState(old => ({...old,size:newPageSize}))}
          rowHeight={80}
          pageSizeOptions={[5]}
          // checkboxSelection
        >
        </DataGrid>
        <OrdersDetail ordersRef={ordersDetailRef} open={open} setOpen={setOpen}/>
      </Grid>
    </Grid>
  )
}

export default Orders