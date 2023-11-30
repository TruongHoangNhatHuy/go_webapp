import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography } from "@mui/material"
import { visuallyHidden } from '@mui/utils'
import { useState, useMemo } from "react"

// Table data
const createData = (id, amount, timeStamp, paymentMethod, transactionId, bookingId, customerId) => {
  return { id, amount, timeStamp , paymentMethod, transactionId, bookingId }
}
const testData = [
  createData(1, 12345, '2023-05-11 10:30 AM', 'VNPay', 'VN123', 12, 9),
  createData(2, 12456, '2023-05-12 10:30 AM', 'VNPay', 'VN125', 13, 9),
  createData(3, 34231, '2023-05-15 10:30 AM', 'VNPay', 'VN124', 22, 9),
  createData(4, 53632, '2023-05-17 10:30 AM', 'VNPay', 'VN155', 53, 9),
  createData(5, 14563, '2023-05-17 10:45 AM', 'VNPay', 'VN183', 64, 9),
  createData(6, 45645, '2023-05-18 10:30 AM', 'VNPay', 'VN175', 35, 9),
  createData(7, 14545, '2023-05-18 11:30 AM', 'VNPay', 'VN167', 75, 9),
  createData(8, 34254, '2023-05-18 06:30 PM', 'VNPay', 'VN134', 93, 9),
  createData(9, 12456, '2023-05-18 10:30 PM', 'VNPay', 'VN187', 18, 9),
  createData(10, 12423, '2023-05-25 10:30 AM', 'VNPay', 'VN114', 87, 9),
  createData(11, 65634, '2023-05-25 10:30 AM', 'VNPay', 'VN156', 23, 9),
  createData(12, 24524, '2023-05-25 10:30 AM', 'VNPay', 'VN187', 78, 9),
  createData(13, 43532, '2023-05-25 10:30 PM', 'VNPay', 'VN113', 24, 9),
  createData(14, 34536, '2023-05-25 10:30 AM', 'VNPay', 'VN154', 86, 9),
  createData(15, 34566, '2023-05-25 10:30 AM', 'VNPay', 'VN122', 34, 9),
  createData(16, 47456, '2023-05-25 10:30 PM', 'VNPay', 'VN154', 24, 9),
  createData(17, 67856, '2023-05-30 10:30 AM', 'VNPay', 'VN128', 76, 9),
  createData(18, 33664, '2023-05-30 10:30 AM', 'VNPay', 'VN034', 43, 9),
  createData(19, 45647, '2023-05-30 10:30 AM', 'VNPay', 'VN056', 76, 9),
  createData(20, 65875, '2023-05-30 10:30 PM', 'VNPay', 'VN013', 34, 9),
  createData(21, 46467, '2023-05-30 10:30 AM', 'VNPay', 'VN065', 57, 9),
  createData(22, 57543, '2023-05-30 10:30 AM', 'VNPay', 'VN024', 13, 9),
]

// Table head
const tableHeadCells = [
  {
    id: 'id',
    disablePadding: true,
    label: 'STT',
  },
  {
    id: 'timeStamp',
    disablePadding: false,
    label: 'Thời gian',
  },
  {
    id: 'amount',
    disablePadding: false,
    label: 'Số tiền',
  },
  {
    id: 'paymentMethod',
    disablePadding: false,
    label: 'Phương thức',
  },
  {
    id: 'transactionId',
    disablePadding: false,
    label: 'Mã giao dịch',
  },
  {
    id: 'bookingId',
    disablePadding: false,
    label: 'Mã đơn đặt',
  },
]
const SortableTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableRow sx={{ backgroundColor: 'lightgray' }}>
      {tableHeadCells.map((headCell) => (
        <TableCell
          key={headCell.id}
          align={headCell.id === 'id' ? 'center' : 'left'}
          padding={headCell.disablePadding ? 'none' : 'normal'}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
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

// Main component
const PaymentHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc'); //'desc'|'asc'
  const [orderBy, setOrderBy] = useState('STT');

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - testData.length) : 0;
  const sortedRows = useMemo(() =>
    stableSort(testData, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
  [order, orderBy, page, rowsPerPage]);

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

  return (
    <Stack sx={{ display: 'flex', justifyContent: 'flex-start', height: '100%', padding: '3%', bgcolor: 'whitesmoke' }}>
      <Typography variant="h4" fontWeight='bold' sx={{ color: 'green' }}>
        LỊCH SỬ THANH TOÁN
      </Typography>
      <TableContainer component={Paper} elevation={5} sx={{ marginY: '2%', minHeight: '85%' }}>
        <Table sx={{ minHeight: '100%' }}>
          <TableHead>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, { label: 'Tất cả', value: -1 }]}
                labelRowsPerPage='Hiện thị:'
                labelDisplayedRows={({ from, to, count }) => { 
                  return `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`
                }}
                count={testData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
            <SortableTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            {/* <TableRow sx={{ backgroundColor: 'lightgray' }}>
              <TableCell sx={{ width: '20px' }}><b>STT</b></TableCell>
              <TableCell><b>Thời gian</b></TableCell>
              <TableCell><b>Số tiền</b></TableCell>
              <TableCell><b>Phương thức</b></TableCell>
              <TableCell><b>Mã giao dịch</b></TableCell>
              <TableCell><b>Mã đơn đặt</b></TableCell>
            </TableRow> */}
          </TableHead>
          <TableBody>
          {sortedRows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.timeStamp}</TableCell>
                    <TableCell>
                      {Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        currencyDisplay: 'code'
                      }).format(row.amount)}
                    </TableCell>
                    <TableCell>{row.paymentMethod}</TableCell>
                    <TableCell>{row.transactionId}</TableCell>
                    <TableCell>{row.bookingId}</TableCell>
                  </TableRow>
                );
              })}
            {/* {(rowsPerPage > 0
              ? testData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : testData
            ).map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.timeStamp}</TableCell>
                <TableCell>
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    currencyDisplay: 'code'
                  }).format(row.amount)}
                </TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell>{row.transactionId}</TableCell>
                <TableCell>{row.bookingId}</TableCell>
              </TableRow>
            )
            )} */}
            {emptyRows > 0 && (
              <TableRow sx={{ height: 69.4 * emptyRows }}>
                <TableCell />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default PaymentHistory