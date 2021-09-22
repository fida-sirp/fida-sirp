import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { Row, Col, Modal, Input, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './threat-intelligence.css';
import { connect, useSelector } from 'react-redux';
import filter from 'lodash/filter';
import queryString from 'query-string';
import concat from 'lodash/concat';
import PageHeader from '../../layout/pageHeader';
import SPCog from '../../../components/SPCog';
import PlusIcon from '../../../assets/svgIcon/plusIcon';
import SendIcon from '../../../assets/svgIcon/send';
import {
  threatIntelligenceStore,
  deleteData,
  getDisposition,
  updateAdvisory,
  createAdvisoryAction,
  deleteFeed,
  sendAdvisory,
  addBulkUpdate,
  getCategories,
} from '../../../actions/threatIntelligence';

import { getPrimaryApproversListRequested, } from '../../../actions/apps';
import { listIncidentCustomers } from '../../../actions/incidentManagement';
import { listDispositions } from '../../../actions/dispositions';
import { AlertBox, DescriptionStyle, MenageFilterWrapper } from './StyledComponents';
import SetDocumentTitleHOC from '../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../HOCs/AuthTokenHOC';
import SPSearch from '../../../components/SPSearch';
import SPSingleSelectDropdown from '../../../components/SPSingleSelectDropdown';
import SPPageFilters from '../../../components/SPPageFilters';
import SPRiskTag from '../../../components/SPRiskTag';
import SPSelect from '../../../components/SPSelect';
import SPManageFilters from '../../../components/SPManageFilters';
import SPTable from '../../../components/SPTable';
import Dustbin from '../../../assets/svgIcon/dustbin';
import Pencil from '../../../assets/svgIcon/pencil';
import EyeIconView from '../../../assets/svgIcon/eyeIcon/eye-view';
import SPDrawer from '../../../components/SPDrawer';
import EditTicket from './components/editTicket';
import SPButton from '../../../components/SPButton';
import SPRoundProgress from '../../../components/SPRoundProgress';
import { onChangeFilters } from '../../../utils/helper.utils';
import BulkUpdate from './components/BulkUpdate';
import { isEmpty, isNull } from 'lodash';




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
    key: 'category',
    value: 'Category',
  },
  {
    key: 'showing',
    value: 'Showing',
  },
  {
    key: "openBy",
    value: "OpenBy"
  },
  {
    key: 'customer',
    value: "Customer",
  },
];

