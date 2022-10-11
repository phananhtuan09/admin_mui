// @mui
import { styled } from '@mui/material/styles';
import { Autocomplete, InputAdornment, Popper, TextField } from '@mui/material';
// components
import Iconify from '@/Components/Global/Iconify';
import { PostProps } from './blog.interface';

// ----------------------------------------------------------------------

const PopperStyle = styled((props) => (
  <Popper open={false} placement="bottom-start" {...props} />
))({
  width: '280px !important',
});

// ----------------------------------------------------------------------
interface BlogPostCardProps {
  posts: PostProps[];
}
export default function BlogPostsSearch({ posts }: BlogPostCardProps) {
  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={posts}
      getOptionLabel={(post: PostProps) => post.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search post..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={'eva:search-fill'}
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
