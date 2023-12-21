import { Button, Chip, CircularProgress, Grid, IconButton, InputAdornment, MenuItem, Paper, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CloseIcon from '@mui/icons-material/Close';
import { useMemo, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

const testData = [
  {"id":1,"email":"ljales0@google.pl","fullName":"Lotte Jales","gender":false,"dateOfBirth":"08/17/2023","phoneNumber":"184-904-8944","createDate":"01/14/2023","isNonBlock":"fetching"},
  {"id":2,"email":"gcunnington1@imageshack.us","fullName":"Garik Cunnington","gender":true,"dateOfBirth":"12/03/2023","phoneNumber":"692-678-6370","createDate":"01/21/2023","isNonBlock":false},
  {"id":3,"email":"bvan2@amazon.de","fullName":"Bobbe Van Der Vlies","gender":true,"dateOfBirth":"11/18/2023","phoneNumber":"735-506-0493","createDate":"09/22/2023","isNonBlock":true},
  {"id":4,"email":"lherrema3@chron.com","fullName":"Lou Herrema","gender":true,"dateOfBirth":"12/25/2022","phoneNumber":"865-279-9180","createDate":"05/14/2023","isNonBlock":true},
  {"id":5,"email":"dbrigginshaw4@independent.co.uk","fullName":"Dasi Brigginshaw","gender":false,"dateOfBirth":"04/17/2023","phoneNumber":"989-800-3777","createDate":"10/12/2023","isNonBlock":false},
  {"id":6,"email":"tpostin5@army.mil","fullName":"Tanney Postin","gender":false,"dateOfBirth":"07/27/2023","phoneNumber":"449-636-3252","createDate":"03/26/2023","isNonBlock":false},
  {"id":7,"email":"hfittall6@amazon.co.jp","fullName":"Hailee Fittall","gender":true,"dateOfBirth":"05/19/2023","phoneNumber":"556-127-0907","createDate":"08/04/2023","isNonBlock":true},
  {"id":8,"email":"hstanger7@printfriendly.com","fullName":"Hill Stanger","gender":false,"dateOfBirth":"01/11/2023","phoneNumber":"562-264-4205","createDate":"01/11/2023","isNonBlock":true},
  {"id":9,"email":"bbostick8@stanford.edu","fullName":"Bernhard Bostick","gender":true,"dateOfBirth":"03/02/2023","phoneNumber":"279-498-2100","createDate":"05/04/2023","isNonBlock":true},
  {"id":10,"email":"pcursey9@amazon.de","fullName":"Piotr Cursey","gender":false,"dateOfBirth":"03/28/2023","phoneNumber":"956-175-0917","createDate":"03/18/2023","isNonBlock":true},
  {"id":11,"email":"sbohla@fda.gov","fullName":"Stefano Bohl","gender":false,"dateOfBirth":"05/18/2023","phoneNumber":"577-635-7083","createDate":"02/16/2023","isNonBlock":false},
  {"id":12,"email":"fsmeethb@unblog.fr","fullName":"Florie Smeeth","gender":false,"dateOfBirth":"01/22/2023","phoneNumber":"524-486-1605","createDate":"12/28/2022","isNonBlock":false},
  {"id":13,"email":"mhernikc@webmd.com","fullName":"Malissia Hernik","gender":true,"dateOfBirth":"11/25/2023","phoneNumber":"467-505-8280","createDate":"08/16/2023","isNonBlock":false},
  {"id":14,"email":"kbaldend@yahoo.com","fullName":"Kiley Balden","gender":true,"dateOfBirth":"12/06/2023","phoneNumber":"587-508-7548","createDate":"10/18/2023","isNonBlock":false},
  {"id":15,"email":"mhargete@google.nl","fullName":"Moritz Harget","gender":false,"dateOfBirth":"04/30/2023","phoneNumber":"202-824-0935","createDate":"03/29/2023","isNonBlock":false},
  {"id":16,"email":"gthurbyf@stumbleupon.com","fullName":"Godfry Thurby","gender":true,"dateOfBirth":"12/29/2022","phoneNumber":"446-622-6861","createDate":"05/17/2023","isNonBlock":false},
  {"id":17,"email":"eprenticeg@disqus.com","fullName":"Evelina Prentice","gender":true,"dateOfBirth":"04/10/2023","phoneNumber":"354-748-1543","createDate":"02/22/2023","isNonBlock":true},
  {"id":18,"email":"adh@un.org","fullName":"Andy d' Eye","gender":false,"dateOfBirth":"08/28/2023","phoneNumber":"861-594-0416","createDate":"01/30/2023","isNonBlock":true},
  {"id":19,"email":"wtroctori@people.com.cn","fullName":"Wallache Troctor","gender":true,"dateOfBirth":"02/17/2023","phoneNumber":"262-399-2219","createDate":"12/10/2023","isNonBlock":false},
  {"id":20,"email":"ebondej@sciencedaily.com","fullName":"Emlynne Bonde","gender":false,"dateOfBirth":"07/31/2023","phoneNumber":"703-339-1813","createDate":"08/29/2023","isNonBlock":true},
  {"id":21,"email":"fknollerk@rambler.ru","fullName":"Fletch Knoller","gender":true,"dateOfBirth":"04/11/2023","phoneNumber":"858-681-9468","createDate":"01/21/2023","isNonBlock":false},
  {"id":22,"email":"dblesdilll@phoca.cz","fullName":"Delinda Blesdill","gender":false,"dateOfBirth":"12/26/2022","phoneNumber":"652-486-9536","createDate":"04/16/2023","isNonBlock":true},
  {"id":23,"email":"cdoretm@theguardian.com","fullName":"Cece Doret","gender":false,"dateOfBirth":"11/07/2023","phoneNumber":"374-789-3152","createDate":"12/05/2023","isNonBlock":true},
  {"id":24,"email":"falburyn@wikipedia.org","fullName":"Farrel Albury","gender":false,"dateOfBirth":"03/01/2023","phoneNumber":"256-225-9983","createDate":"08/18/2023","isNonBlock":false},
  {"id":25,"email":"vsouthono@ihg.com","fullName":"Vasilis Southon","gender":true,"dateOfBirth":"04/04/2023","phoneNumber":"971-933-0293","createDate":"01/21/2023","isNonBlock":true},
  {"id":26,"email":"vcornillp@privacy.gov.au","fullName":"Virgie Cornill","gender":true,"dateOfBirth":"06/24/2023","phoneNumber":"351-112-1671","createDate":"11/01/2023","isNonBlock":true},
  {"id":27,"email":"jwhittleq@ezinearticles.com","fullName":"Jenica Whittle","gender":true,"dateOfBirth":"07/26/2023","phoneNumber":"781-697-4950","createDate":"01/20/2023","isNonBlock":false},
  {"id":28,"email":"rkullr@buzzfeed.com","fullName":"Rossie Kull","gender":true,"dateOfBirth":"01/02/2023","phoneNumber":"944-109-3059","createDate":"04/18/2023","isNonBlock":false},
  {"id":29,"email":"aprimmers@arizona.edu","fullName":"Arch Primmer","gender":false,"dateOfBirth":"07/31/2023","phoneNumber":"688-271-6485","createDate":"07/08/2023","isNonBlock":true},
  {"id":30,"email":"jlittlekitt@japanpost.jp","fullName":"Jsandye Littlekit","gender":true,"dateOfBirth":"06/04/2023","phoneNumber":"199-197-2915","createDate":"07/26/2023","isNonBlock":false},
  {"id":31,"email":"lpatesu@google.de","fullName":"Lucais Pates","gender":true,"dateOfBirth":"04/17/2023","phoneNumber":"911-203-8883","createDate":"03/20/2023","isNonBlock":false},
  {"id":32,"email":"mcaliforniav@1und1.de","fullName":"Marnia California","gender":false,"dateOfBirth":"12/03/2023","phoneNumber":"885-774-6318","createDate":"02/10/2023","isNonBlock":true},
  {"id":33,"email":"fnavarrow@paypal.com","fullName":"Filmore Navarro","gender":false,"dateOfBirth":"06/09/2023","phoneNumber":"780-941-9106","createDate":"11/18/2023","isNonBlock":true},
  {"id":34,"email":"askyramx@trellian.com","fullName":"Anatola Skyram","gender":false,"dateOfBirth":"04/25/2023","phoneNumber":"969-311-4748","createDate":"11/13/2023","isNonBlock":true},
  {"id":35,"email":"slodwigy@prlog.org","fullName":"Suzie Lodwig","gender":false,"dateOfBirth":"03/30/2023","phoneNumber":"858-222-6729","createDate":"04/02/2023","isNonBlock":false},
  {"id":36,"email":"jaxcelz@netvibes.com","fullName":"Jan Axcel","gender":true,"dateOfBirth":"04/16/2023","phoneNumber":"673-673-9446","createDate":"05/15/2023","isNonBlock":false},
  {"id":37,"email":"jchard10@webs.com","fullName":"Jaymie Chard","gender":true,"dateOfBirth":"04/09/2023","phoneNumber":"810-347-1585","createDate":"07/14/2023","isNonBlock":true},
  {"id":38,"email":"cespinas11@livejournal.com","fullName":"Caroljean Espinas","gender":true,"dateOfBirth":"01/03/2023","phoneNumber":"194-179-3673","createDate":"07/08/2023","isNonBlock":false},
  {"id":39,"email":"dde12@discuz.net","fullName":"Doe de Broke","gender":true,"dateOfBirth":"11/14/2023","phoneNumber":"689-497-6582","createDate":"12/23/2022","isNonBlock":true},
  {"id":40,"email":"esaterweyte13@tripod.com","fullName":"Ernesta Saterweyte","gender":false,"dateOfBirth":"03/27/2023","phoneNumber":"497-857-1253","createDate":"07/23/2023","isNonBlock":false},
  {"id":41,"email":"acoursor14@netscape.com","fullName":"Arleen Coursor","gender":true,"dateOfBirth":"05/08/2023","phoneNumber":"568-718-7541","createDate":"11/04/2023","isNonBlock":false},
  {"id":42,"email":"sklais15@netvibes.com","fullName":"Stevie Klais","gender":false,"dateOfBirth":"09/12/2023","phoneNumber":"486-868-2259","createDate":"06/22/2023","isNonBlock":true},
  {"id":43,"email":"rcasarini16@reverbnation.com","fullName":"Rica Casarini","gender":true,"dateOfBirth":"02/11/2023","phoneNumber":"232-220-6479","createDate":"04/12/2023","isNonBlock":true},
  {"id":44,"email":"lveracruysse17@drupal.org","fullName":"Lewie Veracruysse","gender":false,"dateOfBirth":"12/29/2022","phoneNumber":"723-252-9797","createDate":"01/21/2023","isNonBlock":true},
  {"id":45,"email":"pitzkowicz18@princeton.edu","fullName":"Pavia Itzkowicz","gender":true,"dateOfBirth":"12/03/2023","phoneNumber":"685-643-5915","createDate":"08/07/2023","isNonBlock":false},
  {"id":46,"email":"jmackenney19@csmonitor.com","fullName":"Jacquelyn MacKenney","gender":false,"dateOfBirth":"05/15/2023","phoneNumber":"577-997-7315","createDate":"05/29/2023","isNonBlock":true},
  {"id":47,"email":"hlanceter1a@oaic.gov.au","fullName":"Humbert Lanceter","gender":false,"dateOfBirth":"09/22/2023","phoneNumber":"208-664-2720","createDate":"11/13/2023","isNonBlock":true},
  {"id":48,"email":"fgriffe1b@flavors.me","fullName":"Ferdie Griffe","gender":true,"dateOfBirth":"05/09/2023","phoneNumber":"840-755-2394","createDate":"10/03/2023","isNonBlock":true},
  {"id":49,"email":"dgreim1c@printfriendly.com","fullName":"Dierdre Greim","gender":true,"dateOfBirth":"01/23/2023","phoneNumber":"709-473-6323","createDate":"06/21/2023","isNonBlock":false},
  {"id":50,"email":"cbonnick1d@taobao.com","fullName":"Cherice Bonnick","gender":true,"dateOfBirth":"06/06/2023","phoneNumber":"474-821-7297","createDate":"12/24/2022","isNonBlock":false}
]

export const CustomerManageForm = () => {
  const columns = [
    { field: 'id', headerName: 'STT', flex: 0.05 },
    { field: 'email', headerName: 'Tài khoản', editable: true, flex: 0.125 },
    { field: 'fullName', headerName: 'Họ tên', flex: 0.125 },
    { field: 'gender', headerName: 'Giói tính', flex: 0.1,
      renderCell: (gridData) => {
        switch (gridData.row.gender) {
          case true:
            return <Chip label='Nam' sx={{ bgcolor: '#0288d1', color: 'white' }}/>
          case false:
            return <Chip label='Nữ' sx={{ bgcolor: 'darkviolet', color: 'white' }}/>
          default:
            return <Chip label={gridData.row.status}/>
        }
      }
    },
    { field: 'dateOfBirth', headerName: 'Ngày sinh', flex: 0.1 },
    { field: 'phoneNumber', headerName: 'Số điện thoại', flex: 0.1 },
    { field: 'createDate', headerName: 'Ngày đăng kí', flex: 0.1 },
    { field: 'isNonBlock', headerName: 'Bị chặn', flex: 0.1,
      renderCell: (gridData) => {
        switch (gridData.row.isNonBlock) {
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
      field: 'action', headerName: 'Hành động', flex: 0.1, type: 'actions',
      getActions: (gridData) => [
        <GridActionsCellItem
          icon={
            <IconButton>
            {/* onClick={() => handleCheckOrCancel(gridData.row.id, 'cancelled')}> */}
              <LockIcon sx={{ color: '#d32f2f' }} />
            </IconButton>
          }
        />,
        <GridActionsCellItem
          icon={
            <IconButton>
            {/* onClick={() => handleCheckOrCancel(gridData.row.id, 'cancelled')}> */}
              <LockOpenIcon sx={{ color: 'green' }} />
            </IconButton>
          }
        />,
      ]
    }
  ]

  const [gridData, setGridData] = useState(testData);
  const [search, setSearch] = useState('');
  const [blockFilter, setBlockFilter] = useState('all');
  const filtedData = useMemo(() =>
    gridData.filter(data =>
      data.fullName.toLowerCase().includes(search.toLowerCase()) 
      && blockFilter === 'all' ? data : data.isNonBlock === blockFilter
    )
    , [gridData, blockFilter, search])

  const handleSearch = () => {
    const term = document.getElementById('search-box').value;
    setSearch(term);
  };
  const handleSearchReset = () => {
    document.getElementById('search-box').value = '';
    setSearch('');
  };
  const handleBlockFilter = (e) => {
    switch (e.target.value) {
      case 'all':
        setBlockFilter('all');
        break;
      case 'nonBlock':
        setBlockFilter(true);
        break;
      case 'blocked':
        setBlockFilter(false);
        break;
      default:
        break;
    }
  };

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