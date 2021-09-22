import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  administratorCasesNcissCategoryList,
  administratorCasesNcissCreate,
  administratorCasesNcissDelete,
  administratorCasesNcissList,
  administratorCasesNcissUpdate
} from '../../../../../../../../../actions/administration';
import { useHistory } from 'react-router-dom'
import { Modal } from 'antd'
import queryString from 'query-string';
import PlusIcon from '../../../../../../../../../assets/svgIcon/plusIcon';
import PageHeader from '../../../../../../../../layout/pageHeader';
import SPButton from '../../../../../../../../../components/SPButton';
import SPDrawer from '../../../../../../../../../components/SPDrawer';
import SPSearch from '../../../../../../../../../components/SPSearch';
import SPSelect from '../../../../../../../../../components/SPSelect';
import SPTable from '../../../../../../../../../components/SPTable';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Dustbin from '../../../../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../../../../assets/svgIcon/pencil';
import SPSingleSelectDropdown from '../../../../../../../../../components/SPSingleSelectDropdown';
import IncidentSideDrawer from './Components/IncidentScoringSidebar'
import AuthTokenHOC from '../../../../../../../../../HOCs/AuthTokenHOC';

const { confirm } = Modal;
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

const IncidentScoring = ({ onChangeView, onGetCasesNcissList, casesNcissList, loading, onGetNcissCategory, casesNcissDropDownList, onUpdateNcissAction, onCreateNcissAction, userProfile, onDeleteNciss,access }) => {
  const [showCreateAdversory, setshowCreateAdversory] = useState(false);
  const [showEditSidebar, setshowEditSidebar] = useState(false);
  const [totalCount, setTotalCount] = useState(1);
  const [ncssisDropDownListItem, setNcssisDropDownListItem] = useState([])
  const [ncissItemList, setNcissItemList] = useState([]);
  const [ncissCategory, setNcissCategory] = useState([]);
  const [record, setRecord] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [showing, setShowing] = useState('20');
  const [query, setQuery] = useState(location.search);
  const history = useHistory();

  useEffect(() => {
    onGetNcissCategory();
  }, []);

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete the case?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myQuery = mapQueryWithApi(query)
        onDeleteNciss(key, myQuery);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const {
    nom_showing = '20',
    nom_page_no = 1,
    nom_subject,
    nsc_id = "1",
    sort = undefined,
  } = queryString.parse(query);

  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };

  const [searchText, setSearchText] = useState(nom_subject);

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        NcisOptionsMappingSearch: {},
        QueryString: '',
      };
      if (parsedQuery.nom_subject) {
        queryObject.NcisOptionsMappingSearch.search = parsedQuery.nom_subject;
      }
      if (parsedQuery.nom_page_no) {
        queryObject.payload.page = parsedQuery.nom_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.nsc_id) {
        queryObject.NcisOptionsMappingSearch.nsc_id = parsedQuery.nsc_id;
      }
      if (parsedQuery.nom_showing) {
        queryObject.payload['per-page'] = parsedQuery.nom_showing;
      }
      const { NcisOptionsMappingSearch } = queryObject;
      if (Object.keys(NcisOptionsMappingSearch).length !== 0) {
        Object.entries(NcisOptionsMappingSearch).forEach(([key, val]) => {
          myArrayQry += 'NcisOptionsMappingSearch[' + key + ']=' + val + '&';
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
    const listData = casesNcissDropDownList?.listData;
    const NcissDatalist = [];
    if (listData && _.isObject(listData)) {
      Object.entries(listData).map(([key, value]) => {
        NcissDatalist.push({
          key: String(key),
          value: String(value),
        })
      })
    }
    setNcssisDropDownListItem(NcissDatalist)
  }, [casesNcissDropDownList]);

  useEffect(() => {
    const myArrayQry = mapQueryWithApi(query);
    onGetCasesNcissList({ queryItem: myArrayQry });
  }, [query]);

  useEffect(() => {
    if (casesNcissList) {
      if (Object.keys(casesNcissList).length !== 0) {
        setNcissItemList(casesNcissList?.items);
        setTotalCount(casesNcissList?._meta.totalCount);
        setCurrentPage(casesNcissList?._meta.currentPage);
      }
    }
  }, [casesNcissList]);

  useEffect(() => {
    const queryObject = {
      nom_subject: nom_subject,
      ...(nom_showing !== '20' && { nom_showing: nom_showing }),
      ...(nom_page_no !== 1 && { nom_page_no: nom_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(nom_showing);
  }, [searchText, nom_showing, nom_page_no]);

  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      if (value === 'all') {
        obj[name] = '';
      } else {
        obj[name] = value;
      }
      const str = queryString.stringify(obj);
      if (name == 'nom_showing') {
        setShowing(value);
      }
      handleQuery(str);
    }
  };
  const onPageChange = pageNumber => {
    handleChange('nom_page_no', pageNumber);
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
  const columns = [
    {
      title: '#',
      dataIndex: 'nsc_id',
      editable: false,
      key: (text, record, index) => record?.nsc_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'nom_name',
      editable: false,
      sorter: true
    },
    {
      title: 'Value',
      dataIndex: 'nom_value',
      editable: false,
      sorter: true
    },
    {
      title: 'NCISS Category',
      dataIndex: 'nsc_name',
      editable: false,
      sorter: true,
      render: (t, record, i) => record?.nsc?.nsc_name
    },
    {
      title: 'Actions',
      dataIndex: 'org_actions',
      render: (text, record, index) => {
        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-ncis-options-mapping"))){
          const updateNicsScoring=  {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              if (record) {
                setRecord(record);
              }
              setshowEditSidebar(true);
            },
          };
          moreItems.push(updateNicsScoring);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-ncis-options-mapping"))){
        const deleteNicsScoring=  {
               key: 'delete',
              label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.nom_id),
        };
        moreItems.push(deleteNicsScoring);
      }


  if (userProfile?.usr_api_organization === record?.nom_organization && moreItems.length !== 0) {
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

  const onCreateNciss = (data) => {
    const myArrayQry = mapQueryWithApi(query);
    onCreateNcissAction(data, myArrayQry)
    setshowCreateAdversory(false)
  }

  const onUpdateNciss = (id, values) => {
    const myArrayQry = mapQueryWithApi(query);
    onUpdateNcissAction(id, values, myArrayQry)
    setshowEditSidebar(false)
  }
  return (
    <>
      <PageHeader
        title="Incident Scoring"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || (access.includes("index-ncis-options-mapping") && access.includes("create-ncis-options-mapping") ))) &&
          <SPButton
            onButtonClick={() => setshowCreateAdversory(true)}
            title="Create Option"
            size="small"
          />,
          (access!==undefined && (access.includes("all-super-admin") || access.includes("index-ncis-scoring-categories" ))) &&
          <SPButton
            onButtonClick={() => {
              onChangeView('categories')
            }}
            title="NCISS Categories"
            size="small"
          />,
          (access!==undefined && (access.includes("all-super-admin") || access.includes("index-ncis-periority-colors" ))) &&
          <SPButton
            onButtonClick={() => onChangeView('periorities')}
            title="NCISS Periorities"
            size="small"
          />,
        ]}
      />
      <SPDrawer
        title="Create Category"
        isVisible={showCreateAdversory}
        drawerWidth={700}
        onClose={() => setshowCreateAdversory(false)}
      >
        <IncidentSideDrawer type="create" isVisible={showCreateAdversory} onCreateHandler={onCreateNciss} />
      </SPDrawer>
      <SPDrawer
        title="Edit Category"
        isVisible={showEditSidebar}
        drawerWidth={700}
        onClose={() => setshowEditSidebar(false)}
      >
        <IncidentSideDrawer type="edit" selectedRecord={record} isVisible={showEditSidebar} onUpdateHandler={onUpdateNciss} />
      </SPDrawer>

      <>
        <Row
          gutter={[19, 10]}
          style={{ marginTop: 23, marginBottom: 13, flexWrap: 'flex' }}
        >
          <Col>
            <SPSearch
              text={searchText}
              onChange={e => {
                setSearchText(e.target.value);
              }}
              onEnter={() => {
                handleChange('nom_subject', searchText);
              }}
              size="420px"
            />
          </Col>
          <Col>
            <SPSelect
              title="Selected"
              items={ncssisDropDownListItem}
              selected={nsc_id || "1"}
              onChange={e => {
                handleChange('nsc_id', e.key);
              }}
            />
          </Col>
          <Col>
            <SPSelect
              title="Showing"
              items={showingFilter}
              selected={nom_showing || 20}
              onChange={e => {
                handleChange('nom_showing', e.key);
              }}
            />
          </Col>
        </Row>
        <SPTable
          columns={columns}
          dataSource={ncissItemList}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          isLoading={loading}
          showingTill={nom_showing}
          handleTableChange={handleTableChange}
          currentShowing={
            currentPage === 1 ? currentPage : (currentPage - 1) * nom_showing + 1
          }
          currentPage={currentPage}
        />
      </>
    </>
  );
};

const mapStateToProps = state => {
  return {
    userProfile: state?.userStore?.userProfile?.data?.profile[0],
    casesNcissList: state.administration?.ncissList.listData,
    loading: state.administration.ncissList.loading,
    casesNcissDropDownList: state.administration?.casesNcissDropDownList
  };
};

const mapDispatchToProps = dispatch => ({
  onGetCasesNcissList: (...args) => dispatch(administratorCasesNcissList(...args)),
  onGetNcissCategory: () => dispatch(administratorCasesNcissCategoryList()),
  onUpdateNcissAction: (...args) => dispatch(administratorCasesNcissUpdate(...args)),
  onCreateNcissAction: (...args) => dispatch(administratorCasesNcissCreate(...args)),
  onDeleteNciss: (...args) => dispatch(administratorCasesNcissDelete(...args))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(IncidentScoring);

