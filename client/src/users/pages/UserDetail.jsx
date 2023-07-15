import { useEffect } from 'react';
import useUsers from '../hooks/useUsers';
import { Container, Grid } from '@mui/material';
import PageHeader from '../../components/PageHeader';

const UserDetail = () => {
  const { user } = useUsers();
//   useEffect(() => {
//     getUserDetails(user._id);
//   }, []);
  return <>
  <Container>
      <PageHeader
        title="Business Details"
        subtitle="Here you can find more details about the business"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="center" mt={2}>
          <h1>Title: {user && user.name.first}</h1>
          
          
        </Grid>
        
      </Grid>
    </Container>
  </>;
};

export default UserDetail;
