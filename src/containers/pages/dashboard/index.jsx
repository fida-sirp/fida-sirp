import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { DatePicker, Row } from 'antd';
import SetDocumentTitleHOC from '../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../HOCs/AuthTokenHOC';
import PageHeader from '../../layout/pageHeader';
import SPButton from '../../../components/SPButton'
import SPSelect from '../../../components/SPSelect'
import PlusIcon from '../../../assets/svgIcon/plusIcon';
import SPCog from '../../../components/SPCog';
import {
  getDashboardById,
  onDashboardWidgetsLayoutChange,
  onSaveSelectedWidget,
  onGetListOfDashboard,
  onSetDefaultDashboard,
  setDefaultDashbaord
} from '../../../actions/dashboard';
import GridLayout from './components/CreateDashboard/GridLayout';
import SpDateRangePicker from '../../../components/SPDateRangePicker'


const dashboardList = ({
  userProfile,
  selectedDashboard,
  onGetDashboardList,
  onGetDashboardById,
  defaultDashboard,
  setDefaultDashboard,
  onSelectSetDefaultKey
}) => {

  const history = useHistory();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState({
    start: "2010-07-15",
    end: "2010-07-15"
  });
  const [startDate, setstartDate] = useState(moment().toDate());
  const [endDate, setEndDate] = useState(moment().toDate());

  const [selectDefaultDashboard, setSelectDashboard] = useState('');
  const [dashboardList, setdashboardList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dashboardPayload, setDashboardPayload] = useState();
  const params = useParams()
  // const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';
  const currentDate = moment();
  const futureMonth = moment(currentDate).add(1, 'M');

  useEffect(() => {
    setSelectDashboard(prev => userProfile?.usr_das_default);
    const payload = handleDashboardPayload(userProfile?.usr_das_default);
    if (userProfile) {
      onGetDashboardById(payload, history, true);
    }
  }, [userProfile])

  useEffect(() => {
    const listData = defaultDashboard?.listData;
    const dashbordOptions = [];
    if (listData && Object.keys(listData).length !== 0) {
      for (const [key, value] of Object.entries(listData)) {
        dashbordOptions.push({
          key: parseInt(key, 10),
          value,
        });
      }
    }
    setdashboardList(dashbordOptions);
  }, [defaultDashboard]);


  useEffect(() => {
    onGetDashboardList()
  }, []);

  const handleDefaultDashboard = (key) => {
    const selected = dashboardList.find((item) => Number(key) === Number(item.key))
    onSelectSetDefaultKey(selected.key)
    const payload = handleDashboardPayload(selected.key)
    setDefaultDashboard(key, false, payload, history, true);
  }

  const handleDashboardPayload = (selectedDashboard) => {
    let payload;
    if (params?.id) {
      payload = {
        id: params.id,
        start: '2010-07-15',
        end: '2021-07-15',
        type: 'isView'
      }
    } else {
      if (selectedDashboard) {
        payload = {
          id: selectedDashboard,
          start: moment(startDate).format(dateFormat),
          end: moment(endDate).format(dateFormat),
          type: 'isView'
        };
      }
    }
    setDashboardPayload(prev => payload);
    setSelectDashboard(prev => selectedDashboard);
    return payload;
  }

  // useEffect(() => {
  //   if (!isOpen && selectedDate && selectedDate.start && selectedDate.end) {
  //     const payload = handleDashboardPayload(userProfile?.usr_das_default);
  //     if (userProfile) {
  //       onGetDashboardById(payload, history, true);
  //     }
  //   }
  // }, [selectedDate]);

  const onCalenderDateChange = (event, picker) => {
    setstartDate(picker.startDate._d.toISOString());
    setEndDate(picker.endDate._d.toISOString());
  }

  const onHandleCallbackAction = (start, end) => {
    const payload = {
      id: userProfile?.usr_das_default,
      start: moment(start).format(dateFormat),
      end: moment(end).format(dateFormat),
      type: 'isView'
    };
    onGetDashboardById(payload, history, true);
  }

  return (
    <div id="area">
      {!params.id && <SpDateRangePicker
        onChange={onCalenderDateChange}
        startDate={startDate}
        endDate={endDate}
        handleCallback={onHandleCallbackAction}
      />}
      {/* <RangePicker

        getPopupContainer={trigger => document.getElementById('area')}
        onChange={(date, dateString) => {
          setSelectedDate({
            start: dateString[0],
            end: dateString[1]
          })
        }}
        onOpenChange={(open) => setIsOpen(open)}
        onOk={() => alert("h")}
        style={{ background: '#373747' }}
        aria-selected={false}
        defaultValue={[moment(currentDate, dateFormat), moment(futureMonth, dateFormat)]}
        format={dateFormat}
      /> */}

      {params.id ? <PageHeader
        title={selectedDashboard?.listData?.das_name || ""}
        options={[
          <SPButton
            title="Dashboard List"
            size="small"
            onButtonClick={() => {
              history.push('/dashboard/list');
            }}
          />,
          <SPButton
            onButtonClick={() => {
              history.push(`/dashboard/edit/${params.id}`);
            }}
            title={"Edit Dashboard"}
            size="small"
            image={<PlusIcon />}
          />,
          <SPCog onClick={() => { }} />,
        ]}
      /> : <PageHeader
        title={selectedDashboard?.listData?.das_name || ""}
        options={[
          <SPButton
            title="Dashboard List"
            size="small"
            onButtonClick={() => {
              history.push('/dashboard/list');
            }}
          />,
          <SPButton
              onButtonClick={() => {
                history.push(`/dashboard/edit/${selectDefaultDashboard}`);
              }}
              title={"Edit Dashboard"}
              size="small"
              image={<PlusIcon />}
          />,
          <SPSelect
            title="Dashboards"
            items={dashboardList}
            selected={selectDefaultDashboard}
            isDiagram={true}
            width={250}
            onChange={e => {
              handleDefaultDashboard(e.key);
            }}
          />
        ]}
      />}
      <div className="dnd-container">
        <GridLayout
          isDraggable={false}
          isRearrangeable={false}
          isResizable={false}
          isDelete={false}
        />
      </div>
    </div >
  );
};

const mapStateToProps = state => ({
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
  selectedDashboard: state.dashboardStore?.selectedDashboard,
  selectedWidgets: state.dashboardStore.widgetLocalState.selectedWidgets,
  layoutData: state.dashboardStore.widgetLocalState.layoutData,
  defaultDashboard: state.dashboardStore.dashboardListGet
});

const mapDispatchToProps = dispatch => ({
  onGetDashboardById: (...args) => { dispatch(getDashboardById(...args)) },
  onSaveSelectedWidget: payload => dispatch(onSaveSelectedWidget(payload)),
  setDefaultDashboard: (...args) => dispatch(onSetDefaultDashboard(...args)),
  onDashboardWidgetsLayoutChange: payload =>
    dispatch(onDashboardWidgetsLayoutChange(payload)),
  onGetDashboardList: (...args) =>
    dispatch(onGetListOfDashboard(...args)),
  onSelectSetDefaultKey: (payload) => dispatch(setDefaultDashbaord(payload))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(dashboardList);
