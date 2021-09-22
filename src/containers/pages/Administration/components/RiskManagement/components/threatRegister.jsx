import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  riskManagementThreatRegisterList,
  updateCategoryList,
  riskManagementThreatRegisterValueList,
  riskManagementThreatRegisterVulnerabilitiesList,
  createRiskManagementThreatRegister,
  deleteRiskManagementThreatRegister,
  updateRiskManagementThreatRegister,
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../components/SPDrawer';
// import CategoriesFormDrawer from './CategoriesForm';
import SPButton from '../../../../../../components/SPButton';
import SPSearch from '../../../../../../components/SPSearch';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import { isEmpty } from 'lodash';
import ThreatRegisterFormDrawer from './threatRegisterForm';
import { CodeSandboxCircleFilled, ConsoleSqlOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import PageHeader from '../../../../../layout/pageHeader';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import confirm from 'antd/lib/modal/confirm';

const ThreatRegister = ({
  userProfile,
  getList,
  registerList,
  updateList,
  deleteList,
  createList,
  valueList,
  severityValueList,
  vulnerabilityList,
  vulnerabilityValueList,
  access
}) => {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [record, setRecord] = useState({});
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(location.search);
  const [severityList, setSeverityList] = useState([]);
  const [associateList, setAssociateList] = useState([]);
  const [showEditSidebar, setshowEditSidebar] = useState(false);
  const { path } = useParams();

  const {
    thr_showing = '20',
    thr_page_no = 1,
    thr_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(thr_showing);
  const [searchText, setSearchText] = useState(thr_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useEffect(() => {
    valueList();
  }, []);
  useEffect(async () => {
    await getThreatList();
  }, [query] || []);

  const getThreatList = async () => {
    const myArrayQry = mapQueryWithApi(query);
    getList({ queryItem: myArrayQry, path });
  };
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
    if (registerList?.listData?._meta) {
      setTotalCount(registerList.listData._meta.totalCount);
      setCurrentPage(registerList.listData._meta.currentPage);
    }
  }, [registerList]);

  useEffect(() => {
    const arr = [];
    if (!isEmpty(severityValueList)) {
      Object.entries(severityValueList).map(([key, value], index) =>
        arr.push({
          key: key,
          value: key,
          label: value,
        })
      );
    }
    setAssociateList(arr);
  }, [severityValueList]);

  useEffect(() => {
    const arr = [];
    if (!isEmpty(vulnerabilityValueList)) {
      Object.entries(vulnerabilityValueList).map(([key, value], index) =>
        arr.push({
          key: key,
          value: key,
          label: value,
        })
      );
    }
    setSeverityList(arr);
  }, [vulnerabilityValueList]);
  const columns = [
    {
      title: '#',
      dataIndex: 'thr_id',
      editable: false,
      key: (text, record, index) => record?.wkf_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'thr_name',
      sorter: true,
      editable: false,
      // key: (text, record, index) => record?.thr_id,
      render: (text, record, index) => record?.thr_name,
    },
    {
      title: 'Value',
      dataIndex: 'thr_value',
      sorter: true,
      editable: false,
      // key: (text, record, index) => record?.thr_id,
      render: (text, record, index) =>
        associateList.filter(data => data.key == record.thr_value)?.[0]?.label,
    },
    {
      title: 'Description',
      dataIndex: 'thr_desc',
      sorter: true,
      editable: false,
      // key: (text, record, index) => record?.thr_id,
      render: (text, record, index) => record?.thr_desc,
    },
    {
      title: 'Actions',
      dataIndex: 'thr_id',
      editable: false,
      render: (text, record, index) => {


          const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-threat-register"))){
            const updateThreatRegister= {
              key: 'edit',
              label: 'Edit',
              icon: <Pencil />,
              onClickItem: async () => {
                if (record) {
                  await vulnerabilityList();
                  setRecord(record);
                  setIsCreate(false);
                  setOpenDrawer(true);
                }

              },
            };
            moreItems.push(updateThreatRegister);
          }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-threat-register"))){
          const deleteThreatRegister= {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: async () => {
              showConfirm(record.thr_id);
            },
          };
          moreItems.push(deleteThreatRegister);
        }

        if(userProfile?.usr_api_organization === record?.thr_organization && moreItems.length !==0 ) {
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



  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want delete this?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myArrayQry = mapQueryWithApi(query);
        deleteList({ id: key, query: myArrayQry });
        //  await getThreatList();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        applicationCategorySearch: {},
        QueryString: '',
      };
      if (parsedQuery.thr_page_no) {
        queryObject.payload.page = parsedQuery.thr_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.thr_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.thr_subject;
      }
      if (parsedQuery.thr_showing) {
        queryObject.payload['per-page'] = parsedQuery.thr_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'ThreatRegisterSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'ThreatRegisterSearch[search]=' + searchText;
    }

    return myArrayQry;
  }

  const onPageChange = pageNumber => {
    handleChange('thr_page_no', pageNumber);
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
      if (name == 'thr_showing') {
        setShowing(value);
      }
      handleQuery(str);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    let columnIndex = sorter.field;
    if (sorter.order === 'ascend') {
      console.log({ columnIndex });
    } else if (sorter.order === 'descend') {
      columnIndex = '-' + columnIndex;
    } else {
      columnIndex = undefined;
    }
    if (columnIndex !== undefined && columnIndex !== sort) {
      handleChange('sort', columnIndex);
    }
  };

  const handleQuery = qs => {
    if (activeOption !== 'all') {
      history.push(
        '/administration/?active_tab=riskManagement&&' + activeOption + '?' + qs
      );
    } else {
      history.push('/administration/?active_tab=riskManagement&&' + qs);
    }
    setQuery(qs);
  };

  const handleSubmit = async values => {
    const { vrg_id, ...payload } = values;
    payload['vrg_id[]'] = vrg_id;
    const myArrayQry = mapQueryWithApi(query);
    if (!isCreate) {
      const payload = {
        values,
        id: record.thr_id,
        query: myArrayQry
      };

      await updateList(payload, myArrayQry);
      setRecord({});
      setOpenDrawer(false);

    } else {
      await createList(payload, myArrayQry);
      setOpenDrawer(false);
      setRecord({});

    }

  };
  return (
    <>
      <PageHeader
        title="Threat Register"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("update-threat-register"))) &&
          <SPButton
            title="Create Threat"
            onButtonClick={async () => {
              await vulnerabilityList();
              setIsCreate(true);
              setRecord({});
              setOpenDrawer(true);
            }}
            size="small"
          />
        ]}
      />
      <Row gutter={[19, 10]}
        style={{
          marginTop: 23, marginBottom: 13, flexWrap: 'flex'
        }}>
        <Col>
          <div>
            <SPSearch
              text={searchText}
              onChange={e => {
                setSearchText(e.target.value);
              }}
              placeholder="Search.."
              onEnter={() => {
                handleChange('thr_subject', searchText);
              }}
              size="420px"
            />
          </div>
        </Col>
        <Col>
          <div style={{ marginRight: 20 }}>
            <SPSelect
              title="Showing"
              items={showingFilter}
              selected={thr_showing}
              onChange={e => {
                handleChange('thr_showing', e.key);
              }}
            />
          </div>
        </Col>
      </Row>
      <SPTable
        columns={columns}
        dataSource={registerList?.listData?.items}
        onPageChange={onPageChange}
        canPaginate
        emptyText="No Data"
        totalRecords={totalCount}
        showingTill={showing}
        handleTableChange={handleTableChange}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * showing + 1
        }
        currentPage={currentPage}
        isLoading={registerList?.loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Threat`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <ThreatRegisterFormDrawer
          isCreate={isCreate}
          isVisible={openDrawer}
          recordValue={record}
          valueList={associateList}
          associateList={severityList}
          submit={handleSubmit}
          closeDrawer={() => setOpenDrawer(false)}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
  registerList: state.administration.riskManagement,
  vulnerabilityValueList: state.administration.riskManagement.vulnerabilityList,
  severityValueList: state.administration.riskManagement.valueList,
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(riskManagementThreatRegisterList(payload)),
  valueList: payload =>
    dispatch(riskManagementThreatRegisterValueList(payload)),
  vulnerabilityList: payload =>
    dispatch(riskManagementThreatRegisterVulnerabilitiesList(payload)),
  updateList: (...payload) => dispatch(updateRiskManagementThreatRegister(...payload)),
  deleteList: payload => dispatch(deleteRiskManagementThreatRegister(payload)),
  createList: (...payload) => dispatch(createRiskManagementThreatRegister(...payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ThreatRegister);
