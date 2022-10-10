// material
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// component
import Iconify from '@/Components/Global/Iconify';
import { Theme } from '@/theme/theme.interface';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

interface RootStyleProps {
  theme: Theme;
}
const RootStyle = styled(Toolbar)(({ theme }: RootStyleProps) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: useTheme().spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }: RootStyleProps) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

interface UserListToolbarProps {
  numSelected: number;
  filterName: string;
  onFilterName: Function;
}
export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
}: UserListToolbarProps) {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
      theme={useTheme()}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={(e) => onFilterName(e)}
          theme={useTheme()}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
