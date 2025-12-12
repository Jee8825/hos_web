import { useState, useEffect } from 'react';
import { getUsers, getServices, getAppointments } from '../services/api';
import socketService from '../services/socket';
import { Box, Container, Grid, Card, CardContent, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import EventIcon from '@mui/icons-material/Event';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    services: 0,
    appointments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, servicesRes, appointmentsRes] = await Promise.all([
          getUsers(),
          getServices(),
          getAppointments()
        ]);
        setStats({
          users: usersRes.data.length,
          services: servicesRes.data.length,
          appointments: appointmentsRes.data.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();

    const handleUpdate = () => fetchStats();
    socketService.on('user:created', handleUpdate);
    socketService.on('user:deleted', handleUpdate);
    socketService.on('service:created', handleUpdate);
    socketService.on('service:deleted', handleUpdate);
    socketService.on('appointment:created', handleUpdate);
    socketService.on('appointment:deleted', handleUpdate);

    return () => {
      socketService.off('user:created', handleUpdate);
      socketService.off('user:deleted', handleUpdate);
      socketService.off('service:created', handleUpdate);
      socketService.off('service:deleted', handleUpdate);
      socketService.off('appointment:created', handleUpdate);
      socketService.off('appointment:deleted', handleUpdate);
    };
  }, []);

  const monthlyData = [
    { month: 'Jan', logs: 45, appointments: 32 },
    { month: 'Feb', logs: 52, appointments: 41 },
    { month: 'Mar', logs: 61, appointments: 38 },
    { month: 'Apr', logs: 58, appointments: 47 },
    { month: 'May', logs: 73, appointments: 55 },
    { month: 'Jun', logs: 68, appointments: 52 },
  ];

  const statCards = [
    { title: 'Total Users', value: stats.users, icon: <PeopleIcon sx={{ fontSize: 50 }} />, color: '#F0A202' },
    { title: 'Active Services', value: stats.services, icon: <MedicalServicesIcon sx={{ fontSize: 50 }} />, color: '#A51C30' },
    { title: 'Total Appointments', value: stats.appointments, icon: <EventIcon sx={{ fontSize: 50 }} />, color: '#FF7E7E' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Viga", sans-serif',
          color: '#A51C30',
          mb: { xs: 3, md: 4 },
          fontSize: { xs: '1.75rem', md: '2.125rem' },
        }}
      >
        Dashboard Overview
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3, lg: 4 }} sx={{ mb: { xs: 3, md: 4 } }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: { xs: '15px', md: '20px' },
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                height: '100%',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3, lg: 4 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: '"Viga", sans-serif',
                        color: card.color,
                        mb: 1,
                        fontWeight: 700,
                        fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                      }}
                    >
                      {card.value}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Noto Serif Georgian", serif',
                        color: '#666',
                        fontSize: { xs: '0.9rem', md: '1rem', lg: '1.1rem' },
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                  <Box sx={{ color: card.color, opacity: 0.8, '& svg': { fontSize: { xs: 40, md: 50, lg: 60 } } }}>
                    {card.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={{ xs: 2, md: 3, lg: 4 }}>
        <Grid item xs={12} lg={6}>
          <Card
            sx={{
              borderRadius: { xs: '15px', md: '20px' },
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              p: { xs: 2, md: 3, lg: 4 },
              height: '100%',
              minHeight: { xs: 350, md: 400, lg: 500 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: { xs: 2, md: 3 },
                fontSize: { xs: '1rem', md: '1.25rem', lg: '1.5rem' },
              }}
            >
              Monthly User Logs
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: '0.875rem' }} />
                <YAxis style={{ fontSize: '0.875rem' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="logs" stroke="#F0A202" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card
            sx={{
              borderRadius: { xs: '15px', md: '20px' },
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              p: { xs: 2, md: 3, lg: 4 },
              height: '100%',
              minHeight: { xs: 350, md: 400, lg: 500 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: { xs: 2, md: 3 },
                fontSize: { xs: '1rem', md: '1.25rem', lg: '1.5rem' },
              }}
            >
              Monthly Appointments
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: '0.875rem' }} />
                <YAxis style={{ fontSize: '0.875rem' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="appointments" fill="#A51C30" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 2, md: 3, lg: 4 }} sx={{ mt: { xs: 1, md: 2 } }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: { xs: '15px', md: '20px' },
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              p: { xs: 2.5, md: 3, lg: 4 },
              bgcolor: '#FF7E7E10',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 2 } }}>
              <TrendingUpIcon sx={{ fontSize: { xs: 40, md: 50, lg: 60 }, color: '#A51C30' }} />
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Viga", sans-serif',
                    color: '#A51C30',
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                  }}
                >
                  Growth Rate
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: '"Noto Serif Georgian", serif',
                    color: '#666',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                  }}
                >
                  +23% increase this month
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: { xs: '15px', md: '20px' },
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              p: { xs: 2.5, md: 3, lg: 4 },
              bgcolor: '#F0A20210',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 2 } }}>
              <EventIcon sx={{ fontSize: { xs: 40, md: 50, lg: 60 }, color: '#F0A202' }} />
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Viga", sans-serif',
                    color: '#F0A202',
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                  }}
                >
                  This Month
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: '"Noto Serif Georgian", serif',
                    color: '#666',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                  }}
                >
                  52 appointments scheduled
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
