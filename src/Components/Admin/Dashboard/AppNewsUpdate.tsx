// @mui
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';
// utils
import { fToNow } from '@/utils/formatTime';
// components
import Iconify from '@/Components/Global/Iconify';
import Scrollbar from '@/Components/Global/Scrollbar';

// ----------------------------------------------------------------------

interface ListProps {
  id: string;
  title: string;
  description: string;
  image: string;
  postedAt: Date;
}
interface NewsItemsProps {
  key: string;
  news: ListProps;
}
interface AppNewsUpdateProps {
  title: string;
  subheader?: string;
  list: Array<ListProps>;
}
function NewsItem({ news }: NewsItemsProps) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}
      >
        {fToNow(postedAt)}
      </Typography>
    </Stack>
  );
}
export default function AppNewsUpdate({
  title,
  subheader,
  list,
  ...other
}: AppNewsUpdateProps) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------
