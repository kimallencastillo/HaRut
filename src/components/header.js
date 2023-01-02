import { Box, Button, Typography } from '@mui/material';
import { grey, teal } from '@mui/material/colors';
import { Container } from '@mui/system';
import ReactAudioPlayer from 'react-audio-player';
import { history } from '../utils/history';
import MenuBg from '../music/quizBg2.mp3';
import logo from '../img/logo.png';
import { useEffect, useState } from 'react';
import { useAudio } from "react-awesome-audio";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';


export default function Header() {

  var accountStatus = JSON.parse(localStorage.getItem('account'));
  var name = JSON.parse(localStorage.getItem('name'));
  var age = JSON.parse(localStorage.getItem('account'));
  const [changeName, setChangeName] = useState(false)
  useEffect(() => {
    if (accountStatus) {
      setChangeName(true)
    } else {
      setChangeName(false)
    }
  }, [changeName])
  //console.log(accountStatus)
  const handleSubmit = (e) => {
    if (accountStatus) {
      localStorage.setItem('account', JSON.stringify(false));
      history.push('/');
      history.go(0);
    } else {
      localStorage.setItem('account', JSON.stringify(false));
      history.push('/');
      history.go(0);
    }
  }
  let { isPlaying, play, pause, toggle, onLoadedData } = useAudio({
    isPlaying: true,
    src: MenuBg,
    loop: true,
    
  });


  //  
  // test audio

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
          <div>
            <Button
              onClick={toggle}>
              { isPlaying ?   <VolumeUpIcon sx={{ width: "40px", height: "30px", color: "white" }} /> : <VolumeOffIcon  sx={{ width: "40px", height: "30px", color: "white" }} />  }
            </Button>
          </div>
          <div> 

          </div>
    


          <Button
            onClick={handleSubmit}
            sx={{
              textTransform: 'none',
            }}
            style={{
              fontSize: "15px"
            }}
          >
            {changeName ? "Log out" : "Login"}
          </Button>

        </Box>
      </Container>
    </Box>
  );
}
