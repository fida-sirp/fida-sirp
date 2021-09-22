import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  riskManagementControlRegisterList,
  createRiskManagementControlRegister,
  deleteRiskManagementControlRegister,
  updateDiskManagementControlRegister,
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../components/SPDrawer';

import SPButton from '../../../../../../components/SPButton';
import SPSearch from '../../../../../../components/SPSearch';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import { isEmpty } from 'lodash';
import ControlRegisterFormDrawer from './controlRegsiterForm';
import PageHeader from '../../../../../layout/pageHeader';
import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';

const ControlRegister = ({
  userProfile,
  getList,
  controlList,
  updateList,
  deleteList,
  createList,
  access
}) => {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [record, setRecord] = useState({});
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(location.search);
  const { path } = useParams();

  const {
    crg_showing = '20',
    crg_page_no = 1,
    crg_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(crg_showing);
  const [searchText, setSearchText] = useState(crg_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useEffect(() => {
    getRegisterList();
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

  const getRegisterList =  () => {
    const myArrayQry = mapQueryWithApi(query);
     getList({ queryItem: myArrayQry, path });
  };

  useEffect(() => {
    if (controlList?.listData?._meta) {
      setTotalCount(controlList.listData._meta.totalCount);
      setCurrentPage(controlList.listData._meta.currentPage);
    }
  }, [controlList]);

  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);
  const columns = [
    {
      title: '#',
      dataIndex: 'crg_id',
      editable: false,
      key: (text, record, index) => record?.crg_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'crg_name',
      editable: false,
      sorter: true,
      // key: (text, record, index) => record?.crg_id,
      render: (text, record, index) => record?.crg_name,
      width: '45%',
    },
    {
      title: 'Description',
      dataIndex: 'crg_desc',
      editable: false,
      sorter: true,
      // key: (text, record, index) => record?.crg_id,
      render: (text, record, index) => record.crg_desc,
    },
    {
      title: 'Status',
      dataIndex: 'crg_status',
      sorter: true,
      editable: false,
      // key: (text, record, index) => record?.crg_id,
      render: (text, record, index) => record.crg_status,
    },
    {
      title: 'Actions',
      dataIndex: 'crg_id',
      editable: false,
      render: (text, record, index) => {
        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-control-register"))){
          const updateControlRegister= {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: async () => {
              if (record) {
                setOpenDrawer(true);
                setRecord(record);
                setIsCreate(false);
              }

            },
          };
          moreItems.push(updateControlRegister);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-control-register"))){
          const deleteControlRegister={
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: async () => {
              showConfirm(record.crg_id);
            },
          };
          moreItems.push(deleteControlRegister);
        }
        if(userProfile?.usr_api_organization === record?.crg_organization && moreItems.length !==0 ) {
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
      if (parsedQuery.crg_page_no) {
        queryObject.payload.page = parsedQuery.crg_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.crg_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.crg_subject;
      }
      if (parsedQuery.crg_showing) {
        queryObject.payload['per-page'] = parsedQuery.crg_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'ControlRegisterSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'ControlRegisterSearch[search]=' + searchText;
    }

    return myArrayQry;
  }

  const onPageChange = pageNumber => {
    handleChange('crg_page_no', pageNumber);
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
      if (name == 'crg_showing') {
        setShowing(value);
      }
      handleQuery(str);
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
    const myArrayQry = mapQueryWithApi(query);
    if (!isCreate) {
       updateList(values, record.crg_id, myArrayQry);
    } else  createList(values, myArrayQry);
     setOpenDrawer(false);
    // await getRegisterList();
     setRecord({});
  };
  return (
    <>

      <PageHeader
        title="Control Register"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-control-register"))) &&
          <SPButton
            title="Create Threat"
            onButtonClick={async () => {
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
                handleChange('crg_subject', searchText);
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
              selected={crg_showing}
              onChange={e => {
                handleChange('crg_showing', e.key);
              }}
            />
          </div>

        </Col>
      </Row>
      <SPTable
        columns={columns}
        dataSource={controlList?.listData?.items}
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
        isLoading={controlList?.loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Control`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <ControlRegisterFormDrawer
          recordValue={record}
          submit={handleSubmit}
          closeDrawer={() => setOpenDrawer(false)}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
  controlList: state.administration.riskManagement,
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(riskManagementControlRegisterList(payload)),
  updateList: (...payload) => dispatch(updateDiskManagementControlRegister(...payload)),
  deleteList: (...payload) => dispatch(deleteRiskManagementControlRegister(...payload)),
  createList: (...payload) => dispatch(createRiskManagementControlRegister(...payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ControlRegister);
