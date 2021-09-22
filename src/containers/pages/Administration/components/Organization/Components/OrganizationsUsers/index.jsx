import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import PageHeader from '../../../../../../layout/pageHeader';
import {
  oraganizationUsers,
  oraganizationMembers,
  organizations,
  deleteOraganizationUser,
  createOraganizationUser,
  updateOraganizationUser,
} from '../../../../../../../actions/administration';
import PlusIcon from '../../../../../../../assets/svgIcon/plusIcon';

import queryString from 'query-string';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import SPSearch from '../../../../../../../components/SPSearch';
import SPSelect from '../../../../../../../components/SPSelect';
import SPTable from '../../../../../../../components/SPTable';
import Dustbin from '../../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../../assets/svgIcon/pencil';
import SPModal from '../../../../../../../components/SPModal';
import SPButton from '../../../../../../../components/SPButton';
import SPDrawer from '../../../../../../../components/SPDrawer';
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
import OraganizationUserModal from './Components/OraganizationUserModal';
import _ from 'lodash';

const OrganizationUser = ({
  onGetUsersOraganizationList,
  oraganizationUsersState,
  loading,
  OnGetOraganizationMembers,
  onGetOragnizations,
  oraganizationsList,
  oraganizationMemeberList,
  onDeleteOraganizationUser,
  onCreateOrganization,
  onUpdateOrganizationUser,
  oraganizationUsersTab,
  access,
}) => {
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showing, setShowing] = useState('20');
  const [selectedOraganaiationUser, setSelectedOraganizationUser] = useState(
    []
  );
  const history = useHistory();
  const [oraganizaionList, setOraganizaionList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { confirm } = Modal;
  const [query, setQuery] = useState(location.search);

  const {
    orgu_subject = '20',
    orgu_page_no = 1,
    sort = undefined,
  } = queryString.parse(query);
  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };
  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete the This?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myArrayQry = mapQueryWithApi(query);
        onDeleteOraganizationUser(key, myArrayQry);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const onOpenModal = () => {
    setShowModal(true);
  };
  const onCloseModal = () => {
    setShowModal(false);
  };
  const OnshowEditModal = () => {
    setShowEditModal(true);
  };
  const onCloseEditModal = () => {
    setShowEditModal(false);
  };

  useEffect(() => {
    OnGetOraganizationMembers();
    onGetOragnizations();
  }, []);

  useEffect(() => {
    const myArrayQry = mapQueryWithApi(query);
    onGetUsersOraganizationList({
      queryItem: myArrayQry,
    });
  }, [query]);

  useEffect(() => {
    if (oraganizationUsersState) {
      if (Object.keys(oraganizationUsersState).length !== 0) {
        setOraganizaionList(oraganizationUsersState?.items);
        setTotalCount(oraganizationUsersState?.items?.length);
      }
    }
  }, [oraganizationUsersState]);



  const renderOraganization = data => {
    if (data && _.isObject(data)) {
      return Object.entries(data).map(([key, value]) => {
        return <div style={{ marginTop: 10 }}>
          {value}
        </div>;
      });
    }
    return [];
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ogu_id',
      editable: false,
      key: (text, record, index) => record.ogu_id,
    },
    {
      title: 'Organizations',
      dataIndex: 'ogu_organizations',
      editable: false,
      sorter: true,
      width: 354,
      render: (text, record, index) =>
        renderOraganization(record?.selectedOrganizations),
    },
    {
      title: 'User',
      dataIndex: 'ogu_userId',
      editable: false,
      sorter: true,
      render: (text, record, index) => record?.oguUser?.usr_name || "(not set)",
    },
    {
      title: 'Created',
      dataIndex: 'org_created_at',
      editable: false,
      sorter: true
    },
    {
      title: 'Actions',
      dataIndex: 'playbook_actions',
      render: (text, record, index) => {
        const moreItems = [];
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("update-organizations-users"))) {
          const selectedOrganizationUser = {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil/>,
            onClickItem: () => {
              OnshowEditModal();
              setSelectedOraganizationUser(record);
            },
          };
          moreItems.push(selectedOrganizationUser);
        }
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("delete-organizations-users"))) {
          const deleteOrganizationUser = {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin/>,
            onClickItem: () => {
              showConfirm(record.ogu_id);
            },
          };
          moreItems.push(deleteOrganizationUser);
        }

      if(moreItems.length !== 0){
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
        OrganizationsSearch: {},
        QueryString: '',
      };
      if (parsedQuery.orgu_page_no) {
        queryObject.payload.page = parsedQuery.orgu_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }

      if (parsedQuery.orgu_subject) {
        queryObject.payload['per-page'] = parsedQuery.orgu_subject;
      }
      const { OrganizationsSearch } = queryObject;
      if (Object.keys(OrganizationsSearch).length !== 0) {
        Object.entries(OrganizationsSearch).forEach(([key, val]) => {
          myArrayQry += 'OrganizationsSearch[' + key + ']=' + val + '&';
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
    const queryObject = {
      ...(orgu_subject !== '20' && { orgu_subject: orgu_subject }),
      ...(orgu_page_no !== 1 && { orgu_page_no: orgu_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(orgu_subject);
  }, [orgu_subject, orgu_page_no]);

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };

  const onPageChange = pageNumber => {
    handleChange('orgu_page_no', pageNumber);
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
  const onUpdateOrgUser = (id, values) => {
    const myArrayQry = mapQueryWithApi(query);
    onUpdateOrganizationUser(id, values, myArrayQry);
  };
  const createOraganizationUser = values => {
    const myArrayQry = mapQueryWithApi(query);
    onCreateOrganization(values, myArrayQry);
  };

  return (
    <>

      <PageHeader
        title={"Organization Users"}
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-organizations-users"))) ? <SPButton
            title="Create Organization User"
            onButtonClick={onOpenModal}
            size="small"
            image={<PlusIcon />}
          /> : '',
        ]}
      />
      <SPDrawer
        title={`Create Organization User`}
        isVisible={showModal}
        drawerWidth={800}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <OraganizationUserModal
          type="create"
          createOraganizationUser={createOraganizationUser}
          isVisible={showModal}
          onClose={() => onCloseModal()}
          oraganizationMemeberList={oraganizationMemeberList}
          oraganizationsList={oraganizationsList}
          selectedOraganaiationUser={selectedOraganaiationUser}
        />
      </SPDrawer>

      <SPDrawer
        title="Edit Organization User"
        isVisible={showEditModal}
        drawerWidth={800}
        onClose={() => {
          setShowEditModal(false);
        }}
      >
        <OraganizationUserModal
          isVisible={showEditModal}
          updateOraganiztaionUser={onUpdateOrgUser}
          oraganizationMemeberList={oraganizationMemeberList}
          oraganizationsList={oraganizationsList}
          onClose={() => onCloseEditModal()}
          type="edit"
          selectedOraganaiationUser={selectedOraganaiationUser}
        />
      </SPDrawer>
      <SPTable
        columns={columns}
        dataSource={oraganizaionList}
        onPageChange={onPageChange}
        isLoading={loading}
        emptyText="No Data"
        currentPage={currentPage}
        totalRecords={totalCount}
        handleTableChange={handleTableChange}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * orgu_subject + 1
        }
        showingTill={orgu_subject}
      />
    </>
  );
};

const mapStateToProps = state => ({
  oraganizationUsersState: state.administration.organizationsUsers.listData,
  oraganizationUsersTab: state.administration.organizationsUsers,
  loading: state.administration.organizationsUsers.loading,
  oraganizationMemeberList: state.administration?.organizationMembers,
  oraganizationsList: state.administration.allOrganizationsList,
});

const mapDispatchToProps = dispatch => ({
  onGetUsersOraganizationList: (...args) =>
    dispatch(oraganizationUsers(...args)),
  onDeleteOraganizationUser: (...args) =>
    dispatch(deleteOraganizationUser(...args)),
  onGetOragnizations: () => dispatch(organizations()),
  OnGetOraganizationMembers: () => dispatch(oraganizationMembers()),
  onCreateOrganization: (...args) => dispatch(createOraganizationUser(...args)),
  onUpdateOrganizationUser: (...args) =>
    dispatch(updateOraganizationUser(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(OrganizationUser);
