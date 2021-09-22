import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  automationFamilyList,
  deleteAutomationFamilyList,
  createAutomationfamilyList,
  updateAutomationfamilyList,
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import SPSearch from '../../../../../../components/SPSearch';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import PageHeader from '../../../../../layout/pageHeader';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import CaseFamilyFormDrawer from './caseFamilyForm';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
const { confirm } = Modal

const FamilyCase = ({
  getList,
  familyList,
  updateList,
  deleteList,
  createList,
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
  const { path } = useParams();

  const {
    pc_showing = '20',
    pc_page_no = 1,
    pc_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(pc_showing);
  const [searchText, setSearchText] = useState(pc_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want this?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myQuery = mapQueryWithApi(query);
        deleteList({ id: key, query: myQuery });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

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
    if (familyList?.listData?._meta) {
      setTotalCount(familyList.listData._meta.totalCount);
      setCurrentPage(familyList.listData._meta.currentPage);
    }
  }, [familyList]);

  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);
  const columns = [
    {
      title: '#',
      dataIndex: 'pc_id',
      editable: false,
      key: (text, record, index) => record?.pc_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Use Case Family Name',
      dataIndex: 'pc_name',
      sorter: true,
      key: (text, record, index) => record?.pc_id,
      render: (text, record, index) => record?.pc_name,
      width: '45%',
    },
    {
      title: 'Use Case Family Status',
      dataIndex: 'pc_status',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.pc_id,
      render: (text, record, index) => record?.pc_status,
      width: '45%',
    },
    {
      title: 'Actions',
      dataIndex: 'org_actions',
      render: (text, record, index) => {
        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-use-case-family"))){
          const updateCaseFamily= {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              if (record) {
                setRecord(record);
              }
              setIsCreate(false)
              setOpenDrawer(true);
            },
          };
          moreItems.push(updateCaseFamily);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-use-case-family"))){
          const deleteCaseFamily=  {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.pc_id)
          };
          moreItems.push(deleteCaseFamily);
        }

        if (userProfile?.usr_api_organization === record?.pc_organization && moreItems.length !== 0) {
          return (
            <SPSingleSelectDropdown
              items={moreItems}
              onSelect={() => { }}
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
      if (parsedQuery.pc_page_no) {
        queryObject.payload.page = parsedQuery.pc_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.pc_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.pc_subject;
      }
      if (parsedQuery.pc_showing) {
        queryObject.payload['per-page'] = parsedQuery.pc_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'UseCaseFamilySearch[' + key + ']=' + val + '&';
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

  const onPageChange = pageNumber => {
    handleChange('pc_page_no', pageNumber);
    window.scrollTo(0, 0);
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
      if (name == 'pc_showing') {
        setShowing(value);
      }
      handleQuery(str);
    }
  };

  const handleQuery = qs => {
    if (activeOption !== 'all') {
      history.push(
        '/administration/?active_tab=automation&&' + activeOption + '?' + qs
      );
    } else {
      history.push('/administration/?active_tab=automation&&' + qs);
    }
    setQuery(qs);
  };

  const handleSubmit = async values => {
    const myQuery = mapQueryWithApi(query);
    if (!isCreate) {
      updateList({ payload: values, id: record.pc_id, query: myQuery });
    } else {
      createList({ payload: values, query: myQuery });
    }
    setOpenDrawer(false);
    setRecord({});
  };
  return (
    <>
      <PageHeader
        title={'Use Case Family'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-use-case-family"))) &&
          <SPButton
            title="Create Use CaseFamily"
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
              handleChange('pc_subject', searchText);
            }}
            size="420px"
          />
        </Col>
        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={pc_showing}
            onChange={e => {
              handleChange('pc_showing', e.key);
            }}
          />
        </Col>
      </Row>
      <SPTable
        columns={columns}
        dataSource={familyList?.listData?.items}
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
        isLoading={familyList?.loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Use Case Family`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <CaseFamilyFormDrawer
          isVisible={openDrawer}
          isCreate={isCreate}
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
  familyList: state.administration.automation,
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(automationFamilyList(payload)),
  updateList: payload => dispatch(updateAutomationfamilyList(payload)),
  deleteList: payload => dispatch(deleteAutomationFamilyList(payload)),
  createList: payload => dispatch(createAutomationfamilyList(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(FamilyCase);
