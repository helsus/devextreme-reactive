import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_GROUP_TYPE } from './constants';
import { GROUP_ADD_MODE, GROUP_REMOVE_MODE } from '../grouping-state/constants';

const isGroupingChange = columnDraftGrouping => columnDraftGrouping.draft === GROUP_REMOVE_MODE
  || columnDraftGrouping.draft === GROUP_ADD_MODE;

const tableColumnsWithDraftGrouping = (tableColumns, draftGrouping, showColumnWhenGrouped) =>
  tableColumns
    .reduce((acc, tableColumn) => {
      const isDataColumn = tableColumn.type === TABLE_DATA_TYPE;
      const tableColumnName = isDataColumn ? tableColumn.column.name : '';
      const columnDraftGrouping = draftGrouping
        .find(grouping => grouping.columnName === tableColumnName);

      if (!columnDraftGrouping || showColumnWhenGrouped(tableColumnName)) {
        return [...acc, tableColumn];
      } else if (isGroupingChange(columnDraftGrouping)) {
        return [...acc, {
          ...tableColumn,
          draft: true,
        }];
      }
      return acc;
    }, []);

export const tableColumnsWithGrouping = (
  columns,
  tableColumns,
  grouping,
  draftGrouping,
  indentColumnWidth,
  showColumnWhenGrouped,
) => [
  ...grouping.map((columnGrouping) => {
    const groupedColumn = columns.find(column => column.name === columnGrouping.columnName);
    return {
      key: `${TABLE_GROUP_TYPE}_${groupedColumn.name}`,
      type: TABLE_GROUP_TYPE,
      column: groupedColumn,
      width: indentColumnWidth,
    };
  }),
  ...tableColumnsWithDraftGrouping(tableColumns, draftGrouping, showColumnWhenGrouped),
];

export const tableRowsWithGrouping = (tableRows, isGroupRow) =>
  tableRows.map((tableRow) => {
    if (tableRow.type !== TABLE_DATA_TYPE || !isGroupRow(tableRow.row)) {
      return tableRow;
    }
    return {
      ...tableRow,
      key: `${TABLE_GROUP_TYPE}_${tableRow.row.compoundKey}`,
      type: TABLE_GROUP_TYPE,
      colSpanStart: `${TABLE_GROUP_TYPE}_${tableRow.row.groupedBy}`,
    };
  });
