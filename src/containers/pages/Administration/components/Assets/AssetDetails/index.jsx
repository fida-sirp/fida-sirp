import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { Row, Col, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
// import './threat-intelligence.css';
import { connect, useSelector } from 'react-redux';
import filter from 'lodash/filter';
import queryString from 'query-string';
import concat from 'lodash/concat';
import PageHeader from '../../../../../layout/pageHeader';
import SPCog from '../../../../../../components/SPCog';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';

import { addAssetBtn, DeleteBox } from './StyledComponents';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import SPSearch from '../../../../../../components/SPSearch';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import SPPageFilters from '../../../../../../components/SPPageFilters';
import SPRiskTag from '../../../../../../components/SPRiskTag';
import SPSelect from '../../../../../../components/SPSelect';
import SPManageFilters from '../../../../../../components/SPManageFilters';
import SPTable from '../../../../../../components/SPTable';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import EyeIconView from '../../../../../../assets/svgIcon/eyeIcon/eye-view';
import SPDrawer from '../../../../../../components/SPDrawer';
import EyeIcon from '../../../../../../assets/svgIcon/eyeIcon';
// import EditTicket from './components/editTicket';
import SPButton from '../../../../../../components/SPButton';
import {
  createAdvisoryAction,
  deleteData,
  getDisposition,
  threatIntelligenceStore,
  threatIntelligenceStoreResetAfterCreate,
  threatIntelligenceStoreResetAfterUpdate,
  updateAdvisory,
} from '../../../../../../actions/threatIntelligence';
import BusinessGroup from '../BusinessGroup';
import AssetGroups from '../Components/AssetGroups/AssetGroups';
import AssetSubGroups from '../AssetSubGroups';
import AssetType from '../AssetType';
import AssetValue from '../AssetValue';
import Classification from '../Classification';
import AssetOS from '../OS';
import AssetOwner from '../Owners';
import AssetDepartment from '../Departments';
import { listDispositions } from '../../../../../../actions/dispositions';
// import EditTicket from '../../editTicket';

const pageFilterOption = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'pending',
    value: 'Pending',
  },
  {
    key: 'release',
    value: 'Release',
  },
  {
    key: 'threatIntelligenceCases',
    value: 'Threat Intelligence Cases',
  },
];

const manageFilter = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'severity',
    value: 'severity',
  },
  {
    key: 'disposition',
    value: 'Disposition',
  },
  {
    key: 'showing',
    value: 'Showing',
  },
];

const severityFilter = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'high',
    value: 'High',
  },
  {
    key: 'medium',
    value: 'Medium',
  },
  {
    key: 'low',
    value: 'Low',
  },
];

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

const statusFilter = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'Open',
    value: 'Open',
  },
  {
    key: 'Close',
    value: 'Close',
  },
];

