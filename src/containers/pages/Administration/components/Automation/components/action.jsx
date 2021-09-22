import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Duplicate from '../../../../../../assets/svgIcon/duplicate';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import EyeIcon from '../../../../../../assets/svgIcon/eyeIcon';
import Setting from '../../../../../../assets/svgIcon/setting';
import { Shooticon } from '../../../../../../assets/svgIcon';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ViewModal from './viewAction'


import {
  automationActionsList,
  createAutomationActions,
  actionsType,
  actionsScriptType,
  actionsIoType,
  actionsApplication,
  duplicateAutomationAction,
  updateAutomationActions,
  deleteAutomationActions,
  actionOutputList,
  automationConfigurationData,
  automationConfigurationDataPost,
  automationViewScript
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import JsonEditor from './outputAction';
import PageHeader from '../../../../../layout/pageHeader';
import SPTable from '../../../../../../components/SPTable';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import SPModal from '../../../../../../components/SPModal';
import SPSearch from '../../../../../../components/SPSearch';
// import CreateApplicationForm from '../../../../../pages/Apps/components/create';
import CreateApplicationForm from './createApplicationForm';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import SpCodeMirror from '../../../../../../components/SPcodeMirror';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import ActionFormDrawer from './actionForm';
import { Modal } from 'antd'
import { createApplicationRequested, getPubliserListRequested, getRateLimitRequested, getTypeListRequested, getVendorListRequested } from '../../../../../../actions/apps';
const { confirm } = Modal;
import ActionConfigurationForm from './actionConfigurationForm'

export const AppLogoWrapper = styled.div`
  width: 300px;
  height: 100px;

  img {
      max-width: 300px;
      max-height: 100px;
      margin: auto;
    }
`;

const Action = ({
  getList,
  publishersList,
  updateList,
  deleteList,
  createList,
  actionsType,
  actionsScriptType,
  actionsIoType,
  actionsApplication,
  actionsTypeList,
  actionsScriptList,
  actionsIOTypeList,
  actionsApplicationList,
  actionsApplicationDuplicate,
  userProfile,
  getVendorListRequested,
  appPublishersList,
  getPubliserListRequested,
  getTypeListRequested,
  getRateLimitRequested,
  appRateList,
  appTypesList,
  appVenderList,
  createApplicationRequested,
  getOutputData,
  getConfigurationData,
  postConfigurationData,
  getViewScript,
  access
}) => {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [record, setRecord] = useState({});
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(location.search);
  const [type, setType] = useState([]);
  const [scriptType, setScriptType] = useState([]);
  const [showOutputActionModal, setOutputActionModal] = useState(false)
  const [ioType, setIoType] = useState([]);
  const [application, setApplication] = useState([]);
  const [showCreateApplicationForm, setShowCreateApplicationForm] = useState(false)
  const [appUpdatedVendorsList, setAppUpdatedVendorsList] = useState();
  const [appUpdatedPublishersList, setAppUpdatedPublishersList] = useState();
  const [isView, setIsView] = useState(false)
  const [showCofigurationDrawer, setShowCofigurationDrawer] = useState(false)
  const [viewScriptModal, setViewScriptModal] = useState(false);
  const [appUpdatedTypeList, setAppUpdatedTypeList] = useState();
  const [appupdatedRateList, setAppUpdatedRateList] = useState()
  const { path } = useParams();


  const {
    aio_showing = '20',
    aio_page_no = 1,
    aio_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(aio_showing);
  const [searchText, setSearchText] = useState(aio_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useEffect(() => {
    actionsType();
    actionsScriptType();
    actionsIoType();
    actionsApplication();
    getVendorListRequested();
    getPubliserListRequested();
    getTypeListRequested();
    getRateLimitRequested();
  }, []);

  useEffect(() => {
    if (appVenderList?.listData?.data || appPublishersList?.listData?.data) {
      let appUpdatedVendorsList = [];
      let appUpdatedPublishersList = [];
      let appUpdatedTypeList = [];
      let appupdatedRateList = [];
      if (appVenderList?.listData?.data) {
        Object.entries(appVenderList?.listData?.data).map(
          ([key, value], index) => {
            appUpdatedVendorsList.push({ key: key, value: key, label: value });
          }
        );
        setAppUpdatedVendorsList(appUpdatedVendorsList);
      }
      if (appPublishersList?.listData?.data) {
        Object.entries(appPublishersList?.listData?.data).map(
          ([key, value], index) => {
            appUpdatedPublishersList.push({
              key: key,
              value: key,
              label: value,
            });
          }
        );
        setAppUpdatedPublishersList(appUpdatedPublishersList);
      }
      if (appTypesList?.listData?.data) {
        Object.entries(appTypesList?.listData?.data[0]).map(
          ([key, value], index) => {
            appUpdatedTypeList.push({ key: value, value: value, label: value });
          }
        );
        setAppUpdatedTypeList(appUpdatedTypeList);
      }
      if (appRateList?.listData?.data) {
        Object.entries(appRateList?.listData?.data[0]).map(
          ([key, value], index) => {
            appupdatedRateList.push({ key: value, value: value, label: value });
          }
        );
        setAppUpdatedRateList(appupdatedRateList);
      }
    }
  }, [
    appVenderList?.listData?.data &&
    appPublishersList?.listData?.data &&
    appTypesList?.listData?.data &&
    appRateList?.listData?.data,
  ]);

  useEffect(() => {
    if (!isEmpty(actionsTypeList)) {
      let arr = []
      Object.keys(actionsTypeList[0]).map(key =>
        arr.push({
          key: key,
          value: key,
          label: actionsTypeList[0][key],
        })
      );
      setType(arr);
    }
    if (!isEmpty(actionsScriptList)) {
      let arr = [];
      Object.keys(actionsScriptList[0]).map(key =>
        arr.push({
          key: key,
          value: key,
          label: actionsScriptList[0][key],
        })
      );
      setScriptType(arr);
    }
    if (!isEmpty(actionsIOTypeList)) {
      let arr = [];
      Object.keys(actionsIOTypeList).map(key =>
        arr.push({
          key: key,
          value: key,
          label: actionsIOTypeList[key],
        })
      );
      setIoType(arr);
    }
    if (!isEmpty(actionsApplicationList)) {
      let arr = [];
      Object.keys(actionsApplicationList).map(key =>
        arr.push({
          key: key,
          value: key,
          label: actionsApplicationList[key],
        })
      );
      setApplication(arr);
    }
  }, [
    actionsTypeList,
    actionsScriptList,
    actionsIOTypeList,
    actionsApplicationList,
  ]);
  useEffect(() => {
    getPublisherList();
  }, [query] || []);

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
      key: '40',
      value: '40',
    },
    {
      key: '50',
      value: '50',
    },
  ];

  useEffect(() => {
    if (publishersList?.listData?._meta) {
      setTotalCount(publishersList.listData._meta.totalCount);
      setCurrentPage(publishersList.listData._meta.currentPage);
    }
  }, [publishersList]);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want this?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myQuery = mapQueryWithApi(query);
        deleteList({ id: key, myQuery });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);
  const columns = [
    {
      title: 'Actions',
      dataIndex: 'act_id',
      editable: false,
      key: (text, record, index) => record?.act_id,
      render: (text, record, index) => record?.act_name,
    },
    {
      title: '',
      dataIndex: '',
      editable: false,
      key: (text, record, index) => record?.act_id,
      render: (text, record, index) => !publishersList?.loading && <AppLogoWrapper><img src={record?.actApp?.image?.link} alt="" /></AppLogoWrapper>
    },
    {
      title: 'Actions',
      dataIndex: 'act_actions',
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-application-actions"))){
          const updateApplicationActions= {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setOpenDrawer(true)
              setIsCreate(false)
              if (record) {
                setRecord(record)
              }
            },
          };
          moreItems.push(updateApplicationActions);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("filter-application-actions"))){
          const filterApplicationActions= {
            key: 'filter',
            label: 'Filter',
            icon: <Shooticon />,
            onClickItem: () => {
              if (record) {
                setRecord(record)
              }
              getOutputData(record?.act_id)
              setIsView(true)
              setOutputActionModal(true)
            },
          };
          moreItems.push(filterApplicationActions);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-application-actions"))){
          const deleteApplicationActions=  {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.act_id)
          };
          moreItems.push(deleteApplicationActions);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("view-application-actions"))){
          const viewApplicationActions= {
            key: 'view',
            label: 'View',
            icon: <EyeIcon />,
            onClickItem: () => {
              setViewScriptModal(true)
              getViewScript(record?.act_id)
              setIsView(false)
            },
          };
          moreItems.push(viewApplicationActions);
        }

        if(access!==undefined && (access.includes("all-super-admin") || access.includes("duplicate-application-actions"))){
          const duplicateApplicationActions=  {
            key: 'duplicate',
            label: 'Duplicate',
            icon: <Duplicate />,
            onClickItem: () => {
              const myQuery = mapQueryWithApi(query);
              actionsApplicationDuplicate(record?.act_id, myQuery);
            },
          };
          moreItems.push(duplicateApplicationActions);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("config-application-actions")) && record?.act_is_multiinput === "True" ){
          const configureApplicationActions=  {

              key: 'configure',
              label: 'Configure',
              icon: <Setting />,
              onClickItem: () => {
                setRecord(record)
                setShowCofigurationDrawer(true)
                getConfigurationData(record?.act_id)
              },
          };
          moreItems.push(configureApplicationActions);
        }

      if (userProfile?.usr_api_organization === record?.act_organization && moreItems.length !== 0) {
        return (
            <SPSingleSelectDropdown
                items={moreItems}
                onSelect={() => {
                }}
                title="more"
            />
        );
      }
      },
    },
  ];

  const getPublisherList = async () => {
    const myArrayQry = mapQueryWithApi(query);
    await getList({ queryItem: myArrayQry, path });
  };

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        applicationCategorySearch: {},
        QueryString: '',
      };
      if (parsedQuery.aio_page_no) {
        queryObject.payload.page = parsedQuery.aio_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.aio_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.aio_subject;
      }
      if (parsedQuery.aio_showing) {
        queryObject.payload['per-page'] = parsedQuery.aio_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry +=
            'ApplicationActionsSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }
    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'ApplicationActionsSearch[search]=' + searchText;
    }
    return myArrayQry;
  }

  const onPageChange = pageNumber => {
    handleChange('aio_page_no', pageNumber);
    window.scrollTo(0, 0);
  };

  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      if (value === 'all') {
        obj[name] = '';
      } else {
        obj[name] = value;
      }
      delete obj['active_tab'];
      const str = queryString.stringify(obj);
      if (name == 'aio_showing') {
        setShowing(value);
      }
      handleQuery(str);
    }
  };

  const handleQuery = qs => {
    if (activeOption !== 'all') {
      history.push(
        '/administration?active_tab=automation&&' + activeOption + '?' + qs
      );
    } else {
      history.push('/administration?active_tab=automation&&' + qs);
    }
    setQuery(qs);
  };

  const handleSubmit = async values => {
    const myQuery = mapQueryWithApi(query);
    if (!isCreate) {
      updateList({ payload: values, id: record?.act_id, query: myQuery });
    } else {
      createList({ payload: values, query: myQuery });
    }
    setOpenDrawer(false);
    setRecord({});
  };
  const handleApplicationCreate = (values) => {
    createApplicationRequested(values)
    setShowCreateApplicationForm(false)
  }

  const handleConfigureData = (values) => {
    const myQuery = mapQueryWithApi(query);
    if (values) {
      postConfigurationData(record?.act_id, values, myQuery)
    }
    setShowCofigurationDrawer(false)
  }


  return (
    <>
      <SPDrawer
        title={'Configure Additional Inputs'}
        isVisible={showCofigurationDrawer}
        onClose={() => setShowCofigurationDrawer(false)}
      >
        <ActionConfigurationForm
          submit={handleConfigureData}
          isVisible={showCofigurationDrawer}
          onCloseDrawer={() => setShowCofigurationDrawer(false)}
        />
      </SPDrawer>
      <SPModal
        title="Output Action"
        visible={showOutputActionModal}
        onOk={() => console.log('Open')}
        onCancel={() => setOutputActionModal(false)}
        width={950}
        footer={null}
      >
        <JsonEditor listValue={record} isView={isView} />
      </SPModal>
      <SPModal
        maskClosable={true}
        title="View Action"
        visible={viewScriptModal}
        onOk={() => console.log('Open')}
        onCancel={() => setViewScriptModal(false)}
        width={950}
        footer={null}
      >
        <ViewModal />
      </SPModal>
      <PageHeader
        title={'Actions'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-applications"))) &&
          <SPButton
            title="Create Application"
            onButtonClick={() => {
              setShowCreateApplicationForm(true)
            }}
            size="small"
          // image={<PlusIcon />}
          />,
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-application-actions"))) &&
          <SPButton
            title="Create Actions"
            onButtonClick={() => {
              setRecord({})
              setIsCreate(true);
              setOpenDrawer(true);
            }}
            size="small"
            image={<PlusIcon />}
          />
        ]}
      />
      <Row
        gutter={[19, 10]}
        style={{
          marginTop: 23,
          marginBottom: 13,
          flexWrap: 'flex',
        }}
      >
        <Col>
          <SPSearch
            text={searchText}
            onChange={e => {
              setSearchText(e.target.value);
            }}
            placeholder="Search.."
            onEnter={() => {
              handleChange('aio_subject', searchText);
            }}
            size="420px"
          />
        </Col>
        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={aio_showing}
            onChange={e => {
              handleChange('aio_showing', e.key);
            }}
          />
        </Col>
      </Row>
      <SPTable
        columns={columns}
        dataSource={publishersList?.listData?.items}
        onPageChange={onPageChange}
        canPaginate
        emptyText="No Data"
        totalRecords={totalCount}
        showingTill={showing}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * showing + 1
        }
        currentPage={currentPage}
        isLoading={publishersList?.loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Action`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <ActionFormDrawer
          isVisible={openDrawer}
          isCreate={isCreate}
          recordValue={record}
          submit={handleSubmit}
          closeDrawer={() => setOpenDrawer(false)}
          type={type}
          scriptType={scriptType}
          ioType={ioType}
          application={application}
        />
      </SPDrawer>

      <SPDrawer
        title={`Create Application`}
        isVisible={showCreateApplicationForm}
        onClose={() => setShowCreateApplicationForm(false)}
      >
        <CreateApplicationForm
          isVisible={showCreateApplicationForm}
          createApplication={handleApplicationCreate}
          onCloseDrawer={() => setShowCreateApplicationForm(false)}
          appPublishersList={appUpdatedPublishersList}
          appRateList={appupdatedRateList}
          appTypesList={appUpdatedTypeList}
          appVenderList={appUpdatedVendorsList}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
  publishersList: state.administration.automation,
  actionsTypeList: state.administration.automation.actionsTypeList,
  actionsScriptList: state.administration.automation.actionsScriptList,
  actionsIOTypeList: state.administration.automation.actionsIOTypeList,
  actionsApplicationList:
    state.administration.automation.actionsApplicationList,
  appPublishersList: state.appPublishersList,
  appRateList: state.appRateList,
  appTypesList: state.appTypesList,
  appVenderList: state.appVenderList,
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(automationActionsList(payload)),
  updateList: payload => dispatch(updateAutomationActions(payload)),
  deleteList: payload => dispatch(deleteAutomationActions(payload)),
  createList: payload => dispatch(createAutomationActions(payload)),
  actionsType: payload => dispatch(actionsType(payload)),
  createApplicationRequested: data =>
    dispatch(createApplicationRequested(data)),
  actionsScriptType: payload => dispatch(actionsScriptType(payload)),
  actionsIoType: payload => dispatch(actionsIoType(payload)),
  actionsApplication: payload => dispatch(actionsApplication(payload)),
  actionsApplicationDuplicate: (...args) => dispatch(duplicateAutomationAction(...args)),
  getVendorListRequested: () => dispatch(getVendorListRequested()),
  getPubliserListRequested: () => dispatch(getPubliserListRequested()),
  getTypeListRequested: () => dispatch(getTypeListRequested()),
  getRateLimitRequested: () => dispatch(getRateLimitRequested()),
  getConfigurationData: (...args) => dispatch(automationConfigurationData(...args)),
  getOutputData: (payload) => dispatch(actionOutputList(payload)),
  postConfigurationData: (...args) => dispatch(automationConfigurationDataPost(...args)),
  getViewScript: (...args) => dispatch(automationViewScript(...args))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Action);
