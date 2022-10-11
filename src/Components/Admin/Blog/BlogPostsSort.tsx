// material
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

interface SortOptionsProps {
  value: string;
  label: string;
}
interface BlogPostsSortProps {
  options: SortOptionsProps[];
  onSort?: (event: object) => void;
}

export default function BlogPostsSort({ options, onSort }: BlogPostsSortProps) {
  return (
    <TextField select size="small" value="latest" onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
