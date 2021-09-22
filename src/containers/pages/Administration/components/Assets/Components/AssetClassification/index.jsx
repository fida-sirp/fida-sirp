import React, { useState, useEffect } from 'react';
import { Col, Row, Modal } from 'antd';
import Dustbin from '../../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../../assets/svgIcon/pencil';
import SPButton from '../../../../../../../components/SPButton';
import SPDrawer from '../../../../../../../components/SPDrawer';
import SPSearch from '../../../../../../../components/SPSearch';
import SPSingleSelectDropdown from '../../../../../../../components/SPSingleSelectDropdown';
import SPSelect from '../../../../../../../components/SPSelect';
import SPTable from '../../../../../../../components/SPTable';
import { Radio, Input, Space } from 'antd';
import { connect } from 'react-redux';
import {
  classificationChangeTitle,
  createClassiication,
  deleteClassification,
  getClassificationList,
  updateClassificationList,
  classificationFormulaChange,
  getclassificationFormula
} from '../../../../../../../actions/administration';
import { Label, AutoCalculationValue, AutoLabel } from "./StyledComponents";
import queryString from 'query-string';
import UpdateClassificationForm from '../../AssetDetails/components/editAssetClassification';
import { useHistory } from 'react-router';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ChangeTitleForm from './Components/ChangeTitleForm'
import Confidentiality from './Components/Confidentiality'
import Integrity from './Components/Integrity'
import Availability from './Components/Availability'
import _ from 'lodash';

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



