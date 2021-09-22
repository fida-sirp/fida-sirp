import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  automationIngestionList,
  createAutomationIngestion,
  updateAutomationIngestion,
  deleteAutomationIngestion,
  intestionType,
  ingestionWidget,
  ingestionFrequency,
  ingestionApplication,
  ingestionUsers,
  ingestionAction,
  enableAdvisory,
  getIngestionDropDown,
  getIngestionMultiData,
  addIngestionMultiData,
  automationnMultiDataPost,
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import SPSearch from '../../../../../../components/SPSearch';
import { Row, Col } from 'antd';
import PageHeader from '../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import { isEmpty } from 'lodash';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import IngestionFormDrawer from './IngestionForm';
import SettingIcon from '../../../../../../assets/svgIcon/setting';
import UpdateIngestionFormDrawer from './updateIngestionForm';
import Setting from '../../../../../../assets/svgIcon/setting';
import PlayButton from '../../../../../../assets/svgIcon/playButton';
import { PlayCircleFilled } from '@ant-design/icons';
const { confirm } = Modal

const IngestionSource = ({
  getList,
  publishersList,
  updateList,
  deleteList,
  createList,
  intestionType,
  ingestionWidget,
  ingestionFrequency,
  ingestionApplication,
  ingestionUsers,
  ingestionAction,
  enableAdvisory,
  typeList,
  widgetList,
  frequencyList,
  applicationList,
  usersList,
  actionList,
  getIngestionDropDown,
  getIngestionMultiData,
  mappingDropDown,
  addIngestionMultiData,
  mappingData,
  postMultiData,
  userProfile,
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
  const [widget, setWidget] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [user, setUser] = useState([]);
  const [application, setApplication] = useState([]);
  const [actions, setActions] = useState([]);
  const [configuration, setConfiguration] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateModalTitle, setUpdateModalTitle] = useState('');
  const [fieldOptions, setFieldOptions] = useState([]);
  const [keyOptions, setKeyOptions] = useState([]);
  const [artifactsOptions, setArtifactsOptions] = useState([]);
  const [updateId, setUpdateId] = useState('');
  const [updateRecord, setUpdateRecord] = useState({
    fieldValues: [],
    artifactsValues: [],
  });
  const { path } = useParams();

  const {
    dis_showing = '20',
    dis_page_no = 1,
    dis_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(dis_showing);
  const [searchText, setSearchText] = useState(dis_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useEffect(() => {
    intestionType();
    ingestionWidget();
    ingestionFrequency();
    ingestionApplication();
    ingestionUsers();
  }, []);

  useEffect(() => {
    if (!isEmpty(applicationList)) {
      let arr = [];
      Object.keys(applicationList).map(key =>
        arr.push({
          key: key,
          value: key,
          label: applicationList[key],
        })
      );
      setApplication(arr);
    }
    if (!isEmpty(typeList)) {
      let arr = [];
      Object.keys(typeList).map(key =>
        arr.push({
          key: key,
          value: key,
          label: typeList[key],
        })
      );
      setType(arr);
    }
    if (!isEmpty(widgetList)) {
      let arr = [];
      Object.keys(widgetList).map(key =>
        arr.push({
          key: key,
          value: key,
          label: widgetList[key],
        })
      );
      setWidget(arr);
    }
    if (!isEmpty(frequencyList)) {
      let arr = [];
      Object.keys(frequencyList).map(key =>
        arr.push({
          key: key,
          value: key,
          label: frequencyList[key],
        })
      );
      setFrequency(arr);
    }
    if (!isEmpty(usersList)) {
      let arr = [];
      Object.keys(usersList).map(key =>
        arr.push({
          key: key,
          value: key,
          label: usersList[key],
        })
      );
      setUser(arr);
    }
    if (!isEmpty(actionList)) {
      let arr = [];
      Object.keys(actionList.action_data).map(key =>
        arr.push({
          key: key,
          value: key,
          label: actionList.action_data[key],
        })
      );

      setActions(arr);
      let arr1 = [];
      if (!isEmpty(actionList.multi_config))
        Object.keys(actionList.multi_config).map(key =>
          arr1.push({
            key: key,
            value: key,
            label: actionList.multi_config[key],
          })
        );
      setConfiguration(arr1);
    }
  }, [
    typeList,
    widgetList,
    frequencyList,
    applicationList,
    usersList,
    actionList,
  ]);

  useEffect(() => {
    getPublisherList();
  }, [query] || []);

  useEffect(() => {
    if (!isEmpty(mappingDropDown)) {
      const art = [],
        keys = [],
        field = [];
      Object.keys(mappingDropDown.Artifacts).map(key =>
        art.push({
          key: key,
          value: mappingDropDown.Artifacts[key],
          label: mappingDropDown.Artifacts[key],
        })
      );
      Object.keys(mappingDropDown.Fields).map(key =>
        field.push({
          key: key,
          value: mappingDropDown.Fields[key],
          label: mappingDropDown.Fields[key],
        })
      );
      Object.keys(mappingDropDown.keys).map(key =>
        keys.push({
          key: key,
          value: key,
          label: mappingDropDown.keys[key],
        })
      );

      setFieldOptions(field);
      setKeyOptions(keys);
      setArtifactsOptions(art);
    }
  }, [mappingDropDown]);
  useEffect(() => {
    if (!isEmpty(mappingData)) {
      const arr = {
        fieldValues: [],
        artifactsValues: [],
      };
      mappingData
        .filter(key => key.artifact_field)
        .map((data, index) => {
          arr.artifactsValues.push({
            [`artifact_field_${index}`]: data['artifact_field'],
            [`json_key_artifact_${index}`]: data['artifact_key'],
          });
        });
      mappingData
        .filter(key => key.field_key)
        .map((data, index) => {
          arr.fieldValues.push({
            [`incident_field_${index}`]: data['field_key'],
            [`json_key_field_${index}`]: data['json_field'],
          });
        });
      setUpdateRecord(arr);
    }
  }, [mappingData]);

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
        deleteList({ id: key, query: myQuery })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'dis_id',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.dis_id,
      render: (text, record, index) => record.dis_id,
    },
    {
      title: 'Name',
      dataIndex: 'dis_name',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.dis_id,
      render: (text, record, index) => record?.dis_name,
    },
    {
      title: 'Status',
      dataIndex: 'dis_status',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.dis_id,
      render: (text, record, index) => record?.dis_status,
    },
    {
      title: 'Send Advisory',
      dataIndex: 'dis_send_advisory',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.dis_id,
      render: (text, record, index) => record?.dis_send_advisory,
    },
    {
      title: 'Ingestion method',
      dataIndex: 'dis_ingestion_method',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.dis_id,
      render: (text, record, index) => record?.dis_ingestion_method,
    },
    {
      title: 'Actions',
      dataIndex: 'org_actions',
      render: (text, record, index) => {


        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-ingestion-sources"))){
          const updateIngestionSources={
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setOpenDrawer(true);
              if (record) {
                setRecord(record);
              }
              setIsCreate(false)
              handleApplicationSelect(record?.dis_app_id);
            },
          };
          moreItems.push(updateIngestionSources);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("integrate-multi-ingestion-sources")) && record?.isConfigured === "true"){
          const integrateIngestionSourcesMulti={
            key: 'update',
            label: 'Update',
            icon: <Setting />,
            onClickItem: () => {
              setRecord(record)
              setUpdateModal(true);
              setUpdateId(record?.dis_id);
              getIngestionDropDown({ id: record?.dis_id });
              getIngestionMultiData({ id: record?.dis_id });
              setUpdateModalTitle(record.dis_name || '');
            }
          };
          moreItems.push(integrateIngestionSourcesMulti);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-ingestion-sources"))){
          const changeIngestionSources={
            key: 'change',
            label: 'Change',
            icon: <PlayButton />,
            onClickItem: () => {
              enableAdvisory({ id: record?.dis_id });
            },
          };
          moreItems.push(changeIngestionSources);
        }

        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-ingestion-sources"))){
          const deleteIngestionSources=  {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.dis_id)
          };
          moreItems.push(deleteIngestionSources);
        }

        if (userProfile?.usr_api_organization === record?.dis_organization && moreItems.length !== 0) {

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
      if (parsedQuery.dis_page_no) {
        queryObject.payload.page = parsedQuery.dis_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.dis_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.dis_subject;
      }
      if (parsedQuery.dis_showing) {
        queryObject.payload['per-page'] = parsedQuery.dis_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'IngestionSourcesSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'IngestionSourcesSearch[search]=' + searchText;
    }

    return myArrayQry;
  }

  const onPageChange = pageNumber => {
    handleChange('dis_page_no', pageNumber);
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
      if (name == 'dis_showing') {
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

  const handleApplicationSelect = id => {
    ingestionAction({ id });
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleUpdateDrawerClose = async () => {
    setUpdateModalTitle('');
    setUpdateId('');
    setUpdateModal(false);
  };

  const handleSubmit = values => {
    const myQuery = mapQueryWithApi(query);
    if (!isCreate) {
      updateList({ payload: values, id: record?.dis_id, query: myQuery });
    } else {
      createList({ payload: values, query: myQuery });
    }
    handleDrawerClose();
  };
  const handleTableChange = (pagination, filters, sorter) => {
    let columnIndex = sorter.field;
    if (sorter.order === 'ascend') {
    } else if (sorter.order === 'descend') {
      columnIndex = '-' + columnIndex;
    } else {
      columnIndex = undefined;
    }
    if (columnIndex !== undefined && columnIndex !== sort) {
      handleChange('sort', columnIndex);
    }
  };
  const handleUpdate = values => {
    const myQuery = mapQueryWithApi(query);
    if (record) {
      postMultiData(record?.dis_id, values, myQuery)
    }
    handleUpdateDrawerClose();
  };
  return (
    <>
      <PageHeader
        title={'Ingestion Sources'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-ingestion-sources"))) &&
          <SPButton
            title="Add Source"
            onButtonClick={() => {
              setIsCreate(true);
              setRecord({})
              setOpenDrawer(true);
            }}
            size="small"
            image={<PlusIcon />}
          />,
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
              handleChange('dis_subject', searchText);
            }}
            size="420px"
          />
        </Col>
        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={dis_showing}
            onChange={e => {
              handleChange('dis_showing', e.key);
            }}
          />
        </Col>
      </Row>
      <SPTable
        columns={columns}
        dataSource={publishersList?.listData?.items}
        onPageChange={onPageChange}
        canPaginate
        handleTableChange={handleTableChange}
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
        title={`${isCreate ? 'Create' : 'Update'} Ingestion Source`}
        isVisible={openDrawer}
        onClose={handleDrawerClose}
      >
        <IngestionFormDrawer
          recordValue={record}
          isCreate={isCreate}
          isVisible={openDrawer}
          type={type}
          widget={widget}
          frequency={frequency}
          user={user}
          application={application}
          actions={actions}
          configuration={configuration}
          handleApplicationSelect={handleApplicationSelect}
          submit={handleSubmit}
          closeDrawer={handleDrawerClose}
        />
      </SPDrawer>

      <SPDrawer
        title={updateModalTitle}
        isVisible={updateModal}
        onClose={handleUpdateDrawerClose}
      >
        <UpdateIngestionFormDrawer
          isVisible={updateModal}
          fieldOptions={fieldOptions}
          keyOptions={keyOptions}
          artifactsOptions={artifactsOptions}
          handleUpdate={handleUpdate}
          updateRecord={updateRecord}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  publishersList: state.administration.automation,
  typeList: state.administration.automation.typeList,
  widgetList: state.administration.automation.widgetList,
  frequencyList: state.administration.automation.frequencyList,
  applicationList: state.administration.automation.applicationList,
  usersList: state.administration.automation.usersList,
  actionList: state.administration.automation.actionList,
  mappingDropDown: state.administration.automation.mappingDropDownData,
  mappingData: state.administration.automation.mappingData,
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(automationIngestionList(payload)),
  updateList: payload => dispatch(updateAutomationIngestion(payload)),
  deleteList: payload => dispatch(deleteAutomationIngestion(payload)),
  createList: payload => dispatch(createAutomationIngestion(payload)),
  intestionType: payload => dispatch(intestionType(payload)),
  ingestionWidget: payload => dispatch(ingestionWidget(payload)),
  ingestionFrequency: payload => dispatch(ingestionFrequency(payload)),
  ingestionApplication: payload => dispatch(ingestionApplication(payload)),
  ingestionUsers: payload => dispatch(ingestionUsers(payload)),
  ingestionAction: payload => dispatch(ingestionAction(payload)),
  enableAdvisory: payload => dispatch(enableAdvisory(payload)),
  getIngestionDropDown: payload => dispatch(getIngestionDropDown(payload)),
  getIngestionMultiData: payload => dispatch(getIngestionMultiData(payload)),
  addIngestionMultiData: payload => dispatch(addIngestionMultiData(payload)),
  postMultiData: (...args) => dispatch(automationnMultiDataPost(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(IngestionSource);
