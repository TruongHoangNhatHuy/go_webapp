import { Button, Chip, Grid, IconButton, InputAdornment, MenuItem, Paper, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import CloseIcon from '@mui/icons-material/Close';
import { useMemo, useRef, useState } from "react";
import { DriverInterviewDetail } from "./DriverInterviewDetail";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

const createData = (id, name, timestamp, status = 'waiting') => {
  return { id, name, timestamp, status }
}
const testData = [
  createData(1, 'Lê Văn Tám', '2023-11-30 11:42 am'),
  createData(2, 'Lê Văn Tám', '2023-11-30 11:42 am'),
  createData(3, 'Lê Văn Tám', '2023-11-30 11:42 am'),
  createData(4, 'Lê Văn Tám', '2023-11-30 11:42 am'),
  createData(5, 'Lê Văn Tám', '2023-11-30 11:42 am'),
  createData(6, 'Lê Văn Tám', '2023-11-30 11:42 am'),
  createData(7, 'Lê Văn Tám', '2023-11-30 11:42 am'),
  createData(8, 'Lê Thiện Tám', '2023-11-30 11:42 am'),
  createData(9, 'Lê Văn Tám', '2023-11-30 11:42 am'),
  createData(10, 'Lê Văn Tám', '2023-11-30 11:42 am'),
  createData(11, 'Lê Văn Chín', '2023-11-30 11:42 am'),
  createData(12, 'Lê Văn Chín', '2023-11-30 11:42 am'),
  createData(13, 'Lê Văn Tám', '2023-11-30 11:42 am'),
  createData(14, 'Lê Văn Bảy', '2023-11-30 11:42 am'),
  createData(15, 'Lê Văn Bảy', '2023-11-30 11:42 am'),
  createData(16, 'Lê Văn Bảy', '2023-11-30 11:42 am'),
  createData(17, 'Lê Văn Tám', '2023-11-30 11:42 am'),
  createData(18, 'Lê Văn Tám', '2023-11-30 11:42 am'),
  createData(19, 'Lê Văn Saul', '2023-11-30 11:42 am'),
  createData(20, 'Lê Văn Sáu', '2023-11-30 11:42 am'),
  createData(21, 'Lê Văn Sáu', '2023-11-30 11:42 am'),
  createData(22, 'Lê Văn Tám', '2023-11-30 11:42 am'),
  createData(23, 'Lê Văn Tám', '2023-11-30 11:42 am'),
]

export const DriverInterviewForm = () => {
  const columns = [
    { field: 'id', headerName: 'STT', flex: 0.1 },
    { field: 'name', headerName: 'Họ tên', flex: 0.25 },
    { field: 'timestamp', headerName: 'Thời gian', flex: 0.25 },
    { field: 'status', headerName: 'Tình trạng', flex: 0.2, 
      renderCell: (gridData) => {
        switch (gridData.row.status) {
          case 'waiting':
            return <Chip label='Đang chờ' color="info"/>
          case 'checked':
            return <Chip label='Đã duyệt' color="success"/>
          case 'cancelled':
            return <Chip label='Đã từ chối' color='error'/>
          default:
            return <Chip label={gridData.row.status}/>
        }
      }
    },
    { field: 'action', headerName: 'Hành động', flex: 0.2, type: 'actions',
      getActions: (gridData) => [
        <GridActionsCellItem
          icon={
            <IconButton onClick={() => handleOpenDetail(gridData.row)}>
              <InfoIcon sx={{ color: 'deepskyblue' }}/>
            </IconButton>
          }
        />,
        <GridActionsCellItem
          icon={
            <IconButton onClick={() => handleCheckOrCancel(gridData.row.id, 'checked')}>
              <CheckCircleOutlineIcon sx={{ color: 'green' }}/>
            </IconButton>
          }
        />,
        <GridActionsCellItem
          icon={
            <IconButton onClick={() => handleCheckOrCancel(gridData.row.id, 'cancelled')}>
              <BlockIcon sx={{ color: 'red' }}/>
            </IconButton>
          }
        />,
      ]
    }
  ]

  const [gridData, setGridData] = useState(testData);
  const [openDetail, setOpenDetail] = useState(false);
  const driverDetailRef = useRef(null);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const filtedData = useMemo(() =>
    gridData.filter(data => 
      data.name.toLowerCase().includes(search.toLowerCase()) &&
      data.status.includes(statusFilter === 'all' ? '' : statusFilter)
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
  const handleOpenDetail = (driver) => {
    driverDetailRef.current = driver;
    setOpenDetail(true);
  }
  const handleCheckOrCancel = (id, status) => {
    var updatedGridData = [...gridData];
    const data = updatedGridData.filter(x => x.id === id)[0];   // get data
    data['status'] = status;
    console.log(data);
    setGridData(updatedGridData);
  };
  
  return (
    <Grid container spacing={1} padding={1} maxWidth='100%'  sx={{ bgcolor: 'white' }}>
      <DriverInterviewDetail driverRef={driverDetailRef} open={openDetail} setOpen={setOpenDetail} handleCheckOrCancel={handleCheckOrCancel}/>
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
          <MenuItem value='waiting'><Chip label='Đang chờ' size="small" color="info"/></MenuItem>
          <MenuItem value='checked'><Chip label='Đã duyệt' size="small" color="success"/></MenuItem>
          <MenuItem value='cancelled'><Chip label='Đã từ chối' size="small" color='error'/></MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ height: '80vh' }}>
          <DataGrid
            rows={filtedData}
            columns={columns}
            disableRowSelectionOnClick
            initialState={{
              pagination: { paginationModel: { pageSize: 7, page: 0 } },
            }}
            autoPageSize
            // pagination
            // paginationModel={{ pageSize: 7, page: 0 }}
            sx={{
              "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": { outline: "none" }
            }}
            />
        </Paper>
      </Grid>
    </Grid>
  )
}