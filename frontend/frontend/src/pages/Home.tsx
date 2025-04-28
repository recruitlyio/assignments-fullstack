import React from 'react';
import { Box, Button, Container, Typography ,Card,CardContent,Stack} from '@mui/material';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        Welcome to TechInterviewGPT
      </Typography>

      <Typography variant="h6" color="textSecondary" paragraph>
        Generate high-quality, customized technical interview questions with ease.
      </Typography>

      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/generate"
        >
          Get Started
        </Button>
      </Box>
      <Box sx={{ my: 8, textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="bold" mb={6}>
        How It Works
      </Typography>

      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={4} 
        justifyContent="center" 
        alignItems="center"
      >
        {/* Step 1 */}
        <Card elevation={4} sx={{ width: 300 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              📋 Define Requirements
            </Typography>
            <Typography variant="body2">
              Specify job title, technical skills, and experience level for the position.
            </Typography>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card elevation={4} sx={{ width: 300 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              ⚙️ Generate Questions
            </Typography>
            <Typography variant="body2">
              Our AI creates relevant questions with difficulty matching the experience level.
            </Typography>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card elevation={6} sx={{ width: 300 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              📄  Export
            </Typography>
            <Typography variant="body2">
               Export them for your interview or Revision  process.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
    </Container>
    
  );
};

export default Home;
