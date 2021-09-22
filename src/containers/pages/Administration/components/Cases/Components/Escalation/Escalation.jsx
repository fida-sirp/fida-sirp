import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import PlusIcon from '../../../../../../../assets/svgIcon/plusIcon';
import PageHeader from '../../../../../../layout/pageHeader';
import SPButton from '../../../../../../../components/SPButton';
import SPDrawer from '../../../../../../../components/SPDrawer';
import SPSearch from '../../../../../../../components/SPSearch';
import SPSelect from '../../../../../../../components/SPSelect';
import SPTable from '../../../../../../../components/SPTable';
import { compose } from 'redux'
import { connect } from 'react-redux'
import queryString from 'query-string';
import Dustbin from '../../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../../assets/svgIcon/pencil';
import Duplicate from '../../../../../../../assets/svgIcon/duplicate';
import View from '../../../../../../../assets/svgIcon/view';
import { useHistory } from 'react-router-dom'
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
import SPModal from '../../../../../../../components/SPModal';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import { Modal } from 'antd'
import { administratorCasesSlaCreate, administratorCasesSlaDelete, administratorCasesSlaList, administratorCasesSlaUpdate, administratorCasesSlaViewLog, administratorCasesSlaViewRule, assetDropDownList, assetTypeDropDownList, getAssetTypeList, getCasesContainerList, getClassificationList } from '../../../../../../../actions/administration';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import CreateEscalationForm from './components/CreateEscalationForm';
import { getCaseManagementSeverityAction, listLocationUsers } from '../../../../../../../actions/caseMasterData';
import { listLocationUsersGroup } from '../../../../../../../actions/incidentMasterData';
import { riskRatingList } from '../../../../../../../actions/playbooks';
import { map } from 'lodash';
import { Label } from '../../../../../../../components/InputBox/StyledComponents';
import EscalationConditions from './components/EscalationConditions';
import EscalationNotify from './components/EscalationNotify';
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

