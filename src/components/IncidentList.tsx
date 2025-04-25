import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Collapse,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Paper,
  useMediaQuery,
  useTheme,
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

export const IncidentList: React.FC<IncidentListProps> = ({
  incidents,
  onFilterChange,
  onSortChange,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<Severity | 'All'>('All');
  const [sortValue, setSortValue] = useState<SortOrder>('newest');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
          p: { xs: 2, sm: 3 }, 
          mb: { xs: 2, sm: 3 }, 
          backgroundColor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, mb: { xs: 2, md: 0 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
                <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="subtitle1" sx={{ mr: 2, fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  Filter by Severity:
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip 
                  label="All" 
                  onClick={() => handleFilterChange('All' as Severity | 'All')} 
                  color={filterValue === 'All' ? 'primary' : 'default'}
                  variant={filterValue === 'All' ? 'filled' : 'outlined'}
                  size={isMobile ? "small" : "medium"}
                />
                <Chip 
                  label={`Low (${getSeverityCount('Low')})`} 
                  onClick={() => handleFilterChange('Low' as Severity)} 
                  sx={{ 
                    backgroundColor: filterValue === 'Low' ? severityConfig.Low.color + '15' : 'transparent',
                    color: filterValue === 'Low' ? severityConfig.Low.color : 'text.primary',
                    borderColor: severityConfig.Low.color,
                  }}
                  variant={filterValue === 'Low' ? 'filled' : 'outlined'}
                  size={isMobile ? "small" : "medium"}
                />
                <Chip 
                  label={`Medium (${getSeverityCount('Medium')})`} 
                  onClick={() => handleFilterChange('Medium' as Severity)} 
                  sx={{ 
                    backgroundColor: filterValue === 'Medium' ? severityConfig.Medium.color + '15' : 'transparent',
                    color: filterValue === 'Medium' ? severityConfig.Medium.color : 'text.primary',
                    borderColor: severityConfig.Medium.color,
                  }}
                  variant={filterValue === 'Medium' ? 'filled' : 'outlined'}
                  size={isMobile ? "small" : "medium"}
                />
                <Chip 
                  label={`High (${getSeverityCount('High')})`} 
                  onClick={() => handleFilterChange('High' as Severity)} 
                  sx={{ 
                    backgroundColor: filterValue === 'High' ? severityConfig.High.color + '15' : 'transparent',
                    color: filterValue === 'High' ? severityConfig.High.color : 'text.primary',
                    borderColor: severityConfig.High.color,
                  }}
                  variant={filterValue === 'High' ? 'filled' : 'outlined'}
                  size={isMobile ? "small" : "medium"}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
                <SortIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="subtitle1" sx={{ mr: 2, fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  Sort by Date:
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip 
                  label="Newest First" 
                  onClick={() => handleSortChange('newest')} 
                  color={sortValue === 'newest' ? 'primary' : 'default'}
                  variant={sortValue === 'newest' ? 'filled' : 'outlined'}
                  size={isMobile ? "small" : "medium"}
                />
                <Chip 
                  label="Oldest First" 
                  onClick={() => handleSortChange('oldest')} 
                  color={sortValue === 'oldest' ? 'primary' : 'default'}
                  variant={sortValue === 'oldest' ? 'filled' : 'outlined'}
                  size={isMobile ? "small" : "medium"}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      {incidents.length === 0 ? (
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, sm: 4 }, 
            textAlign: 'center', 
            backgroundColor: 'background.paper',
            borderRadius: 2,
            border: '1px dashed',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            No incidents found matching your criteria
          </Typography>
        </Paper>
      ) : (
        incidents.map((incident) => (
          <Card 
            key={incident.id} 
            sx={{ 
              mb: { xs: 1.5, sm: 2 }, 
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
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flex: 1 }}>
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
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" component="div" sx={{ mb: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                      {incident.title}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, mb: 1, gap: { xs: 1, sm: 2 } }}>
                      <Chip
                        icon={severityConfig[incident.severity].icon}
                        label={incident.severity}
                        size={isMobile ? "small" : "medium"}
                        sx={{ 
                          backgroundColor: `${severityConfig[incident.severity].color}15`,
                          color: severityConfig[incident.severity].color,
                          fontWeight: 500,
                        }}
                      />
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                      >
                        Reported: {format(incident.reportedDate, 'PPP')}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              
              <Collapse in={expandedId === incident.id} timeout={300}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
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