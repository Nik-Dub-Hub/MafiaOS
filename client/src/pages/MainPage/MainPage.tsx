// import { useState, useEffect } from 'react';
// import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { Button, Typography, Box, CardContent } from '@mui/material';
// import { styled } from '@mui/system';

// const StyledMainContainer = styled(Box)({
//   padding: '2rem',
//   textAlign: 'center',
//   backgroundColor: '#f5f5f5',
// });

// const StyledButton = styled(Button)({
//   marginTop: '1rem',
//   padding: '0.75rem 1.5rem',
//   fontSize: '1.2rem',
//   fontWeight: 'bold',
//   borderRadius: '4px',
// });

// const StyledSliderContainer = styled(Box)({
//   marginTop: '2rem',
//   padding: '1rem',
//   backgroundColor: '#fff',
//   borderRadius: '8px',
// });


// interface Role {
//   id: number;
//   name: string;
//   description: string;
//   image?: string; 
// }


// const imageMap: { [key: number]: string } = {
//   2: '/public/cards/Шериф.jpg',
//   3: '/public/cards/Мафия.jpg',
//   4: '/public/cards/Доктор.jpg',
//   5: '/public/cards/Танцовщица.jpg',
// };

export function MainPage() {
  // const [roles, setRoles] = useState<Role[]>([]);

  // useEffect(() => {
  //   const fetchRoles = async () => {
  //     try {
  //       const response = await fetch('/api/role');
  //       const data = await response.json();
  //       const filteredRoles = data.roles.filter((role: Role) => role.id !== 1); 
  //       setRoles(filteredRoles);
  //       console.log(filteredRoles)
  //     } catch (error) {
  //       console.error('Failed to fetch roles:', error);
  //     }
  //   };

  //   fetchRoles();
  // }, []);

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   pauseOnHover: true,
  //   rtl: false, 
  // };

  // const rules = [
  //   'Тут будут правила',
  // ];

  return (
    <div>чтобы не пусто было</div>
  )}
    // <StyledMainContainer>
      // <Typography variant="body1" paragraph>
      //   Кто лжет, а кто говорит правду? В Мафии каждый – подозреваемый. Используй свою интуицию и дедукцию, чтобы раскрыть предателей и спасти город! Время стать настоящим детективом!
      // </Typography>
      /* <StyledButton variant="contained">Play</StyledButton>

      <Typography variant="h4" mt={4}>
        Roles in the Game
      </Typography> */

      /* <StyledSliderContainer>
        <Slider {...settings}>
          {roles.map((role) => (
            <StyledCard key={role.id}>
              <StyledCardMedia
                component="img"
                image={imageMap[role.id]}
                alt={role.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {role.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {role.description}
                </Typography>
              </CardContent>
            </StyledCard>
          ))}
        </Slider>
      </StyledSliderContainer>

      <Typography variant="h4" mt={4}>
        Game Rules
      </Typography>
      <Box textAlign="left" mt={2}>
        {rules.map((rule, index) => (
          <Typography key={index} variant="body1" >
            {index + 1}. {rule}
          </Typography>
        ))}
      </Box> */
    // </StyledMainContainer>