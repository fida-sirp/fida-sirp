import GridItems from './GridItems';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useMemo } from 'react';


const GridItemContainer = ({
  data,
  type,
  children,
  layoutData,
  handleDelete,
  onDashboardWidgetDelete,
  isDelete,
  ...props
}) => {
  const showConfirm = key => {
    confirm({
      title: 'Are you sure you want to delete the widget?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        deleteWidget(key);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const newChildren =  useMemo(() => {
    return new Array(props.style.width).fill(undefined).map((val, idx) => {
      return children;
    });
  }, [props.style.width, props.style.width]);

  const deleteWidget = key => {
    const filterLayouts = layoutData.filter(item => item.i !== key);
    const payload = {
      widgetId: key,
      dashboardWidgetId: data?.dashboardWidgetId,
      layoutData: filterLayouts
    }
    handleDelete(payload);
  };

  return (
    <GridItems data={data} {...props} item={props.item}>
      {/* <Card> */}
      {isDelete &&
        <div className="remove-widget-icon" onClick={() => showConfirm(type)}>
          <CloseOutlined />
        </div>
      }
      {newChildren}
      {/* </Card> */}
    </GridItems>
  );
};

const mapStateToProps = state => ({
  layoutData: state.dashboardStore.widgetLocalState.layoutData,
});

const mapDispatchToProps = dispatch => ({

});

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  GridItemContainer
);
