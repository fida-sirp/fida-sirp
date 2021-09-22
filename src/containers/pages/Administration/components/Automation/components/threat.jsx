import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  createAutomationThreatList,
  automationThreatList,
  deleteAutomationThreatList,
  updateAutomationThreatList,
} from '../../../../../../actions/administration';
import PageHeader from '../../../../../layout/pageHeader';
import queryString from 'query-string';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import SPTable from '../../../../../../components/SPTable';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import SPSearch from '../../../../../../components/SPSearch';
import SPSelect from '../../../../../../components/SPSelect';
import { Modal, Row, Col } from 'antd';
const { confirm } = Modal
import { useHistory, useParams } from 'react-router';
import ThreatFormDrawer from './threatForm';
import { ExclamationCircleOutlined } from '@ant-design/icons'


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


const ThreatFeeds = ({
  getList,
  threatList,
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
    feed_showing = '20',
    feed_page_no = 1,
    feed_subject,
    sort = undefined,
  } = queryString.parse(query);

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


  const [showing, setShowing] = useState(feed_showing);
  const [searchText, setSearchText] = useState(feed_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useEffect(() => {
    getPublisherList();
  }, [query] || []);

  useEffect(() => {
    if (threatList?.listData?._meta) {
      setTotalCount(threatList.listData._meta.totalCount);
      setCurrentPage(threatList.listData._meta.currentPage);
    }
  }, [threatList]);

  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);
  const columns = [
    {
      title: '#',
      dataIndex: 'feed_id',
      editable: false,
      key: (text, record, index) => record?.feed_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'feed_title',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.feed_id,
      render: (text, record, index) => record?.feed_title,
      width: '45%',
    },
    {
      title: 'URL',
      dataIndex: 'feed_url',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.feed_id,
      render: (text, record, index) => record?.feed_url,
      width: '45%',
    },
    {
      title: 'Actions',
      dataIndex: 'org_actions',
      render: (text, record, index) => {
        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-rss-feed"))){
          const updateRssFeed=  {
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
          moreItems.push(updateRssFeed);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-rss-feed"))){
          const deleteRssFeed={
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.feed_id)
          };
          moreItems.push(deleteRssFeed);
        }

        if (moreItems.length !== 0) {
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
    }
  ];

  const getPublisherList = () => {
    const myArrayQry = mapQueryWithApi(query);
    getList({ queryItem: myArrayQry, path });
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
      if (parsedQuery.feed_page_no) {
        queryObject.payload.page = parsedQuery.feed_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.feed_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.feed_subject;
      }
      if (parsedQuery.feed_showing) {
        queryObject.payload['per-page'] = parsedQuery.feed_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'RssFeedSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'RssFeedSearch[search]=' + searchText;
    }

    return myArrayQry;
  }

  const onPageChange = pageNumber => {
    handleChange('feed_page_no', pageNumber);
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
      if (name == 'feed_showing') {
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

  const handleSubmit = values => {
    const myQuery = mapQueryWithApi(query);
    if (!isCreate) {
      updateList({ payload: values, id: record.feed_id, query: myQuery });
    } else {
      createList({ payload: values, query: myQuery });
    }
    setOpenDrawer(false);
    // getPublisherList();
    setRecord({});
  };
  return (
    <>
      <PageHeader
        title={'Thread Feed'}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-rss-feed"))) &&
          <SPButton
            title="Create Action I/O Types"
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
              handleChange('feed_subject', searchText);
            }}
            size="420px"
          />
        </Col>
        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={feed_showing}
            onChange={e => {
              handleChange('feed_showing', e.key);
            }}
          />
        </Col>
      </Row>
      <SPTable
        columns={columns}
        dataSource={threatList?.listData?.items}
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
        isLoading={threatList?.loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} RSS Feed`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <ThreatFormDrawer
          isCreate={isCreate}
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
  threatList: state.administration.automation,
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(automationThreatList(payload)),
  updateList: payload => dispatch(updateAutomationThreatList(payload)),
  deleteList: payload => dispatch(deleteAutomationThreatList(payload)),
  createList: payload => dispatch(createAutomationThreatList(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ThreatFeeds);
