import { useState } from 'react';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import {
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
} from '@mui/material';
// components
import Iconify from '@/Components/Global/Iconify';
import MenuPopover from '@/Components/Global/MenuPopover';

// ----------------------------------------------------------------------

interface ListProps {
  id: string;
  label: string;
}
interface TaskItemProps {
  task: ListProps;
  checked: boolean;
  onChange: Function;
}
interface MoreMenuButtonProps {
  actions: React.ReactNode;
  onClose: Function;
  onOpen: Function;
  open: Element | null;
}

interface AppTasksProps {
  title: string;
  list: Array<ListProps>;
  subheader?: string;
}
export default function AppTasks({
  title,
  subheader,
  list,
  ...other
}: AppTasksProps) {
  const { control } = useForm({
    defaultValues: {
      taskCompleted: ['2'],
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Controller
        name="taskCompleted"
        control={control}
        render={({ field }) => {
          const onSelected = (task: string) =>
            field.value.includes(task)
              ? field.value.filter((value) => value !== task)
              : [...field.value, task];

          return (
            <>
              {list.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  checked={field.value.includes(task.id)}
                  onChange={() => field.onChange(onSelected(task.id))}
                />
              ))}
            </>
          );
        }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

function TaskItem({ task, checked, onChange }: TaskItemProps) {
  const [open, setOpen] = useState<Element | null>(null);

  const handleOpenMenu = (event: React.MouseEvent) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
    console.log('MARK COMPLETE', task.id);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.log('SHARE', task.id);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.log('EDIT', task.id);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.log('DELETE', task.id);
  };

  return (
    <Stack
      direction="row"
      sx={{
        px: 2,
        py: 0.75,
        ...(checked && {
          color: 'text.disabled',
          textDecoration: 'line-through',
        }),
      }}
    >
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={(e) => onChange(e)} />}
        label={task.label}
        sx={{ flexGrow: 1, m: 0 }}
      />

      <MoreMenuButton
        open={open}
        onClose={handleCloseMenu}
        onOpen={handleOpenMenu}
        actions={
          <>
            <MenuItem onClick={handleMarkComplete}>
              <Iconify icon={'eva:checkmark-circle-2-fill'} />
              Mark Complete
            </MenuItem>

            <MenuItem onClick={handleEdit}>
              <Iconify icon={'eva:edit-fill'} />
              Edit
            </MenuItem>

            <MenuItem onClick={handleShare}>
              <Iconify icon={'eva:share-fill'} />
              Share
            </MenuItem>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
              <Iconify icon={'eva:trash-2-outline'} />
              Delete
            </MenuItem>
          </>
        }
      />
    </Stack>
  );
}

// ----------------------------------------------------------------------

function MoreMenuButton({
  actions,
  open,
  onOpen,
  onClose,
}: MoreMenuButtonProps) {
  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        sx={{ opacity: 0.48 }}
        onClick={(e) => onOpen(e)}
      >
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 'auto',
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '& svg': { mr: 2, width: 20, height: 20 },
          },
        }}
      >
        {actions}
      </MenuPopover>
    </>
  );
}
