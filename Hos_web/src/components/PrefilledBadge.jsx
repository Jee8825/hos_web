import { Chip, Tooltip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const PrefilledBadge = ({ show }) => {
  if (!show) return null;
  
  return (
    <Tooltip title="Auto-filled from your previous submission" arrow>
      <Chip
        icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
        label="Prefilled"
        size="small"
        sx={{
          bgcolor: '#E8F5E9',
          color: '#2E7D32',
          fontFamily: '"Noto Serif Georgian", serif',
          fontSize: '0.75rem',
          height: 24,
          ml: 1,
          '& .MuiChip-icon': {
            color: '#2E7D32'
          }
        }}
      />
    </Tooltip>
  );
};

export default PrefilledBadge;
