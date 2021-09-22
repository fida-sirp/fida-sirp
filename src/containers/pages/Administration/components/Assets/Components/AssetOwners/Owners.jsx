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
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
import PageHeader from '../../../../../../layout/pageHeader';
import { DeleteBox } from '../../AssetDetails/StyledComponents';
import OwnerForm from '../../AssetDetails/components/AssetOwnerForm';

import { connect } from 'react-redux';
import {
  createOwner,
  deleteOwner,
  getOwnersList,
  updateOwnerList,
} from '../../../../../../../actions/administration';
import { useHistory } from 'react-router';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const showingFilter = [
  {
    key: '2',
    value: '2',
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

const Owner = ({
  getList,
  loading,
  ownersList,
  deleteList,
  updateList,
  createList,
  userProfile,
  access
}) => {
  const [totalCount, setTotalCount] = useState(1);
  const [showCreateAdversory, setshowCreateAdversory] = useState(false);
  const [showing, setShowing] = useState('20');
  const [updateOwner, setUpdateOwner] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ownerDataList, setOwnerList] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [query, setQuery] = useState(location.search);
  const [updateInitValue, setUpdateInitValue] = useState({
    usr_name: '',
    usr_email: '',
    usr_phone_number: '',
    usr_mobile_number: '',
    usr_designation: '',
    id: '',
  });
  const { confirm } = Modal;
  const history = useHistory();
  const myArrayQry = mapQueryWithApi(query);

  const {
    usr_show = '20',
    usr_page_no = 1,
    usr_subject,
    sort = undefined,
  } = queryString.parse(query);

  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };

  const [searchText, setSearchText] = useState(usr_subject);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete this?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteList({ id: key, queryItem: myArrayQry });
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const ownerColumns = [
    {
      title: '#',
      dataIndex: 'usr_id',
      editable: false,
      key: (text, record, index) => record.usr_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'usr_name',
      editable: false,
      width: '45%',
      key: (text, record, index) => record.usr_id,
      render: (text, record, index) => record.usr_name,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: false,
      width: '45%',
      key: (text, record, index) => record.usr_id,
      render: (text, record, index) => record.usr_email,
    },
    {
      title: 'Actions',
      dataIndex: 'playbook_actions',
      render: (text, record, index) => {
        const moreItems = [];
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("update-owners"))) {
          const updateOwners =  {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setUpdateOwner(true);
              setIsCreate(false);
              setUpdateInitValue({
                usr_phone_number: record.usr_phone_number,
                usr_email: record.usr_email,
                usr_name: record.usr_name,
                usr_mobile_number: record.usr_mobile_number,
                usr_designation: record.usr_designation,
                id: record.usr_id,
              });
            },
          };
          moreItems.push(updateOwners);
        }
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("delete-owners"))) {
          const deleteOwners =  {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.usr_id)
          };
          moreItems.push(deleteOwners);
        }

        if (moreItems.length !== 0) {
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
        OwnerSearch: {},
        QueryString: '',
      };
      if (parsedQuery.usr_subject) {
        queryObject.OwnerSearch.search = parsedQuery.usr_subject;
      }
      if (parsedQuery.usr_page_no) {
        queryObject.payload.page = parsedQuery.usr_page_no;
      }

      if (parsedQuery.usr_show) {
        queryObject.payload['per-page'] = parsedQuery.usr_show;
      }
      const { OwnerSearch } = queryObject;
      if (Object.keys(OwnerSearch).length !== 0) {
        Object.entries(OwnerSearch).forEach(([key, val]) => {
          myArrayQry += 'OwnerSearch[' + key + ']=' + val + '&';
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
    getList({ queryItem: myArrayQry })
  }, [query]);

  useEffect(() => {
    if (ownersList) {
      if (Object.keys(ownersList).length !== 0) {
        setOwnerList(ownersList?.data.items);
        setTotalCount(ownersList?.data?._meta.totalCount);
        setCurrentPage(ownersList?.data?._meta.currentPage);
      }
    }
  }, [ownersList]);

  useEffect(() => {
    const queryObject = {
      usr_subject: usr_subject,
      ...(usr_show !== '20' && { usr_show: usr_show }),
      ...(usr_page_no !== 1 && { usr_page_no: usr_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(usr_show);
  }, [searchText, usr_show, usr_page_no]);

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };

  const onPageChange = pageNumber => {
    handleChange("usr_page_no", pageNumber);
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

  const handleUpdate = async values => {
    const payload = {};
    if (!isCreate) {
      payload.id = updateInitValue.id;
      payload.data = values;
      payload.queryItem = myArrayQry;
      await updateList(payload);
    } else {
      const { id, ...data } = values;
      payload.data = data;
      payload.queryItem = myArrayQry;
      await createList(payload);
    }
    setUpdateInitValue({
      usr_name: '',
      usr_email: '',
      usr_phone_number: '',
      usr_mobile_number: '',
      usr_designation: '',
      id: '',
    });
    setIsCreate(false);
    setUpdateOwner(false);
    getList();
  };
  return (
    <>
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Owner`}
        isVisible={updateOwner}
        onClose={() => {
          setUpdateOwner(false);
        }}
        drawerWidth={800}
      >
        <OwnerForm
          isCreate={isCreate}
          isVisible={updateOwner}
          initialValues={updateInitValue}
          onFormSubmit={handleUpdate}
        />
      </SPDrawer>
      <PageHeader
        title="Owners"
        options={[
          (access !== undefined && (access.includes("all-super-admin") || access.includes("create-owners"))) &&
          <SPButton
            onButtonClick={() => {
              setUpdateOwner(true);
              setIsCreate(true);
              setUpdateInitValue({
                usr_name: '',
                usr_email: '',
                usr_phone_number: '',
                usr_mobile_number: '',
                usr_designation: '',
                id: '',
              });
            }}
            title="Create Owner"
            size="small"
            image={<PlusIcon />}
          />,
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
            onEnter={() => {
              handleChange('usr_subject', searchText);
            }}
            size="500px"
          />
        </Col>
        <Col>
          <SPSelect
            title="Showing"
            items={showingFilter}
            selected={usr_show}
            onChange={e => {
              handleChange('usr_show', e.key);
            }}
          />
        </Col>
      </Row>

      <>
        <SPTable
          columns={ownerColumns}
          dataSource={ownerDataList}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          showingTill={usr_show}
          handleTableChange={handleTableChange}
          currentShowing={currentPage}
          currentPage={currentPage}
          isLoading={loading}
        />
      </>
    </>
  );
};

const mapStateToProps = state => ({
  ownersList: state.administration.owners.listData,
  loading: state.administration.owners.loading,
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(getOwnersList(payload)),
  updateList: payload => dispatch(updateOwnerList(payload)),
  deleteList: payload => dispatch(deleteOwner(payload)),
  createList: payload => dispatch(createOwner(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Owner);
