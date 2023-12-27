// import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from "@mui/material"
// import { visuallyHidden } from '@mui/utils'
// import { useState, useMemo } from "react"

// const SortableTableHead = (props) => {
//   const { tableHeadData, order, orderBy, onRequestSort } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableRow>
//       {tableHeadData.map((headCell) => (
//         <TableCell
//           key={headCell.id}
//           align={'left'}
//           padding={'normal'}
//           sortDirection={orderBy === headCell.id ? order : false}
//           width={headCell.id === 'id' && 50}
//         >
//           <TableSortLabel
//             active={orderBy === headCell.id}
//             direction={orderBy === headCell.id ? order : 'asc'}
//             onClick={createSortHandler(headCell.id)}
//             sx={{ color: 'green', '&.Mui-active': {color: 'green'} }}
//           >
//             <b>{headCell.label}</b>
//             {orderBy === headCell.id ? (
//               <Box component="span" sx={visuallyHidden}>
//                 {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//               </Box>
//             ) : null}
//           </TableSortLabel>
//         </TableCell>
//       ))}
//     </TableRow>
//   );
// }

// // Sorting functions
// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }
// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }
// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// export const PaymentDataTable = ({ tableBodyData, tableHeadData }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [order, setOrder] = useState('asc'); //'desc'|'asc'
//   const [orderBy, setOrderBy] = useState('STT');

//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableBodyData.length) : 0;
//   const sortedRows = useMemo(() =>
//     stableSort(tableBodyData, getComparator(order, orderBy)).slice(
//       page * rowsPerPage,
//       page * rowsPerPage + rowsPerPage,
//     ),
//     [order, orderBy, page, rowsPerPage]);

//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };
//   const handleChangeRowsPerPage = (e) => {
//     setRowsPerPage(parseInt(e.target.value, 10));
//     setPage(0);
//   };
//   const handleRequestSort = (_, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   return (
//     <TableContainer component={Paper} elevation={5} sx={{ marginY: '2%', height: '80vh' }}>
//       <Table stickyHeader sx={{ minHeight: '100%' }}>
//         <TableHead>
//           <TableRow>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, { label: 'Tất cả', value: -1 }]}
//               labelRowsPerPage='Hiện thị:'
//               labelDisplayedRows={({ from, to, count }) => {
//                 return `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`
//               }}
//               count={tableBodyData.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </TableRow>
//           <SortableTableHead
//             tableHeadData={tableHeadData}
//             order={order}
//             orderBy={orderBy}
//             onRequestSort={handleRequestSort}
//           />
//         </TableHead>
//         <TableBody>
//           {sortedRows.map((row) => {
//             return (
//               <TableRow key={row.id}>
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell>{row.timeStamp}</TableCell>
//                 <TableCell>
//                   {Intl.NumberFormat('vi-VN', {
//                     style: 'currency',
//                     currency: 'VND',
//                     currencyDisplay: 'code'
//                   }).format(row.amount)}
//                 </TableCell>
//                 <TableCell>{row.paymentMethod}</TableCell>
//                 <TableCell>{row.transactionId}</TableCell>
//                 <TableCell>{row.bookingId}</TableCell>
//               </TableRow>
//             );
//           })}
//           {emptyRows > 0 && (
//             <TableRow sx={{ height: 75 * emptyRows }}>
//               <TableCell />
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   )
// }