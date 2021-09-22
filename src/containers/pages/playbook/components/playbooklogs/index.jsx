/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'antd';
import { compose } from 'redux';
import { connect,useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import {
  listPlayBookslogs,
  deletePlaybookLog,
} from '../../../../../actions/playbooks';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import PageHeader from '../../../../layout/pageHeader';
import { AlertBox } from '../../../cases/StyledComponents';

import SPCog from '../../../../../components/SPCog';
import SPSelect from '../../../../../components/SPSelect';
import SPSearch from '../../../../../components/SPSearch';
import SPTable from '../../../../../components/SPTable';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';
import View from '../../../../../assets/svgIcon/view';
import Dustbin from '../../../../../assets/svgIcon/dustbin';
import SPDrawer from '../../../../../components/SPDrawer';
import LogDetails from './logs';
import SPButton from '../../../../../components/SPButton';
import AuthTokenHOC from '../../../../../HOCs/AuthTokenHOC';

const showingFilter = [
  {
    key: '10',
    value: '10',
  },
  {
    key: '20',
    value: '20',
  },
  {
    key: '30',
    value: '30',
  },
  {
    key: '50',
    value: '50',
  },
];
function Playbooklogs({
  access,
}) {
 //const Playbooklogs = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.playbookStore);
  const playbooksLogslist = useSelector(state => state.playbookStore.logs);

  const [query, setQuery] = useState(location.search);
  const {
    plb_status = 'all',
    plb_showing = '20',
    plb_page_no = 1,
    plb_subject,
  } = queryString.parse(query);
  const [mypage, setMypage] = useState(1);
  const [playbookLogs, setPlaybookLogs] = useState([]);
  const [showing, setShowing] = useState('20');
  const [totalCount, setTotalCount] = useState(1);
  const [searchText, setSearchText] = useState(plb_subject);
  const [currentPage, setCurrentPage] = useState(parseInt(plb_page_no, 10));
  const [isopenSideDrawer, setisopenSideDrawer] = useState(false);

  useEffect(() => {
    const queryObject = {
      plb_subject: plb_subject,
      ...(plb_showing !== '20' && { plb_showing: plb_showing }),
      ...(plb_status !== 'all' && { plb_status: plb_status }),
      ...(plb_page_no !== 1 && { plb_page_no: plb_page_no }),
    };
    setMypage(plb_page_no);
    setShowing(plb_showing);
  }, [searchText, plb_showing,plb_status,plb_page_no]);
  const handleQuery = qs => {
    history.push('/playbooks-queue?' + qs);
    setQuery(qs);
  };

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };

  function setColumnsForSpecificNumber(number) {
    return [
      {
        title: '#',
        dataIndex: 'index',
        editable: false,
        render: (text, record, index) => (number - 1) * showing + index + 1,
      },
      {
        title: 'Playbook',
        width: 200,
        dataIndex: 'playbooks-queue',
        render: (text, record, index) => (
          <span
            className="cr-pointer"
            onClick={() =>
              history.push(`/playbook/update/${record.pbs_playbook_id}`)
            }
          >
            {record?.playbookName?.plb_name}
          </span>
        ),
      },
      {
        title: 'Container Name',
        dataIndex: 'playbooks-queue-container-name',
        width: 400,
        render: (text, record, index) => (
          <span
            className="cr-pointer"
            onClick={() =>
              history.push(
                `/incidentManagement/details/${record.pbs_incident_id}`
              )
            }
          >
            {record?.rkaScope?.adv_title
              ? record.rkaScope.adv_title
              : record?.rkaScope?.iti_subject
                ? record.rkaScope.iti_subject
                : ''}
          </span>
        ),
      },
      {
        title: 'Container Type',
        dataIndex: 'playbooks-queue-container-type',
        render: (text, record, index) => record?.pbs_type,
      },
      {
        title: 'Status',
        dataIndex: 'playbooks-queue-status',
        render: (text, record, index) => record?.plbStatus,
      },
      {
        title: 'Execution',
        dataIndex: 'playbooks-queue-execution',
        render: (text, record, index) =>
          record?.pbs_execution_time != null
            ? record?.pbs_execution_time
            : '(not set)',
      },
      {
        title: 'Scheduled',
        dataIndex: 'playbooks-queue-execution',
        render: (text, record, index) => record?.pbs_scheduled_at,
      },
      {
        title: 'Actions',
        dataIndex: 'playbooks-queue-actions',
        render: (text, record, index) => {
          return (
            <div
              style={{
                display: 'flex',
              }}
            >
              {record?.plbStatus === 'Executed' && (
                <React.Fragment>
                  {(access!==undefined && (access.includes("all-super-admin") ||  access.includes('delete-playbooks-queue'))) ? (
                  <a
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      showConfirm(record.pbs_id);
                    }}
                  >
                    <Dustbin />
                  </a>
                      ) : ""}
                  {(access!==undefined && (access.includes("all-super-admin") ||  access.includes('logs-playbooks-queue'))) ? (
                  <a
                    onClick={() => {
                      history.push(`/playbook-queue/${record.pbs_id}`);
                    }}
                  >
                    <View />
                  </a>
                    ) : ""}
                </React.Fragment>
              )}
            </div>
          );
        },
      },
    ];
  }

  const [columns, setColumns] = useState(setColumnsForSpecificNumber(1));
  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);

    if (parsedQuery) {
      const queryObject = {
        payload: {},
        PlaybooklogSearch: {},
        QueryString: '',
      };
      if (parsedQuery.plb_page_no) {
        queryObject.payload.page = parsedQuery.plb_page_no;
      }
      if (parsedQuery.plb_subject) {
        queryObject.PlaybooklogSearch.plb_subject = parsedQuery.plb_subject;
      }
      if (parsedQuery.plb_showing) {
        queryObject.payload['per-page'] = parsedQuery.plb_showing;
      }
      const playbooklogsearch = queryObject.PlaybooklogSearch;

      if (Object.keys(playbooklogsearch).length !== 0) {
        Object.entries(playbooklogsearch).forEach(([key, val]) => {
          myArrayQry += `&PlaybooksQueueSearch[search]=${val}` + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }
    return myArrayQry;
  }
  useEffect(() => {
    const myArrayQry = mapQueryWithApi(query);
    dispatch(listPlayBookslogs({ queryItem: myArrayQry }));
  }, [query]);

  useEffect(() => {
    if (Object.keys(playbooksLogslist).length !== 0) {
      setPlaybookLogs(playbooksLogslist.data.items);
      setTotalCount(playbooksLogslist.data._meta.totalCount);
      setCurrentPage(playbooksLogslist.data._meta.currentPage);
      setColumns(
        setColumnsForSpecificNumber(playbooksLogslist.data._meta.currentPage)
      );
    }
  }, [playbooksLogslist]);

  const onPageChange = pageNumber => {
    handleChange('plb_page_no', pageNumber);
    window.scrollTo(0, 0);
  };

  function showConfirm(id) {
    Modal.confirm({
      title: 'Are you sure you want to delete the Playbook-log?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(deletePlaybookLog(id, mypage));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  return (
    <div>
      <SPDrawer
        title="Playbook Logs"
        isVisible={isopenSideDrawer}
        onClose={() => setisopenSideDrawer(false)}
        drawerWidth={800}
      >
        <LogDetails />
      </SPDrawer>
      <PageHeader
        title="Playbooks Logs"
        options={[<SPCog onClick={() => { }} />]}
      />
      {error ? (
        <AlertBox message={error.message} type="error" closable />
      ) : null}
      <Row>

        <Col span="22" style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ marginRight: 10 }}>
            <SPSearch
              size="500px"
              onChange={e => {
                setSearchText(e.target.value);
              }}
              text={searchText}
              onEnter={e => {
                handleChange('plb_subject', searchText);
              }}
            />
          </div>
          <div >
            <SPSelect
              title="Showing"
              selected={plb_showing}
              items={showingFilter}
              onChange={e => {
                handleChange('plb_showing', e.key);
              }}
            />
          </div>
        </Col>
        <Col span={2}>
          <SPButton
            title="Back"
            size="small"
            onButtonClick={() => history.push('/playbooks')}
          />
        </Col>
      </Row>
      <div style={{ marginTop: 20 }}>
        <SPTable
          columns={columns}
          dataSource={playbookLogs}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          showingTill={plb_showing}
          currentShowing={
            currentPage === 1
              ? currentPage
              : (currentPage - 1) * plb_showing + 1
          }
          currentPage={currentPage}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    playbooksLogslist: state.playbookStore.logs,
    loading: state.playbookStore.loading,
    playbookStore: state.playbookStore,
    access :  state?.userStore?. userProfile?.data?.access
  };
};


export default compose(
  connect(mapStateToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Playbooklogs);
//export default SetDocumentTitleHOC(Playbooklogs);
