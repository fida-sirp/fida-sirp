import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  deleteRuleList,
  getRulesList,
  createRuleList,
  updateRuleList,
  categoryList,
  dispositionList,
  locationList,
  riskRatingList,
  subCategoryList,
  subDispositionList,
} from '../../../../../actions/playbooks';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router';
import SPTable from '../../../../../components/SPTable';
import queryString from 'query-string';
import { Col, Row, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import SPSelect from '../../../../../components/SPSelect';
import SPSearch from '../../../../../components/SPSearch';
import Dustbin from '../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../assets/svgIcon/pencil';
import { isArray, isEmpty } from 'lodash';
import SPButton from '../../../../../components/SPButton';
import { ExecutionBtn } from '../../../automationPlayground/StyledComponents';
import SPDrawer from '../../../../../components/SPDrawer';
import RulesFormDrawer from './rulesForm';
import SPSingleSelectDropdown from '../../../../../components/SPSingleSelectDropdown';
import EyeIconView from '../../../../../assets/svgIcon/eyeIcon/eye-view';

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
    key: '50',
    value: '50',
  },
];

const rules = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const categorys = useSelector(state => state.playbookStore.categoryList);
  const subCategorys = useSelector(
    state => state.playbookStore.subCategoryList
  );
  const dispositions = useSelector(
    state => state.playbookStore.dispositionList
  );
  const subDispositions = useSelector(
    state => state.playbookStore.subDispositionList
  );
  const locations = useSelector(state => state.playbookStore.locationList);
  const riskRatings = useSelector(state => state.playbookStore.riskRatingList);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [dispositionOptions, setDispositionOptions] = useState([]);
  const [subDispositionOptions, setSubDispositionOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [riskRatingOptions, setRiskRatingOptions] = useState([]);
  const [type, setType] = useState('incident');

  const [showing, setShowing] = useState('20');
  const [totalCount, setTotalCount] = useState(1);
  const [record, setRecord] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState('');
  const [rulesList, setRulesList] = useState([]);
  const [query, setQuery] = useState(location.search);
  const {
    plbr_status = 'all',
    plbr_showing = '20',
    plbr_page_no = 1,
    plbr_subject,
  } = queryString.parse(query);
  const [currentPage, setCurrentPage] = useState(parseInt(plbr_page_no, 10));
  const [searchText, setSearchText] = useState(plbr_subject);

  const playBookRulesList = useSelector(
    state => state.playbookStore.playbookRulesList
  );
  const playBooklist = useSelector(
    state => state.playbookStore.playbookDataList
  );
  const loading = useSelector(state => state.playbookStore.loading);

  function showConfirm(selectedId) {
    Modal.confirm({
      title: 'Are you sure you want to delete the Playbook?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const pageQuery = mapQueryWithApi(query);
        dispatch(deleteRuleList({ id: selectedId, rootId: id, pageQuery }));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  useEffect(() => {
    dispatch(categoryList({ type }));
    dispatch(dispositionList());
    dispatch(locationList());
    dispatch(riskRatingList());
  }, []);

  useEffect(() => {
    if (isArray(categorys)) {
      console.log(">>check", categorys, type)
      let arr = [];

      if (type === "advisory") {
        categorys.map(data =>
          arr.push({
            key: data?.adc_id,
            value: data?.adc_id,
            label: data?.adc_name,
          })
        );
        setCategoryOptions(arr);
      } else {
        categorys.map(data =>
          arr.push({
            key: data?.ica_id,
            value: data?.ica_id,
            label: data?.ica_name,
          })
        );
        setCategoryOptions(arr);
      }
    }

    if (!isEmpty(dispositions)) {
      let arr = [];
      dispositions.map(data =>
        arr.push({
          key: data.ids_id,
          value: data.ids_id,
          label: data.ids_name,
        })
      );
      setDispositionOptions(arr);
    }
    if (!isEmpty(locations)) {
      let arr = [];
      locations.map(data =>
        arr.push({
          key: data.loc_id,
          value: data.loc_id,
          label: data.loc_name,
        })
      );
      setLocationOptions(arr);
    }
    if (!isEmpty(riskRatings)) {
      let arr = [];
      Object.keys(riskRatings).map(data =>
        arr.push({
          key: data,
          value: data,
          label: data,
        })
      );
      setRiskRatingOptions(arr);
    }
    if (!isEmpty(subCategorys)) {
      let arr = [];
      subCategorys.map(data =>
        arr.push({
          key: data.msc_id,
          value: data.msc_id,
          label: data.msc_name,
        })
      );
      setSubCategoryOptions(arr);
    }
    if (!isEmpty(subDispositions)) {
      let arr = [];
      subDispositions.map(data =>
        arr.push({
          key: data.dsc_id,
          value: data.dsc_id,
          label: data.dsc_name,
        })
      );

      setSubDispositionOptions(arr);
    }
  }, [
    categorys,
    subCategorys,
    dispositions,
    subDispositions,
    locations,
    riskRatings,
  ]);

  useEffect(() => {
    const myArrayQry = mapQueryWithApi(query);
    dispatch(getRulesList({ id, queryItem: myArrayQry }));
  }, [query]);

  useEffect(() => {
    if (Object.keys(playBookRulesList).length !== 0) {
      setRulesList(playBookRulesList.items);
      setTotalCount(playBookRulesList._meta.totalCount);
      setCurrentPage(playBookRulesList._meta.currentPage);
    }
  }, [playBookRulesList]);
  const onPageChange = pageNumber => {
    handleChange('plbr_page_no', pageNumber);
    window.scrollTo(0, 0);
  };

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };
  const handleQuery = qs => {
    history.push('?' + qs);
    setQuery(qs);
  };

  const displayPlayBookName = id => {
    if (!isEmpty(playBooklist) && !isEmpty(playBooklist.data)) {
      setTitle(
        playBooklist.data.items.filter(data => data.plb_id === id)?.[0]
          ?.plb_name
      );
      return playBooklist.data.items.filter(data => data.plb_id === id)?.[0]
        ?.plb_name;
    }
    return '';
  };
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      editable: false,
      key: (text, record, index) => record?.plbr_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Playbook',
      dataIndex: 'playbook',
      editable: false,
      key: (text, record, index) => record?.plbr_id,
      render: (text, record, index) => location?.state?.playbookName

    },
    {
      title: 'Rule Name',
      dataIndex: 'rule_name',
      editable: false,
      key: (text, record, index) => record?.plbr_id,
      render: (text, record, index) => record?.plbr_rule_name,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      editable: false,
      key: (text, record, index) => record?.plbr_id,
      render: (text, record, index) => record?.plbr_status,
    },
    {
      title: '',
      dataIndex: 'adv_id',
      width: 50,
      render: (text, record, index) => {
        const moreItems = [
          {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              if (!isEmpty(record.plbr_code)) {
                const parsedObj = JSON.parse(record.plbr_code);
                containerSelect(parsedObj.module);
                categorySelect(parsedObj.ticket_category);
                dispositionSelect(parsedObj.ticket_disposition);
              }
              setRecord(record);
              setOpenDrawer(true);
              setIsUpdate(true);
            },
          },
          {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.plbr_id),
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
  const handleCloseModal = () => {
    setOpenDrawer(false);
    setIsUpdate(false);
    setRecord({});
  };

  const containerSelect = type => {
    setType(type);
    dispatch(categoryList({ type }));
  };
  const categorySelect = id => {
    console.log(">>>>check id", id)
    dispatch(subCategoryList({ id }));
  };

  const dispositionSelect = id => {
    dispatch(subDispositionList({ id }));
  };
  const handleSubmit = async values => {
    const pageQuery = mapQueryWithApi(query);
    if (isUpdate) {
      let recordId = record?.plbr_id;
      await dispatch(updateRuleList({ recordId, values, pageQuery, rootId: id }));
    } else {
      await dispatch(createRuleList({ recordId: id, values, pageQuery, rootId: id }));
    }
    await handleCloseModal();
  };

  function mapQueryWithApi(queryItem) {
    let myArrayQry = '';
    const parsedQuery = queryString.parse(queryItem);

    if (parsedQuery) {
      const queryObject = { payload: {}, PlaybooksSearch: {}, QueryString: '' };
      if (parsedQuery.plbr_page_no) {
        queryObject.payload.page = parsedQuery.plbr_page_no;
      }
      if (parsedQuery.plbr_subject) {
        queryObject.PlaybooksSearch.search = parsedQuery.plbr_subject;
      }
      if (parsedQuery.plbr_showing) {
        queryObject.payload['per-page'] = parsedQuery.plbr_showing;
      }

      const playbooksearch = queryObject.PlaybooksSearch;

      if (Object.keys(playbooksearch).length !== 0) {
        Object.entries(playbooksearch).forEach(([key, val]) => {
          myArrayQry += 'PlaybookRulesSearch[' + key + ']=' + val + '&';
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
  return (
    <>
      <SPDrawer
        title={`${isUpdate ? 'Update' : 'Add'} Rule`}
        isVisible={openDrawer}
        maskClosable={false}
        onClose={handleCloseModal}
        drawerWidth={800}
      >
        <RulesFormDrawer
          FormType={`${isUpdate ? 'Update' : 'Create'}`}
          isVisible={openDrawer}
          closeDrawer={handleCloseModal}
          submit={handleSubmit}
          recordValue={record}
          category={categoryOptions}
          disposition={dispositionOptions}
          location={locationOptions}
          riskRating={riskRatingOptions}
          subCategory={subCategoryOptions}
          subDisposition={subDispositionOptions}
          type={type}
          handleContainerSelect={containerSelect}
          handleCategorySelect={categorySelect}
          handleDispositionSelect={dispositionSelect}
          title={title}
        />
      </SPDrawer>
      <Row gutter={[19, 25]}>
        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ marginRight: 10 }}>
            <SPSearch
              size="500px"
              onChange={e => {
                setSearchText(e.target.value);
              }}
              text={searchText}
              onEnter={e => {
                handleChange('plbr_subject', searchText);
              }}
            />
          </div>
          <div>
            <SPSelect
              title="Showing"
              selected={plbr_showing}
              items={showingFilter}
              onChange={e => {
                handleChange('plbr_showing', e.key);
              }}
            />
          </div>
        </Col>
        <ExecutionBtn>
          <Col>
            <div>
              <SPButton
                title="Add Rule"
                size="small"
                onButtonClick={() => {
                  setOpenDrawer(true);
                  setIsUpdate(false);
                }}
              />
            </div>
          </Col>
        </ExecutionBtn>
      </Row>
      <div style={{ marginTop: 20 }}>
        <SPTable
          columns={columns}
          dataSource={rulesList}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          showingTill={plbr_showing}
          currentShowing={
            currentPage === 1
              ? currentPage
              : (currentPage - 1) * plbr_showing + 1
          }
          currentPage={currentPage}
          isLoading={loading}
        />
      </div>
    </>
  );
};
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(rules);
