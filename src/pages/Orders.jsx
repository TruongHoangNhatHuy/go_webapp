import { Stack, Modal, Rating, ListItemText, Button, Grid, Box, TextField, Typography, MenuItem, Avatar, Divider, ListItemAvatar, ImageList, ImageListItem, InputAdornment, ListItem, IconButton } from "@mui/material"
import { MdOutlineSearch, MdOutlineVisibility, MdDelete } from "react-icons/md";
import Chip from '@mui/material-next/Chip';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect,useState } from "react";
import { getAllOrders } from 'services/be_server/api_orders';

const Orders = () => {
  const [open, setOpen] = useState(false);
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
          <ListItemText primary={rowData.row.name} secondary={rowData.row.license} />
        </ListItem>,
    },
    {
      field: 'startDate', headerName: 'Thời Gian Đặt', flex: 0.7, headerAlign: 'center', type: 'dateTime', align: 'center',
      valueGetter: ({ value }) => value && new Date(value),
      // valueformatter: params => 
      //   moment(params?.value).format("dd/mm/yyyy hh:mm a"),
    },
    {
      field: 'cost', headerName: 'Giá Tiền (VNĐ)', flex: 0.7, headerAlign: 'center', align: 'center',
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
          color={rowData.row.status}
          disabled={false}
          size="medium"
          variant="filled"
          label={rowData.row.status}
        />, align: 'center'
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
          <GridActionsCellItem
            icon={<IconButton sx={{
              color: 'rgb(255, 86, 48)',
            }}><MdDelete /></IconButton>}
            label="Delete"

          //   // onClick={toggleAdmin(params.id)}
          //   // showInMenu
          />,
          // <GridActionsCellItem
          //   icon={<FileCopyIcon />}
          //   label="Duplicate User"
          //   // onClick={duplicateUser(params.id)}
          //   showInMenu
          // />,
        ]
    }
    ,
  ]
  const rows = [
    { id: 3072, avatar: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/368021133_1726419231151489_6853635133763153961_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHXc4Y4B9SC2Fny3yA8N-CUBC9cMpZD2bwEL1wylkPZvD4bJYKXx2IP8953lqBULM1Rvddh6Q3aEhnBc6AwmJmM&_nc_ohc=69Usxj6UgwwAX_IKtYe&_nc_ht=scontent.fhan14-1.fna&oh=00_AfD4HUPBnIMOJC5ozsB4i7BfkaDkCoX9BA9lkl_PVfVb4w&oe=656E0B96', name: 'Trần Trung Hiếu', license: '43P1-0877', rating: '3', status: 'error', cost: '32000000', startDate: '12/2/2023 13:35:22' },
    { id: 2323, avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/342455417_142632771949230_690728436599108059_n.jpg?stp=dst-jpg_p320x320&_nc_cat=106&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFyRy3Pqvrbh5oqHPVCntUtOnZSSEzNvoQ6dlJITM2-hJT5HGfR_1UuQNkVK7F_ZaMArNvxZSitl2S-rK5jtTYF&_nc_ohc=186lXe8B0kEAX-jsjKZ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAmAAKbj68wgm8Lj-BSqxwxug0gkjAEw3KfHovjlcZvsg&oe=656E93C2', name: 'Nguyễn Thị Thúy Uyên', license: '75D1-2983', rating: '2', status: 'success', startDate: '12/2/2023 12:35:22', cost: '32000000' },
    { id: 3022, avatar: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/368021133_1726419231151489_6853635133763153961_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHXc4Y4B9SC2Fny3yA8N-CUBC9cMpZD2bwEL1wylkPZvD4bJYKXx2IP8953lqBULM1Rvddh6Q3aEhnBc6AwmJmM&_nc_ohc=69Usxj6UgwwAX_IKtYe&_nc_ht=scontent.fhan14-1.fna&oh=00_AfD4HUPBnIMOJC5ozsB4i7BfkaDkCoX9BA9lkl_PVfVb4w&oe=656E0B96', name: 'Trần Trung Hiếu', license: '43P1-0877', rating: '3', status: 'error', cost: '32000000', startDate: '12/2/2023 13:35:22' },
    { id: 2333, avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/342455417_142632771949230_690728436599108059_n.jpg?stp=dst-jpg_p320x320&_nc_cat=106&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFyRy3Pqvrbh5oqHPVCntUtOnZSSEzNvoQ6dlJITM2-hJT5HGfR_1UuQNkVK7F_ZaMArNvxZSitl2S-rK5jtTYF&_nc_ohc=186lXe8B0kEAX-jsjKZ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAmAAKbj68wgm8Lj-BSqxwxug0gkjAEw3KfHovjlcZvsg&oe=656E93C2', name: 'Nguyễn Thị Thúy Uyên', license: '75D1-2983', rating: '2', status: 'success', startDate: '12/2/2023 12:35:22', cost: '32000000' },
    { id: 3012, avatar: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/368021133_1726419231151489_6853635133763153961_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHXc4Y4B9SC2Fny3yA8N-CUBC9cMpZD2bwEL1wylkPZvD4bJYKXx2IP8953lqBULM1Rvddh6Q3aEhnBc6AwmJmM&_nc_ohc=69Usxj6UgwwAX_IKtYe&_nc_ht=scontent.fhan14-1.fna&oh=00_AfD4HUPBnIMOJC5ozsB4i7BfkaDkCoX9BA9lkl_PVfVb4w&oe=656E0B96', name: 'Trần Trung Hiếu', license: '43P1-0877', rating: '3', status: 'error', cost: '32000000', startDate: '12/2/2023 13:35:22' },
    { id: 2353, avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/342455417_142632771949230_690728436599108059_n.jpg?stp=dst-jpg_p320x320&_nc_cat=106&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFyRy3Pqvrbh5oqHPVCntUtOnZSSEzNvoQ6dlJITM2-hJT5HGfR_1UuQNkVK7F_ZaMArNvxZSitl2S-rK5jtTYF&_nc_ohc=186lXe8B0kEAX-jsjKZ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAmAAKbj68wgm8Lj-BSqxwxug0gkjAEw3KfHovjlcZvsg&oe=656E93C2', name: 'Nguyễn Thị Thúy Uyên', license: '75D1-2983', rating: '2', status: 'success', startDate: '12/2/2023 12:35:22', cost: '32000000' },
    { id: 3062, avatar: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/368021133_1726419231151489_6853635133763153961_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHXc4Y4B9SC2Fny3yA8N-CUBC9cMpZD2bwEL1wylkPZvD4bJYKXx2IP8953lqBULM1Rvddh6Q3aEhnBc6AwmJmM&_nc_ohc=69Usxj6UgwwAX_IKtYe&_nc_ht=scontent.fhan14-1.fna&oh=00_AfD4HUPBnIMOJC5ozsB4i7BfkaDkCoX9BA9lkl_PVfVb4w&oe=656E0B96', name: 'Trần Trung Hiếu', license: '43P1-0877', rating: '3', status: 'error', cost: '32000000', startDate: '12/2/2023 13:35:22' },
    { id: 2373, avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/342455417_142632771949230_690728436599108059_n.jpg?stp=dst-jpg_p320x320&_nc_cat=106&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFyRy3Pqvrbh5oqHPVCntUtOnZSSEzNvoQ6dlJITM2-hJT5HGfR_1UuQNkVK7F_ZaMArNvxZSitl2S-rK5jtTYF&_nc_ohc=186lXe8B0kEAX-jsjKZ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAmAAKbj68wgm8Lj-BSqxwxug0gkjAEw3KfHovjlcZvsg&oe=656E93C2', name: 'Nguyễn Thị Thúy Uyên', license: '75D1-2983', rating: '2', status: 'success', startDate: '12/2/2023 12:35:22', cost: '32000000' },
    { id: 3082, avatar: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/368021133_1726419231151489_6853635133763153961_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHXc4Y4B9SC2Fny3yA8N-CUBC9cMpZD2bwEL1wylkPZvD4bJYKXx2IP8953lqBULM1Rvddh6Q3aEhnBc6AwmJmM&_nc_ohc=69Usxj6UgwwAX_IKtYe&_nc_ht=scontent.fhan14-1.fna&oh=00_AfD4HUPBnIMOJC5ozsB4i7BfkaDkCoX9BA9lkl_PVfVb4w&oe=656E0B96', name: 'Trần Trung Hiếu', license: '43P1-0877', rating: '3', status: 'error', cost: '32000000', startDate: '12/2/2023 13:35:22', cost: '32000000' },
    { id: 2393, avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/342455417_142632771949230_690728436599108059_n.jpg?stp=dst-jpg_p320x320&_nc_cat=106&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFyRy3Pqvrbh5oqHPVCntUtOnZSSEzNvoQ6dlJITM2-hJT5HGfR_1UuQNkVK7F_ZaMArNvxZSitl2S-rK5jtTYF&_nc_ohc=186lXe8B0kEAX-jsjKZ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAmAAKbj68wgm8Lj-BSqxwxug0gkjAEw3KfHovjlcZvsg&oe=656E93C2', name: 'Nguyễn Thị Thúy Uyên', license: '75D1-2983', rating: '2', status: 'success', startDate: '12/2/2023 12:35:22', cost: '32000000' },
    { id: 3232, avatar: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/368021133_1726419231151489_6853635133763153961_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHXc4Y4B9SC2Fny3yA8N-CUBC9cMpZD2bwEL1wylkPZvD4bJYKXx2IP8953lqBULM1Rvddh6Q3aEhnBc6AwmJmM&_nc_ohc=69Usxj6UgwwAX_IKtYe&_nc_ht=scontent.fhan14-1.fna&oh=00_AfD4HUPBnIMOJC5ozsB4i7BfkaDkCoX9BA9lkl_PVfVb4w&oe=656E0B96', name: 'Trần Trung Hiếu', license: '43P1-0877', rating: '3', status: 'error', cost: '32000000', startDate: '12/2/2023 13:35:22' },
    { id: 1233, avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/342455417_142632771949230_690728436599108059_n.jpg?stp=dst-jpg_p320x320&_nc_cat=106&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFyRy3Pqvrbh5oqHPVCntUtOnZSSEzNvoQ6dlJITM2-hJT5HGfR_1UuQNkVK7F_ZaMArNvxZSitl2S-rK5jtTYF&_nc_ohc=186lXe8B0kEAX-jsjKZ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAmAAKbj68wgm8Lj-BSqxwxug0gkjAEw3KfHovjlcZvsg&oe=656E93C2', name: 'Nguyễn Thị Thúy Uyên', license: '75D1-2983', rating: '2', status: 'success', startDate: '12/2/2023 12:35:22', cost: '32000000' },
  ];



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
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          // pageSizeOptions={[5, 10]}
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