import React from 'react';
import PropTypes from 'prop-types';

export const TableContainer = ({ children, ...restProps }) => (
  <div
    className="table-responsive"
    {...restProps}
    style={{
      ...restProps.style,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
    }}
  >
    {children}
  </div>
);

TableContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
