import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
  onDeleteListProductFeedback,
  onGetListOfProductFailedRegistrations,
  onGetListOfProductFeedback,
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
import { showingFilter } from '../../../constant';
import { Modal } from 'antd'
import { ReactComponent as ViewImg } from '../../../../../../assets/svgIcon/dashboard/view.svg';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ViewfeedBack from './ViewFeedback'
import PageHeader from '../../../../../layout/pageHeader';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import SPModal from '../../../../../../components/SPModal';

const Feedback = ({
  getList,
  deleteList,
  feedbackList,
  isLoading,
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
    perPage = '20',
    pageNo = 1,
    feed_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(perPage);
  const [searchText, setSearchText] = useState(feed_subject || '');
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );
  function showConfirm(key) {
    Modal.confirm({
      title: 'Are you sure you want to delete the Threat Intelligence?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      className: 'test',
      onOk() {
        const myArrayQry = mapQueryWithApi(query);
        deleteList(key, myArrayQry);
      },
      onCancel() { },
    });
  }


  useEffect(() => {
    getPublisherList();
  }, [query] || []);

  useEffect(() => {
    if (feedbackList) {
      console.log("feedbackList", feedbackList)
      setTotalCount(feedbackList?._meta?.totalCount);
      setCurrentPage(feedbackList?._meta?.currentPage);
    }
  }, [feedbackList]);

  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);
  
  const columns = [
    {
      title: '#',
      dataIndex: 'fdb_id',
      editable: false,
      key: (text, record, index) => record?.fdb_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Subject',
      dataIndex: 'fdb_subject',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.fdb_subject,
    },
    {
      title: 'Description',
      dataIndex: 'fdb_description',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.fdb_description,
    },
    {
      title: 'Created By',
      dataIndex: 'fdb_created_by',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.fdbCreatedBy?.usr_name,
    },
    {
      title: 'Organization',
      dataIndex: 'fdb_organization',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.fdbOrganization?.org_name,
    },
    {
      title: 'Actions',
      dataIndex: 'feed_id',
      editable: false,
      render: (text, record, index) => {
        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("view-feedback"))){
          const viewFeedback= {
            key: 'view',
            label: 'View',
            icon: <ViewImg className="view-img" />,
            onClickItem: () => {
              setOpenDrawer(true);
              setRecord(record);
            },
          };
          moreItems.push(viewFeedback);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-feedback"))){
          const deleteFeedback={
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record.fdb_id);
            },
          };
          moreItems.push(deleteFeedback);
        }


        if (userProfile?.usr_api_organization === record?.fdb_organization && moreItems.length !==0 ) {
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
      if (parsedQuery.pageNo) {
        queryObject.payload.page = parsedQuery.pageNo;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.feed_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.feed_subject;
      }
      if (parsedQuery.perPage) {
        queryObject.payload['per-page'] = parsedQuery.perPage;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'FeedbackSearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'administration') {
      myArrayQry += 'FeedbackSearch[search]=' + searchText;
    }

    return myArrayQry;
  }

  const onPageChange = pageNumber => {
    handleChange('pageNo', pageNumber);
    window.scrollTo(0, 0);
  };

  const handleTableChange = (pagination, filters, sorter) => {

    let columnIndex = sorter.field;
    if (sorter.order === 'ascend') {
      // console.log({ columnIndex });
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
      if (name == 'perPage') {
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

  return (
    <>
      <PageHeader
        title="Feedback"
      />
      <Row gutter={[19, 25]}>
        <Col
          span={12}
          style={{ display: "inherit" }}
        >
          <div>
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
          </div>
          <div style={{ marginLeft: 20 }}>
            <SPSelect
              title="Showing"
              items={showingFilter}
              selected={perPage}
              onChange={e => {
                handleChange('perPage', e.key);
              }}
            />
          </div>
          
        </Col>
      </Row>
      <SPTable
        columns={columns}
        dataSource={feedbackList?.items}
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
        isLoading={isLoading}
      />

      <SPModal
        title="View Feedback"
        visible={openDrawer}
        onOk={() => {}}
        onCancel={() => {
          setOpenDrawer(false);
          setRecord({});
        }}
        width={810}
        footer={null}
      >
        <ViewfeedBack record={record} />
      </SPModal>
    </>
  );
};

const mapStateToProps = state => ({
  feedbackList: state.administration?.productSettingList?.feedback,
  isLoading: state.administration?.productSettingList?.loading,
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
});

const mapDispatchToProps = dispatch => ({
  getList: (...args) => dispatch(onGetListOfProductFeedback(...args)),
  deleteList: (...args) => dispatch(onDeleteListProductFeedback(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Feedback);
