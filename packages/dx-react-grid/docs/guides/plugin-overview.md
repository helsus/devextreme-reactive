# React Grid - Plugin Overview

The plugins that provide all the Grid's functionality can be divided into four groups:

- **State Management plugins** control a part of the Grid's state internally or provide properties for external state management (see [controlled and uncontrolled modes](controlled-and-uncontrolled-modes.md)).
- **Data Processing plugins** transform data passed to the Grid component before rendering.
- **UI plugins** render the transformed data using the current state and configuration. UI plugins can also invoke actions that state management plugins provide to change the Grid's state. In some cases, UI plugins can control a part of the Grid state by themselves (instead of State Management plugins).
- **Core plugins** are the base building blocks for the first three groups. These plugins can also be used separately in certain scenarios.

Note that the plugins are composable and can be nested into each other.

Refer to the [Reference](../reference/grid.md) to see the complete plugin list.

## <a name="plugin-order">Plugin Order

The plugin order is important. Plugins implementing an interface should be linked before the plugin that uses it. For example, a data processing plugin is based on some state, and should follow the appropriate state plugin:

```js
import {
  FilteringState, IntegratedFiltering
} from '@devexpress/dx-react-grid'
import {
  Grid, Table
} from '@devexpress/dx-react-grid-bootstrap3'/* or '@devexpress/dx-react-grid-material-ui' */;

const App = () => (
  <Grid rows={[/* ... */]} columns={[/* ... */]}>
    <FilteringState defaultFilters={[/* ... */]}/>
    <IntegratedFiltering/>
    <Table/>
  </Grid>
);
```

Some visualization plugins extend the `Table`'s functionality, and should follow it in the code as demonstrated in the following example:

```js
import {
  FilteringState, IntegratedFiltering
} from '@devexpress/dx-react-grid'
import {
  Grid, Table, TableFilterRow
} from '@devexpress/dx-react-grid-bootstrap3'/* or '@devexpress/dx-react-grid-material-ui' */;

const App = () => (
  <Grid rows={[/* ... */]} columns={[/* ... */]}>
    <FilteringState defaultFilters={[/* ... */]}/>
    <IntegratedFiltering/>
    <Table/>
    <TableFilterRow/>
  </Grid>
);
```

NOTE: Refer to the plugin's reference for information on its dependencies.

The data processing plugins' order is also important because they transform data in the same order they appear. For example, if the `IntegratedPaging` plugin precedes the `IntegratedFiltering`, the Grid filters the current page's data. Swap the plugins to paginate filtered data.

## UI Plugins

The Grid's UI plugins use templates to render the UI. A template is a function that returns a [ReactElement](https://facebook.github.io/react/docs/react-api.html#createelement) depending on the argument values. You can implement your templates or use one of the predefined template suites:

- [DevExtreme React Grid for Bootstrap 3](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-grid-bootstrap3/) - renders the Grid's UI elements based on the [Bootstrap 3](http://getbootstrap.com/) components
- [DevExtreme React Grid for Material UI](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-grid-material-ui) - renders the Grid's UI elements based on the [Material UI](http://www.material-ui.com) components
