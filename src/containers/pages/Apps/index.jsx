import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { Row, Col, Image } from 'antd';
import { connect } from 'react-redux';
import { ApplicationDetailsWrapper, StyledDiv, AppLogoWrapper, DeleteBox } from './StyledComponents';
import ConfigDrawer from './components/ConfigDrawer'
import {
  checkIsMultiConfigRequested,
  getAppsDetailsRequested,
  getConfigurationDetailsRequested,
  getConfigurationFieldsDetailsRequested,
  getPubliserListRequested,
  getRateLimitRequested,
  getTypeListRequested,
  getVendorListRequested,
  updateApplicationDetailsRequested,
  updateApplicationStatusRequested,
  updateConfigDetailsRequested,
  createApplicationRequested,
  updateMultiConfigDetailsRequested,
  deleteApplication,
  updateApplicationRequested,
  getAppsActionDetails,
  getAppsWorkflowDetails,
  updateWorkFlowDetails,
  updateAppToggle,
  getAppsConfig,
  addConfig,
} from '../../../actions/apps';
import AppAction from './Action';
import { SModal } from '../assets/components/TemplateModal/StyledComponents';
import queryString from 'query-string';
import SetDocumentTitleHOC from '../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../HOCs/AuthTokenHOC';
import SPSearch from '../../../components/SPSearch';
import SPSelect from '../../../components/SPSelect';
import SPTable from '../../../components/SPTable';
import SPToggleSwitch from '../../../components/SPToggleSwitch';
import SettingIcon from '../../../assets/svgIcon/setting/index';
import PageHeader from '../../layout/pageHeader';
import SPDrawer from '../../../components/SPDrawer';
import ConfigurationDrawer from './components/ConfigurationDrawer';
import EditVendorModal from './components/EditVendorModal';
import SPButton from '../../../components/SPButton';
import Create from './components/create';
import 'antd/dist/antd.css';
import packageJson from '../../../../package.json';
import { Modal } from 'antd'
import Pencil from '../../../assets/svgIcon/pencil';
import Dustbin from '../../../assets/svgIcon/dustbin';
import SPRiskTag from '../../../components/SPRiskTag';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const statusFilter = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'enable',
    value: 'Enable',
  },
  {
    key: 'disable',
    value: 'Disable',
  },
];



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

