import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CarRepairIcon from '@mui/icons-material/CarRepair'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { CircularProgress } from '@mui/material';

function Contact(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Developer: '}
      <Link color="inherit" href="https://linkedin.com/in/jesús-abraham-m-534348110">
        Jesus Martinez
      </Link>
    </Typography>
  );
}

const theme = createTheme();

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function HomeView() {
    const [open, setOpen] = React.useState(false);
    const [isLoading,setIsLoading]=React.useState(true)
    const [title,setTitle]=React.useState('Posting your vehicle')
    const [image,setImage]=React.useState('any')

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setImage('any')
    setTitle('Posting your vehicle')
    setIsLoading(true)
    const data = new FormData(event.currentTarget);
    const body={
        price: data.get('price'),
        description: data.get('description')
    }
    fetch('http://localhost:5000/api/post_vehicle',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    }).then(res=>res.blob()).then(imageBlob=>{
        setImage(URL.createObjectURL(imageBlob))
        setTitle('Your vehicle was posted')
        setIsLoading(false)
    })
    setOpen(true)
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#e32020' }}>
            <CarRepairIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Post vehicle
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                type='number'
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  autoComplete="price"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                multiline
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  id="description"
                  autoComplete="description"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,bgcolor:'#e32020'}}
            >
              Registrar
            </Button>
          </Box>
        </Box>
        <Contact sx={{ mt: 5 }} />
      </Container>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            {isLoading&&<CircularProgress></CircularProgress>}
            {!isLoading&&<DialogContentText id="image-alert">
            <img style={{
                width:'100%'
            }} src={image}></img>
          </DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}