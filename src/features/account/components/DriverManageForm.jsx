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
import { getDrivers } from "../services/be_server/api_account_for_admin";

export const DriverManageForm = () => {
  const [gridData, setGridData] = useState([]);
  const columns = [
    { field: 'id', headerName: 'STT', flex: 0.1,
      renderCell: (data) => {
        return gridData.indexOf(data.row)+1
      }
    },
    { field: 'fullName', headerName: 'Họ tên', flex: 0.25 },
    { field: 'phoneNumber', headerName: 'Số điện thoại', flex: 0.25 },
    { field: 'status', headerName: 'Trạng thái', flex: 0.2, 
      renderCell: (data) => {
        switch (data.row.status) {
          case 'waiting':
            return <Chip label='Đang chờ' color="info"/>
          default:
            return <Chip label={data.row.status}/>
        }
      }
    },
    { field: 'nonBlock', headerName: 'Bị chặn', flex: 0.1,
      renderCell: (data) => {
        switch (data.row.nonBlock) {
          case true:
            return <Chip label='Không' color="success"/>
          case false:
            return <Chip label='Bị chặn' color="error"/>
          default:
            return <CircularProgress size={25}/>
        }
      }
    },
    { field: 'action', headerName: 'Hành động', flex: 0.2, type: 'actions',
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
            <IconButton onClick={() => handleChangeBlockStatus(data.row.id, true)}>
              <LockIcon sx={{ color: '#d32f2f' }} />
            </IconButton>
          }
        />,
        <GridActionsCellItem
          icon={
            <IconButton onClick={() => handleChangeBlockStatus(data.row.id, false)}>
              <LockOpenIcon sx={{ color: 'green' }} />
            </IconButton>
          }
        />,
      ]
    }
  ]

  const [user,] = useUserContext();
  const [fetching, setFetching] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 7,
    page: 0,
  });
  const [openDetail, setOpenDetail] = useState(null);
  const handleOpenDetail = (driver) => {
    setOpenDetail(driver);
  }

  // fetch all data
  const fetchData = () => {
    getDrivers(user.token, paginationModel.pageSize, paginationModel.page)
      .then(result => {
        console.log(result);
        if (result !== null) {
          const notActivateDrivers = result.content.filter(x => x.status === 'NOT_ACTIVATED');
          const drivers = result.content.filter(x => !notActivateDrivers.includes(x))
          setRowCount(drivers.length);
          setGridData(drivers);
          setFetching(false);
        }
      })
      .catch(error => {
        alert('Lấy dữ liệu thất bại.');
      })
  }
  useEffect(fetchData, [paginationModel.page, paginationModel.pageSize]);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const filtedData = useMemo(() =>
    gridData.filter(data => 
      data.fullName?.toLowerCase().includes(search.toLowerCase()) &&
      data.status?.includes(statusFilter === 'all' ? '' : statusFilter)
    )
  ,[gridData, statusFilter, search])

  const handleSearch = () => {
    const term = document.getElementById('search-box').value;
    setSearch(term);
  };
  const handleSearchReset = () => {
    document.getElementById('search-box').value = '';
    setSearch('');
  };
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value)
  };
  const handleChangeBlockStatus = (id, isBlock) => {
    alert('Only SEE')
  }
  
  return (
    <Grid container spacing={1} padding={1} maxWidth='100%'  sx={{ bgcolor: 'white' }}>
      <DriverManageDetail openDetail={openDetail} setOpenDetail={setOpenDetail}/>
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
          // label="Lọc theo tình trạng"
          defaultValue={statusFilter}
          onChange={handleStatusFilter}
        >
          <MenuItem value='all'><Chip label='Tất cả' size="small"/></MenuItem>
          {/* <MenuItem value='waiting'><Chip label='Đang chờ' size="small" color="info"/></MenuItem>
          <MenuItem value='checked'><Chip label='Đã duyệt' size="small" color="success"/></MenuItem>
          <MenuItem value='cancelled'><Chip label='Đã từ chối' size="small" color='error'/></MenuItem> */}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ height: '80vh' }}>
          <DataGrid
            columns={columns}
            disableRowSelectionOnClick
            initialState={{
              pagination: { paginationModel: { pageSize: 7, page: 0 } },
            }}
            autoPageSize
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
              "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": { outline: "none" }
            }}
            />
        </Paper>
      </Grid>
    </Grid>
  )
}