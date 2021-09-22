import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Dustbin from '../../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import {
  threatIntelThreatActorList,
  createThreatIntelThreatActor,
  deleteThreatInteThreatActor,
  updateThreatIntelThreatActor,
  associateGroupThreatActorList,
} from '../../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../../components/SPTable';
import { DeleteBox } from '../../../Assets/AssetDetails/StyledComponents';
import SPDrawer from '../../../../../../../components/SPDrawer';
import SPButton from '../../../../../../../components/SPButton';
import SPSearch from '../../../../../../../components/SPSearch';
import { Row, Col, Modal } from 'antd';
import { useHistory, useParams } from 'react-router';
import ThreatActorFormDrawer from "./ThreatActorForm";
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
import PageHeader from '../../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../../assets/svgIcon/plusIcon';
import SubCategoryFormDrawer from "../SubCategory/SubCategoryForm";
import { isEmpty } from 'lodash-es';

const ThreatActor = ({
  onGetList,
  threatActorList,
  updateList,
  deleteList,
  createList,
  getAssociateGroup,
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
  const [associateThreatActor, setAssociateThreatActor] = useState([]);
  const {
    tra_showing = '20',
    tra_page_no = 1,
    tra_name,
    sort = undefined,
  } = queryString.parse(query);

  const [showing, setShowing] = useState(tra_showing);
  const [searchText, setSearchText] = useState(tra_name);
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  useState(() => {
    getAssociateGroup();
  }, []);
  useEffect(() => {
    const myArrayQry = mapQueryWithApi(query);
    onGetList({ queryItem: myArrayQry, path });
  }, [query] || []);

  useEffect(() => {
    if (threatActorList?.listData?.items) {
      setTotalCount(threatActorList?.listData?._meta?.totalCount);
      setCurrentPage(threatActorList?.listData?._meta?.currentPage);
    }

    if (threatActorList?.threatActorList) {
      if (!isEmpty(threatActorList.threatActorList)) {
        const arr = [];
        Object.entries(threatActorList.threatActorList).map(([key, value], index) =>
            arr.push({
              key: key,
              value: key,
              label: value,
            })
        );
        setAssociateThreatActor(arr);
      }
    }
  }, [threatActorList]);






  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete Threat Actor?',
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
      dataIndex: 'tra_id',
      dataIndex1: 'tra_id',
      editable: false,
      key: (text, record, index) => record?.tra_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Associate Threat Actor',
      dataIndex: 'tra_associated_groups',
      dataIndex1: 'tra_associated_groups',
      editable: false,
      sorter: true,
      key: (text, record, index) => record?.tra_id,
      render: (text, record, index) =>
          handleAssociateThreatActorView(record?.tra_associated_groups),
      width: '45%',
    },
    {
      title: 'Name',
      dataIndex: 'tra_name',
      dataIndex1: 'tra_name',
      editable: false,
      sorter: true,
      width: '90%',
      key: (text, record, index) => record?.tra_id,
      render: (text, record, index) => record?.tra_name,
    },
    {
      title: 'Actions',
      dataIndex: 'tra_id',
      dataIndex1: 'tra_id',
      editable: false,
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-threat-actors"))){
          const updateThreatActor= {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setOpenDrawer(true);
              setIsCreate(false)
              setRecord(record);
            },
          };
          moreItems.push(updateThreatActor);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-threat-actors"))){
          const deleteThreatActor= {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => {
              showConfirm(record.tra_id);
            },
          };
          moreItems.push(deleteThreatActor);
        }
      //userProfile?.usr_api_organization === record?.tra_organization &&
        if ( moreItems.length !== 0) {
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

  const handleAssociateThreatActorView = index => {
    return associateThreatActor.map(data => {
      if (data.key == index) return data.label;
    });
  };



  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        applicationThreatActorSearch: {},
        QueryString: '',
      };
      if (parsedQuery.tra_page_no) {
        queryObject.payload.page = parsedQuery.tra_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.tra_name) {
        queryObject.applicationThreatActorSearch.search = parsedQuery.tra_name;
      }
      if (parsedQuery.tra_showing) {
        queryObject.payload['per-page'] = parsedQuery.tra_showing;
      }
      const applicationThreatActorSearch = queryObject?.applicationThreatActorSearch;
      if (Object.keys(applicationThreatActorSearch).length !== 0) {
        Object.entries(applicationThreatActorSearch).forEach(([key, val]) => {
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
    handleChange('tra_page_no', pageNumber);
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
      if (name == 'tra_showing') {
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
        id: record.tra_id,
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
        title="Threat Actor"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-threat-actors"))) &&
          <SPButton
            onButtonClick={() => {
              setIsCreate(true);
              setOpenDrawer(true);
            }}
            title="Create Threat Actor"
            size="small"
            image={<PlusIcon />}
          />,
        ]}
      />
      <SPTable
        columns={columns}
        dataSource={threatActorList?.listData?.items}
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
        isLoading={threatActorList?.loading}
      />
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Threat Actor`}
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <ThreatActorFormDrawer
          isVisible={openDrawer}
          isCreated={isCreate}
          recordValue={record}
          associateThreatActor={associateThreatActor}
          submit={handleSubmit}
          closeDrawer={() => setOpenDrawer(false)}
        />
      </SPDrawer>
    </>
  );
};

const mapStateToProps = state => ({
  threatActorList: state.administration.threatIntellList,
  userProfile: state?.userStore?.userProfile?.data?.profile[0],
});

const mapDispatchToProps = dispatch => ({
  getAssociateGroup: payload =>dispatch(associateGroupThreatActorList(payload)),
  onGetList: payload => dispatch(threatIntelThreatActorList(payload)),
  updateList: payload => dispatch(updateThreatIntelThreatActor(payload)),
  deleteList: payload => dispatch(deleteThreatInteThreatActor(payload)),
  createList: payload => dispatch(createThreatIntelThreatActor(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ThreatActor);
