import { Box, Container, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import useCards from '../hooks/useCards';
import { useEffect } from 'react';
import Card from '../components/card/Card';

const CardDetailPage = () => {
  const { id } = useParams();
  const {
    value: { card },
    handleGetCard,
  } = useCards();

  useEffect(() => {
    handleGetCard(id);
  }, []);

  return (
    <Container>
      <PageHeader
        title="Business Details"
        subtitle="Here you can find more details about the business"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="center" mt={2}>
          <h1>Company name: {card && card.title}</h1>
          <h2>Our moto: {card && card.subtitle}</h2>
          <p>Phone: {card && card.phone}</p>
          <p>
            Adress:{' '}
            {card &&
              `${card.address.city} ${card.address.street} ${card.address.houseNumber} ${card.address.country}  `}
          </p>
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
              maxHeight: { xs: 450, md: 450 },
              maxWidth: { xs: 550, md: 450 },
            }}
            alt={card && card.image.alt}
            src={card && card.image.url}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CardDetailPage;
