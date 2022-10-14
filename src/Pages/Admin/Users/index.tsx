import { sentenceCase } from 'change-case';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
// components
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from '@/Components/Admin/Users';
import Iconify from '@/Components/Global/Iconify';
import Label from '@/Components/Global/Label';
import Page from '@/Components/Global/Page';
import Scrollbar from '@/Components/Global/Scrollbar';
import SearchNotFound from '@/Components/Global/SearchNotFound';
// mock

//import userList from '@/Components/Global/_mock/user';
import { UserTypes } from '@/interfaces/auth.interface';
import { getAllUserDispatch } from '@/redux/slice/user';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useUpdateEffect, useEffectOnce } from '@/customHooks';
import LoadingPage from '../Loading';
import { defaultAvatar } from '@/assets/Images';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'birthday', label: 'Birthday', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];
type Order = 'desc' | 'asc';
// ----------------------------------------------------------------------

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: Order, orderBy: string) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(
  array: Array<any> | null,
  comparator: Function,
  query: string
) {
  if (!Array.isArray(array)) return;

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const dispatch = useAppDispatch();
  const [userList, setUserList] = useState<UserTypes[] | null>(null);
  const { userInfo } = useAppSelector((state) => state.auth);
  const { users, loading } = useAppSelector((state) => state.user);
  const [page, setPage] = useState<number>(0);
  const [order, setOrder] = useState<Order>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState<string>('name');
  const [filterName, setFilterName] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  useEffectOnce(() => {
    if (userInfo.accessToken) {
      dispatch(getAllUserDispatch(userInfo.accessToken));
    }
  });

  useUpdateEffect(() => {
    setUserList(users);
  }, [users]);
  let emptyRows = 0,
    filteredUsers,
    isUserNotFound;
  if (userList) {
    emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList!.length) : 0;
    filteredUsers = applySortFilter(
      userList,
      getComparator(order, orderBy),
      filterName
    );
    isUserNotFound = filteredUsers!.length === 0;
  }

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      if (userList) {
        let newSelecteds: any = [];
        newSelecteds = userList.map((n) => n.firstName);
        setSelected(newSelecteds);
      }

      return;
    }
    setSelected([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <Page title="Users">
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                User
              </Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to="#"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                New User
              </Button>
            </Stack>

            <Card>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                {userList && (
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={userList ? userList.length : 0}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                      />

                      <TableBody>
                        {filteredUsers &&
                          filteredUsers
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                              const {
                                id,
                                firstName,
                                lastName,

                                status,
                                email,
                                avatar,
                                birthday,
                              } = row;
                              const isItemSelected =
                                selected.indexOf(firstName) !== -1;

                              return (
                                <TableRow
                                  hover
                                  key={id}
                                  tabIndex={-1}
                                  role="checkbox"
                                  selected={isItemSelected}
                                  aria-checked={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={isItemSelected}
                                      onChange={(event) =>
                                        handleClick(firstName)
                                      }
                                    />
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="none"
                                  >
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      spacing={2}
                                    >
                                      <Avatar
                                        alt={firstName}
                                        src={avatar ? avatar : defaultAvatar}
                                      />
                                      <Typography variant="subtitle2" noWrap>
                                        {`${firstName || ''} ${lastName || ''}`}
                                      </Typography>
                                    </Stack>
                                  </TableCell>
                                  <TableCell align="left">
                                    {email || ''}
                                  </TableCell>
                                  <TableCell align="left">{'Admin'}</TableCell>
                                  <TableCell align="left">
                                    {birthday || ''}
                                  </TableCell>
                                  <TableCell align="left">
                                    <Label
                                      variant="ghost"
                                      color={
                                        (status === false && 'error') ||
                                        'success'
                                      }
                                    >
                                      {status ? 'Active' : 'Banned'}
                                    </Label>
                                  </TableCell>

                                  <TableCell align="right">
                                    <UserMoreMenu />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>

                      {isUserNotFound && (
                        <TableBody>
                          <TableRow>
                            <TableCell
                              align="center"
                              colSpan={6}
                              sx={{ py: 3 }}
                            >
                              <SearchNotFound searchQuery={filterName} />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                )}
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={userList ? userList.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
        </Page>
      )}
    </>
  );
}