const manageColumn = [
  {
    key: 'all',
    value: 'All',
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

function ThreatIntelligence({
  threatIntelligenceStore,
  threatIntelligenceStoreAction,
  deleteDataAction,
  onGetDisposition,
  disposition,
  updateDetailsActions,
  createAdvisoryActionDispatcher,
  onDeleteFeed,
  onSendAdvisory,
  onAddBulkUpdate,
  threatIntelligenceCreateAdvisory,
  onGetCategories,
  threatIntelligenceCategories,
  onListIncidentCustomers,
  Customers,
  onGetPrimaryApproversListRequested,
  openBy,
  access,
}) {
  const [query, setQuery] = useState(location.search);
  const {
    adv_severity = 'all',
    adv_showing = '20',
    adv_disposition = 'all',
    adv_category = 'all',
    adv_customer = 'all',
    adv_opened_by = 'all',
    adv_page_no = 1,
    feed_showing = '20',
    feed_page_no = 1,
    adv_subject,
    sort = undefined,
  } = queryString.parse(query);

  let searchInput = React.createRef();
  const history = useHistory();
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState('');
  const [mypage, setMypage] = useState(1);
  const [showing, setShowing] = useState('20');
  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [selectedThreatIntelligence, setThreatIntelligence] = useState({});
  const [originData, setOriginData] = useState([]);
  const [totalCount, setTotalCount] = useState(1);
  const [searchText, setSearchText] = useState(adv_subject);
  const [currentPage, setCurrentPage] = useState(1);
  const [showBulkErrorAlert, setShowBulkErrorAlert] = useState(false);
  const [showCreateThreatIntel, setshowCreateThreatIntel] = useState(false);
  const [bulkUpdateDrawer, setBulkUpdateDrawer] = useState(false);
  const { path } = useParams();
  const { confirm, error } = Modal;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [customersOptions, setCustomersOptions] = useState([]);
  const [openByOptions, setOpenByOptions] = useState([]);

  const pageFilterOption = [];

  if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-rss-feed-entries'))){
    pageFilterOption.push({
      key: 'threat-feeds',
      value: 'Threat Feeds',
    });
  }

  if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('pending-advisory'))){
    pageFilterOption.push({
      key: 'pending',
      value: 'Pending',
    });
  }
  if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-advisory'))){
    pageFilterOption.push({
      key: 'release',
      value: 'Released',
    });
  }
  if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-cases'))){
    pageFilterOption.push({
      key: 'threatIntelligenceCases',
      value: 'Threat Intel Cases',
    });
  }


  const onCreateDrawerOpen = () => {
    setIsCreateDrawerVisible(true);
  };
  const onCreateDrawerClose = () => {
    setIsCreateDrawerVisible(false);
  };

  const onCreateThreatIntelOpen = () => {
    setshowCreateThreatIntel(true);
  };
  const onCreateThreatIntelClose = data => {
    setshowCreateThreatIntel(false);
  };
  function onEditThreatIntelligence(selectedThreatIntelligence) {
    setThreatIntelligence(selectedThreatIntelligence);
    onCreateDrawerOpen();
  }

  useEffect(() => {
    const listData = threatIntelligenceCategories?.listData;
    const CategoryOptionsInnerArray = [{ key: "all", value: "All" }];
    if (listData && Object.keys(listData).length !== 0) {
      for (const [key, value] of Object.entries(listData)) {
        CategoryOptionsInnerArray.push({
          key: String(key),
          value: String(value)
        });
      }
    }
    setCategoryOptions(CategoryOptionsInnerArray);
  }, [threatIntelligenceCategories]);

  useEffect(() => {
    const CustomersData = [{ key: 'all', value: 'All', label: 'All' }];
    if (Customers?.success === true) {
      if (Object.keys(Customers).length !== 0) {
        Object.entries(Customers.data).forEach(([key, value]) => {
          CustomersData.push({
            key: key,
            value: value,
            label: value,
          });
        });
      }
    }
    setCustomersOptions(CustomersData);
  }, [Customers]);

  useEffect(() => {
    const openByData = [{ key: 'all', value: 'All', label: 'All' }];
    if (openBy?.success === true) {
      if (openBy?.data.length > 0) {
        filter(openBy.data, (openByValue) => {
          const openByKey = Object.keys(openByValue)[0];
          openByData.push({
            key: openByKey.replace('u_', ''),
            value: openByValue[openByKey],
          });
        });
      }
    }
    setOpenByOptions(openByData);
  }, [openBy]);

  function showConfirm(key, isFeed = false) {
    Modal.confirm({
      title: 'Are you sure you want to delete the Threat Intelligence?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      className: 'test',
      onOk() {
        if (isFeed) {
          const myQuery = mapQueryWithApi(query);
          onDeleteFeed(key, myQuery, 'threat-feeds');
        } else {
          const myQuery = mapQueryWithApi(query);
          deleteDataAction(key, myQuery, path);
        }
      },
      onCancel() { },
    });
  }

  let columns = [];

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchedColumn(dataIndex);
    setSearchText(selectedKeys[0]);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchedColumn(dataIndex);
              setSearchText(selectedKeys[0]);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text => text,
  });

  const FilterByNameInput = (
    <Input
      placeholder="Search Name"
      value={'abc'}
      onChange={e => {
        const currValue = e.target.value;
        console.log(currValue, 'currValue');
      }}
    />
  );

  if (path === 'pending' || path === 'release') {
    columns = [
      {
        title: 'ID',
        dataIndex: 'adv_tid',
        dataIndex1: 'adv_tid',
        width: 75,
        editable: false,
      },
      {
        title: 'NAME',
        dataIndex: 'adv_title',
        dataIndex1: 'adv_title',
        width: 300,
        sorter: true,
        editable: false,
      },
      {
        title: 'CATEGORY',
        dataIndex: 'adv_category_id',
        dataIndex1: 'adv_category_id',
        width: 100,
        sorter: true,
        editable: false,
        render: (text, record, index) => record?.categoryName
      },
      {
        title: 'OPENED BY',
        dataIndex: 'adv_opened_by',
        dataIndex1: 'adv_opened_by',
        sorter: true,
        editable: false,
        render: (text, record, index) => record?.advOpenedByName
      },
      {
        title: 'SOURCE',
        dataIndex: 'adv_source',
        dataIndex1: 'adv_source',
        sorter: true,
        editable: false,
        render: (text, record, index) => record?.advSourceName
      },
      {
        title: 'CUSTOMER',
        dataIndex: 'adv_organization',
        dataIndex1: 'adv_organization',
        sorter: true,
        editable: false,
        render: (text, record, index) => record?.advOrganization?.org_name
      },
      {
        title: 'RECEIVED DATE',
        dataIndex: 'adv_recieved_date',
        dataIndex1: 'adv_recieved_date',
        width: 180,
        sorter: true,
        editable: false,
        render: (text, record, index) => record?.adv_received_date
      },
      {
        title: 'RELEASED DATE',
        dataIndex: 'adv_release_date',
        dataIndex1: 'adv_release_date',
        width: 180,
        sorter: true,
        editable: false,
        render: (text, record, index) => record?.advReleaseDate
      },
      {
        title: 'TYPE',
        dataIndex: 'adv_disposition_id',
        dataIndex1: 'adv_disposition_id',
        width: 125,
        sorter: true,
        editable: false,
        render: (text, record, index) => record?.advisoryName
      },
      {
        title: 'SEVERITY',
        dataIndex: 'adv_severity',
        dataIndex1: 'adv_severity',
        sorter: true,
        render: t => {
          if (t === 'High') {
            return <SPRiskTag type="danger" text={t} />;
          }
          if (t === 'Medium') {
            return <SPRiskTag type="warning" text={t} />;
          }
          if (t === 'Low') {
            return <SPRiskTag type="success" text={t} />;
          }
        },
      },
      {
        title: 'S3',
        dataIndex: '',
        dataIndex1: '',
        sorter: true,
        width: 50,
        render: (text, record, index) => {
          const asset = record?.compromisedAssets?.length > 0 ? record?.compromisedAssets[0] : {};
          if (asset?.ast_id) {
            return (
              <div
                role="presentation"
                onClick={() => {
                  history.push(`/assets/asset-details/${asset.ast_id}`);
                }}
              >
                <SPRoundProgress
                  type={
                    asset?.ast_s3_score > 66
                      ? 'danger' : (
                        asset?.ast_s3_score > 33
                          ? 'warning' : 'success'
                      )
                  }
                  progress={asset?.ast_s3_score || 0}
                />
              </div>
            );
          } else {
            return (
              <div role="presentation">
                <SPRoundProgress type="success" progress={0} />
              </div>
            );
          }
        },
      },
      {
        title: '',
        dataIndex: 'adv_id',
        width: 50,
        render: (text, record, index) => {
          const deleteThreatIntelligence = () => {
            showConfirm(text, false);
          };
          const editThreatIntelligence = () => {
            onEditThreatIntelligence(record);
          };
          const moreItems = [
            {
              key: 'view',
              label: 'View',
              icon: <EyeIconView />,
              onClickItem: () => {
                history.push(`/threatIntelligence/details/${text}`);
              },
            },
            {
              key: 'edit',
              label: 'Edit',
              icon: <Pencil />,
              onClickItem: editThreatIntelligence,
              mypage,
            },
            {
              key: 'delete',
              label: 'Delete',
              icon: <Dustbin />,
              onClickItem: deleteThreatIntelligence,
            },
          ];

          return (
            <SPSingleSelectDropdown
              items={moreItems}
              onSelect={() => { }}
              title="more"
            />
          );
        },
      },
    ];
  } else {
    columns = [
      {
        title: '#',
        dataIndex: 'rfe_id',
        dataIndex1: 'rfe_id',
        width: 75,
        editable: false,
      },
      {
        title: 'Title',
        dataIndex: 'rfe_title',
        dataIndex1: 'rfe_title',
        editable: false,
        width: 375,
        sorter: true,
      },
      {
        title: 'Description',
        dataIndex: 'rfe_description',
        dataIndex1: 'rfe_description',
        editable: false,
        width: 600,
        sorter: true,
        render: (text, record, index) => (
          <DescriptionStyle
            dangerouslySetInnerHTML={{
              __html: record?.rfe_description,
            }}
          ></DescriptionStyle>
        ),
      },
      {
        title: 'Published Date',
        dataIndex: 'rfe_pub_date',
        dataIndex1: 'rfe_pub_date',
        editable: false,
        sorter: true,
      },
      {
        title: 'Created',
        dataIndex: 'ref_created_at',
        dataIndex1: 'ref_created_at',
        editable: false,
        sorter: true,
      },
      {
        title: 'Actions',
        dataIndex: 'adv_id',
        render: (text, record, index) => {
          const moreItems = [
            {
              key: 'send',
              label: 'Send',
              icon: <SendIcon />,
              onClickItem: () => {
                const myQuery = mapQueryWithApi(query);
                onSendAdvisory(record?.rfe_id, myQuery, 'threat-feeds');
              },
            },
            {
              key: 'view',
              label: 'View',
              icon: <EyeIconView />,
              onClickItem: () => {
                const win = window.open(record?.rfe_url, '_blank');
                win.focus();
              },
            },
            {
              key: 'delete',
              label: 'Delete',
              icon: <Dustbin />,
              onClickItem: () => showConfirm(record?.rfe_id, true),
            },
          ];
          return (
            <SPSingleSelectDropdown
              items={moreItems}
              onSelect={() => { }}
              title="more"
            />
          );
        },
      },
    ];
  }


  const [activeOption, setActiveOption] = useState(
      history.location.pathname.split('/')[2] || 'threat-feeds'
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
    if (path === 'threat-feeds') {
      const resp = threatIntelligenceStore?.result?.data;
      setOriginData(resp?.items);
      setTotalCount(resp?._meta?.totalCount);
      setCurrentPage(resp?._meta?.currentPage);
    } else if (Object.keys(threatIntelligenceStore).length !== 0) {
      if (threatIntelligenceStore?.result?.data?.items) {
        const originData = [];
        const resp = threatIntelligenceStore.result.data;
        const myData = resp.items;
        setTotalCount(resp._meta.totalCount);
        setCurrentPage(resp._meta.currentPage);
        for (let i = 0; i < myData.length; i += 1) {
          originData.push({
            // avdId: (currentPage - 1) * showing + i + 1,
            avdId: myData[i]?.adv_id,
            advisoryName: myData[i]?.advDisposition?.add_name
              ? myData[i].advDisposition.add_name
              : '(not set)',
            categoryName: myData[i]?.advCategory?.adc_name
              ? myData[i].advCategory.adc_name
              : '(not set)',
            advOpenedByName: myData[i]?.advOpenedBy?.usr_name
              ? myData[i].advOpenedBy.usr_name
              : '(not set)',
            advSourceName: myData[i]?.advSource?.dis_name
              ? myData[i].advSource.dis_name
              : 'N/A',
            advReleaseDate: myData[i].adv_release_date
              ? myData[i].adv_release_date
              : 'In Progress..',
            typeName: myData[i]?.advAsset?.ast_name,
            ...myData[i],
          });
        }
        setOriginData(originData);
      }
    }
  }, [threatIntelligenceStore]);

  const setFilterRoute = path => {
    if (path === 'threat-feeds') {
      history.push('/threatIntelligence');
    } else {
      history.push('/threatIntelligence/' + path);
    }
  };

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = { payload: {}, AdvisorySearch: {}, QueryString: '' };
      if (parsedQuery.adv_page_no) {
        queryObject.payload.page = parsedQuery.adv_page_no;
      }
      if (parsedQuery.feed_page_no) {
        queryObject.payload.page = parsedQuery.feed_page_no;
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
      if (parsedQuery.adv_category) {
        queryObject.AdvisorySearch.adv_category_id =
          parsedQuery.adv_category;
      }
      if (parsedQuery.adv_customer) {
        queryObject.AdvisorySearch.adv_organization =
          parsedQuery.adv_customer;
      }
      if (parsedQuery.adv_opened_by) {
        queryObject.AdvisorySearch.adv_opened_by =
          parsedQuery.adv_opened_by;
      }
      if (parsedQuery.adv_subject) {
        queryObject.AdvisorySearch.search = parsedQuery.adv_subject;
      }
      if (parsedQuery.adv_showing) {
        queryObject.payload['per-page'] = parsedQuery.adv_showing;
      }
      if (parsedQuery.feed_showing) {
        queryObject.payload['per-page'] = parsedQuery.feed_showing;
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

    if (location.pathname.split('/').pop() !== 'threatIntelligence' && path !== "threat-feeds") {
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
      setFilterRoute(selectedOptionKey);
      setQuery({});
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
    if (path && activeOption !== "threat-feeds") {
      onGetCategories();
      onListIncidentCustomers();
      onGetPrimaryApproversListRequested();
      onGetDisposition();
    }

    if(access!==undefined &&  !access.includes('index-rss-feed-entries') && activeOption === "threat-feeds"){
      if(!access.includes('pending-advisory')){
        setActiveOption('release');
        setFilterRoute('release');
      }else{
          setActiveOption('pending');
          setFilterRoute('pending');
      }

    }

  }, [activeOption]);

  const getThreatIntelList = () => {
    const myArrayQry = mapQueryWithApi(query);
    threatIntelligenceStoreAction({
      queryItem: myArrayQry,
      path: path || 'threat-feeds',
    });
  };

  useEffect(() => {
    getThreatIntelList();
  }, [query]);

  // const { id } = useParams();
  // const [myPage, setMyPage] = useState(1);

  useEffect(() => {
    const queryObject = {
      adv_subject: adv_subject,
      ...(adv_showing !== '20' && { adv_showing: adv_showing }),
      ...(feed_showing !== '20' && { feed_showing: feed_showing }),
      ...(adv_severity !== 'all' && { adv_severity: adv_severity }),
      ...(adv_page_no !== 1 && { adv_page_no: adv_page_no }),
      ...(feed_page_no !== 1 && { feed_page_no: feed_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    if (path === 'threat-feeds') {
      setMypage(feed_page_no);
    } else {
      setMypage(adv_page_no);
    }

    if (path === 'threat-feeds') {
      setShowing(feed_showing);
    } else {
      setShowing(adv_showing);
    }
    const qs = queryString.stringify(queryObject);
  }, [searchText, adv_severity, adv_showing, feed_showing]);

  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      obj[name] = value;
      const str = queryString.stringify(obj);
      handleQuery(str);
    }
  };

  const [selectedFilters, setSelectedFilters] = useState([
    'severity',
    'disposition',
    'showing',
    'status',
    'openBy',
    'customer',
    'category'

  ]);
  const onChangeManageFilters = (item, selected) => {
    const newItems = onChangeFilters(
      item,
      selected,
      manageFilter,
      selectedFilters
    );
    setSelectedFilters(newItems);
    // const newItems = selected
    //   ? filter(selectedFilters, filterKey => {
    //       return filterKey !== item;
    //     })
    //   : concat(selectedFilters, item);

    // setSelectedFilters(newItems);


  };

  useEffect(() => {
    let newItems = [];
    manageFilter.map(item => newItems.push(item.key));
    setSelectedFilters(newItems);
  }, []);

  const onPageChange = pageNumber => {
    if (path === 'threat-feeds') {
      handleChange('feed_page_no', pageNumber);
    } else if (path === undefined || path === null || path === "") {
      handleChange('feed_page_no', pageNumber);
    } else {
      handleChange('adv_page_no', pageNumber);
    }
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

  const updateDetails = (id, value) => {
    const myQuery = mapQueryWithApi(query);
    updateDetailsActions(id, value, myQuery, path, true);
    onCreateDrawerClose();
  };

  const createThreatIntel = values => {
    const myQuery = mapQueryWithApi(query);
    createAdvisoryActionDispatcher(values, myQuery, path);
    onCreateThreatIntelClose();
  };

  const onSelectChange = selectedRowKeys => {
    setShowBulkErrorAlert(false);
    setselectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleBulkUpdate = () => {
    if (isEmpty(selectedRowKeys)) {
      error({
        title: 'Please select the record(s) to update',
        centered: true,
        icon: <ExclamationCircleOutlined />,
      });
    } else setBulkUpdateDrawer(true);
  };

  const handleCloseBulkUpdateDrawer = () => {
    setBulkUpdateDrawer(false);
    setselectedRowKeys([]);
  };

  const handleBulkUpdateSave = values => {
    // let id = [];
    // selectedRowKeys.map(key => {
    //   id.push(originData[key - 1].adv_id);
    // });
    const payload = {
      ids: selectedRowKeys,
      ...values,
    };

    const myQuery = mapQueryWithApi(query);
    onAddBulkUpdate(payload, myQuery, path);
    handleCloseBulkUpdateDrawer();
  };

  return (
    <>
      <SPDrawer
        title="Edit Threat Intelligence"
        isVisible={isCreateDrawerVisible}
        maskClosable={false}
        onClose={onCreateDrawerClose}
      >
        <EditTicket
          isVisible={isCreateDrawerVisible}
          type="edit"
          updateUserTicket={updateDetails}
          selectedThreatIntelligence={selectedThreatIntelligence}
          onCloseDrawer={onCreateDrawerClose}
        />
      </SPDrawer>
      <BulkUpdate
        isVisible={bulkUpdateDrawer}
        saveBulkUpdate={handleBulkUpdateSave}
        selectedThreatIntelligence={selectedThreatIntelligence}
        onCloseDrawer={handleCloseBulkUpdateDrawer}
      />
      {/* </SPDrawer> */}
      <PageHeader
        title="Threat Intelligence"
        options={[
                (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-advisory')) &&   (path == 'pending' || path == 'release')) &&
              <SPButton
                onButtonClick={handleBulkUpdate}
                title="Bulk Update"
                size="small"
              />,
             (access!==undefined && (access.includes("all-super-admin") ||  access.includes('create-advisory'))) &&
              <SPButton
                onButtonClick={onCreateThreatIntelOpen}
                title="Create Threat Intelligence"
                size="small"
                image={<PlusIcon />}
              />,
            /*  (access!==undefined && (access.includes("all-super-admin") ||  access.includes('create-advisory'))) &&
              <SPButton
                onButtonClick={onCreateThreatIntelOpen}
                title="Create Threat Intelligence"
                size="small"
                image={<PlusIcon />}
              />,*/
            ]
        }
      />
      <SPDrawer
        title="Create Threat Intelligence"
        isVisible={showCreateThreatIntel}
        onClose={onCreateThreatIntelClose}
        maskClosable={false}
      >
        <EditTicket
          isVisible={showCreateThreatIntel}
          type="create"
          createThreatIntel={createThreatIntel}
          onCloseDrawer={onCreateThreatIntelClose}
        />
      </SPDrawer>
      <SPPageFilters
        options={pageFilterOption}
        active={activeOption}
        onChange={onChangeOption}
      />

      {showBulkErrorAlert && (
        <AlertBox
          className="alert-box-sp"
          message={'Please select Threat Intel first!'}
          type="error"
          closable
          onClose={() => {
            setShowBulkErrorAlert(false);
          }}
        />
      )}
      {threatIntelligenceStore.error ? (
        <AlertBox
          className="alert-box-sp"
          message={threatIntelligenceStore.error.message}
          type="error"

          closable
        />
      ) : null}
      <>
        {path == 'pending' || path == 'release' ? (
          <Row gutter={12} justify="start">
            <Col>
              <SPSearch
                onEnter={() => {
                  handleChange('adv_subject', searchText);
                }}
                text={searchText}
                onChange={e => {
                  setSearchText(e.target.value);
                }}
                size="500px"
              />
            </Col>

            {selectedFilters.includes('severity') ||
              selectedFilters.includes('all') ? (
              <Col>
                <SPSelect
                  title="Severity"
                  items={severityFilter}
                  selected={adv_severity || 'all'}
                  onChange={e => {
                    if (e.key === "all") {
                      handleChange('adv_severity', "");
                    } else {
                      handleChange('adv_severity', e.key);
                    }
                  }}
                />
              </Col>
            ) : null}

            {selectedFilters.includes('disposition') ||
              selectedFilters.includes('all') ? (
              <Col id="check">
                <SPSelect

                  title="Type"
                  items={dispositionOptions}
                  selected={adv_disposition || 'all'}
                  onChange={e => {
                    if (e.key === "all") {
                      handleChange('adv_disposition', "");
                    } else {
                      handleChange('adv_disposition', e.key);
                    }
                  }}
                />
              </Col>
            ) : null}

            {selectedFilters.includes('category') ||
              selectedFilters.includes('all') ? (
              <Col>
                <SPSelect
                  title="Category"
                  items={categoryOptions}
                  selected={adv_category || 'all'}
                  onChange={e => {
                    if (e.key === "all") {
                      handleChange('adv_category', "");
                    } else {
                      handleChange('adv_category', e.key);
                    }
                  }}
                />
              </Col>
            ) : null}

            {selectedFilters.includes('customer') ||
              selectedFilters.includes('all') ? (
              <Col>
                <SPSelect
                  title="Customer"
                  items={customersOptions}
                  selected={adv_customer || 'all'}
                  onChange={e => {
                    if (e.key === "all") {
                      handleChange('adv_customer', "");
                    } else {
                      handleChange('adv_customer', e.key);
                    }
                  }}
                />
              </Col>
            ) : null}

            {selectedFilters.includes('openBy') ||
              selectedFilters.includes('all') ? (
              <Col>
                <SPSelect
                  title="Open By"
                  items={openByOptions}
                  selected={adv_opened_by || "all"}
                  onChange={e => {
                    if (e.key === "all") {
                      handleChange('adv_opened_by', "");
                    } else {
                      handleChange('adv_opened_by', e.key);
                    }
                  }}
                />
              </Col>
            ) : null}

            {selectedFilters.includes('showing') ||
              selectedFilters.includes('all') ? (
              <Col>
                <SPSelect
                  title="Showing"
                  items={showingFilter}
                  selected={adv_showing || 20}
                  onChange={e => {
                    handleChange('adv_showing', e.key);
                  }}
                />
              </Col>
            ) : null}

            <Col>
              <SPManageFilters
                items={manageFilter}
                onChange={onChangeManageFilters}
                selectedItems={selectedFilters}
              />
            </Col>
          </Row>
        ) : (
          <Row gutter={12} style={{ marginBottom: 10, marginTop: 10 }} justify="end">
            {selectedFilters.includes('showing') ||
              selectedFilters.includes('all') ? (
              <Col>
                <SPSelect
                  title="Showing"
                  items={showingFilter}
                  selected={feed_showing || 20}
                  onChange={e => {
                    handleChange('feed_showing', e.key);
                  }}
                />
              </Col>
            ) : null}
          </Row>
        )}
        {!(path == 'pending' || path == 'release') && (
          <MenageFilterWrapper>
            <SPManageFilters
              title={"Manage Columns"}
              items={manageColumn}
              onChange={() => { }}
            // selectedItems={}
            />
          </MenageFilterWrapper>
        )}

        <SPTable
          columns={columns}
          rowSelection={
            path == 'pending' || path == 'release' ? rowSelection : false
          }
          dataSource={originData}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          handleTableChange={handleTableChange}
          totalRecords={totalCount}
          rowKey={'avdId'}
          showingTill={
            path == 'pending' || path == 'release' ? adv_showing : feed_showing
          }
          currentShowing={
            currentPage === 1
              ? currentPage
              : (currentPage - 1) * adv_showing + 1
          }
          currentPage={currentPage}
          isLoading={threatIntelligenceStore.loading}
        />
      </>
    </>
  );
}

const mapStateToProps = state => ({
  threatIntelligenceUpdateAdversory: state.threatIntelligenceUpdateAdversory,
  threatIntelligenceStore: state.threatIntelligenceStore,
  disposition: state.threatIntelligenceDisposition.listData,
  threatIntelligenceCreateAdvisory: state.threatIntelligenceCreateAdvisory,
  threatIntelligenceCategories: state.threatIntelligenceCategories,
  Customers: state.incidentCustomersStore?.listData,
  openBy: state.appPrimaryApproversList?.listData,
  access :  state?.userStore?. userProfile?.data?.access,
});

const mapDispatchToProps = dispatch => ({
  threatIntelligenceStoreAction: data => {
    dispatch(threatIntelligenceStore(data));
  },
  onGetCategories: () => dispatch(getCategories()),
  deleteDataAction: (...args) => dispatch(deleteData(...args)),
  onDeleteFeed: (...args) => dispatch(deleteFeed(...args)),
  onSendAdvisory: (...args) => dispatch(sendAdvisory(...args)),
  onGetDisposition: () => dispatch(getDisposition()),
  updateDetailsActions: (...args) => dispatch(updateAdvisory(...args)),
  createAdvisoryActionDispatcher: (...args) =>
    dispatch(createAdvisoryAction(...args)),
  onAddBulkUpdate: (...args) => dispatch(addBulkUpdate(...args)),
  onListIncidentCustomers: (...args) => dispatch(listIncidentCustomers(...args)),
  onGetPrimaryApproversListRequested: () =>
    dispatch(getPrimaryApproversListRequested()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ThreatIntelligence);
