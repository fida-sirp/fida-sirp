import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useHistory, useLocation } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import queryString from 'query-string';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { CreateDashboardContainer } from './StyledComponents';
import AddWidget from './AddWidget';
import Header from './Header';

import GridLayout from './GridLayout';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../HOCs/AuthTokenHOC';
import {
  getDashboardById,
  onDashboardCreate,
  onDashboardUpdate,
  onDashboardWidgetsLayoutChange,
  onGetWidgetGroups,
  onGetwidgetList,
  onSaveSelectedWidget,
} from '../../../../../actions/dashboard';

function CreateDashboard({
  userProfile,
  selectedDashboard,
  onDashboardCreate,
  onDashboardUpdate,
  onSaveSelectedWidget,
  onGetDashboardById,
}) {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState(location.search);
  const { das_subject = '' } = queryString.parse(query);

  useEffect(() => {
    if (location.pathname.includes('edit')) {
      const dashboardId = location.pathname.split('/').pop();
      const payload = {
        id: dashboardId,
        start: '2010-07-15',
        end: '2021-07-15',
        type: 'isEdit',
        das_subject,
      };
      onGetDashboardById(payload, history, false);
    } else {
      onSaveSelectedWidget({});
    }
  }, []);


  const handleCreateDashboard = values => {
    if (!location.pathname.includes('edit')) {
      onDashboardCreate(values, history);
    } else {
      onDashboardUpdate(selectedDashboard.das_id, values);
    }
  };

  return (
    <CreateDashboardContainer>
      <Row>
        <Col span="18">
          <Header
            handleCreateDashboard={handleCreateDashboard}
            isEdit={location.pathname.includes('edit')}
            record={selectedDashboard}
            userProfile={userProfile}
          />
          <div className="dnd-container">
            {location.pathname.includes('edit') && (
              <GridLayout
                isDraggable={true}
                isRearrangeable={true}
                isResizable={true}
                isDelete={true}
                dashboardId={selectedDashboard?.das_id}
              />
            )}
          </div>
        </Col>
        <Col span="6">
          {location.pathname.includes('edit') &&
            <AddWidget />
          }
        </Col>
      </Row>
    </CreateDashboardContainer>
  );
}

const mapStateToProps = state => ({
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
  selectedDashboard: state.dashboardStore?.selectedDashboard?.listData,
  selectedWidgets: state.dashboardStore.widgetLocalState.selectedWidgets,
  layoutData: state.dashboardStore.widgetLocalState.layoutData,
  createdDashboard: state.dashboardStore.createdDashboard.data,
  singleDashboardRecord: state.dashboardStore.singleDashboardRecord.data,
});

const mapDispatchToProps = dispatch => ({
  onGetWidgetList: payload => dispatch(onGetwidgetList(payload)),
  onGetWidgetGroups: () => dispatch(onGetWidgetGroups()),
  onDashboardCreate: (payload, history) => dispatch(onDashboardCreate(payload, history)),
  onGetDashboardById: (...args) => dispatch(getDashboardById(...args)),
  onDashboardUpdate: (...args) => dispatch(onDashboardUpdate(...args)),
  onSaveSelectedWidget: payload => dispatch(onSaveSelectedWidget(payload)),
  onDashboardWidgetsLayoutChange: payload =>
    dispatch(onDashboardWidgetsLayoutChange(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(CreateDashboard);
