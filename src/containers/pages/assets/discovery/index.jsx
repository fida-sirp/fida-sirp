import React, { useState, useEffect } from 'react';
import { Row, Col, Modal,notification } from 'antd';
import 'antd/dist/antd.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SPSearch from '../../../../components/SPSearch';
import SPCog from '../../../../components/SPCog';
import SPSelect from '../../../../components/SPSelect';
import SPTable from '../../../../components/SPTable';
import SPRiskTag from '../../../../components/SPRiskTag';
import SPButton from '../../../../components/SPButton';
import SPDrawer from '../../../../components/SPDrawer';
import PageHeader from '../../../layout/pageHeader';
import CreateRule from '../components/createRule';
import {
  listAssetRules,
  deleteAssetRule,
  editAssetRule,
  playAssetRule,
  clearAssetRuleView
} from '../../../../actions/assetRules';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import SPSingleSelectDropdown from '../../../../components/SPSingleSelectDropdown';
import StyledDiv from './StyledComponents';
import Dustbin from '../../../../assets/svgIcon/dustbin';
import PlayButton from '../../../../assets/svgIcon/playButton';
import Pencil from '../../../../assets/svgIcon/pencil';
import EyeIcon from '../../../../assets/svgIcon/eyeIcon';

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
    key: '50',
    value: '50',
  },
  {
    key: '100',
    value: '100',
  },
  {
    key: '250',
    value: '250',
  },
];

