import { Box, Container, Grid } from '@mui/material';
import { useUser } from '../providers/UserProvider';
import { getUserApi } from '../services/usersApiService';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import PageHeader from '../../components/PageHeader';


const UserDetailPage = () => {
  const {user} = useUser();
  const [userData, setUserData] = useState(null);

  if(!user) Navigate(ROUTES.CARDS)
  
  useEffect(() => {
    getUserApi(user._id).then((result) => {
      setUserData(result);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

   
    console.log(userData)

  return (
    <Container>
      <PageHeader
        title="User Details"
        subtitle="Here you can find more details about the user"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="center" mt={2}>
          <h1>User Name: {userData && userData.name.first} {userData && userData.name.last}</h1>
          <h3>Phone: {userData && userData.phone}</h3>
          <h3>
            Adress:{' '}
            {userData &&
              `${userData.address.city} ${userData.address.street} ${userData.address.houseNumber} ${userData.address.country}`}
          </h3>
          <h3>
            Email:{' '}
            {userData &&
              `${userData.email}`}
          </h3>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: { md: 'flex', xs: 'none' }, justifyContent: 'center' }}
        >
          <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 100, md: 100 },
              maxWidth: { xs: 100, md: 100 },
            }}
            alt={userData && userData.image.alt}
            src={userData && userData.image.url}
          />
        </Grid>

        
      </Grid>
    </Container>
  );
};

export default UserDetailPage;