function Apps({
  appsDetails,
  getAppsDetailsRequested,
  updateApplicationDetailsRequested,
  updateApplicationStatusRequested,
  getConfigurationDetailsRequested,
  appsConfigurationDetails,
  getConfigurationFieldsDetailsRequested,
  appConfigurationFieldsData,
  updateConfigDetailsRequested,
  appConfigurationUpdateDetails,
  checkIsMultiConfigRequested,
  appsCheckIsMultiConfig,
  getVendorListRequested,
  getPubliserListRequested,
  getTypeListRequested,
  getRateLimitRequested,
  appPublishersList,
  appRateList,
  appTypesList,
  appVenderList,
  createApplicationRequested,
  integrateModalData,
  updateMultiConfigDetailsRequested,
  profile,
  deleteApplication,
  updateApplicationRequested,
  getAppsDetails,
  actionsList,
  getWorkFlow,
  workFlowDetails,
  updateWorkFlow,
  updateAppToggle,
  actionsEditList,
  getConfig,
  onAddConfig
}) {
  const history = useHistory();
  const [query, setQuery] = useState(location.search);
  const [selectedVendorId, setSelectedVendorId] = useState();
  const [mypage, setMypage] = useState(1);
  const [showing, setShowing] = useState('10');
  const [originData, setOriginData] = useState([]);
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfigurationDrawer, setShowConfigurationDrawer] = useState(false);
  const [drawerName, setDrawerName] = useState('');
  const [saveClicked, setSaveClicked] = useState(false);
  const [isEnableApiCall, setIsEnableApiCall] = useState(false);
  const [showInputModalPopup, setShowInputModalPopup] = useState(false);
  const [isApplicationUpdate, setIsApplicationUpdate] = useState(false);
  const [selectedDisabledVendorName, setSelectedDisabledVendorName] = useState(
    ''
  );
  const [appUpdatedVendorsList, setAppUpdatedVendorsList] = useState();
  const [appUpdatedPublishersList, setAppUpdatedPublishersList] = useState();
  const [appUpdatedTypeList, setAppUpdatedTypeList] = useState();
  const [appupdatedRateList, setAppUpdatedRateList] = useState();
  const [isMultiConfig, setIsMultiConfig] = useState('');
  const [updatedVendorsFields, setupdatedVendorsFields] = useState();
  const [recordInfo, setRecordInfo] = useState({});
  const [updatedVendorsFieldsData, setupdatedVendorsFieldsData] = useState();
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [showActionDrawer, setShowActionDrawer] = useState(false);
  const [applicationDetails, setApplicationDetails] = useState([]);
  const [actionId, setActionId] = useState('');
  const [actionDetails, setActionDetails] = useState([]);
  const [actionListData, setActionListData] = useState([])
  const [showAppConfigDrawer, setShowAppConfigDrawer] = useState(false);
  const [showConfigDrawer, setshowConfigDrawer] = useState(false);
  const [record, setRecord] = useState({});
  const [changeRoute, setRoute] = useState(false);

  const { path } = useParams();


  const {
    app_status = 'all',
    app_showing = '20',
    app_page_no = 1,
    app_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [searchText, setSearchText] = useState(app_subject);
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );
  useEffect(() => {
    setActionListData(actionsList)
    setActionDetails(actionsList?.items);
  }, [actionsList]);

  useEffect(() => {
    getVendorListRequested();
    getPubliserListRequested();
    getTypeListRequested();
    getRateLimitRequested();
    getWorkFlow();
  }, []);

  function showConfirm(key) {
    Modal.confirm({
      title: 'Are you sure you want to delete this App?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      className: 'test',
      onOk() {
        const myQuery = mapQueryWithApi(query)
        deleteApplication({ id: key, query: myQuery });
      },
      onCancel() { },
    });
  }
  useEffect(() => {
    if (appsCheckIsMultiConfig?.listData?.data && isEnableApiCall) {
      if (
        appsCheckIsMultiConfig?.listData?.data?.app_multi_config_allowed ===
        'false'
      ) {
        setIsMultiConfig('false');
        getConfigurationFieldsDetailsRequested({
          id: selectedVendorId,
          multiconfig:
            appsCheckIsMultiConfig?.listData?.data?.app_multi_config_allowed,
        });
        setShowInputModalPopup(true);
        setIsEnableApiCall(false);
      } else {
        setIsMultiConfig('true');
        const myArrayQry = mapQueryWithApi(query);
        getConfigurationFieldsDetailsRequested({
          id: selectedVendorId,
          multiconfig:
            appsCheckIsMultiConfig?.listData?.data?.app_multi_config_allowed,
        });
        setShowInputModalPopup(true);
        setIsEnableApiCall(false);
      }
    }
  }, [appsCheckIsMultiConfig]);

  const handleActionClick = id => {
    setActionId(id);
    setShowActionDrawer(true);
    getAppsDetails({ id });
    setActionDetails([]);
  };

  useEffect(() => {
    if (Object.keys(appsDetails).length !== 0) {
      if (appsDetails?.listData?.data?.items) {
        const originData = [];
        const tableMainDetails = appsDetails?.listData?.data?.items;
        setTotalCount(appsDetails.listData.data._meta.totalCount);
        setCurrentPage(appsDetails.listData.data._meta.currentPage);
        for (let i = 0; i < tableMainDetails.length; i += 1) {
          originData.push({
            app_id:
              (appsDetails.listData.data._meta.currentPage - 1) * showing +
              i +
              1,
            fieldRecord: tableMainDetails[i],
            // productVendor: <img src={tableMainDetails[i]?.image.link} height={250} width={200} style={{ objectFit: "contain" }} />,
            productVendor: <AppLogoWrapper><img src={tableMainDetails[i]?.image.link.replace(packageJson.proxy,window.location.origin).replace(":3000","")} /></AppLogoWrapper>,
            creator: (
              <ApplicationDetailsWrapper>
                <div>
                  <p
                  // style={{ width: '150' }}
                  >
                    <b>{tableMainDetails[i]?.app_product_name}</b>
                  </p>
                  <p>
                    {tableMainDetails[i]?.orgApps?.oap_app_status === "Enable" ? <SPRiskTag type="success" text={'Active'} /> : <SPRiskTag type="warning" text={'Inactive'} />}
                    {/* {tableMainDetails[i]?.orgApps?.oap_app_status ===
                      'Enable' ? (
                      <SPRiskTag type="success" text={'Active'} />
                    ) : tableMainDetails[i]?.orgApps?.oap_app_status ===
                      'Disable' ? (
                      <SPRiskTag type="warning" text={'Inactive'} />
                    ) : tableMainDetails[i]?.orgApps?.oap_app_status ===
                    'Deprecated' && (
                      <SPRiskTag
                        type="danger"
                        text={"This App's version is not supported"}
                      />
                    )} */}
                  </p>
                </div>
                <span>{tableMainDetails[i]?.app_description}</span>
              </ApplicationDetailsWrapper>
            ),
            actions: (
              <div
                style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={() => {
                  if (tableMainDetails[i].applicationActions.length !== 0)
                    handleActionClick(tableMainDetails[i]?.app_id)
                }}
              >

                {tableMainDetails[i].applicationActions.length}
              </div>
            ),
            status: (
              <SPToggleSwitch
                onChange={async () => {
                  setRecordInfo(tableMainDetails[i]);
                  setSelectedVendorId(tableMainDetails[i]?.app_id);
                  if (
                    tableMainDetails[i]?.orgApps?.oap_app_status === 'Enable'
                  ) {
                    updateAppToggle({
                      id: tableMainDetails[i]?.app_id,
                      status: 'Disable',
                    });
                    await updateApplicationStatusRequested({
                      id: tableMainDetails[i]?.app_id,
                    });
                  } else {
                    updateAppToggle({
                      id: tableMainDetails[i]?.app_id,
                      status: 'Enable',
                    });
                    setIsEnableApiCall(true);
                    setShowInputModalPopup(true);
                    setSelectedDisabledVendorName(
                      tableMainDetails[i]?.appProductVendor?.apv_name
                    );
                    await checkIsMultiConfigRequested({
                      id: tableMainDetails[i]?.app_id,
                    });
                  }
                }}
                toggleId={i}
                onChecked={
                  tableMainDetails[i]?.orgApps?.oap_app_status === 'Enable'
                }
              />
            ),
          });
        }
        setOriginData(originData);
      }
    }
  }, [appsDetails]);

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        applicationSearch: {},
        QueryString: '',
      };
      if (parsedQuery.app_page_no) {
        queryObject.payload.page = parsedQuery.app_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.app_status) {
        queryObject.applicationSearch.app_status = parsedQuery.app_status;
      }
      if (parsedQuery.app_subject) {
        queryObject.applicationSearch.search = parsedQuery.app_subject;
      }
      if (parsedQuery.app_showing) {
        queryObject.payload['per-page'] = parsedQuery.app_showing;
      }
      const applicationSearch = queryObject?.applicationSearch;
      if (Object.keys(applicationSearch).length !== 0) {
        Object.entries(applicationSearch).forEach(([key, val]) => {
          myArrayQry += 'ApplicationsSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'apps') {
      myArrayQry +=
        'ApplicationsSearch[adv_type]=' + location.pathname.split('/').pop();
    }

    return myArrayQry;
  }

  const handleQuery = qs => {
    if (activeOption !== 'all') {
      history.push('/apps/' + activeOption + '?' + qs);
    } else {
      history.push('/apps/filters?' + qs);
    }
    setQuery(qs);
  };

  const getApplicationList = () => {
    const myArrayQry = mapQueryWithApi(query);
    getAppsDetailsRequested({ queryItem: myArrayQry, path });
  };
  useEffect(() => {
    if (
      appsConfigurationDetails?.listData?.data?.length > 0 &&
      showInputModalPopup
    ) {
      setupdatedVendorsFields(appsConfigurationDetails);
    }
  }, [appsConfigurationDetails.loading === false]);

  useEffect(() => {
    if (appConfigurationFieldsData?.listData?.data && showInputModalPopup) {
      setupdatedVendorsFieldsData(appConfigurationFieldsData);
    }
  }, [appConfigurationFieldsData.loading === false]);

  useEffect(() => {
    getApplicationList();
  }, [query] || []);

  useEffect(() => {
    if (appConfigurationUpdateDetails?.loading === false && saveClicked) {
      setShowConfigurationDrawer(false);
    }
  }, [appConfigurationUpdateDetails]);

  useEffect(() => {
    const queryObject = {
      app_subject: app_subject,
      ...(app_showing !== '20' && { app_showing: app_showing }),
      ...(app_status !== 'all' && { app_status: app_status }),
      ...(app_page_no !== 1 && { app_page_no: app_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setMypage(app_page_no);
    setShowing(app_showing);
    const qs = queryString.stringify(queryObject);
  }, [searchText, app_status, app_showing]);

  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      if (value === 'all') {
        obj[name] = '';
      } else {
        obj[name] = value;
      }
      const str = queryString.stringify(obj);
      if (name == 'app_showing') {
        setShowing(value);
      }
      handleQuery(str);
    }
  };

  const [selectedFilters, setSelectedFilters] = useState([
    'status',
    'disposition',
    'showing',
    'showing',
    'status',
  ]);

  const onPageChange = pageNumber => {
    handleChange('app_page_no', pageNumber);
    window.scrollTo(0, 0);
  };

  const updateConfigurationFieldsDetails = data => {
    const myArrayQry = mapQueryWithApi(query);
    const payload = {
      data: data?.values,
      id: selectedVendorId,
      multiconfig: recordInfo?.fieldRecord?.app_multi_config_allowed,
      updatedData: { queryItem: myArrayQry, path },
      isConfig: true,
    };

    updateConfigDetailsRequested(payload);
    setSaveClicked(data.saveClicked);
    setRecordInfo({});
    setShowConfigurationDrawer(false);
  };

  const updateVendorsFieldsDetails = data => {
    setupdatedVendorsFieldsData({});
    setSaveClicked(data.saveClicked);
    setShowInputModalPopup(false);
    const myArrayQry = mapQueryWithApi(query);
    if (recordInfo.app_multi_config_allowed === 'true') {
      updateMultiConfigDetailsRequested({
        data: data?.values,
        id: selectedVendorId,
        multiconfig:
          appsCheckIsMultiConfig?.listData?.data?.app_multi_config_allowed,
        updatedData: { queryItem: myArrayQry, path },
      });
    } else {
      updateConfigDetailsRequested({
        data: data?.values,
        id: selectedVendorId,
        multiconfig:
          appsCheckIsMultiConfig?.listData?.data?.app_multi_config_allowed,
        updatedData: { queryItem: myArrayQry, path },
        isConfig: false,
      });
    }
    // setRecordInfo({});
  };

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
      // setIsCreateDrawerVisible(true);
    }
  }, [
    appVenderList?.listData?.data &&
    appPublishersList?.listData?.data &&
    appTypesList?.listData?.data &&
    appRateList?.listData?.data,
  ]);

  const onCreateDrawerOpen = async () => {
    await setIsCreateDrawerVisible(true);
  };

  const onCreateDrawerClose = () => {
    setIsCreateDrawerVisible(false);
    setIsApplicationUpdate(false);
    setApplicationDetails([]);
  };

  const createApplication = values => {
    if (isApplicationUpdate) {
      updateApplicationRequested({
        id: applicationDetails.fieldRecord.app_id,
        values,
      });
    } else {
      createApplicationRequested(values);
    }
    onCreateDrawerClose();
    getApplicationList();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'app_id',
      editable: false,
       width: '8%',
	   align: 'center',
    },
    {
      title: 'PRODUCT VENDOR',
      dataIndex: 'productVendor',
      editable: false,
      width: 250,

    },
    {
      title: 'APPLICATION DETAILS',
      dataIndex: 'creator',
      editable: false,
      width: '65%',
    },
    {
      title: 'ACTIONS',
      dataIndex: 'actions',
      editable: false,
      width: '6%',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      editable: false,
	  width: '5%',
	  align: 'center',
    },
    {
      title: 'CONFIGURE',
      dataIndex: 'config_icon',
	  width: '5%',
	  align: 'center',
      render: (text, record, index) => {

        return (
          <a
            onClick={async () => {
              setRecordInfo(record);
              setSaveClicked(false);
              setSelectedVendorId(record?.fieldRecord?.app_id);
              await getConfigurationDetailsRequested({
                id: record.fieldRecord.app_id,
                multiconfig: record.fieldRecord.app_multi_config_allowed,
                isConfig: true,
              });
              setDrawerName(record?.fieldRecord?.app_product_name.capitalize());
              setShowConfigurationDrawer(true);
            }}
          >
            {record?.fieldRecord?.orgApps?.oap_app_status === 'Enable' && (
              <SettingIcon />
            )}
          </a>
        );
      },
    },
  ];

  if (profile?.data?.profile?.[0]?.usrRole?.uro_name === 'Super Admin') {
    columns.push({
      title: '',
      dataIndex: 'action_config',
      width: '10%',
      editable: false,
      render: (text, record, index) => {
        if (profile?.data?.profile?.[0]?.usr_api_organization == record.fieldRecord?.app_organization) {
          return (
            <DeleteBox>
              <a
                onClick={async () => {
                  setIsApplicationUpdate(true);
                  setApplicationDetails(record);
                  await onCreateDrawerOpen();
                }}
              >
                <Pencil />
              </a>
              <a
                className="mr-lt-20"
                onClick={async () => {
                  setRecord(record)
                  await getConfig({ id: record.fieldRecord.app_id })
                  setShowAppConfigDrawer(true)
                }}
              >
                <SettingIcon />
              </a>
              <a
                className="mr-lt-20"
                onClick={async () => {
                  await deleteApplication({ id: record.fieldRecord.app_id });
                  await getApplicationList();
                }}
              >
                <Dustbin />
              </a>
            </DeleteBox>
          );
        }
        return <React.Fragment />
      },
    });
  }

  const handleConfigSubmit = (value) => {
    if (record?.fieldRecord?.app_id) {
      const myArrayQry = mapQueryWithApi(query);
      onAddConfig(record.fieldRecord.app_id, value, myArrayQry)
    }
    setShowAppConfigDrawer(false);
  }

  const handleCloseDrawer = () => {
    setShowAppConfigDrawer(false);
  }

  return (
    <>
      <Row>
        <PageHeader title="Apps" />
      </Row>
      <Row gutter={[19, 10]}>
        <Col>
          <SPButton
            title="Create Application"
            size="small"
            onButtonClick={onCreateDrawerOpen}
          />
          <SPDrawer
            maskClosable={false}
            title={`${isApplicationUpdate ? 'Update' : 'Create'} Application`}
            isVisible={isCreateDrawerVisible}
            onClose={onCreateDrawerClose}
          >
            <Create
              isUpdateForm={isApplicationUpdate}
              isVisible={isCreateDrawerVisible}
              onCloseDrawer={onCreateDrawerClose}
              applicationDetails={applicationDetails}
              appPublishersList={appUpdatedPublishersList}
              appRateList={appupdatedRateList}
              appTypesList={appUpdatedTypeList}
              appVenderList={appUpdatedVendorsList}
              createApplication={createApplication}
            />
          </SPDrawer>
        </Col>
        <Col>
          <SPButton
            title="Approval Workflows"
            size="small"
            onButtonClick={() => {
              history.push('/approval-workflow');
            }}
          />
        </Col>
      </Row>

      <SPDrawer
        title={'Configurations'}
        isVisible={showAppConfigDrawer}
        onClose={() => {
          setShowAppConfigDrawer(false);
        }}
      >
        <ConfigDrawer isVisible={showAppConfigDrawer} submit={handleConfigSubmit} onClose={handleCloseDrawer} />
      </SPDrawer>


      <SPDrawer
        title={selectedDisabledVendorName}
        isVisible={
          showInputModalPopup && updatedVendorsFieldsData?.listData?.data
        }
        onClose={() => {
          setShowInputModalPopup(false);
          setupdatedVendorsFields([]);
          setupdatedVendorsFieldsData({});
        }}
      >
        <EditVendorModal
          closeDrawer={() => {
            setShowInputModalPopup(false);
            setupdatedVendorsFields([]);
            setupdatedVendorsFieldsData({});
          }}
          appConfigurationFieldsData={appConfigurationFieldsData.listData.data}
          isMultiConfig={isMultiConfig}
          updateConfigurationFieldsDetails={updateVendorsFieldsDetails}
          showInputModalPopup={showInputModalPopup}
        />
      </SPDrawer>

      <SModal
        title={'Actions'}
        visible={showActionDrawer}
        onCancel={() => {
          setShowActionDrawer(false);
          setActionId('');
        }}
        width="1500px"
        footer={[]}
      >
        <AppAction
          actionList={actionListData}
          getAppsDetails={id => getAppsDetails(id)}
          id={actionId}
          appsDetails={actionDetails}
          workFlowDetails={workFlowDetails}
          updateWorkFlow={updateWorkFlow}
          actionsListIsLoading={appsDetails?.actionLoading}
          actionsEditList={actionsEditList}
        />
      </SModal>
      <SPDrawer
        title={drawerName}
        isVisible={showConfigurationDrawer}
        onClose={() => {
          setShowConfigurationDrawer(false);
        }}
      >
        <ConfigurationDrawer
          closeDrawer={() => {
            setShowConfigurationDrawer(false);
          }}
          hasMultiConfig={recordInfo?.fieldRecord?.app_multi_config_allowed}
          appsFieldData={integrateModalData}
          appsConfigurationDetails={appsConfigurationDetails}
          appConfigurationFieldsData={appConfigurationFieldsData}
          updateConfigurationFieldsDetails={updateConfigurationFieldsDetails}
        />
      </SPDrawer>
      <StyledDiv>
        <Row gutter={[19, 10]} style={{ flexWrap: 'flex', flex: 1 }}>
          <Col>
            <SPSearch
              onEnter={() => {
                handleChange('app_subject', searchText);
              }}
              placeholder="Search.."
              text={searchText}
              onChange={e => {
                setSearchText(e.target.value);
              }}
              size="500px"
            />
          </Col>

          {selectedFilters.includes('status') ||
            selectedFilters.includes('all') ? (
            <Col>
              <SPSelect
                title="Status"
                items={statusFilter}
                selected={app_status || 'all'}
                onChange={e => {
                  handleChange('app_status', e.key);
                }}
              />
            </Col>
          ) : null}

          {selectedFilters.includes('showing') ||
            selectedFilters.includes('all') ? (
            <Col>
              <SPSelect
                title="Showing"
                items={showingFilter}
                selected={app_showing}
                onChange={e => {
                  handleChange('app_showing', e.key);
                }}
              />
            </Col>
          ) : null}
        </Row>
      </StyledDiv>

      <SPTable
        columns={columns}
        dataSource={originData}
        onPageChange={onPageChange}
        canPaginate
        emptyText="No Data"
        totalRecords={totalCount}
        showingTill={app_showing}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * app_showing + 1
        }
        currentPage={currentPage}
        isLoading={appsDetails?.loading}
      />
    </>
  );
}

