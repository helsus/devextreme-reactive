import React from 'react';
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import {
  generateRows,
} from '../../demo-data/generator';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 14 }),
      selection: [],
    };

    this.changeSelection = selection => this.setState({ selection });
  }
  render() {
    const { rows, columns, selection } = this.state;

    return (
      <div>
        <span>Total rows selected: {selection.length}</span>
        <Paper>
          <Grid
            rows={rows}
            columns={columns}
          >
            <SelectionState
              selection={selection}
              onSelectionChange={this.changeSelection}
            />
            <PagingState
              defaultCurrentPage={0}
              pageSize={6}
            />
            <IntegratedSelection />
            <IntegratedPaging />
            <Table />
            <TableHeaderRow />
            <TableSelection showSelectAll />
            <PagingPanel />
          </Grid>
        </Paper>
      </div>
    );
  }
}
