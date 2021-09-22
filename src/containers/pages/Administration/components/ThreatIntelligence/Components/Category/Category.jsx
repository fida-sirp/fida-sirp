import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Dustbin from '../../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import {
  threatIntelCategoryList,
  createthreatIntelCategoryList,
  deletethreatIntelCategory,
  updatethreatIntelCategory,
} from '../../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../../components/SPTable';
import { DeleteBox } from '../../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../../components/SPDrawer';
import SPButton from '../../../../../../../components/SPButton';
import SPSearch from '../../../../../../../components/SPSearch';
import { Row, Col, Modal } from 'antd';
import { useHistory, useParams } from 'react-router';
import CategoryFormDrawer from './CategoryForm';
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
import PageHeader from '../../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../../assets/svgIcon/plusIcon';

const Category = ({
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
  }, [query] || []);

  useEffect(() => {
    if (categoryList?.listData?.items) {
      setTotalCount(categoryList?.listData?._meta?.totalCount);
      setCurrentPage(categoryList?.listData?._meta?.currentPage);
    }
  }, [categoryList]);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete Category?',
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
      dataIndex: 'adc_id',
      dataIndex1: 'adc_id',
      editable: false,
      key: (text, record, index) => record?.adc_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'adc_name',
      dataIndex1: 'adc_name',
      editable: false,
      sorter: true,
      width: '90%',
      key: (text, record, index) => record?.adc_id,
      render: (text, record, index) => record?.adc_name,
    },
    {
      title: 'Actions',
      dataIndex: 'adc_id',
      dataIndex1: 'adc_id',
      editable: false,
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-advisory-category"))){
          const updateAdvisoryCategory= {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setOpenDrawer(true);
              setIsCreate(false)
              setRecord(record);
            },
          };
          moreItems.push(updateAdvisoryCategory);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-advisory-category"))){
          const updateAdvisoryCategory= {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record.adc_id);
            },
          };
          moreItems.push(updateAdvisoryCategory);
        }

        if (userProfile?.usr_api_organization === record?.adc_organization && moreItems.length !== 0) {
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
      const str = queryString.stringify(obj);
      if (name == 'ica_showing') {
        setShowing(value);
      }
      handleQuery(str);
    }
  };

  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };

  const handleSubmit = async values => {
    if (!isCreate) {
      let payload = {
        values,
        id: record.adc_id,
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
        title="Category"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-advisory-category"))) &&
          <SPButton
            onButtonClick={() => {
              setIsCreate(true);
              setOpenDrawer(true);
            }}
            title="Create Category"
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
        currentPage={currentPage}
        isLoading={categoryList?.loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Category`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <CategoryFormDrawer
          isVisible={openDrawer}
          isCreated={isCreate}
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
  onGetList: payload => dispatch(threatIntelCategoryList(payload)),
  updateList: payload => dispatch(updatethreatIntelCategory(payload)),
  deleteList: payload => dispatch(deletethreatIntelCategory(payload)),
  createList: payload => dispatch(createthreatIntelCategoryList(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(Category);