function AssetDetails({
  selectedSubTab,
  threatIntelligenceStore,
  threatIntelligenceStoreAction,
  deleteDataAction,
  listDispositionsAction,
  onGetDisposition,
  disposition,
  updateDetailsActions,
  threatIntelligenceUpdateAdversory,
  threatIntelligenceCreateAdvosryStoreAction,
  createAdvisoryActionDispatcher,
  threatIntelligenceCreateAdvisory,
}) {
  const history = useHistory();
  // const { confirm } = Modal;
  const [query, setQuery] = useState(location.search);
  const [mypage, setMypage] = useState(1);
  const [showing, setShowing] = useState('20');
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [selectedThreatIntelligence, setThreatIntelligence] = useState({});
  const [originData, setOriginData] = useState([
    {
      iti_id: '1',
      name: 'test',
    },
  ]);
  const [assetTypeTableData, setAssetTypeTableData] = useState([
    {
      iti_id: '1',
      name: 'test',
      iti_assets: '192.168.10.163',
      iti_assets_value: 'Low',
      iti_owner: 'Omar',
      iti_department: 'Information Technology',
    },
  ]);
  const [totalCount, setTotalCount] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateAdversory, setshowCreateAdversory] = useState(false);
  const [isCreae] = useState(false);
  const { path } = useParams();

  const onCreateDrawerOpen = () => {
    setIsCreateDrawerVisible(true);
  };
  const onCreateDrawerClose = () => {
    setIsCreateDrawerVisible(false);
  };

  // For the Create Adversory
  const onCreateAdversoryOpen = () => {
    setshowCreateAdversory(true);
  };
  const onCreateAdversoryClose = data => {
    setshowCreateAdversory(false);
  };
  function onEditThreatIntelligence(selectedThreatIntelligence) {
    setThreatIntelligence(selectedThreatIntelligence);
    onCreateDrawerOpen();
  }

  function showConfirm(key) {
    Modal.confirm({
      title: 'Are you sure you want to delete the Threat Intelligence?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      className: 'test',
      onOk() {
        deleteDataAction(key, mypage);
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }

  const assetGroupColumns = [
    {
      title: '#',
      dataIndex: 'asset_iti_id',
      editable: false,
    },
    {
      title: 'Business Group',
      dataIndex: 'busniess_group',
      editable: false,
      // width: '90%',
    },
    {
      title: 'Asset Group',
      dataIndex: 'asset_group',
      editable: false,
      // width: '90%',
    },
    {
      title: 'Asset SubGroup',
      dataIndex: 'asset_subgroup',
      editable: false,
      // width: '90%',
    },
    {
      title: 'Asset Type',
      dataIndex: 'asset_type',
      editable: false,
      // width: '90%',
    },
    {
      title: 'Assets',
      dataIndex: 'assets',
      editable: false,
      // width: '90%',
    },
    {
      title: '',
      dataIndex: 'asset_delete',
      render: key => {
        return (
          <DeleteBox>
            <a
              onClick={() => {
                // setAppsInitialState({});
                // onEditDrawerOpen();
              }}
            >
              <Pencil />
            </a>
            <a
              className="mr-lt-20"
              onClick={() => {
                // setAppsInitialState({});
                // onEditDrawerOpen();
              }}
            >
              <Dustbin />
            </a>
          </DeleteBox>
        );
      },
    },
  ];

  const assetSubGroupColumns = [
    {
      title: '#',
      dataIndex: 'asset_iti_id',
      editable: false,
    },
    {
      title: 'Subgroup Name',
      dataIndex: 'subgroup_ame',
      editable: false,
      width: '45%',
    },
    {
      title: 'Asset Group',
      dataIndex: 'asset_group',
      editable: false,
      width: '45%',
    },
    {
      title: '',
      dataIndex: 'asset_delete',
      render: key => {
        return (
          <DeleteBox>
            <a
              onClick={() => {
                // setAppsInitialState({});
                // onEditDrawerOpen();
              }}
            >
              <Pencil />
            </a>
            <a
              className="mr-lt-20"
              onClick={() => {
                // setAppsInitialState({});
                // onEditDrawerOpen();
              }}
            >
              <Dustbin />
            </a>
          </DeleteBox>
        );
      },
    },
  ];

  const assetValueColumns = [
    {
      title: '#',
      dataIndex: 'iti_id',
      editable: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      editable: false,
      width: '45%',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      editable: false,
      width: '45%',
    },
    {
      title: '',
      dataIndex: 'delete',
      render: key => {
        return (
          <DeleteBox>
            <a
              onClick={() => {
                // setAppsInitialState({});
                // onEditDrawerOpen();
              }}
            >
              <Pencil />
            </a>
            <a
              className="mr-lt-20"
              onClick={() => {
                // setAppsInitialState({});
                // onEditDrawerOpen();
              }}
            >
              <Dustbin />
            </a>
          </DeleteBox>
        );
      },
    },
  ];

  const osColumns = [
    {
      title: '#',
      dataIndex: 'iti_id',
      editable: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      editable: false,
      width: '45%',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      editable: false,
      width: '45%',
    },
    {
      title: '',
      dataIndex: 'delete',
      render: key => {
        return (
          <DeleteBox>
            <a
              onClick={() => {
                // setAppsInitialState({});
                // onEditDrawerOpen();
              }}
            >
              <Pencil />
            </a>
            <a
              className="mr-lt-20"
              onClick={() => {
                // setAppsInitialState({});
                // onEditDrawerOpen();
              }}
            >
              <Dustbin />
            </a>
          </DeleteBox>
        );
      },
    },
  ];

  const ownerColumns = [
    {
      title: '#',
      dataIndex: 'iti_id',
      editable: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      editable: false,
      width: '45%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: false,
      width: '45%',
    },
    {
      title: '',
      dataIndex: 'delete',
      render: key => {
        return (
          <DeleteBox>
            <a
              onClick={() => {
                // setAppsInitialState({});
                // onEditDrawerOpen();
              }}
            >
              <Pencil />
            </a>
            <a
              className="mr-lt-20"
              onClick={() => {
                // setAppsInitialState({});
                // onEditDrawerOpen();
              }}
            >
              <Dustbin />
            </a>
          </DeleteBox>
        );
      },
    },
  ];

  const departmentColumns = [
    {
      title: '#',
      dataIndex: 'iti_id',
      editable: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      editable: false,
      width: '45%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: false,
      width: '45%',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      editable: false,
      width: '45%',
    },
    {
      title: 'Modified At',
      dataIndex: 'modified_at',
      editable: false,
      width: '45%',
    },
    {
      title: '',
      dataIndex: 'delete',
      render: key => {
        return (
          <DeleteBox>
            <a
              onClick={() => {
                // setAppsInitialState({});
                // onEditDrawerOpen();
              }}
            >
              <Pencil />
            </a>
            <a
              className="mr-lt-20"
              onClick={() => {
                // setAppsInitialState({});
                // onEditDrawerOpen();
              }}
            >
              <Dustbin />
            </a>
          </DeleteBox>
        );
      },
    },
  ];
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );
  const [deleteMessage, setDeleteMessage] = useState();
  const [isDisable, setIsDisable] = useState(true);
  const [dispositionOptions, setDispositionOptions] = useState([]);

  useEffect(() => {
    let optiondata = [];
    optiondata = [
      {
        key: 'all',
        value: 'All',
      },
    ];
    if (disposition && disposition.items && disposition.items.length > 0) {
      filter(disposition.items, element => {
        optiondata.push({
          key: String(element.add_id),
          value: String(element.add_name),
        });
      });
    }
    setDispositionOptions(optiondata);
  }, [disposition]);

  useEffect(() => {
    if (Object.keys(threatIntelligenceStore).length !== 0) {
      if (threatIntelligenceStore?.result?.data?.items) {
        const originData = [];
        const resp = threatIntelligenceStore.result.data;
        const myData = resp.items;
        setTotalCount(resp._meta.totalCount);
        setCurrentPage(resp._meta.currentPage);

        // for (let i = 0; i < myData.length; i += 1) {
        //     originData.push({
        //         advisoryName: myData[i]?.advDisposition?.add_name,
        //         categoryName: myData[i]?.advCategory?.adc_name,
        //         advOpenedByName: myData[i]?.advOpenedBy?.usr_name,
        //         advSourceName: myData[i]?.advSource?.dis_name,
        //         typeName: myData[i]?.advAsset?.ast_name,
        //         ...myData[i],
        //     });
        // }

        originData.push({
          iti_id: '1',
          name: 'test',
        });
        setOriginData(originData);
      }
    }
  }, [threatIntelligenceStore]);

  // const setFilterRoute = path => {
  //     if (path === 'all') {
  //         history.push('/threatIntelligence');
  //     } else {
  //         history.push('/threatIntelligence/' + path);
  //     }
  // };

  function isFilterAvilable(queryItem) {
    const filterParm = [
      'adv_severity',
      'adv_disposition',
      'adv_subject',
      'sort',
      'adv_showing',
    ];
    for (let index = 0; index < filterParm.length; index += 1) {
      if (filterParm[index] in queryItem) {
        return true;
      }
    }
    return false;
  }

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = { payload: {}, AdvisorySearch: {}, QueryString: '' };
      if (parsedQuery.adv_page_no) {
        queryObject.payload.page = parsedQuery.adv_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }
      if (parsedQuery.adv_severity) {
        queryObject.AdvisorySearch.adv_severity = parsedQuery.adv_severity;
      }
      if (parsedQuery.adv_disposition) {
        queryObject.AdvisorySearch.adv_disposition_id =
          parsedQuery.adv_disposition;
      }
      if (parsedQuery.adv_subject) {
        queryObject.AdvisorySearch.search = parsedQuery.adv_subject;
      }
      if (parsedQuery.adv_showing) {
        queryObject.payload['per-page'] = parsedQuery.adv_showing;
      }
      const AdvisorySearch = queryObject?.AdvisorySearch;
      if (Object.keys(AdvisorySearch).length !== 0) {
        Object.entries(AdvisorySearch).forEach(([key, val]) => {
          myArrayQry += 'AdvisorySearch[' + key + ']=' + val + '&';
        });
      }

      if (Object.keys(queryObject.payload).length !== 0) {
        Object.entries(queryObject.payload).forEach(([key, val]) => {
          myArrayQry += key + '=' + val + '&';
        });
      }
    }

    if (location.pathname.split('/').pop() !== 'threatIntelligence') {
      myArrayQry +=
        'AdvisorySearch[adv_type]=' + location.pathname.split('/').pop();
    }

    return myArrayQry;
  }

  const onChangeOption = selectedOptionKey => {
    if (selectedOptionKey === 'threatIntelligenceCases') {
      history.push('/cases/advisory');
    } else {
      setActiveOption(selectedOptionKey);
      // setFilterRoute(selectedOptionKey);
      setQuery({});
      const myArrayQryOne = mapQueryWithApi({});
      threatIntelligenceStoreAction({});
    }
  };

  const handleQuery = qs => {
    if (activeOption !== 'all') {
      history.push('/threatIntelligence/' + activeOption + '?' + qs);
    } else {
      history.push('/threatIntelligence?' + qs);
    }
    setQuery(qs);
  };

  useEffect(() => {
    const myArrayQry = mapQueryWithApi(query);
    threatIntelligenceStoreAction({ queryItem: myArrayQry, path });
    listDispositionsAction();
    onGetDisposition();
  }, []);

  const getThreatIntelList = () => {
    const myArrayQry = mapQueryWithApi(query);
    threatIntelligenceStoreAction({ queryItem: myArrayQry, path });
  };

  useEffect(() => {
    getThreatIntelList();
  }, [query]);

  useEffect(() => {
    if (
      threatIntelligenceUpdateAdversory &&
      threatIntelligenceUpdateAdversory?.isSuccess
    ) {
      getThreatIntelList();
    }
  }, [threatIntelligenceUpdateAdversory]);

  useEffect(() => {
    if (
      threatIntelligenceCreateAdvisory &&
      threatIntelligenceCreateAdvisory?.isSuccess
    ) {
      getThreatIntelList();
    }
  }, [threatIntelligenceCreateAdvisory]);
  // const { id } = useParams();
  // const [myPage, setMyPage] = useState(1);
  const {
    adv_severity = 'all',
    adv_showing = '20',
    adv_disposition = 'all',
    adv_page_no = 1,
    adv_subject,
    sort = undefined,
  } = queryString.parse(query);

  useEffect(() => {
    const queryObject = {
      adv_subject: adv_subject,
      ...(adv_showing !== '20' && { adv_showing: adv_showing }),
      ...(adv_severity !== 'all' && { adv_severity: adv_severity }),
      ...(adv_page_no !== 1 && { adv_page_no: adv_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setMypage(adv_page_no);
    setShowing(adv_showing);
    const qs = queryString.stringify(queryObject);
    if (qs) {
      // history.push('/threatIntelligence?' + qs);
    }
  }, [searchText, adv_severity, adv_showing]);

  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      if (value === 'all') {
        obj[name] = '';
      } else {
        obj[name] = value;
      }
      const str = queryString.stringify(obj);
      handleQuery(str);
    }
  };

  const [selectedFilters, setSelectedFilters] = useState([
    'severity',
    'disposition',
    'showing',
    'showing',
    'status',
  ]);
  const onChangeManageFilters = (item, selected) => {
    const newItems = selected
      ? filter(selectedFilters, filterKey => {
        return filterKey !== item;
      })
      : concat(selectedFilters, item);

    setSelectedFilters(newItems);

    if (selected) {
      if (item === 'disposition') {
        handleChange('adv_disposition', 'all');
      }
      if (item === 'severity') {
        handleChange('adv_severity', 'all');
      }
      if (item === 'showing') {
        handleChange('adv_showing', 20);
      }
    }
  };

  const onPageChange = pageNumber => {
    console.log(pageNumber);
    handleChange('adv_page_no', pageNumber);

    window.scrollTo(0, 0);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter) {
      let columnIndex = sorter.column.dataIndex1 || undefined;

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
    }
  };
  const updateDetails = (id, value) => {
    updateDetailsActions(id, value);
    onCreateDrawerClose();
  };

  const createAdvesory = values => {
    onCreateAdversoryClose();
    createAdvisoryActionDispatcher(values);
  };

  const showInnerDetails = () => {
    if (selectedSubTab === 'Business group') {
      return <BusinessGroup />;
    } else if (selectedSubTab === 'Assets Groups') {
      return <AssetGroups />;
    } else if (selectedSubTab === 'Assets Subgroups') {
      return <AssetSubGroups />;
    } else if (selectedSubTab === 'Asset Type') {
      return <AssetType />;
    } else if (selectedSubTab === 'Asset Value') {
      return <AssetValue />;
    } else if (selectedSubTab === 'Classification') {
      return <Classification />;
    } else if (selectedSubTab === 'Operating systems') {
      return <AssetOS />;
    } else if (selectedSubTab === 'Owners') {
      return <AssetOwner />;
    } else if (selectedSubTab === 'Departments') {
      return <AssetDepartment />;
    }
    return <></>;
  };

  return <>{showInnerDetails()}</>;
}

const mapStateToProps = state => ({
  // threatIntelligenceUpdateAdversory: state.threatIntelligenceUpdateAdversory,
  threatIntelligenceStore: state.threatIntelligenceStore,
  // disposition: state.threatIntelligenceDisposition.listData,
  // threatIntelligenceCreateAdvisory: state.threatIntelligenceCreateAdvisory,
});

const mapDispatchToProps = dispatch => ({
  threatIntelligenceStoreAction: data => {
    dispatch(threatIntelligenceStoreResetAfterUpdate());
    dispatch(threatIntelligenceStoreResetAfterCreate());
    dispatch(threatIntelligenceStore(data));
  },
  threatIntelligenceCreateAdvosryStoreAction: (...args) => {
    dispatch(createAdvisoryAction(...args));
  },
  deleteDataAction: (...args) => dispatch(deleteData(...args)),
  listDispositionsAction: data => dispatch(listDispositions(data)),
  onGetDisposition: () => dispatch(getDisposition()),
  updateDetailsActions: (...args) => dispatch(updateAdvisory(...args)),
  createAdvisoryActionDispatcher: (...args) =>
    dispatch(createAdvisoryAction(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(AssetDetails);
