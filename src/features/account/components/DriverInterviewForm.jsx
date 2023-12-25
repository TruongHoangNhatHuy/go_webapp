import { Button, Chip, Grid, IconButton, InputAdornment, MenuItem, Paper, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useMemo, useRef, useState } from "react";
import { DriverInterviewDetail } from "./DriverInterviewDetail";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { activateDriver, getNotActivatedDriver, refuseDriver } from "../services/be_server/api_account_for_admin";
import { useUserContext } from "contexts/UserContext";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

export const DriverInterviewForm = () => {
  const [user,] = useUserContext();
  const [gridData, setGridData] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 6,
    page: 0,
  });

  const columns = [
    { field: 'id', headerName: 'STT', flex: 0.1,
      renderCell: (data) => gridData.indexOf(data.row)+1
    },
    { field: 'fullName', headerName: 'Họ tên', flex: 0.25 },
    { field: 'createDate', headerName: 'Đăng kí lúc', flex: 0.25,
      renderCell: (data) => dayjs(data.row.createDate).format('DD-MM-YYYY HH:mm:ss A')
    },
    { field: 'status', headerName: 'Trạng thái', flex: 0.2, 
      renderCell: (data) => {
        switch (data.row.status) {
          case 'NOT_ACTIVATED':
            return <Chip label='Đang chờ' color="info"/>
          case 'ACTIVATE':
            return <Chip label='Duyệt' color="success"/>
          case 'REFUSE':
            return <Chip label='Từ chối' color='error'/>
          default:
            return <Chip label={data.row.status}/>
        }
      }
    },
    { field: 'action', headerName: 'Hành động', width: 160, type: 'actions',
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
            <IconButton onClick={() => handleActivateOrRefuse(data.row.id, 'ACTIVATE')}>
              <CheckCircleOutlineIcon sx={{ color: 'green' }}/>
            </IconButton>
          }
        />,
        <GridActionsCellItem
          icon={
            <IconButton onClick={() => handleActivateOrRefuse(data.row.id, 'REFUSE')}>
              <BlockIcon sx={{ color: 'red' }}/>
            </IconButton>
          }
        />,
      ]
    }
  ]
  
  // fetch all data
  const fetchData = () => {
    getNotActivatedDriver(user.token)
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
  useEffect(fetchData, []);

  const [openDetail, setOpenDetail] = useState(null);
  const handleOpenDetail = (driver) => {
    setOpenDetail(driver);
  }
  
  // filter data
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const filtedData = useMemo(() =>
    gridData.filter(data => 
      data.fullName?.toLowerCase().includes(search.toLowerCase()) &&
      data.status?.startsWith(statusFilter === 'all' ? '' : statusFilter)
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

  // change data
  const [saving, setSaving] = useState(false);
  const handleActivateOrRefuse = (id, status) => {
    var updatedGridData = [...gridData];
    const data = updatedGridData.filter(x => x.id === id)[0];
    data['status'] = status;
    setGridData(updatedGridData);
  };
  const SaveChange = async () => {
    setSaving(true);
    const activateIds = [], refuseIds = [];
    gridData.forEach(driver => {
      if (driver.status === 'ACTIVATE')
        activateIds.push(driver.id)
      else if (driver.status === 'REFUSE')
        refuseIds.push(driver.id)
    });
    // console.log(activateIds.toString(), '|', refuseIds.toString());
    // return;
    const apiCall = [];
    if (activateIds.length !== 0) apiCall.push(activateDriver(user.token, activateIds.toString()))
    if (refuseIds.length !== 0) apiCall.push(refuseDriver(user.token, refuseIds.toString()))
    if (apiCall.length === 0) {
      toast.warning('Không có thay đổi');
      setSaving(false);
    } else {
      await Promise.all(apiCall)
        .then(results => {
          results.forEach(result => console.log('Saving result:', result));
          toast.success('Lưu thay đổi thành công');
          setSaving(false);
          fetchData();
        })
        .catch(error => {
          console.log('Saving failed:', error);
          toast.error('Lưu thay đổi thất bại');
          setSaving(false);
        })
    }
  };
  const CancelChange = () => {
    setFetching(true);
    fetchData();
  };
  
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
      <DriverInterviewDetail openDetail={openDetail} setOpenDetail={setOpenDetail} handleActivateOrRefuse={handleActivateOrRefuse}/>
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
          <MenuItem value='NOT_ACTIVATED'><Chip label='Đang chờ' size="small" color="info"/></MenuItem>
          <MenuItem value='ACTIVATE'><Chip label='Duyệt' size="small" color="success"/></MenuItem>
          <MenuItem value='REFUSE'><Chip label='Từ chối' size="small" color='error'/></MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ height: '70vh' }}>
          <DataGrid
            columns={columns}
            disableRowSelectionOnClick
            initialState={{
              pagination: { paginationModel: paginationModel },
            }}
            autoPageSize
            /* pagination */
            // paginationMode="server"
            rows={filtedData}
            rowCount={rowCount}
            loading={fetching}
            paginationModel={paginationModel}
            onPaginationModelChange={(model) => {
              setPaginationModel(model)
              // setFetching(true);
            }}
            sx={{
              "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": { outline: "none" },
              ".MuiDataGrid-columnHeaderTitle": { fontWeight: 'bold' }
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={true}/>
      <Grid container spacing={1} alignItems={'center'} item xs={'auto'}>
        <Grid item xs={'auto'}>
          <Typography><Chip label='Đang chờ' size="small" color="info"/>
            {" "+gridData.filter(x => x.status === 'NOT_ACTIVATED').length}
          </Typography>
        </Grid>
        <Grid item xs={'auto'}>
          <Typography><Chip label='Duyệt' size="small" color="success"/>
            {" "+gridData.filter(x => x.status === 'ACTIVATE').length}
          </Typography>
        </Grid>
        <Grid item xs={'auto'}>
          <Typography><Chip label='Từ chối' size="small" color='error'/>
            {" "+gridData.filter(x => x.status === 'REFUSE').length}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <Button 
          disabled={saving}
          fullWidth 
          variant="outlined" 
          onClick={CancelChange}
        >Hủy</Button>
      </Grid>
      <Grid item xs={'auto'}>
        <LoadingButton 
          loading={saving}
          variant="contained" 
          onClick={SaveChange}
        >Lưu thay đổi</LoadingButton>
      </Grid>
      {/* <Grid item xs={true}/> */}
    </Grid>
  )
}