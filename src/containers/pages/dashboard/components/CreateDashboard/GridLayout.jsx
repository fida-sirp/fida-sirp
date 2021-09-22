import moment from 'moment';
import { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { connect } from 'react-redux';
import { compose } from 'redux';

import AuthTokenHOC from '../../../../../HOCs/AuthTokenHOC';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';
import GridItemContainer from './GridItemContainer';
import {
  onDashboardWidgetsLayoutChange,
  onGetDashboardWidgetData,
  dashboardWidgetDelete,
  dashboardWidgetUpdate,
} from '../../../../../actions/dashboard';
import { PureComponent } from 'react';

const ResponsiveGridLayout = WidthProvider(Responsive);

class GridLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      breakpoint: '',
      cols: '',
      currentLayout: {},
      updateWidgetData: {},
      allLayout: {},
      widgetData: {},
      data: {},
      isLayoutChanged: false,
      layout: [],
      widgets: [],
      style: { minHeight: '100vh', height: '100%', overflowX:'hidden' },
    };
  }

  handleBreakPointChange = (breakpoint, cols) => {
    this.setState(prev => {
      return { breakpoint, cols };
    });
  };

  onDrop = (layout, layoutItem, _event) => {
    _event.preventDefault();
    const widgetData = JSON.parse(_event.dataTransfer.getData('text'));
    this.setState({ widgetData });
    const currentLayout = [...layout];
    currentLayout[currentLayout.length - 1].i = String(widgetData.id);
    currentLayout[currentLayout.length - 1].w = 12;
    currentLayout[currentLayout.length - 1].h = 2;
    // currentLayout[currentLayout.length - 1]['isLastEdited'] = true;
    const newLayout = this.getUpdatedLaout(currentLayout);
    this.setState(prev => {
      return {
        isLayoutChanged: false,
      };
    });

    this.props.onDashboardWidgetsLayoutChange(currentLayout);

    const start = moment('2010-07-15').startOf('year').format('YYYY-MM-DD');
    const end = moment('2021-07-15').endOf('year').format('YYYY-MM-DD');

    const payload = {
      start,
      end,
      dataPath: widgetData.dataPath,
      id: Number(widgetData.id),
      type: widgetData.type,
      allLayout: { post: newLayout },
      layoutData: currentLayout[currentLayout.length - 1],
      das_id: Number(widgetData.das_id),
      title: widgetData.title,
    };

    this.props.onGetDashboardWidgetData(payload);
  };

  getUpdatedLaout(currentLayout) {
    const layout = [];
    for (const el of currentLayout) {
      layout.push({
        das_id: this.props.dashboardId,
        gsu_graph_id: parseInt(el?.i),
        gsu_layout_data: JSON.stringify(el),
      });
    }
    return layout;
  }

  layoutChangeHandler = (widgetsewLayout, singleWidgetLayout) => {
    const layout = this.getUpdatedLaout(widgetsewLayout);
    this.props.onUpdateWidgetsLayout({ post: layout });
    this.props.onDashboardWidgetsLayoutChange(widgetsewLayout);
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedWidgets &&
      nextProps.selectedWidgets !== this.props.selectedWidgets
    ) {
      console.log(
        '<<<<<<<<<<<<<< componentWillReceiveProps',
        nextProps.layoutData
      );
      this.setState(prev => {
        return {
          data: nextProps.selectedWidgets,
          layout: nextProps.layoutData,
          widgets: Object.keys(nextProps.selectedWidgets),
          isLayoutChanged: false,
        };
      });
    }
  }

  handleDelete = payload => {
    this.props.onDashboardWidgetDelete(payload);
    this.setState(prev => {
      return {
        isLayoutChanged: true,
      };
    });
  };

  // componentDidMount(){
  //   if(!this.props.isDraggable){
  //     this.setState({style: {...this.state.style, hieght: '100%'}});
  //   }
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('>>>>>>>>>> Component Should update', this.props);
  //   return (
  //     nextProps.selectedWidgets &&
  //     nextProps.selectedWidgets !== this.props.selectedWidgets
  //   );
  // }

  generateDOM() {
    return _.map(this.state.widgets, (item, i) => {
      return (
        <GridItemContainer
          deleteWidget={this.deleteWidget}
          type={item}
          handleDelete={this.handleDelete}
          key={item}
          count={this.state.widgets.length}
          item={item}
          data={this.state.data[item]}
          isDelete={this.props.isDelete}
        />
      );
    });
  }

  render() {
    const { isDraggable, isRearrangeable, isResizable } = this.props;
    //  debugger
    return (
      <ResponsiveGridLayout
        layouts={{ lg: this.state.layout }}
        onBreakpointChange={this.handleBreakPointChange}
        isDraggable={isDraggable}
        isRearrangeable={isRearrangeable}
        onDragStop={this.layoutChangeHandler}
        onResizeStop={this.layoutChangeHandler}
        isResizable={isResizable}
        style={isResizable ? this.state.style : { minHeight: '100vh' }}
        resizeHandles={['s', 'e']}
        onDrop={this.onDrop}
        isDroppable={true}
        onLayoutChange={(allWidgetsLayout, layout) => {
          if (this.state.isLayoutChanged) {
            this.setState({ layout: allWidgetsLayout, isLayoutChanged: false });
          }
        }}
        draggableHandle=".grid-item"
        breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 6, xxs: 2 }}
        // useCSSTransforms={false}
      >
        {this.generateDOM()}
      </ResponsiveGridLayout>
    );
  }
}

const mapStateToProps = state => ({
  selectedWidgets: state.dashboardStore.widgetLocalState.selectedWidgets,
  layoutData: state.dashboardStore.widgetLocalState.layoutData,
});

const mapDispatchToProps = dispatch => ({
  onDashboardWidgetDelete: payload => dispatch(dashboardWidgetDelete(payload)),
  onDashboardWidgetsLayoutChange: payload =>
    dispatch(onDashboardWidgetsLayoutChange(payload)),
  onGetDashboardWidgetData: payload =>
    dispatch(onGetDashboardWidgetData(payload)),
  onUpdateWidgetsLayout: payload => dispatch(dashboardWidgetUpdate(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(GridLayout);