function AssetsDiscovery({
  listRuleData,
  listAssetRules,
  loading,
  deleteAssetRule,
  isDeleted,
  playAssetRule,
  isPlaySuccess,
  clearAssetRuleView
}) {
  const history = useHistory();
  const [showing, setShowing] = useState('10');
  const [status, setStatus] = useState('all');
  const [assetFormData, setAssetFormData] = useState({
    title: 'Create Rule',
    type: 'create',
  });

  const [selectedAssetRule, setSelectedAssetRule] = useState(null);

  const [rulesList, setRulesList] = useState([]);
  const [totalCount, setTotalCount] = useState(1);
  const [columns, setColumns] = useState(setColumnsForSpecificNumber(1));
  const [query, setQuery] = useState(location.search);
  const {
    iti_status = 'all',
    iti_showing = '20',
    iti_page_no = 1,
    iti_subject,
  } = queryString.parse(query);
  const [searchText, setSearchText] = useState(iti_subject);
  const [currentPage, setCurrentPage] = useState(parseInt(iti_page_no, 10));
  const [isCreateRuleDrawerVisible, setIsCreateRuleDrawerVisible] = useState(
    false
  );

  useEffect(() => {
    listAssetRules(currentPage, searchText, iti_showing);
  }, []);

  useEffect(() => {
    listAssetRules(currentPage, searchText, iti_showing);
  }, [isDeleted]);

  const openNotification = (title,description) => {
    notification.open({
      message: title,
      description:
      description,
      onClick: () => {
        
      },
    });
  };

  useEffect(() => {
    if(isPlaySuccess){
      openNotification("Asset rule executed successfully","");
      clearAssetRuleView();
    }
  }, [isPlaySuccess]);
  
  useEffect(() => {
    if (Object.keys(listRuleData).length != 0) {
      setRulesList(listRuleData.data.items);
      setTotalCount(listRuleData.data._meta.totalCount);
      setCurrentPage(listRuleData.data._meta.currentPage);
      setColumns(
        setColumnsForSpecificNumber(listRuleData.data._meta.currentPage)
      );
    }
  }, [listRuleData]);

  useEffect(() => {
    const queryObject = {
      iti_subject: iti_subject,
      ...(iti_showing !== '20' && { iti_showing: iti_showing }),
      ...(iti_status !== 'all' && { iti_status: iti_status }),
      ...(iti_page_no !== 1 && { iti_page_no: iti_page_no }),
    };

    const qs = queryString.stringify(queryObject);
    if (qs) {
      // history.push('/cases?' + qs);
    }
  }, [searchText, iti_status, iti_showing]);

  const handleQuery = qs => {
    history.push('/assets/discovery?' + qs);
    setQuery(qs);
  };

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
    listAssetRules(currentPage, obj['iti_subject'], obj['iti_showing']);
  };

  const updateObjectUrl = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };

  const onPageChange = pageNumber => {
    setCurrentPage(pageNumber);
    updateObjectUrl('iti_page_no', pageNumber);
    listAssetRules(pageNumber, searchText, iti_showing);
    window.scrollTo(0, 0);
  };

  const onCreateRuleDrawerOpen = () => {
    setAssetFormData({
      title: 'Create Asset Rule',
      type: 'create',
    });
    setSelectedAssetRule(null);
    setIsCreateRuleDrawerVisible(true);
  };
  const onCreateRuleDrawerClose = () => {
    setIsCreateRuleDrawerVisible(false);
  };

  function setColumnsForSpecificNumber(number) {
    return [
      {
        title: '#',
        dataIndex: 'asr_id',
        editable: false,
        width: 50,
      },
      {
        title: 'IP-ADDRESS/RANGE',
        dataIndex: 'asr_input',
        editable: false,
        width: 250,
      },
      {
        title: 'IP TYPE',
        dataIndex: 'asr_ip_type',
        editable: false,
        width: 150,
      },
      {
        title: 'Status',
        dataIndex: 'asr_status',
        render: t => {
          if (t === 'In-Progress') {
            return <SPRiskTag type="warning" text={t} />;
          }
          if (t === 'Completed') {
            return <SPRiskTag type="success" text={t} />;
          }
        },
        width: 150,
      },
      {
        title: '',
        dataIndex: 'operation',
        render: (text, record) => {
          const editAssetRule = e => {
            setAssetFormData({
              title: 'Edit Asset Rule',
              type: 'edit',
            });
            setIsCreateRuleDrawerVisible(true);
            setSelectedAssetRule(record);
          };

          const deleteAssetRuleBox = e => {
            showConfirm(record.asr_id);
          };

          const playAssetRulebox =  e => {
            playAssetRule(record.asr_id);
          }

          const onViewResult = () =>
            history.replace(`/assets/discovery/${record.asr_id}`);
          const moreItems = [
            {
              key: 'play',
              label: 'Play',
              icon: <PlayButton />,
              onClickItem: playAssetRulebox,
            },
            {
              key: 'viewResults',
              label: 'View Results',
              icon: <EyeIcon />,
              onClickItem: onViewResult,
            },
            {
              key: 'edit',
              label: 'Edit',
              icon: <Pencil />,
              onClickItem: editAssetRule,
            },
            {
              key: 'delete',
              label: 'Delete',
              icon: <Dustbin />,
              onClickItem: deleteAssetRuleBox,
            },
          ];

          return (
            <SPSingleSelectDropdown
              items={moreItems}
              onSelect={() => {}}
              title="more"
            />
          );
        },
        align: 'right',
      },
    ];
  }

  function showConfirm(key) {
    Modal.confirm({
      title: 'Are you sure you want to delete the Asset Rule?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        // deleteAsset(key);
        deleteAssetRule(key, iti_page_no, searchText, iti_showing);
        
      },
      onCancel() {
     
      },
    });
  }

  const originData = [];
  for (let i = 1; i < 6; i += 1) {
    originData.push({
      key: i.toString(),
      index: i.toString(),
      ipAddress: '172.19.1.61-172.19.1.61',
      ipType: 'IPv4',
    });
  }
  const onCreateDrawerClose = () => {
    setIsCreateRuleDrawerVisible(false);
  };

  return (
    <>
      <PageHeader
        title="Assets Discovery"
        options={[<SPCog onClick={() => {}} />]}
      />
      <StyledDiv>
        <Row gutter={[19, 10]} style={{ flex: 1 }}>
          <Col>
            <SPSearch
              size="500px"
              // onChange={onSearchChange}
              onChange={e => {
                setSearchText(e.target.value);
              }}
              text={searchText}
              onEnter={() => {
                handleChange('iti_subject', searchText);
              }}
            />
          </Col>

          <Col>
            <SPSelect
              title="Showing"
              items={showingFilter}
              selected={iti_showing}
              onChange={e => {
                handleChange('iti_showing', e.key);
              }}
            />
          </Col>
        </Row>

        <Row gutter={[19, 10]}>
          <Col>
            <SPButton
              title="Add Rule"
              size="small"
              onButtonClick={onCreateRuleDrawerOpen}
            />
            <SPDrawer
              title={assetFormData.title}
              isVisible={isCreateRuleDrawerVisible}
              onClose={onCreateRuleDrawerClose}
              drawerWidth={800}
            >
              <CreateRule
                type={assetFormData.type}
                item={selectedAssetRule}
                onCloseDrawer={onCreateDrawerClose}
                refreshAssetRuleList={() => {
                  listAssetRules(currentPage, searchText, iti_showing);
                }}
              />
            </SPDrawer>
          </Col>
          <Col>
            <SPButton
              title="Assets"
              size="small"
              onButtonClick={() => {
                history.replace('/assets');
              }}
            />
          </Col>
        </Row>
      </StyledDiv>
      <SPTable
        columns={columns}
        dataSource={rulesList}
        canPaginate={totalCount > iti_showing}
        isLoading={loading}
        onPageChange={onPageChange}
        emptyText="No Data"
        currentPage={currentPage}
        totalRecords={totalCount}
        currentShowing={
          currentPage === 1 ? currentPage : (currentPage - 1) * iti_showing + 1
        }
        showingTill={iti_showing}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    listRuleData: state.assetRulesStore.listData,
    loading: state.assetRulesStore.loading,
    isDeleted: state.assetRulesStore.isDeleted,
    isPlaySuccess:state.assetRulesStore.isPlaySuccess,
  };
};

const mapDispatchToProps = {
  listAssetRules,
  deleteAssetRule,
  playAssetRule,
  clearAssetRuleView
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  AssetsDiscovery
);
