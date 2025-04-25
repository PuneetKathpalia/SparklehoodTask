import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Collapse,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Paper,
  Badge,
} from '@mui/material';
import { format } from 'date-fns';
import { AISafetyIncident, Severity, SortOrder } from '../types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

interface IncidentListProps {
  incidents: AISafetyIncident[];
  onFilterChange: (severity: Severity | 'All') => void;
  onSortChange: (order: SortOrder) => void;
}

const severityConfig = {
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

export const IncidentList: React.FC<IncidentListProps> = ({
  incidents,
  onFilterChange,
  onSortChange,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<Severity | 'All'>('All');
  const [sortValue, setSortValue] = useState<SortOrder>('newest');

  const handleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleFilterChange = (value: Severity | 'All') => {
    setFilterValue(value);
    onFilterChange(value);
  };

  const handleSortChange = (value: SortOrder) => {
    setSortValue(value);
    onSortChange(value);
  };

  const getSeverityCount = (severity: Severity) => {
    return incidents.filter(incident => incident.severity === severity).length;
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          backgroundColor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 0 } }}>
              <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle1" sx={{ mr: 2, fontWeight: 500 }}>
                Filter by Severity:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip 
                  label="All" 
                  onClick={() => handleFilterChange('All')} 
                  color={filterValue === 'All' ? 'primary' : 'default'}
                  variant={filterValue === 'All' ? 'filled' : 'outlined'}
                />
                <Chip 
                  label={`Low (${getSeverityCount('Low')})`} 
                  onClick={() => handleFilterChange('Low')} 
                  color={filterValue === 'Low' ? 'success' : 'default'}
                  variant={filterValue === 'Low' ? 'filled' : 'outlined'}
                />
                <Chip 
                  label={`Medium (${getSeverityCount('Medium')})`} 
                  onClick={() => handleFilterChange('Medium')} 
                  color={filterValue === 'Medium' ? 'warning' : 'default'}
                  variant={filterValue === 'Medium' ? 'filled' : 'outlined'}
                />
                <Chip 
                  label={`High (${getSeverityCount('High')})`} 
                  onClick={() => handleFilterChange('High')} 
                  color={filterValue === 'High' ? 'error' : 'default'}
                  variant={filterValue === 'High' ? 'filled' : 'outlined'}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SortIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle1" sx={{ mr: 2, fontWeight: 500 }}>
                Sort by Date:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip 
                  label="Newest First" 
                  onClick={() => handleSortChange('newest')} 
                  color={sortValue === 'newest' ? 'primary' : 'default'}
                  variant={sortValue === 'newest' ? 'filled' : 'outlined'}
                />
                <Chip 
                  label="Oldest First" 
                  onClick={() => handleSortChange('oldest')} 
                  color={sortValue === 'oldest' ? 'primary' : 'default'}
                  variant={sortValue === 'oldest' ? 'filled' : 'outlined'}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {incidents.length === 0 ? (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            textAlign: 'center', 
            backgroundColor: 'background.paper',
            borderRadius: 2,
            border: '1px dashed',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No incidents found matching your criteria
          </Typography>
        </Paper>
      ) : (
        incidents.map((incident) => (
          <Card 
            key={incident.id} 
            sx={{ 
              mb: 2, 
              overflow: 'hidden',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                backgroundColor: severityConfig[incident.severity].color,
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {incident.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Chip
                      icon={severityConfig[incident.severity].icon}
                      label={incident.severity}
                      size="small"
                      sx={{ 
                        backgroundColor: `${severityConfig[incident.severity].color}15`,
                        color: severityConfig[incident.severity].color,
                        fontWeight: 500,
                      }}
                    />
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ ml: 2 }}
                    >
                      Reported: {format(incident.reportedDate, 'PPP')}
                    </Typography>
                  </Box>
                </Box>
                <Tooltip title={expandedId === incident.id ? "Hide Details" : "View Details"}>
                  <IconButton 
                    onClick={() => handleExpand(incident.id)}
                    sx={{ 
                      color: 'primary.main',
                      transition: 'transform 0.2s',
                      transform: expandedId === incident.id ? 'rotate(180deg)' : 'none',
                    }}
                  >
                    {expandedId === incident.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Tooltip>
              </Box>
              
              <Collapse in={expandedId === incident.id} timeout={300}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {incident.description}
                </Typography>
              </Collapse>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}; 