const Classification = ({
  getList,
  classificationList,
  loading,
  updateClassificationList,
  deleteList,
  createList,
  changeTitle,
  changeFormula,
  onGetFormula,
  defaultFormula,
  allTabsHeading,
  access
}) => {

  const [totalCount, setTotalCount] = useState(1);
  const [showChangeTitleModal, setShowChangeTitleModal] = useState(false)
  const [showCreateAdversory, setshowCreateAdversory] = useState(false);
  const [showing, setShowing] = useState('20');
  const [updateClassification, setUpdateClassification] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [selectAsset, setSelectedAsset] = useState("Confidentiality")
  const [selectCalculation, setSelectCalculation] = useState("")
  const [selectAscFormula, setAscFormula] = useState('*')
  const [currentPage, setCurrentPage] = useState(1);
  const [classificationDataList, setClassificationList] = useState([]);
  const [query, setQuery] = useState(location.search);
  const history = useHistory();
  const { confirm } = Modal;
  const [updateInitValue, setUpdateInitValue] = useState({
    asc_name: '',
    asc_value: '',
    id: '',
  });
  const myArrayQry = mapQueryWithApi(query);

  const {
    asc_show = '20',
    asc_page_no = 1,
    asc_subject,
    sort = undefined,
  } = queryString.parse(query);

  const handleQuery = qs => {
    history.push('/administration?' + qs);
    setQuery(qs);
  };

  function showConfirm(key) {
    confirm({
      title: 'Are you sure you want to delete the case?',
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
  useEffect(() => {
    onGetFormula()
  }, [onGetFormula])


  const [searchText, setSearchText] = useState(asc_subject);

  const assetValueColumns = [
    {
      title: '#',
      dataIndex: 'asc_id',
      editable: false,
      key: (text, record, index) => record.asc_id,
      render: (text, record, index) => (currentPage - 1) * showing + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'asc_name',
      editable: false,
      width: '45%',
      key: (text, record, index) => record.asc_id,
      render: (text, record, index) => record.asc_name,
    },
    {
      title: 'Value',
      dataIndex: 'asc_value',
      editable: false,
      width: '45%',
      key: (text, record, index) => record.asc_id,
      render: (text, record, index) => record.asc_value,
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
        const moreItems = [];
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("update-asset-classification"))) {
          const updateClassification =  {
            key: 'edit',
            label: 'Edit',
            icon: <Pencil />,
            onClickItem: () => {
              setUpdateClassification(true);
              setUpdateInitValue({
                asc_value: record.asc_value,
                asc_name: record.asc_name,
                id: record.asc_id,
              });
            }
          };
          moreItems.push(updateClassification);
        }
        if (access !== undefined && (access.includes("all-super-admin") || access.includes("delete-asset-classification"))) {
          const deleteClassification = {
            key: 'delete',
            label: 'Delete',
            icon: <Dustbin />,
            onClickItem: () => showConfirm(record?.asc_id),
          };
          moreItems.push(deleteClassification);
        }
        if(moreItems.length !== 0) {
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
        AssetClassificationSearch: {},
        QueryString: '',
      };
      if (parsedQuery.asc_subject) {
        queryObject.AssetClassificationSearch.search = parsedQuery.asc_subject;
      }
      if (parsedQuery.asc_page_no) {
        queryObject.payload.page = parsedQuery.asc_page_no;
      }

      if (parsedQuery.asc_show) {
        queryObject.payload['per-page'] = parsedQuery.asc_show;
      }
      const { AssetClassificationSearch } = queryObject;
      if (Object.keys(AssetClassificationSearch).length !== 0) {
        Object.entries(AssetClassificationSearch).forEach(([key, val]) => {
          myArrayQry += 'AssetClassificationSearch[' + key + ']=' + val + '&';
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
    if (selectCalculation === "custom") {
      const myArrayQry = mapQueryWithApi(query);
      getList({ queryItem: myArrayQry })
    }
  }, [query, selectCalculation]);

  useEffect(() => {
    if (classificationList) {
      if (Object.keys(classificationList).length !== 0) {
        setClassificationList(classificationList?.data.items);
        setTotalCount(classificationList?.data?._meta.totalCount);
        setCurrentPage(classificationList?.data?._meta.currentPage);
      }
    }
  }, [classificationList]);

  useEffect(() => {
    const queryObject = {
      asc_subject: asc_subject,
      ...(asc_show !== '20' && { asc_show: asc_show }),
      ...(asc_page_no !== 1 && { asc_page_no: asc_page_no }),
      ...(sort !== undefined && { sort: sort }),
    };
    setShowing(asc_show);
  }, [searchText, asc_show, asc_page_no]);

  const handleChange = (name, value) => {
    const obj = queryString.parse(query);
    obj[name] = value;
    const str = queryString.stringify(obj);
    handleQuery(str);
  };

  const onPageChange = pageNumber => {
    handleChange("asc_page_no", pageNumber);
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
      await updateClassificationList(payload);
    } else {
      const { id, ...data } = values;
      payload.data = data;
      payload.queryItem = myArrayQry;
      await createList(payload);
    }
    await setIsCreate(false);
    await setUpdateInitValue({
      asc_name: '',
      asc_value: '',
      id: '',
    });
    await setUpdateClassification(false);
    await getList();
  };

  useEffect(() => {
    if (!_.isEmpty(defaultFormula)) {
      setSelectCalculation(defaultFormula?.asc_select)
      if (defaultFormula?.asc_select === "auto") {
        setAscFormula(defaultFormula?.asc_formula)
      }
    }

  }, [defaultFormula])

  const handleCalculation = (e) => {
    setSelectCalculation(e.target.value)
    const payload = {
      asc_select: e.target.value
    }
    changeFormula(payload)
  }
  const handleChangeTitle = (values) => {
    if (!_.isEmpty(values)) {
      changeTitle(values)
    }
    setShowChangeTitleModal(false)
  }

  const handleChangeFormula = (e) => {
    setAscFormula(e.target.value)
    const payload = {
      asc_formula: e.target.value
    }
    changeFormula(payload)
  }

  return (
    <>
      <SPDrawer
        title={`Change Classification`}
        isVisible={showChangeTitleModal}
        onClose={() => {
          setShowChangeTitleModal(false);
        }}
        drawerWidth={800}
      >
        <ChangeTitleForm isVisible={showChangeTitleModal} title={allTabsHeading?.assetsClassification} changeTitleHandler={handleChangeTitle} />
      </SPDrawer>
      <Row style={{ marginBottom: 18, alignItems: "center" }}>
        <Col span={4}>
          <Label>
            {allTabsHeading?.assetsClassification}
          </Label>
        </Col>
        <Col>
          {(access !== undefined && (access.includes("all-super-admin") || access.includes("change-title-asset-classification"))) ?
          <SPButton
            title="Change Title"
            onButtonClick={() => {
              setShowChangeTitleModal(true);
            }}
            size="small"
          /> : ''}
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          {(access !== undefined && (access.includes("all-super-admin") || access.includes("change-formula-asset-classification"))) ?
          <Radio.Group onChange={handleCalculation} value={selectCalculation} defaultValue={selectCalculation}  >
            <Space direction="horizontal"  >
              <Radio value="auto" style={{ color: "#fff" }}>Auto Calculation</Radio>
              <Radio value="custom" style={{ color: "#fff" }}>Custom Calculation</Radio>
            </Space>
          </Radio.Group> : ''}
        </Col>
      </Row>
      <SPDrawer
        title={`${isCreate ? 'Create' : 'Update'} Asset Classification`}
        isVisible={updateClassification}
        onClose={() => {
          setUpdateClassification(false);
        }}
        drawerWidth={800}
      >
        <UpdateClassificationForm
          initialValues={updateInitValue}
          onFormSubmit={handleUpdate}
        />
      </SPDrawer>
      {selectCalculation === "auto" &&
        <>
          <Row>
            <Col span={24}>
              {(access !== undefined && (access.includes("all-super-admin") || access.includes("change-formula-asset-classification"))) ?
              <AutoCalculationValue style={{ padding: 20, marginTop: 20 }}>
                <Row>
                  <Col>
                    <Radio.Group onChange={handleChangeFormula} value={selectAscFormula} defaultValue={selectAscFormula}>
                      <Space direction="horizontal" style={{ display: "flex" }}>
                        <Radio value="*" style={{ color: "#fff" }}>Asset Security Profile = Confidentiality x Integrity x Availability</Radio>
                        <Radio value="+" style={{ color: "#fff" }}>Asset Security Profile = Confidentiality + Integrity + Availability</Radio>
                      </Space>
                    </Radio.Group>
                  </Col>
                </Row>
              </AutoCalculationValue> : '' }
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <div style={{ display: "flex" }}>

              {(access !== undefined && (access.includes("all-super-admin") || access.includes("index-confidentiality"))) &&
                <SPButton
                style={{
                marginRight: 10,
                backgroundColor: 'Confidentiality' === selectAsset ? "#448782" : "transparent",
                border: "1px solid grey"
              }}
                title='Confidentiality'
                size="small"
                onButtonClick={() => {
                setSelectedAsset('Confidentiality')
              }}
                />  }
              {(access !== undefined && (access.includes("all-super-admin") || access.includes("index-integrity"))) &&
              <SPButton
                  style={{
                    marginRight: 10,
                    backgroundColor: 'Integrity' === selectAsset ? "#448782" : "transparent",
                    border: "1px solid grey"
                  }}
                  title='Integrity'
                  size="small"
                  onButtonClick={() => {
                    setSelectedAsset('Integrity')
                  }}
              /> }
              {(access !== undefined && (access.includes("all-super-admin") || access.includes("index-availability"))) &&
              <SPButton
                  style={{
                    marginRight: 10,
                    backgroundColor: 'Availability' === selectAsset ? "#448782" : "transparent",
                    border: "1px solid grey"
                  }}
                  title='Availability'
                  size="small"
                  onButtonClick={() => {
                    setSelectedAsset('Availability')
                  }}
              /> }

             { /* ASSET_OPTIONS.map((item, index) => {
                return (
                  <SPButton
                    style={{ marginRight: 10, backgroundColor: item === selectAsset ? "#448782" : "transparent", border: "1px solid grey" }}
                    title={item}
                    size="small"
                    onButtonClick={() => {
                      setSelectedAsset(item)
                    }}
                  />
                )
              })*/}
            </div>
          </Row>
        </>}

      {/* Main Component With */}
      {selectCalculation === "auto" && selectAsset === "Confidentiality" && <div style={{ padding: 30 }}><Confidentiality access={access} /></div>}
      {selectCalculation === "auto" && selectAsset === "Integrity" && <div style={{ padding: 30 }}><Integrity access={access} /></div>}
      {selectCalculation === "auto" && selectAsset === "Availability" && <div style={{ padding: 30 }}><Availability access={access} /></div>}

      {selectCalculation === "custom" && <div>
        <Row
          gutter={[19, 10]}
          style={{
            marginTop: 23,
            marginBottom: 13,
          }}
        >
          <Col span={4}>
            {(access !== undefined && (access.includes("all-super-admin") || access.includes("change-title-asset-classification"))) ?
            <SPButton
              onButtonClick={() => {
                setUpdateClassification(true);
                setIsCreate(true);
              }}
              title="Create Asset Classification"
              size="small"
            /> : '' }
          </Col>
          <Col span={20} style={{ display: "flex", justifyContent: "flex-end" }} >
            <SPSelect
              title="Showing"
              style={{ marginLeft: 10 }}
              items={showingFilter}
              selected={asc_show}
              onChange={e => {
                handleChange('asc_show', e.key);
              }}
            />
            <div style={{ marginLeft: 10 }} >
              <SPSearch
                text={searchText}
                onChange={e => {
                  setSearchText(e.target.value);
                }}
                onEnter={() => {
                  handleChange('asc_subject', searchText);
                }}
                size="500px"
              />
            </div>
          </Col>
        </Row>
        <SPTable
          columns={assetValueColumns}
          dataSource={classificationDataList}
          onPageChange={onPageChange}
          canPaginate
          emptyText="No Data"
          totalRecords={totalCount}
          showingTill={asc_show}
          handleTableChange={handleTableChange}
          currentShowing={currentPage}
          currentPage={currentPage}
          isLoading={loading}
        />
      </div>}
    </>
  );
};

const mapStateToProps = state => ({
  classificationList: state.administration.assets.listData,
  loading: state.administration.assets.loading,
  defaultFormula: state.administration.assetsFormula.defautlValue,
  allTabsHeading: state.administration.allTabsHeading?.listData,
});

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(getClassificationList(payload)),
  updateClassificationList: payload =>
    dispatch(updateClassificationList(payload)),
  deleteList: payload => dispatch(deleteClassification(payload)),
  createList: payload => dispatch(createClassiication(payload)),
  changeTitle: (...args) => dispatch(classificationChangeTitle(...args)),
  changeFormula: (...args) => dispatch(classificationFormulaChange(...args)),
  onGetFormula: () => dispatch(getclassificationFormula()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Classification);
