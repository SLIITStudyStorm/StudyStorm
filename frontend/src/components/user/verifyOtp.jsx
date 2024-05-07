import  { useState, useRef } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, AlertTitle} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

export default function VerifyOTP({ email, setVerifyOtpState, setChangePasswordState}) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const otpValue = otp.join('');
      // Make an API call to verify OTP
      const response = await axios.post(`http://localhost:8080/forgotPassword/verifyOtp/${otpValue}/${email}`);

      console.log('OTP verification successful!', response.data);

      // Dispatch setUserInfo action if needed
      // Redirect user to desired page after successful verification

      // Reset state
      setError(false);
      setSuccess(true);
        setVerifyOtpState(false);
        setChangePasswordState(true);
    } catch (error) {
      console.error('OTP verification failed!', error);
      setError(true);
      setSuccess(false);
    }
  };

  const handleChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Move focus to the next input field
    if (value !== '' && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '50px',
        }}
      >
        <CssBaseline />
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Error</AlertTitle>
            Incorrect OTP. Please try again.
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            <AlertTitle>Success</AlertTitle>
            OTP verification successful!
          </Alert>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
            Verify OTP
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {otp.map((digit, index) => (
                <Grid item xs={2} key={index}>
                  <TextField
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    margin="normal"
                    required
                    fullWidth
                    id={`otp-${index}`}
                    label="OTP"
                    name={`otp-${index}`}
                    type="tel"
                    autoComplete="off"
                    autoFocus={index === 0}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#1976d2', color: '#fff' }}
            >
              Verify OTP
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={()=>{
                       axios.post(`http://localhost:8080/forgotPassword/verifyMail/${email}`)
                       .then((response) => {
                         console.log('OTP sent successfully!', response.data);
                       })
                       ;
                }}>Resend OTP</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
