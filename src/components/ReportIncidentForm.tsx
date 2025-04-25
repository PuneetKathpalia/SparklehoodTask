import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Chip,
  IconButton,
  Collapse,
  Alert,
  Fade,
  InputAdornment,
} from '@mui/material';
import { AISafetyIncident, Severity } from '../types';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

interface ReportIncidentFormProps {
  onSubmit: (incident: Omit<AISafetyIncident, 'id' | 'reportedDate'>) => void;
}

const severityConfig: Record<Severity, { color: string; icon: React.ReactElement; label: string }> = {
  Low: {
    color: '#4caf50',
    icon: <InfoIcon />,
    label: 'Low Severity',
  },
  Medium: {
    color: '#ff9800',
    icon: <WarningIcon />,
    label: 'Medium Severity',
  },
  High: {
    color: '#f44336',
    icon: <ErrorIcon />,
    label: 'High Severity',
  },
};

export const ReportIncidentForm: React.FC<ReportIncidentFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<Severity>('Low');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      severity,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setSeverity('Low');
    setErrors({});
    setIsSubmitted(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        mb: 3, 
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <AddIcon sx={{ mr: 1, color: 'primary.main' }} />
          Report New Incident
        </Typography>
        <IconButton 
          onClick={toggleExpand} 
          size="small"
          sx={{ 
            transform: isExpanded ? 'rotate(45deg)' : 'none',
            transition: 'transform 0.3s',
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Collapse in={isExpanded} timeout={300}>
        <Fade in={isExpanded} timeout={500}>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Title"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  error={!!errors.title}
                  helperText={errors.title}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  error={!!errors.description}
                  helperText={errors.description}
                  multiline
                  rows={4}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                  <WarningIcon sx={{ mr: 1, color: 'primary.main' }} />
                  Select Severity Level:
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  {Object.entries(severityConfig).map(([key, config]) => (
                    <Chip
                      key={key}
                      icon={config.icon}
                      label={key}
                      onClick={() => setSeverity(key as Severity)}
                      sx={{
                        backgroundColor: severity === key ? `${config.color}15` : 'transparent',
                        color: severity === key ? config.color : 'text.primary',
                        border: `1px solid ${config.color}`,
                        fontWeight: severity === key ? 600 : 400,
                        '&:hover': {
                          backgroundColor: `${config.color}15`,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Submit Incident Report
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Collapse>

      <Collapse in={isSubmitted} timeout={300}>
        <Alert 
          severity="success" 
          icon={<CheckCircleIcon />}
          sx={{ mt: 2 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setIsSubmitted(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Incident report submitted successfully!
        </Alert>
      </Collapse>
    </Paper>
  );
}; 