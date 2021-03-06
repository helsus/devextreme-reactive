import React from 'react';
import PropTypes from 'prop-types';
import {
  SortingState, SelectionState, PagingState,
  IntegratedSorting, RowDetailState, GroupingState,
  IntegratedSelection, IntegratedGrouping, IntegratedPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableSelection, TableGroupRow,
  PagingPanel, GroupingPanel, DragDropProvider, TableRowDetail,
  TableColumnReordering, Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import {
  AppBar, Paper, Typography, IconButton,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  Tabs, Tab, Divider,
} from 'material-ui';
import DoneIcon from 'material-ui-icons/Done';
import PauseIcon from 'material-ui-icons/PauseCircleOutline';
import LoopIcon from 'material-ui-icons/Loop';
import HelpIcon from 'material-ui-icons/HelpOutline';
import { withStyles } from 'material-ui/styles';

import {
  generateRows,
  employeeValues,
  employeeTaskValues,
} from '../../demo-data/generator';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  title: {
    marginBottom: theme.spacing.unit * 2,
    marginLeft: 0,
  },
});

const TaskIcon = ({ status }) => {
  switch (status) {
    case 'Deferred': return <PauseIcon />;
    case 'In Progress': return <LoopIcon />;
    case 'Need Assistance': return <HelpIcon />;
    default: return <DoneIcon />;
  }
};

TaskIcon.propTypes = {
  status: PropTypes.string.isRequired,
};

const TabContainer = ({ rows }) => {
  const lastItemIndex = rows.length - 1;

  return (
    <List style={{ height: 180 }}>
      {rows.map((item, index) => {
        const key = index;
        const { status } = item;
        return (
          <div key={key}>
            <ListItem dense>
              <ListItemText primary={item.subject} />
              <ListItemSecondaryAction>
                <IconButton aria-label={status}>
                  <TaskIcon status={status} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {index < lastItemIndex && <Divider />}
          </div>
        );
      })}
    </List>
  );
};

TabContainer.propTypes = {
  rows: PropTypes.array.isRequired,
};

class GridDetailContainerBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      lowPriorityTasks: this.findTasks('Low'),
      normalPriorityTasks: this.findTasks('Normal'),
      highPriorityTasks: this.findTasks('High'),
    };
    this.state.value = this.firstSelectedItem();
    this.handleChange = this.handleChange.bind(this);
  }
  findTasks(priority) {
    return this.props.row.tasks.filter(task => task.priority === priority);
  }
  firstSelectedItem() {
    let result = 0;
    const { lowPriorityTasks, normalPriorityTasks } = this.state;

    if (!lowPriorityTasks.length) {
      result = normalPriorityTasks.length ? 1 : 2;
    }

    return result;
  }
  handleChange(event, value) {
    this.setState({ value });
  }
  render() {
    const {
      lowPriorityTasks, normalPriorityTasks, highPriorityTasks, value,
    } = this.state;
    const { row, classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography type="title" component="h5" className={classes.title}>
          {row.firstName} {row.lastName}&apos;s Tasks by Priority:
        </Typography>
        <Paper>
          <AppBar position="static" color="inherit">
            <Tabs
              value={value}
              onChange={this.handleChange}
              fullWidth
            >
              <Tab label={`Low (${lowPriorityTasks.length})`} disabled={!lowPriorityTasks.length} />
              <Tab label={`Normal (${normalPriorityTasks.length})`} disabled={!normalPriorityTasks.length} />
              <Tab label={`High (${highPriorityTasks.length})`} disabled={!highPriorityTasks.length} />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer rows={lowPriorityTasks} />}
          {value === 1 && <TabContainer rows={normalPriorityTasks} />}
          {value === 2 && <TabContainer rows={highPriorityTasks} />}
        </Paper>
      </div>
    );
  }
}

GridDetailContainerBase.propTypes = {
  row: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const GridDetailContainer = withStyles(styles, { name: 'ThemingDemo' })(GridDetailContainerBase);

// eslint-disable-next-line
export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'prefix', title: 'Title' },
        { name: 'firstName', title: 'First Name' },
        { name: 'lastName', title: 'Last Name' },
        { name: 'position', title: 'Position' },
        { name: 'state', title: 'State' },
      ],
      tableColumnExtensions: [
        { columnName: 'prefix', width: 100 },
        { columnName: 'position', width: 170 },
        { columnName: 'state', width: 125 },
      ],
      rows: generateRows({
        columnValues: {
          ...employeeValues,
          tasks: ({ random }) => generateRows({
            columnValues: employeeTaskValues,
            length: Math.floor(random() * 4) + 5,
            random,
          }),
        },
        length: 40,
      }),
      pageSizes: [5, 10, 15],
    };
  }
  render() {
    const {
      rows, columns, tableColumnExtensions, pageSizes,
    } = this.state;

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <SortingState />
          <GroupingState />
          <PagingState
            defaultCurrentPage={0}
            defaultPageSize={10}
          />
          <RowDetailState
            defaultExpandedRows={[2]}
          />
          <SelectionState
            defaultSelection={[1, 3, 18]}
          />

          <IntegratedSorting />
          <IntegratedGrouping />
          <IntegratedPaging />
          <IntegratedSelection />

          <DragDropProvider />

          <Table
            columnExtensions={tableColumnExtensions}
          />

          <TableColumnReordering defaultOrder={columns.map(column => column.name)} />

          <TableHeaderRow showSortingControls />
          <PagingPanel
            pageSizes={pageSizes}
          />
          <TableSelection showSelectAll />
          <TableRowDetail
            contentComponent={GridDetailContainer}
          />
          <TableGroupRow />
          <Toolbar />
          <GroupingPanel showSortingControls />
        </Grid>
      </Paper>
    );
  }
}
