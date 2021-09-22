import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import PageHeader from '../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import {
  onGetWidgetList,
  onCreateWidgetList,
  onDeleteWidgetList,
  onUpdateWidgetList,
} from '../../../../../../actions/administration';
import { Modal } from 'antd'
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import { DeleteBox } from '../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import SPSearch from '../../../../../../components/SPSearch';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router';
import { showingFilter } from '../../../constant';
import SPSelect from '../../../../../../components/SPSelect';
import WidgetForm from './WidgetForm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ReactComponent as ViewImg } from '../../../../../../assets/svgIcon/dashboard/view.svg';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';

const Widgets = ({
  getList,
  widgetList,
  isLoading,
  updateList,
  deleteList,
  createList,
  userProfile,
  access
}) => {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [record, setRecord] = useState({});
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(location.search);
  const { path } = useParams();

  const {
    perPage = '20',
    feed_page_no = 1,
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
    if (widgetList) {
      setTotalCount(widgetList?._meta?.totalCount);
      setCurrentPage(widgetList?._meta?.currentPage);
    }
  }, [widgetList]);

  useEffect(() => {
    if (!openDrawer) setRecord({});
  }, [openDrawer]);

  const columns = [
    {
      title: '#',
      dataIndex: 'gra_id',
      editable: false,
      key: (text, record, index) => record?.gra_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Widget File Name',
      dataIndex: 'gra_name',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.gra_name,
    },
    {
      title: 'Group',
      dataIndex: 'feed_url',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.graGroup?.acg_id,
      render: (text, record, index) => record?.graGroup?.acg_name,
    },
    {
      title: 'Widget Title',
      dataIndex: 'gra_title',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.gra_title,
    },
    {
      title: 'Widget Description',
      dataIndex: 'gra_description',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.gra_description,
    },
    {
      title: 'Actions',
      dataIndex: 'gra_id',
      editable: false,
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-graphs"))){
          const updateGraphs= {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil/>,
            onClickItem: () => {
              setOpenDrawer(true);
              setRecord(record);
            },
          };
          moreItems.push(updateGraphs);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-graphs"))){
          const updateGraphs=  {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record?.gra_id)
            },
          };
          moreItems.push(updateGraphs);
        }

        if (moreItems.length !==0 ) {
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
      if (parsedQuery.feed_page_no) {
        queryObject.payload.page = parsedQuery.feed_page_no;
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

  const handleSubmit = async values => {
    const myArrayQry = mapQueryWithApi(query);
    if (record?.gra_id) {
      updateList(record?.gra_id, values, myArrayQry);
    } else {
      createList(values, myArrayQry);
    }
    setOpenDrawer(false);
    setRecord({});
  };
  return (
    <>
      <PageHeader
        title="Widgets"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-graphs"))) &&
          <SPButton
            title="Add Widgets"
            onButtonClick={async () => {
              setOpenDrawer(true);
            }}
            size="small"
            image={<PlusIcon />}
          />
        ]}
      />
      <Row gutter={[19, 25]}>
        <Col
          span={12}
          style={{ display: 'inherit' }}
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
        dataSource={widgetList?.items}
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
        isLoading={isLoading}
      />
      <SPDrawer
        title={`${record?.gra_id ? 'Update' : 'Create'} Widget`}
        isVisible={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          setRecord({});
        }}
      >
        <WidgetForm
          isEdit={record?.gra_id}
          isVisible={openDrawer}
          recordValue={record}
          submit={handleSubmit}
          closeDrawer={() => {
            setOpenDrawer(false);
            setRecord({});
          }}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  widgetList: state.administration?.productSettingList?.widgetList,
  isLoading: state.administration?.productSettingList?.loading,
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(onGetWidgetList(payload)),
  updateList: (...args) => dispatch(onUpdateWidgetList(...args)),
  deleteList: (...args) => dispatch(onDeleteWidgetList(...args)),
  createList: (...args) => dispatch(onCreateWidgetList(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Widgets);
