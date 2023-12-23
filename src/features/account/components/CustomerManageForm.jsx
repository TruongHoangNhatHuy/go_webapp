import { Button, Chip, CircularProgress, Grid, IconButton, InputAdornment, MenuItem, Paper, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useMemo, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useUserContext } from "contexts/UserContext";
import { getCustomers } from "../services/be_server/api_account_for_admin";
import dayjs from "dayjs";

export const CustomerManageForm = () => {
  const [user,] = useUserContext();
  const [gridData, setGridData] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [rowCount, setRowCount] = useState(gridData.length);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 7,
    page: 0,
  });
  const [search, setSearch] = useState('');
  const [isNonBlock, setIsNonBlock] = useState('')
  const [blockFilter, setBlockFilter] = useState('all');

  const columns = [
    { field: 'id', headerName: 'STT', flex: 0.05, 
      renderCell: (data) => {
        return gridData.indexOf(data.row)+1
      }
    },
    { field: 'fullName', headerName: 'Họ tên', flex: 0.15 },
    { field: 'email', headerName: 'Tài khoản', editable: true, flex: 0.1 },
    { field: 'gender', headerName: 'Giói tính', flex: 0.075,
      renderCell: (data) => {
        switch (data.row.gender) {
          case true:
            return <Chip label='Nam' sx={{ bgcolor: '#0288d1', color: 'white' }}/>
          case false:
            return <Chip label='Nữ' sx={{ bgcolor: 'darkviolet', color: 'white' }}/>
          default:
            return <Chip label={data.row.status}/>
        }
      }
    },
    { field: 'dateOfBirth', headerName: 'Ngày sinh', flex: 0.1,
      renderCell: (data) => dayjs(data.row.dateOfBirth).format('DD-MM-YYYY')
    },
    { field: 'phoneNumber', headerName: 'Số điện thoại', flex: 0.1 },
    { field: 'createDate', headerName: 'Ngày đăng kí', flex: 0.1,
      renderCell: (data) => dayjs(data.row.createDate).format('DD-MM-YYYY')
    },
    { field: 'isNonBlock', headerName: 'Bị chặn', flex: 0.075,
      renderCell: (data) => {
        switch (data.row.isNonBlock) {
          case true:
            return <Chip label='Không' color="success"/>
          case false:
            return <Chip label='Bị chặn' color="error"/>
          default:
            return <CircularProgress size={25}/>
        }
      }
    },
    {
      field: 'action', headerName: 'Hành động', width: 130, type: 'actions',
      getActions: (data) => [
        // <GridActionsCellItem
        //   icon={
        //     <IconButton onClick={() => handleOpenDetail(data.row)}>
        //       <InfoIcon sx={{ color: 'deepskyblue' }}/>
        //     </IconButton>
        //   }
        // />,
        <GridActionsCellItem
          icon={
            <IconButton onClick={() => handleChangeBlockStatus(data.row.id, true)}>
              <LockIcon sx={{ color: '#d32f2f' }} />
            </IconButton>
          }
          sx={{ display: (!data.row.isNonBlock) ? 'none' : 'flex'}}
        />,
        <GridActionsCellItem
          icon={
            <IconButton onClick={() => handleChangeBlockStatus(data.row.id, false)}>
              <LockOpenIcon sx={{ color: 'green' }} />
            </IconButton>
          }
          sx={{ display: (data.row.isNonBlock) ? 'none' : 'flex'}}
        />,
      ]
    }
  ]

  // fetch all data
  const fetchData = () => {
    getCustomers(user.token, paginationModel.pageSize, paginationModel.page, isNonBlock, search)
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
  useEffect(fetchData, [paginationModel.page, paginationModel.pageSize, isNonBlock, search]);
  
  const filtedData = useMemo(() => gridData);
    // gridData.filter(data =>
    //   data.fullName.toLowerCase().includes(search.toLowerCase()) 
    //   && blockFilter === 'all' ? data : data.isNonBlock === blockFilter
    // )
    // , [gridData, blockFilter, search])

  // const [openDetail, setOpenDetail] = useState(null);
  // const handleOpenDetail = (customer) => {
  //   setOpenDetail(customer);
  // }

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
  const handleBlockFilter = (e) => {
    setFetching(true);
    switch (e.target.value) {
      case 'all':
        setIsNonBlock('');
        setBlockFilter('all');
        break;
      case 'nonBlock':
        setIsNonBlock(true);
        setBlockFilter(true);
        break;
      case 'blocked':
        setIsNonBlock(false);
        setBlockFilter(false);
        break;
      default:
        break;
    }
  };

  // change data
  const handleChangeBlockStatus = (id, isBlock) => {
    alert('Only SEE')
  }

  return (
    <Grid container spacing={1} padding={1} paddingTop={3} maxWidth='100%' sx={{ bgcolor: 'white' }}>
      <Grid item xs={9}>
        <TextField
          fullWidth
          size="small"
          id="search-box"
          placeholder="Tìm tên khách hàng"
          onKeyDown={(e) => e.key === 'Enter' ? handleSearch() : e.key === 'Escape' && handleSearchReset()}
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <IconButton onClick={handleSearchReset} sx={{ p: 0 }}><CloseIcon /></IconButton>
              </InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={1.5}>
        <Button fullWidth variant="contained"
          onClick={handleSearch}
        ><SearchIcon /></Button>
      </Grid>
      <Grid item xs={1.5}>
        <TextField select
          fullWidth
          size="small"
          id='status-filter'
          defaultValue={blockFilter}
          onChange={handleBlockFilter}
        >
          <MenuItem value='all'><Chip label='Tất cả' size="small" /></MenuItem>
          <MenuItem value='nonBlock'><Chip label='Không bị chặn' size="small" color="success"/></MenuItem>
          <MenuItem value='blocked'><Chip label='Bị chặn' size="small" color='error' /></MenuItem>
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
            autoPageSize
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
              "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": { outline: "none" }
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}