const Escalation = ({
  onGetSalsList,
  slasListing,
  userProfile,
  onCreateSals,
  loading,
  onUpdateSals,
  onClassificationlist,
  onGetAssetsTypelist,
  onDeleteList,
  onLocationUsers,
  onRiskRateList,
  onLocationListUsersGroup,
  onContainerList,
  onSeverityList,
  onAdministratorCasesSlaViewLog,
  slaViewLogList,
  onAdministratorCasesSlaViewRule,
  slaTRuleViewList,
  access
}) => {
  const [showCreateAdversory, setshowCreateAdversory] = useState(false);
  const [showEditSidebar, setshowEditSidebar] = useState(false);
  const [totalCount, setTotalCount] = useState(1);
  const [slasList, setSlasList] = useState([]);
  const [record, setRecord] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showing, setShowing] = useState('20');
  const [isCreate, setIsCreate] = useState(false);
  const [slaViewLog, setSlaViewLog] = useState(false);
  const [slaViewRule, setSlaViewRule] = useState(false);
  const { confirm } = Modal;
  const [query, setQuery] = useState(location.search);
  const history = useHistory();
  const [activeOption, setActiveOption] = useState(
    history.location.pathname.split('/')[2] || 'all'
  );

  const {
    slas_showing = '20',
    slas_page_no = 1,
    slas_subject,
    sort = undefined,
  } = queryString.parse(query);

  const [searchText, setSearchText] = useState(slas_subject);

  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };
  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete this?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const myQuery = mapQueryWithApi(query)
        onDeleteList(key, myQuery);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);
    if (parsedQuery) {
      const queryObject = {
        payload: {},
        ServiceLevelAgreementSearch: {},
        QueryString: '',
      };
      if (parsedQuery.slas_subject) {
        queryObject.ServiceLevelAgreementSearch.search = parsedQuery.slas_subject;
      }
      if (parsedQuery.slas_page_no) {
        queryObject.payload.page = parsedQuery.slas_page_no;
      }
      if (parsedQuery.sort) {
        queryObject.payload.sort = parsedQuery.sort;
      }

      if (parsedQuery.slas_showing) {
        queryObject.payload['per-page'] = parsedQuery.slas_showing;
      }
      const { ServiceLevelAgreementSearch } = queryObject;
      if (Object.keys(ServiceLevelAgreementSearch).length !== 0) {
        Object.entries(ServiceLevelAgreementSearch).forEach(([key, val]) => {
          myArrayQry += 'ServiceLevelAgreementSearch[' + key + ']=' + val + '&';
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

  const viewRule = (id) => {
    setSlaViewRule(true);
    onAdministratorCasesSlaViewRule(id)
  }

  const viewLog = (id) => {
    setSlaViewLog(true);
    onAdministratorCasesSlaViewLog(id)
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'slas_id',
      editable: false,
      key: (text, record, index) => record?.ica_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'slas_rule_name',
      editable: false,
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'slas_container',
      editable: false,
      sorter: true,
    },
    {
      title: 'Actions',
      dataIndex: 'slas_actions',
      render: (text, record, index) => {

        const moreItems = [];
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-service-level-agreement"))){
          const updateEscalation=  {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              if (record) {
                setRecord(record);
              }
              setIsCreate(false);
              // onSeverityList();
              // onLocationUsers();
              // onGetAssetsTypelist();
              // onLocationListUsersGroup();
              // onClassificationlist();
              // onRiskRateList();
              // onContainerList();
              setshowCreateAdversory(true)
              setshowEditSidebar(true);
            },
          };
          moreItems.push(updateEscalation);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("view-service-level-agreement"))){
          const viewEscalation= {
            key: 'view_rule',
            label: 'View Rule',
            icon: <View />,
            onClickItem: () => viewRule(record?.slas_id),
          };
          moreItems.push(viewEscalation);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("logs-service-level-agreement"))){
          const viewEscalationLogs= {
            key: 'View_logs',
            label: 'View Logs',
            icon: <Duplicate />,
            onClickItem: () => viewLog(record?.slas_id)
          };
          moreItems.push(viewEscalationLogs);
        }
        if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-service-level-agreement"))){
          const deleteEscalation=  {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.slas_id)
          };
          moreItems.push(deleteEscalation);
        }

        if (userProfile?.usr_api_organization === record?.slas_organization && moreItems.length !== 0) {
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


  useEffect(() => {
    const myArrayQry = mapQueryWithApi(query);
    onGetSalsList({ queryItem: myArrayQry });

    onSeverityList();
    onLocationUsers();
    onGetAssetsTypelist();
    onLocationListUsersGroup();
    onClassificationlist();
    onRiskRateList();
    onContainerList();
  }, [query]);


  useEffect(() => {
    if (!_.isEmpty(slasListing)) {
      setSlasList(slasListing?.items);
      setTotalCount(slasListing?._meta?.totalCount);
      setCurrentPage(slasListing?._meta?.currentPage);
    }
  }, [slasListing]);
  useEffect(() => {
    const queryObject = {
      slas_subject: slas_subject,
      ...(slas_showing !== '20' && { slas_showing: slas_showing }),
      ...(slas_page_no !== 1 && { slas_page_no: slas_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(slas_showing);
  }, [searchText, slas_showing, slas_page_no]);
  const handleChange = (name, value) => {
    if (value !== null || value !== undefined) {
      const obj = queryString.parse(query);
      if (value === 'all') {
        obj[name] = '';
      } else {
        obj[name] = value;
      }
      const str = queryString.stringify(obj);
      if (name == 'slas_showing') {
        setShowing(value);
      }
      handleQuery(str);
    }
  };
  const onPageChange = pageNumber => {
    handleChange('slas_page_no', pageNumber);
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

  const CreateEditEscalation = () => {
    return <CreateEscalationForm submit={handleEscalationSubmit} onClose={() => setshowCreateAdversory(false)} recordValue={record} isCreate={isCreate} />
  }


  const handleEscalationSubmit = (data) => {
    //  console.log(data);
    const myArrayQry = mapQueryWithApi(query);
    if (isCreate) {
      onCreateSals(data, myArrayQry);
    } else {
      onUpdateSals(record.slas_id, data, myArrayQry);
    }

    setshowCreateAdversory(false)
  }

  return (
    <>
      <PageHeader
        title="Escalation and SLAs"
        options={[
          (access!==undefined && (access.includes("all-super-admin") || access.includes("create-service-level-agreement"))) &&
          <SPButton
            onButtonClick={() => {
              setIsCreate(true);
              setshowCreateAdversory(true)
              setRecord({});
            }
            }

            title="Configure SLA"
            size="small"
          />,
        ]}
      />

      {slaViewLog && slaViewLogList &&
        <SPModal
          title="Escalation & SLA Logs"
          visible={slaViewLog}
          onOk={() => { }}
          onCancel={() => {
            setSlaViewLog(false);
          }}
          width={950}
          footer={null}
        >
          <div>
            {map(slaViewLogList, logRecord =>
              <div style={{ marginBottom: '15px' }}>
                <span style={{ color: '#FFFFFF' }} dangerouslySetInnerHTML={{ __html: logRecord.log }}></span>
              </div>
            )}
          </div>
        </SPModal>
      }

      {slaViewRule &&
        <SPModal
          title="Escalation & SLA Logs"
          visible={slaViewRule}
          onOk={() => { }}
          onCancel={() => {
            setSlaViewRule(false);
          }}
          width={950}
          footer={null}
        >
          {
            slaTRuleViewList ?
              <div>
                <Row gutter={20}>
                  <Col span={3}>
                    <Label>Rule Name:</Label>
                  </Col>
                  <Col span={8}>
                    <Label style={{ fontWeight: '500' }}>{slaTRuleViewList['Role Name']}</Label>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={3}>
                    <Label>Container:</Label>
                  </Col>
                  <Col span={8}>
                    <Label style={{ fontWeight: '500' }}>{slaTRuleViewList['Container']}</Label>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={3}>
                    <Label>Disposition:</Label>
                  </Col>
                  <Col span={8}>
                    <Label style={{ fontWeight: '500' }}>{slaTRuleViewList['Disposition']}</Label>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={3}>
                    <Label>Category:</Label>
                  </Col>
                  <Col span={8}>
                    <Label style={{ fontWeight: '500' }}>{slaTRuleViewList['Category']?.ica_name}</Label>
                  </Col>
                </Row>
                {
                  slaTRuleViewList?.Priority && slaTRuleViewList?.Priority.length !== 0 ?
                    <EscalationConditions propertyName="Priority" slaTRuleViewField={slaTRuleViewList.Priority} />
                    : null
                }

                <Row>
                  <Col span={3}>
                    <Label>{slaTRuleViewList.operator_1}</Label>
                  </Col>
                </Row>

                {
                  slaTRuleViewList?.Severity && slaTRuleViewList?.Severity.length !== 0 ?
                    <EscalationConditions propertyName="Severity" slaTRuleViewField={slaTRuleViewList.Severity} />
                    : null
                }

                {
                  slaTRuleViewList?.Riskrate && slaTRuleViewList?.Riskrate.length !== 0 ?
                    <EscalationConditions propertyName="Riskrate" slaTRuleViewField={slaTRuleViewList?.Riskrate} />
                    : null
                }

                <Row>
                  <Col span={3}>
                    <Label style={{ color: '#4FA67E' }}>{slaTRuleViewList.operator_2 ? slaTRuleViewList.operator_2 : 'AND'}</Label>
                  </Col>
                </Row>

                {
                  slaTRuleViewList?.assetValue && slaTRuleViewList?.assetValue.length !== 0 ?
                    <EscalationConditions propertyName="Asset value type" slaTRuleViewField={slaTRuleViewList?.assetValue} />
                    : null
                }

                <Row>
                  <Col span={3}>
                    <Label style={{ color: '#4FA67E' }}>{slaTRuleViewList.operator_3 ? slaTRuleViewList.operator_3 : 'AND'}</Label>
                  </Col>
                </Row>

                {
                  slaTRuleViewList?.classification && slaTRuleViewList?.classification.length !== 0 ?
                    <EscalationConditions propertyName="Asset Classification" slaTRuleViewField={slaTRuleViewList?.classification} />
                    : null
                }


                <Row>
                  <Col span={3}>
                    <Label style={{ color: '#4FA67E' }}>{'AND'}</Label>
                  </Col>
                </Row>

                <EscalationNotify
                  disposition={slaTRuleViewList['Disposition']}
                  breach={slaTRuleViewList?.breach}
                  response={slaTRuleViewList.response}
                  notification={slaTRuleViewList.notification}
                  container={slaTRuleViewList['Container']} />

              </div>
              : null
          }

        </SPModal>
      }

      <SPDrawer
        title="Create Escalation"
        isVisible={showCreateAdversory}
        onClose={() => setshowCreateAdversory(false)}
      >
        {
          showCreateAdversory ?
            <CreateEditEscalation />
            : null
        }

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
                handleChange('slas_subject', searchText);
              }}
              size="420px"
            />
          </Col>
          <Col>
            <SPSelect
              title="Showing"
              items={showingFilter}
              selected={slas_showing || 20}
              onChange={e => {
                handleChange('slas_showing', e.key);
              }}
            />
          </Col>
        </Row>
        <SPTable
          columns={columns}
          dataSource={slasList}
          onPageChange={onPageChange}
          canPaginate
          isLoading={loading}
          emptyText="No Data"
          totalRecords={totalCount}
          showingTill={slas_showing}
          handleTableChange={handleTableChange}
          currentShowing={
            currentPage === 1 ? currentPage : (currentPage - 1) * slas_showing + 1
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
    slasListing: state.administration.slaList.listData,
    slaViewLogList: state.administration.slaLogViewList?.listData,
    slaTRuleViewList: state.administration.slaTRuleViewList?.listData,
    loading: state.administration.slaList.loading,
    slaViewLogList: state.administration.slaLogViewList?.listData,
    slaTRuleViewList: state.administration.slaTRuleViewList?.listData,
  };
};

const mapDispatchToProps = dispatch => ({
  onGetSalsList: (...args) => dispatch(administratorCasesSlaList(...args)),
  onCreateSals: (...args) => dispatch(administratorCasesSlaCreate(...args)),
  onUpdateSals: (...args) => dispatch(administratorCasesSlaUpdate(...args)),
  onDeleteList: (...args) => dispatch(administratorCasesSlaDelete(...args)),
  onContainerList: () => dispatch(getCasesContainerList()),
  onLocationUsers: () => dispatch(listLocationUsers()),
  onLocationListUsersGroup: () => dispatch(listLocationUsersGroup()),
  onSeverityList: () => dispatch(getCaseManagementSeverityAction()),
  onClassificationlist: () => dispatch(getClassificationList()),
  onGetAssetsTypelist: () => dispatch(assetTypeDropDownList()),
  onRiskRateList: () => dispatch(riskRatingList()),
  onAdministratorCasesSlaViewLog: (...args) => dispatch(administratorCasesSlaViewLog(...args)),
  onAdministratorCasesSlaViewRule: (...args) => dispatch(administratorCasesSlaViewRule(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(Escalation);