const mapStateToProps = state => ({
  profile: state.userStore.userProfile,
  appsDetails: state.appsDetails,
  appsConfigurationDetails: state.appsConfigurationDetails,
  appConfigurationFieldsData: state.appConfigurationFieldsData,
  appConfigurationUpdateDetails: state.appConfigurationUpdateDetails,
  appsCheckIsMultiConfig: state.appsCheckIsMultiConfig,
  appPublishersList: state.appPublishersList,
  appRateList: state.appRateList,
  appTypesList: state.appTypesList,
  appVenderList: state.appVenderList,
  appCreateApplication: state.appCreateApplication,
  integrateModalData: state.appsCheckIsMultiConfig.integrateModalData,
  actionsList: state.appsDetails.actionsList.data,
  workFlowDetails: state.appsDetails.workFlowList.data,
  actionsEditList: state.appsDetails.actionsEditList,
});

const mapDispatchToProps = dispatch => ({
  getAppsDetailsRequested: data => dispatch(getAppsDetailsRequested(data)),
  updateApplicationDetailsRequested: data =>
    dispatch(updateApplicationDetailsRequested(data)),
  updateApplicationStatusRequested: data =>
    dispatch(updateApplicationStatusRequested(data)),
  getConfigurationDetailsRequested: data =>
    dispatch(getConfigurationDetailsRequested(data)),
  getConfigurationFieldsDetailsRequested: data =>
    dispatch(getConfigurationFieldsDetailsRequested(data)),
  updateConfigDetailsRequested: data =>
    dispatch(updateConfigDetailsRequested(data)),
  checkIsMultiConfigRequested: data =>
    dispatch(checkIsMultiConfigRequested(data)),
  getVendorListRequested: () => dispatch(getVendorListRequested()),
  getPubliserListRequested: () => dispatch(getPubliserListRequested()),
  getTypeListRequested: () => dispatch(getTypeListRequested()),
  getRateLimitRequested: () => dispatch(getRateLimitRequested()),
  createApplicationRequested: data =>
    dispatch(createApplicationRequested(data)),
  updateMultiConfigDetailsRequested: data =>
    dispatch(updateMultiConfigDetailsRequested(data)),
  deleteApplication: payload => dispatch(deleteApplication(payload)),
  updateApplicationRequested: data =>
    dispatch(updateApplicationRequested(data)),
  getAppsDetails: payload => dispatch(getAppsActionDetails(payload)),
  getWorkFlow: () => dispatch(getAppsWorkflowDetails()),
  updateWorkFlow: payload => dispatch(updateWorkFlowDetails(payload)),
  updateAppToggle: payload => dispatch(updateAppToggle(payload)),
  getConfig: payload => dispatch(getAppsConfig(payload)),
  onAddConfig: (...args) => dispatch(addConfig(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Apps);
