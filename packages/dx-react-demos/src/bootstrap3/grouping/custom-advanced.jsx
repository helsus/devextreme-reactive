import React from 'react';
import PropTypes from 'prop-types';
import {
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
} from '../../demo-data/generator';

const NameGroupCell = props => (
  <TableGroupRow.Cell {...props}>
    from {props.row.value.from} to {props.row.value.to}
  </TableGroupRow.Cell>
);
NameGroupCell.propTypes = {
  row: PropTypes.object.isRequired,
};

const GroupCell = (props) => {
  if (props.column.name === 'name') {
    return <NameGroupCell {...props} />;
  }
  return <TableGroupRow.Cell {...props} />;
};
GroupCell.propTypes = {
  column: PropTypes.shape({ name: PropTypes.string }).isRequired,
};

const nameGroupCriteria = (value) => {
  const firstLetter = String(value).substr(0, 1).toLowerCase();
  const groupValue = firstLetter < 'n'
    ? { from: 'A', to: 'M' }
    : { from: 'N', to: 'Z' };
  return {
    value: groupValue,
    key: `${groupValue.from}-${groupValue.to}`,
  };
};

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
      intergatedGroupingColumnExtensions: [
        { columnName: 'name', criteria: nameGroupCriteria },
      ],
      tableGroupColumnExtension: [
        { columnName: 'name', showWhenGrouped: true },
      ],
      rows: generateRows({ length: 14 }),
      grouping: [{ columnName: 'name' }],
    };
  }
  render() {
    const {
      rows, columns, intergatedGroupingColumnExtensions, tableGroupColumnExtension, grouping,
    } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <GroupingState
          grouping={grouping}
          defaultExpandedGroups={['N-Z']}
        />
        <IntegratedGrouping
          columnExtensions={intergatedGroupingColumnExtensions}
        />
        <Table />
        <TableHeaderRow />
        <TableGroupRow
          columnExtensions={tableGroupColumnExtension}
          cellComponent={GroupCell}
        />
      </Grid>
    );
  }
}
