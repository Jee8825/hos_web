import { Component } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              textAlign: 'center',
              gap: 3,
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 80, color: '#A51C30' }} />
            <Typography variant="h4" sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30' }}>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: '"Noto Serif Georgian", serif', color: '#666' }}>
              We're sorry for the inconvenience. Please try refreshing the page.
            </Typography>
            <Button
              variant="contained"
              onClick={this.handleReload}
              sx={{
                bgcolor: '#A51C30',
                '&:hover': { bgcolor: '#8B1628' },
                fontFamily: '"Viga", sans-serif',
                px: 4,
                py: 1.5,
                borderRadius: '25px',
              }}
            >
              Refresh Page
            </Button>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
