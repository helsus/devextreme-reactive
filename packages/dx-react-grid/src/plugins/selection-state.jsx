import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { setRowsSelection } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

export class SelectionState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selection: props.defaultSelection || [],
    };

    const stateHelper = createStateHelper(this);

    this.toggleSelection = stateHelper.applyFieldReducer
      .bind(stateHelper, 'selection', setRowsSelection);
  }
  getState() {
    return {
      ...this.state,
      selection: this.props.selection || this.state.selection,
    };
  }
  notifyStateChange(nextState, state) {
    const { selection } = nextState;
    const { onSelectionChange } = this.props;
    if (onSelectionChange && selection !== state.selection) {
      onSelectionChange(selection);
    }
  }
  render() {
    const { selection } = this.getState();

    return (
      <PluginContainer
        pluginName="SelectionState"
      >
        <Getter name="selection" value={new Set(selection)} />
        <Action name="toggleSelection" action={this.toggleSelection} />
      </PluginContainer>
    );
  }
}

SelectionState.propTypes = {
  selection: PropTypes.array,
  defaultSelection: PropTypes.array,
  onSelectionChange: PropTypes.func,
};

SelectionState.defaultProps = {
  selection: undefined,
  defaultSelection: undefined,
  onSelectionChange: undefined,
};
