import { Box, Button, Typography } from '@mui/material';
import { grey, teal } from '@mui/material/colors';
import { Container } from '@mui/system';
import ReactAudioPlayer from 'react-audio-player';
import { history } from '../utils/history';
import MenuBg from '../music/quizBg2.mp3';
import logo from '../img/logo.png';
import { useEffect, useState } from 'react';



export default function Header() {
  
  var accountStatus = JSON.parse(localStorage.getItem('account'));
  var name = JSON.parse(localStorage.getItem('name'));
  var age = JSON.parse(localStorage.getItem('account'));
  const [changeName, setChangeName] = useState(false)
  useEffect(()=> {
    if(accountStatus) {
      setChangeName(true)
    }else {
      setChangeName(false)
    }
  }, [changeName])
  //console.log(accountStatus)
  const handleSubmit = (e) => {
    if(accountStatus){
      localStorage.setItem('account', JSON.stringify(false));
      history.push('/');
      history.go(0);
    }else {
      localStorage.setItem('account', JSON.stringify(false));
      history.push('/');
      history.go(0);
    }
  }
  return (
    <Box
      sx={{
        py: 2,
        width: '100%',
        background: '#212936',
        backgroundColor: "#7E27A4"
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="Harut"
            style={{
              minHeight: '78px',
              maxHeight: '56px',
              height: '100%',
              width: 'auto',
            }}
          />
         
          <Typography variant="h5" sx={{ fontWeight: 500, color: teal[400] }}>
     
          </Typography>
        </Box>
        <Box
          sx={{
            gap: 2,
            display: 'flex',
            '&> .MuiButton-root': {
              color: grey[50],
              '&:hover': {
                background: "#7E27A4",
                color: teal[400],
              },
            },
          }}
        >
           <ReactAudioPlayer 
              autoPlay
              src={MenuBg}
              controls
              loop
              className='bg-music'
              style={{
                width: "190px",
                background: "#7E27A4"
              }}
              
          />
          
          <Button
            onClick={handleSubmit}
            style={{
              fontSize: "15px"
            }}
          >
            
          </Button>
        
         
          <Button
            onClick={handleSubmit}
            sx={{
              textTransform: 'none',
            }}
            style={{
              fontSize: "15px"
            }}
          >
          { changeName ? "Log out" : "Login"}
          </Button>

        </Box>
      </Container>
    </Box>
  );
}