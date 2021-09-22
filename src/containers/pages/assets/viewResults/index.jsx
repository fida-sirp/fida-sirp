import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, notification } from 'antd';
import 'antd/dist/antd.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import SPSearch from '../../../../components/SPSearch';
import SPCog from '../../../../components/SPCog';
import SPSelect from '../../../../components/SPSelect';
import SPTable from '../../../../components/SPTable';
import SPRiskTag from '../../../../components/SPRiskTag';
import SPButton from '../../../../components/SPButton';
import SPDrawer from '../../../../components/SPDrawer';
import PageHeader from '../../../layout/pageHeader';
import CreateRule from '../components/createRule';
import BackArrowOutline from '../../../../assets/svgIcon/backArrowOutline';
import {
  deleteAssetRuleViewSaga,
  editAssetRule,
  getAssetRulesResults,
  saveAssetRuleView,
  deleteSingleAssetRuleView,
  saveSingleAssetRuleView,
  clearAssetRuleView,
} from '../../../../actions/assetRules';
import {
  RedditCircleFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import SPSingleSelectDropdown from '../../../../components/SPSingleSelectDropdown';
import { StyledDiv, StyledButton } from './StyledComponents';
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

function ViewResults({
  listRuleData,

  loading,
  deleteAssetRuleViewSaga,
  getAssetRulesResults,
  isRuleViewDeleted,
  isDeleted,
  ruleViewListData,
  saveAssetRuleView,
  isRuleViewSaved,
  deleteSingleAssetRuleView,
  saveSingleAssetRuleView,
  isRuleSingleViewSaved,
  isRuleSingleViewDeleted,
  clearAssetRuleView,
}) {
  const history = useHistory();

  const [showing, setShowing] = useState('10');
  const [status, setStatus] = useState('all');
  const [assetFormData, setAssetFormData] = useState({
    title: 'Create Rule',
    type: 'create',
  });
  const id = location.pathname.split('/').pop();
  const [selectedAssetRule, setSelectedAssetRule] = useState(null);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
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
    getAssetRulesResults(id, currentPage, searchText, iti_showing);
  }, []);

  useEffect(() => {
    if (Object.keys(ruleViewListData).length != 0) {
      setRulesList(ruleViewListData.data.items);
      setTotalCount(ruleViewListData.data._meta.totalCount);
      setCurrentPage(ruleViewListData.data._meta.currentPage);
      setColumns(
        setColumnsForSpecificNumber(ruleViewListData.data._meta.currentPage)
      );
    }
  }, [ruleViewListData]);

  useEffect(() => {
    if (isRuleViewDeleted) {
      setselectedRowKeys([]);
      openNotification('Selected item has been successfully deleted', '');
      getAssetRulesResults(id, currentPage, searchText, iti_showing);
      clearAssetRuleView();
    }
  }, [isRuleViewDeleted]);

  useEffect(() => {
    if (isRuleSingleViewDeleted) {
      openNotification('Item has been successfully deleted', '');
      getAssetRulesResults(id, currentPage, searchText, iti_showing);
      clearAssetRuleView();
    }
  }, [isRuleSingleViewDeleted]);

  useEffect(() => {
    if (isRuleSingleViewSaved) {
      openNotification('Item has been successfully saved', '');
      getAssetRulesResults(id, currentPage, searchText, iti_showing);
      clearAssetRuleView();
    }
  }, [isRuleSingleViewSaved]);

  useEffect(() => {
    if (isRuleViewSaved) {
      setselectedRowKeys([]);
      openNotification('Selected item has been successfully saved', '');
      getAssetRulesResults(id, currentPage, searchText, iti_showing);
      clearAssetRuleView();
    }
  }, [isRuleViewSaved]);

  const openNotification = (title, description) => {
    notification.open({
      message: title,
      description: description,
      onClick: () => {},
    });
  };

  useEffect(() => {
    const queryObject = {
      iti_subject: iti_subject,
      ...(iti_showing !== '20' && { iti_showing: iti_showing }),
      ...(iti_status !== 'all' && { iti_status: iti_status }),
      ...(iti_page_no !== 1 && { iti_page_no: iti_page_no }),
    };
  }, [searchText, iti_status, iti_showing]);

  const handleQuery = qs => {
    history.push('/assets/discovery/' + id + '?' + qs);
    setQuery(qs);
  };

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
    getAssetRulesResults(
      id,
      currentPage,
      obj['iti_subject'],
      obj['iti_showing']
    );
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
    getAssetRulesResults(id, pageNumber, searchText, iti_showing);

    window.scrollTo(0, 0);
  };

  function setColumnsForSpecificNumber() {
    return [
      {
        title: 'IP ADDRESS / RANGE',
        dataIndex: 'asrr_name',
        editable: false,
      },
      {
        title: 'HOSTNAME',
        dataIndex: 'asrr_hostname',
        editable: false,
      },
      {
        title: 'MAC ADDRESS',
        dataIndex: 'asrr_mac_address',
        editable: false,
      },
      {
        title: 'OS',
        dataIndex: 'asrr_organization',
        editable: false,
      },
      /* {
        title: '',
        dataIndex: 'actions',
        editable: false,
        render: (text, record, index) => {
          
          const saveCurrentRecord = () => {
            saveSingleAssetRuleView({asr_id: record.asrr_id})
          }

          const deleteCurrentRecord = () => {
            deleteSingleAssetRuleView(record.asrr_id);
          }

          return (
           <div>
              <span className="success-link" onClick={saveCurrentRecord}><CheckOutlined /></span>
              <span className="danger-link" onClick={deleteCurrentRecord}><CloseOutlined /></span>

           </div>
          );
        },
       
      },
       */
    ];
  }

  const onSelectChange = selectedRowKeys => {
    console.log(selectedRowKeys);
    setselectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const deleteAssetRuleData = () => {
    deleteAssetRuleViewSaga({ ids: selectedRowKeys });
  };

  const saveAssetRuleDataItme = () => {
    saveAssetRuleView({ asr_ids: selectedRowKeys });
  };

  const data = [];
  for (let i = 0; i < rulesList.length; i++) {
    data.push({
      key: rulesList[i]['asrr_id'],
      asrr_id: rulesList[i]['asrr_id'],
      asrr_name: rulesList[i]['asrr_name'],
      asrr_hostname: rulesList[i]['asrr_hostname'],
      asrr_mac_address: rulesList[i]['asrr_mac_address'],
      asrr_organization: rulesList[i]?.asrrOs?.aos_os_name,
    });
  }

  return (
    <>
      <PageHeader
        title="Asset Rule View"
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
        {selectedRowKeys.length > 0 && (
          <Row gutter={[19, 10]}>
            <Col>
              <SPButton
                title="Save"
                size="small"
                onButtonClick={saveAssetRuleDataItme}
              />
            </Col>
            <Col>
              <SPButton
                title="Delete"
                size="small"
                onButtonClick={deleteAssetRuleData}
              />
            </Col>
          </Row>
        )}
      </StyledDiv>
      <SPTable
        columns={columns}
        dataSource={data}
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
        rowSelection={rowSelection}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    ruleViewListData: state.assetRulesStore.ruleViewListData,
    loading: state.assetRulesStore.loading,
    isDeleted: state.assetRulesStore.isDeleted,
    isRuleViewDeleted: state.assetRulesStore.isRuleViewDeleted,
    isRuleViewSaved: state.assetRulesStore.isRuleViewSaved,
    ruleViewDeleteData: state.assetRulesStore.ruleViewDeleteData,
    ruleViewSavedData: state.assetRulesStore.ruleViewSavedData,
    ruleViewDeleteData: state.assetRulesStore.ruleViewDeleteData,
    isRuleSingleViewDeleted: state.assetRulesStore.isRuleSingleViewDeleted,
    isRuleSingleViewSaved: state.assetRulesStore.isRuleSingleViewSaved,
  };
};

const mapDispatchToProps = {
  getAssetRulesResults,
  deleteAssetRuleViewSaga,
  saveAssetRuleView,
  deleteSingleAssetRuleView,
  saveSingleAssetRuleView,
  clearAssetRuleView,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ViewResults
);
