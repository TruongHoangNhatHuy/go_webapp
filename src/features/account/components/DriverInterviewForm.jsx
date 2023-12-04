import { Box, Button, Chip, Grid, IconButton, InputAdornment, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { visuallyHidden } from '@mui/utils';
import { useMemo, useState } from "react";

const tableHeadCells = [
  {
    id: 'id',
    label: 'STT',
  },
  {
    id: 'name',
    label: 'Họ tên',
  },
  {
    id: 'timeStamp',
    label: 'Thời gian',
  },
  {
    id: 'status',
    label: 'Tình trạng'
  }
]

const createData = (id, name, timestamp, result = 'waiting') => {
  return { id, name, timestamp, result }
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

const SortableTableHead = (props) => {
  const { tableHeadData, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableRow>
      {tableHeadData.map((headCell) => (
        <TableCell
          key={headCell.id}
          align={'left'}
          padding={'normal'}
          sortDirection={orderBy === headCell.id ? order : false}
          width={headCell.id === 'id' && 50}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
            sx={{ color: 'green', '&.Mui-active': {color: 'green'} }}
          >
            <b>{headCell.label}</b>
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
      ))}
      <TableCell sx={{ width: '12vw', color: 'green' }}><b>Hành động</b></TableCell>
    </TableRow>
  );
}

// Sorting functions
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const DriverInterviewForm = () => {
  const [tableData, setTableData] = useState(testData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [order, setOrder] = useState('asc'); //'desc'|'asc'
  const [orderBy, setOrderBy] = useState('STT');

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;
  const filtedData = useMemo(() =>
    tableData.filter(data => 
      data.name.toLowerCase().includes(search.toLowerCase()) &&
      data.result.includes(statusFilter === 'all' ? '' : statusFilter)
    )
  ,[tableData, statusFilter, search])
  const sortedRows = useMemo(() => 
    stableSort(filtedData, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    )
  ,[filtedData, order, orderBy, page, rowsPerPage]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleSearch = () => {
    const term = document.getElementById('search-box').value;
    setSearch(term);
  };
  const handleSearchReset = () => {
    document.getElementById('search-box').value = '';
    setSearch('');
    setPage(0);
  };
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setPage(0);
  };
  const handleCheckOrCancel = (id, result) => {
    var updatedTableData = [...tableData];
    const data = updatedTableData.filter(x => x.id === id)[0];   // get data
    // updatedTableData = updatedTableData.filter(x => x !== data); // remove data from tableData
    data['result'] = result;
    console.log(data);
    setTableData(updatedTableData);
  };

  return (
    <Grid container spacing={1} padding={2} maxWidth='100%'  sx={{ bgcolor: 'white' }}>
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
                <IconButton onClick={handleSearchReset} sx={{ p: 0 }}><ClearIcon/></IconButton>
              </InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={1}>
        <Button fullWidth variant="contained" onClick={handleSearch}><SearchIcon/></Button>
      </Grid>
      <Grid item xs={2}>
        <TextField select 
          fullWidth 
          size="small" 
          id='status-filter'
          label="Lọc theo tình trạng"
          defaultValue={statusFilter}
          onChange={handleStatusFilter}
        >
          <MenuItem value='all'><Chip label='Tất cả' size="small"/></MenuItem>
          <MenuItem value='waiting'><Chip label='Đang chờ' size="small" color="info"/></MenuItem>
          <MenuItem value='checked'><Chip label='Đã duyệt' size="small" color="success"/></MenuItem>
          <MenuItem value='cancelled'><Chip label='Đã từ chối' size="small" color='error'/></MenuItem>
        </TextField>
      </Grid>
      {/* Data table */}
      <Grid item xs={12}>
        <TableContainer component={Paper} elevation={5} sx={{ marginY: 1, height: '75vh' }}>
          <Table stickyHeader sx={{ minHeight: '100%' }}>
            <TableHead>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, { label: 'Tất cả', value: -1 }]}
                  labelRowsPerPage='Hiện thị:'
                  labelDisplayedRows={({ from, to, count }) => {
                    return `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`
                  }}
                  count={filtedData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
              <SortableTableHead
                tableHeadData={tableHeadCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
            </TableHead>
            <TableBody>
              {sortedRows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.timestamp}</TableCell>
                    <TableCell>
                      {row.result === 'waiting' ? <Chip label='Đang chờ' color="info"/> :
                        row.result === 'checked' ? <Chip label='Đã duyệt' color="success"/> :
                        row.result === 'cancelled' && <Chip label='Đã từ chối' color='error'/>
                      }
                    </TableCell>
                    <TableCell sx={{ p: 1 }}>
                      <Stack direction='row' spacing={0.5}>
                        <IconButton><InfoIcon sx={{ color: 'deepskyblue' }}/></IconButton>
                        {row.result === 'waiting' &&
                          <Stack direction='row' spacing={0.5}>
                            <IconButton onClick={() => handleCheckOrCancel(row.id, 'checked')}><CheckIcon sx={{ color: 'green' }}/></IconButton>
                            <IconButton onClick={() => handleCheckOrCancel(row.id, 'cancelled')}><ClearIcon sx={{ color: 'red' }}/></IconButton>
                          </Stack>
                        }
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow sx={{ height: 68.8 * emptyRows }}>
                  <TableCell />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}