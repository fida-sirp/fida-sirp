import React, { useState, useEffect } from 'react';
import { Col, Row, Modal } from 'antd';
import queryString from 'query-string';
import Dustbin from '../../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../../assets/svgIcon/pencil';
import PlusIcon from '../../../../../../../assets/svgIcon/plusIcon';
import SPButton from '../../../../../../../components/SPButton';
import SPDrawer from '../../../../../../../components/SPDrawer';
import SPSearch from '../../../../../../../components/SPSearch';
import SPSelect from '../../../../../../../components/SPSelect';
import SPTable from '../../../../../../../components/SPTable';
import PageHeader from '../../../../../../layout/pageHeader';
import { DeleteBox } from '../../AssetDetails/StyledComponents';
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  createAssetDepartment,
  deleteDepartments,
  editAssetDepartment,
  getAssetDepartmentList,
} from '../../../../../../../actions/administration';
import { useHistory } from 'react-router';
import CreateDepartments from './create';
import EditDepartments from './Edit';
import { ExclamationCircleOutlined } from '@ant-design/icons';

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

const Departments = ({
  getAssetDepartmentList,
  assetDepartmentList,
  deleteDepartments,
  editAssetDepartment,
  createAssetDepartment,
  access,
}) => {


  const [totalCount, setTotalCount] = useState(1);
  const [showCreateDepartmentDrawer, setShowCreateDepartmentDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showing, setShowing] = useState('20');
  const history = useHistory();
  const [assetDepartmentListData, setAssetDepartmentListData] = useState([]);
  const { confirm } = Modal;
  const [query, setQuery] = useState(location.search);
  const [selectedDepartmentData, setSelectedDepartmentData] = useState();
  const [selectedOperatingSystemId, setSelectedOperatingSystemId] = useState();
  const [showeditDepartmentDrawer, setShoweditDepartmentDrawer] = useState(false);
  const myArrayQry = mapQueryWithApi(query);

  const {
    dep_show = '20',
    dep_page_no = 1,
    dep_subject,
    sort = undefined,
  } = queryString.parse(query);

  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };

  const [searchText, setSearchText] = useState(dep_subject);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete the case?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteDepartments({ id: key, queryItem: myArrayQry });
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const departmentColumns = [
    {
      title: '#',
      dataIndex: 'dep_id',
      editable: false,
    },
    {
      title: 'Name',
      dataIndex: 'dep_name',
      editable: false,
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'dep_email',
      editable: false,
      sorter: true,
    },
    {
      title: 'Created At',
      dataIndex: 'dep_created_at',
      editable: false,
      sorter: true,
    },
    {
      title: 'Modified At',
      dataIndex: 'dep_modified_at',
      editable: false,
      sorter: true,
    },
    {
      title: '',
      dataIndex: 'asset_delete',
      render: (text, record, index) => {



        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-departments"))){
          const updateDepartments =   {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setSelectedOperatingSystemId(record?.dep_id);
              setSelectedDepartmentData(record);
              setShoweditDepartmentDrawer(true);
            },
          };
          moreItems.push(updateDepartments);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-departments"))){
          const deleteDepartments =   {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record?.dep_id);
            },
          };
          moreItems.push(deleteDepartments);
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
    },
  ];

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        DepartmentsSearch: {},
        QueryString: '',
      };
      if (parsedQuery.dep_subject) {
        queryObject.DepartmentsSearch.search = parsedQuery.dep_subject;
      }
      if (parsedQuery.dep_page_no) {
        queryObject.payload.page = parsedQuery.dep_page_no;
      }

      if (parsedQuery.dep_show) {
        queryObject.payload['per-page'] = parsedQuery.dep_show;
      }

      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }

      const { DepartmentsSearch } = queryObject;
      if (Object.keys(DepartmentsSearch).length !== 0) {
        Object.entries(DepartmentsSearch).forEach(([key, val]) => {
          myArrayQry += 'DepartmentsSearch[' + key + ']=' + val + '&';
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

  useEffect(() => {
    const myArrayQry = mapQueryWithApi(query);
    getAssetDepartmentList({ queryItem: myArrayQry })
  }, [query]);

  useEffect(() => {
    if (assetDepartmentList?.listData) {
      if (Object.keys(assetDepartmentList?.listData).length !== 0) {
        setAssetDepartmentListData(assetDepartmentList?.listData?.data?.items);
        setTotalCount(assetDepartmentList?.listData?.data?._meta?.totalCount);
        setCurrentPage(assetDepartmentList?.listData?.data?._meta?.currentPage);
      }
    }
  }, [assetDepartmentList]);
  useEffect(() => {
    const queryObject = {
      dep_subject: dep_subject,
      ...(dep_show !== '20' && { dep_show: dep_show }),
      ...(dep_page_no !== 1 && { dep_page_no: dep_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(dep_show);
  }, [searchText, dep_show, dep_page_no]);

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };

  const onPageChange = pageNumber => {
    handleChange("dep_page_no", pageNumber);
    window.scrollTo(0, 0);
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

  const openCreateDepartmentDrawer = () => {
    setShowCreateDepartmentDrawer(true);
  };

  const closeCreateDepartmentDrawer = () => {
    setShowCreateDepartmentDrawer(false);
  };

  const closeeditDepartmentDrawer = () => {
    setShoweditDepartmentDrawer(false);
  };

  const createDepartment = (data) => {
    setShowCreateDepartmentDrawer(false);
    let formData = new FormData();
    formData.append('dep_name', data.dep_name);
    formData.append('dep_email', data.dep_email);
    createAssetDepartment({ data: formData, queryItem: myArrayQry });
  };

  const editDepartment = (data) => {
    setShoweditDepartmentDrawer(false);
    let formData = new FormData();
    formData.append('dep_name', data.dep_name);
    formData.append('dep_email', data.dep_email);
    editAssetDepartment({ id: selectedOperatingSystemId, data: formData, queryItem: myArrayQry });
  }

  return (
    <>
      <PageHeader
        title="Departments"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-departments"))) &&
          <SPButton
            onButtonClick={openCreateDepartmentDrawer}
            title="Create Department"
            size="small"
            image={<PlusIcon />}
          />,
        ]}
      />
      <SPDrawer
        title="Create Department"
        isVisible={showCreateDepartmentDrawer}
        onClose={closeCreateDepartmentDrawer}
      >
        <CreateDepartments
          isVisible={showCreateDepartmentDrawer}
          createDepartment={createDepartment}
          onCloseDrawer={closeCreateDepartmentDrawer}
        />
      </SPDrawer>

      <SPDrawer
        title="Update Department"
        isVisible={showeditDepartmentDrawer}
        onClose={closeeditDepartmentDrawer}
      >
        <EditDepartments
          isVisible={showeditDepartmentDrawer}
          onCloseDrawer={closeeditDepartmentDrawer}
          selectedDepartmentData={selectedDepartmentData}
          editDepartment={editDepartment}
        />
      </SPDrawer>

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
            onEnter={() => {
              handleChange('dep_subject', searchText);
            }}
            size="500px"
          />

        </Col>

        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={dep_show}
            onChange={e => {
              handleChange('dep_show', e.key);
            }}
          />
        </Col>{' '}
      </Row>
      <>
        <SPTable
          columns={departmentColumns}
          dataSource={assetDepartmentListData}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          showingTill={dep_show}
          handleTableChange={handleTableChange}
          currentShowing={currentPage}
          currentPage={currentPage}
          isLoading={assetDepartmentList?.loading}
        />
      </>
    </>
  );
};

const mapStateToProps = state => {
  return {
    assetDepartmentList: state.administration.assetDepartmentList,
    assetsSubGroupDropDownData: state.administration.assetsSubGroupDropDownData,
  }
}

const mapDispatchToProps = dispatch => ({
  getAssetDepartmentList: data =>
    dispatch(getAssetDepartmentList(data)),
  createAssetDepartment: (data) =>
    dispatch(createAssetDepartment(data)),
  deleteDepartments: (data) =>
    dispatch(deleteDepartments(data)),
  editAssetDepartment: (data) =>
    dispatch(editAssetDepartment(data)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(Departments);
