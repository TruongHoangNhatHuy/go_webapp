import { Button, Chip, CircularProgress, Grid, IconButton, InputAdornment, MenuItem, Paper, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useMemo, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { DriverManageDetail } from "./DriverManageDetail";
import { useUserContext } from "contexts/UserContext";
import { blockDriver, getDrivers } from "../services/be_server/api_account_for_admin";
import { ToastContainer, toast } from "react-toastify";

export const DriverManageForm = () => {
  const [user,] = useUserContext();
  const [gridData, setGridData] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 7,
    page: 0,
  });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [changing, setChanging] = useState([]); // array of driver ids being change status (block/unblock)

  const columns = [
    { field: 'id', headerName: 'STT', flex: 0.075,
      renderCell: (data) => gridData.indexOf(data.row)+1 + paginationModel.page*paginationModel.pageSize
    },
    { field: 'fullName', headerName: 'Họ tên', flex: 0.25 },
    { field: 'email', headerName: 'Tài khoản', flex: 0.25 },
    { field: 'phoneNumber', headerName: 'Số điện thoại', flex: 0.15 },
    { field: 'status', headerName: 'Trạng thái', flex: 0.175, 
      renderCell: (data) => {
        switch (data.row.status) {
          case 'OFF':
            return <Chip label='Không hoạt động' size="small"/>
          case 'FREE':
            return <Chip label='Rảnh' size="small" color="success"/>
          case 'ON_RIDE':
            return <Chip label='Đang chở khách' size="small" color="info"/>
          case 'BLOCK':
            return <Chip label='Bị chặn' size="small" color="error"/>
          case 'REFUSED':
            return <Chip label='Đã từ chối' size="small" color="error"/>
          default:
            return <Chip label={data.row.status}/>
        }
      }
    },
    // { field: 'nonBlock', headerName: 'Bị chặn', flex: 0.1,
    //   renderCell: (data) => {
    //     switch (data.row.nonBlock) {
    //       case true:
    //         return <Chip label='Không' color="success"/>
    //       case false:
    //         return <Chip label='Bị chặn' color="error"/>
    //       default:
    //         return <CircularProgress size={25}/>
    //     }
    //   }
    // },
    { field: 'action', headerName: 'Hành động', width: 130, type: 'actions',
      getActions: (data) => [
        <GridActionsCellItem
          icon={
            <IconButton onClick={() => handleOpenDetail(data.row)}>
              <InfoIcon sx={{ color: 'deepskyblue' }}/>
            </IconButton>
          }
        />,
        <GridActionsCellItem
          icon={
            changing.includes(data.row.id) ? <CircularProgress size={40}/> :
            <IconButton onClick={() => handleChangeBlockStatus(data.row.id, true)}>
              <LockIcon sx={{ color: '#d32f2f' }} />
            </IconButton>
          }
          sx={{ display: (data.row.status === 'REFUSED' || data.row.status === 'BLOCK') ? 'none' : 'flex'}}
        />,
        <GridActionsCellItem
          icon={
            changing.includes(data.row.id) ? <CircularProgress size={40}/> :
            <IconButton onClick={() => handleChangeBlockStatus(data.row.id, false)}>
              <LockOpenIcon sx={{ color: 'green' }} />
            </IconButton>
          }
          sx={{ display: (data.row.status === 'REFUSED' || data.row.status !== 'BLOCK') ? 'none' : 'flex'}}
        />,
      ]
    }
  ]

  // fetch all data
  const fetchData = () => {
    getDrivers(user.token, paginationModel.pageSize, paginationModel.page, status, search)
      .then(result => {
        // console.log(result);
        if (result !== null) {
          setRowCount(result.totalElements);
          setGridData(result.content);
          setFetching(false);
        }
      })
      .catch(error => {
        alert('Lấy dữ liệu thất bại.');
      })
  }
  useEffect(fetchData, [paginationModel.page, paginationModel.pageSize, status, search]);

  const filtedData = useMemo(() => gridData);
  //   gridData.filter(data => 
  //     data.fullName?.toLowerCase().includes(search.toLowerCase()) &&
  //     data.status?.includes(statusFilter === 'all' ? '' : statusFilter)
  //   )
  // ,[gridData, statusFilter, search])

  const [openDetail, setOpenDetail] = useState(null);
  const handleOpenDetail = (driver) => {
    setOpenDetail(driver);
  }

  // filter data
  const handleSearch = () => {
    setFetching(true);
    const term = document.getElementById('search-box').value;
    setSearch(term);
  };
  const handleSearchReset = () => {
    setFetching(true);
    document.getElementById('search-box').value = '';
    setSearch('');
  };
  const handleStatusFilter = (e) => {
    setFetching(true);
    setStatusFilter(e.target.value)
    if (e.target.value === 'all')
      setStatus('');
    else 
      setStatus(e.target.value);
  };

  // change data
  const handleChangeBlockStatus = async (id, isBlock) => {
    const updatedChanging = changing;
    updatedChanging.push(id);
    setChanging(updatedChanging);

    await blockDriver(user.token, id, isBlock)
      .then(result => {
        fetchData();
        const updatedChanging = changing;
        const index = updatedChanging.indexOf(id);
        updatedChanging.splice(index, 1);
        setChanging(updatedChanging);
      })
      .catch(error => {
        fetchData();
        const updatedChanging = changing;
        const index = updatedChanging.indexOf(id);
        updatedChanging.splice(index, 1);
        setChanging(updatedChanging);
        toast.error('Thao tác thất bại.')
      })
  }
  
  return (
    <Grid container spacing={1} padding={1} maxWidth='100%'  sx={{ bgcolor: 'white' }}>
      {/* sub components */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <DriverManageDetail openDetail={openDetail} setOpenDetail={setOpenDetail}/>
      {/* main components */}
      <Grid item xs={9}>
        <TextField 
          fullWidth
          size="small"
          id="search-box" 
          placeholder="Tìm tên tài xế"
          onKeyDown={(e) => e.key === 'Enter' ? handleSearch() : e.key === 'Escape' && handleSearchReset()}
          InputProps={{
            endAdornment: 
              <InputAdornment position="end">
                <IconButton onClick={handleSearchReset} sx={{ p: 0 }}><CloseIcon/></IconButton>
              </InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={1.5}>
        <Button fullWidth variant="contained" 
        onClick={handleSearch}
        ><SearchIcon/></Button>
      </Grid>
      <Grid item xs={1.5}>
        <TextField select 
          fullWidth 
          size="small" 
          id='status-filter'
          defaultValue={statusFilter}
          onChange={handleStatusFilter}
        >
          <MenuItem value='all'><Chip label='Tất cả' size="small"/></MenuItem>
          <MenuItem value='OFF'><Chip label='Không hoạt động' size="small"/></MenuItem>
          <MenuItem value='FREE'><Chip label='Rảnh' size="small" color="success"/></MenuItem>
          <MenuItem value='ON_RIDE'><Chip label='Đang chở khách' size="small" color="info"/></MenuItem>
          <MenuItem value='BLOCK'><Chip label='Bị chặn' size="small" color="error"/></MenuItem>
          <MenuItem value='REFUSED'><Chip label='Đã từ chối' size="small" color="error"/></MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ height: '80vh' }}>
          <DataGrid
            columns={columns}
            disableRowSelectionOnClick
            initialState={{
              pagination: { paginationModel: paginationModel },
            }}
            // autoPageSize
            /* pagination */
            paginationMode="server"
            rows={filtedData}
            rowCount={rowCount}
            loading={fetching}
            paginationModel={paginationModel}
            onPaginationModelChange={(model) => {
              setPaginationModel(model)
              setFetching(true);
            }}
            sx={{
              "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": { outline: "none" },
              ".MuiDataGrid-columnHeaderTitle": { fontWeight: 'bold' }
            }}
            />
        </Paper>
      </Grid>
    </Grid>
  )
}