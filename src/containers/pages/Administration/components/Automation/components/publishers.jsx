import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'antd'
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  automationPublishersList,
  createAutomationPublishers,
  updateAutomationPublishers,
  deleteAutomationPublishers,
} from '../../../../../../actions/administration';
import PageHeader from '../../../../../layout/pageHeader';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import { Row, Col } from 'antd';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import { useHistory, useParams } from 'react-router';
import SPSelect from '../../../../../../components/SPSelect';
import PublisherFormDrawer from './publishersForm';
import SPSearch from '../../../../../../components/SPSearch';
import { ExclamationCircleOutlined } from '@ant-design/icons'

const Publishers = ({
  getList,
  publishersList,
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
  const { confirm } = Modal

  const {
    apb_showing = '20',
    apb_subject,
    apb_page_no = 1,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(apb_showing);
  const [searchText, setSearchText] = useState(apb_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useEffect(() => {
    getPublisherList();
  }, [query] || []);

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

  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);
  const columns = [
    {
      title: '#',
      dataIndex: 'apb_id',
      editable: false,
      key: (text, record, index) => record?.apb_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'apb_name',
      editable: false,
      key: (text, record, index) => record?.apb_id,
      render: (text, record, index) => record?.apb_name,
      width: '45%',
      sorter: true
    },
    {
      title: 'URL',
      dataIndex: 'apb_url',
      editable: false,
      key: (text, record, index) => record?.apb_id,
      render: (text, record, index) => record?.apb_url,
      width: '45%',
      sorter: true
    },
    {
      title: 'Actions',
      dataIndex: 'apb_id',
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-application-publishers"))){
          const updateApplicationPublishers= {
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
          moreItems.push(updateApplicationPublishers);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-application-publishers"))){
          const deleteApplicationPublishers= {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.apb_id)
          };
          moreItems.push(deleteApplicationPublishers);
        }

        if (userProfile?.usr_api_organization === record?.apb_organization && moreItems.length !== 0 ) {
          return (
            <SPSingleSelectDropdown
              items={moreItems}
              onSelect={() => { }}
              title="more"
            />
          );
        }
      },
    }
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
      if (parsedQuery.apb_page_no) {
        queryObject.payload.page = parsedQuery.apb_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.apb_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.apb_subject;
      }
      if (parsedQuery.apb_showing) {
        queryObject.payload['per-page'] = parsedQuery.apb_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'ApplicationPublishersSearch[' + key + ']=' + val + '&';
        });
      }
      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }
    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'ApplicationPublishersSearch[search]=' + searchText;
    }
    return myArrayQry;
  }

  const onPageChange = pageNumber => {
    handleChange('apb_page_no', pageNumber);
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
      if (name == 'apb_showing') {
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

  const handleSubmit = values => {
    const myQuery = mapQueryWithApi(query);
    if (!isCreate) {
      updateList({ payload: values, id: record.apb_id, query: myQuery });
    } else {
      createList({ payload: values, query: myQuery });
    }
    // getPublisherList();
    setOpenDrawer(false);
    setRecord({});
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
  return (
    <>
      <PageHeader
        title={'Product Publisher'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-application-publishers"))) &&
          <SPButton
            title="Create Publisher"
            onButtonClick={() => {
              setIsCreate(true);
              setOpenDrawer(true);
              setRecord({})
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
              handleChange('apb_subject', searchText);
            }}
            size="420px"
          />
        </Col>
        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={apb_showing}
            onChange={e => {
              handleChange('apb_showing', e.key);
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
        title={`${isCreate ? 'Create' : 'Update'} Publisher`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <PublisherFormDrawer
          isCreated={isCreate}
          isVisible={openDrawer}
          recordValue={record}
          submit={handleSubmit}
          closeDrawer={() => setOpenDrawer(false)}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  publishersList: state.administration.automation,
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(automationPublishersList(payload)),
  updateList: payload => dispatch(updateAutomationPublishers(payload)),
  deleteList: payload => dispatch(deleteAutomationPublishers(payload)),
  createList: payload => dispatch(createAutomationPublishers(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Publishers);
