import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, employees, ...rest }) => {
  const classes = useStyles();
  const [selectedEmployeeIds, setselectedEmployeeIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newselectedEmployeeIds;

    if (event.target.checked) {
      newselectedEmployeeIds = employees.map((employee) => employee.employee_id);
    } else {
      newselectedEmployeeIds = [];
    }

    setselectedEmployeeIds(newselectedEmployeeIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedEmployeeIds.indexOf(id);
    let newselectedEmployeeIds = [];

    if (selectedIndex === -1) {
      newselectedEmployeeIds = newselectedEmployeeIds.concat(selectedEmployeeIds, id);
    } else if (selectedIndex === 0) {
      newselectedEmployeeIds = newselectedEmployeeIds.concat(selectedEmployeeIds.slice(1));
    } else if (selectedIndex === selectedEmployeeIds.length - 1) {
      newselectedEmployeeIds = newselectedEmployeeIds.concat(selectedEmployeeIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedEmployeeIds = newselectedEmployeeIds.concat(
        selectedEmployeeIds.slice(0, selectedIndex),
        selectedEmployeeIds.slice(selectedIndex + 1)
      );
    }

    setselectedEmployeeIds(newselectedEmployeeIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedEmployeeIds.length === employees.length}
                    color="primary"
                    indeterminate={
                      selectedEmployeeIds.length > 0
                      && selectedEmployeeIds.length < employees.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Gender
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.slice(0, limit).map((employee) => (
                <TableRow
                  hover
                  key={employee.employee_id}
                  selected={selectedEmployeeIds.indexOf(employee.employee_id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedEmployeeIds.indexOf(employee.employee_id) !== -1}
                      onChange={(event) => handleSelectOne(event, employee.employee_id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={employee.avatarUrl}
                      >
                        {getInitials(employee.employee_name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {employee.employee_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {employee.employee_id}
                  </TableCell>
                  <TableCell>
                    {employee.email}
                  </TableCell>
                  <TableCell>
                    {employee.contact_number}
                  </TableCell>
                  <TableCell>
                    {employee.gender}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={employees.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  employees: PropTypes.array.isRequired
};

export default Results;
