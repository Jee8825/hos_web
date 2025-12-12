import { Card, CardContent, Typography, Box } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { motion } from 'framer-motion';

const ServiceCard = ({ service }) => {
  const IconComponent = Icons[service.iconName] || Icons.LocalHospital;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <Card sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: 3,
        '&:hover': { boxShadow: 6 }
      }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <IconComponent sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Typography variant="h5" component="h3">
              {service.title}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {service.description}
          </Typography>
          {service.keyServices && service.keyServices.length > 0 && (
            <Box>
              <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                Key Services:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {service.keyServices.map((item, idx) => (
                  <li key={idx}>
                    <Typography variant="body2">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
