import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Dustbin from '../../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import {
  deletethreatIntelCategory,
  getThreatDispositionList,
  updateThreatDisposition,
  createThreatDisposition,
  deleteThreatDisposition,
} from '../../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../../components/SPTable';
import { DeleteBox } from '../../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../../components/SPDrawer';
import SPButton from '../../../../../../../components/SPButton';
import SPSearch from '../../../../../../../components/SPSearch';
import { Row, Col, Modal } from 'antd';
import { useHistory, useParams } from 'react-router';
import DispositionFormDrawer from './DispositionForm';
import PageHeader from '../../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../../assets/svgIcon/plusIcon';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';

const Disposition = ({
  onGetList,
  categoryList,
  updateList,
  deleteList,
  createList,
  severityList,
  getSeverityList,
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
    tca_showing = '20',
    tca_page_no = 1,
    tca_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(tca_showing);
  const [searchText, setSearchText] = useState(tca_subject);
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useEffect(() => {
    const myArrayQry = mapQueryWithApi(query);
    onGetList({ queryItem: myArrayQry, path });
    // onGetWorkflowList();
  }, [query] || []);

  useEffect(() => {
    if (categoryList?.listData?.data) {
      setTotalCount(categoryList.listData._meta.totalCount);
      setCurrentPage(categoryList.listData._meta.currentPage);
    }
  }, [categoryList]);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete Disposition?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteList({ id: key });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'add_id',
      dataIndex1: 'add_id',
      editable: false,
      key: (text, record, index) => record?.add_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'add_name',
      dataIndex1: 'add_name',
      editable: false,
      sorter: true,
      width: '90%',
      key: (text, record, index) => record?.add_id,
      render: (text, record, index) => record?.add_name,
    },
    {
      title: 'Actions',
      dataIndex: 'add_id',
      dataIndex1: 'add_id',
      editable: false,
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-advisory-disposition"))){
          const updateAdvisoryDisposition={
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setIsCreate(false)
              setOpenDrawer(true);
              setRecord(record);
            },
          };
          moreItems.push(updateAdvisoryDisposition);
        }

        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-advisory-disposition"))){
          const deleteAdvisoryDisposition={
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record.add_id);
            },
          };
          moreItems.push(deleteAdvisoryDisposition);
        }

        if (userProfile?.usr_api_organization === record?.add_organization && moreItems.length !== 0 ) {
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

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        applicationCategorySearch: {},
        QueryString: '',
      };
      if (parsedQuery.tca_page_no) {
        queryObject.payload.page = parsedQuery.tca_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.tca_subject) {
        queryObject.applicationCategorySearch.search = parsedQuery.tca_subject;
      }
      if (parsedQuery.tca_showing) {
        queryObject.payload['per-page'] = parsedQuery.tca_showing;
      }
      const applicationCategorySearch = queryObject?.applicationCategorySearch;
      if (Object.keys(applicationCategorySearch).length !== 0) {
        Object.entries(applicationCategorySearch).forEach(([key, val]) => {
          myArrayQry += 'VulnerabilitiesListSearch[' + key + ']=' + val + '&';
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

  const onPageChange = pageNumber => {
    handleChange('tca_page_no', pageNumber);
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
      if (name == 'tca_showing') {
        setShowing(value);
      }
      handleQuery(str);
    }
  };

  const handleQuery = qs => {
    if (activeOption !== 'all') {
      history.push(
        '/administration?active_tab=vulnerability_management&' +
        activeOption +
        '?' +
        qs
      );
    } else {
      history.push('/administration?active_tab=vulnerability_management&' + qs);
    }
    setQuery(qs);
  };

  const handleSubmit = async values => {
    if (!isCreate) {
      let payload = {
        values,
        id: record.add_id,
      };
      await updateList(payload);
    } else await createList({ payload: values });
    await setOpenDrawer(false);
    await setIsCreate(false);
    await setRecord({});
  };
  return (
    <>
      <PageHeader
        title="Disposition"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-advisory-disposition"))) &&
          <SPButton
            onButtonClick={() => {
              setIsCreate(true);
              setOpenDrawer(true);
            }}
            title="Create Disposition"
            size="small"
            image={<PlusIcon />}
          />,
        ]}
      />
      <SPTable
        columns={columns}
        dataSource={categoryList?.listData?.items}
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
        isLoading={categoryList?.loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Disposition`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <DispositionFormDrawer
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
  categoryList: state.administration.threatIntellList,
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
});

const mapDispatchToProps = dispatch => ({
  onGetList: payload => dispatch(getThreatDispositionList(payload)),
  updateList: payload => dispatch(updateThreatDisposition(payload)),
  deleteList: payload => dispatch(deleteThreatDisposition(payload)),
  createList: payload => dispatch(createThreatDisposition(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Disposition);
