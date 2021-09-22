import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dustbin from '../../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../../assets/svgIcon/pencil';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import {
    getSelectedProbability,
    changeTitleRequest,
    createRiskManagementProbablity,
    deleteRiskManagementProbablity,
    riskManagementProbablity,
    updateFormulaForProbabilty,
    updateRiskManagementProbablity
} from '../../../../../../actions/administration';
import queryString from 'query-string';
import SPTable from '../../../../../../components/SPTable';
import SPDrawer from '../../../../../../components/SPDrawer';
import SPButton from '../../../../../../components/SPButton';
import SPSingleSelectDropdown from '../../../../../../components/SPSingleSelectDropdown';
import { Row, Col, Modal } from 'antd';
import { useHistory, useParams } from 'react-router';
import CreateNewlabel from './createNewlabel'
import styled from 'styled-components'
import ChangeTitleForm from './changeTitleProbality'
import { Radio, Input, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import _ from 'lodash';
import PageHeader from '../../../../../layout/pageHeader';

const CustomView = styled.div`
`
const View = styled.div`
`
const Label = styled.div`
  font-size: 20px;
  color: #ffffff;
  font-weight: 700;
  display: flex;
`
const AutoCalculationValue = styled.div`
   border:1px solid grey;
   display:flex;
   justify-content:center;
   align-items:center;
   margin-top:5rem;
`
const AutoLabel = styled.div`
   font-size:30px;
`

const Probability = ({
    getList,
    controlList,
    probablityList,
    updateList,
    deleteList,
    createList,
    isLoading,
    changeNameHandler,
    updateFormula,
    riskmanagementProbability,
    onGetSelectedProbability,
    probablitySelected,
    access
}) => {
    const { confirm } = Modal;
    const history = useHistory();
    const [showDrawer, setShowDrawer] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [record, setRecord] = useState({});
    const [view, SetView] = useState()
    const [showChangeTitleModal, setShowChangeTitleModal] = useState();
    const [totalCount, setTotalCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState(location.search);
    const { path } = useParams();
    const {
        lhv_showing = '20',
        lhv_page_no = 1,
        lhv_subject,
        sort = undefined,
    } = queryString.parse(query);
    const [selectCalculation, setSelectCalculation] = useState("auto")
    const [showing, setShowing] = useState(lhv_showing);
    const [searchText, setSearchText] = useState(lhv_subject || '');
    const [activeOption, setActiveOption] = useState(
        history.location.pathname.split('/')[2] || 'all'
    );


    function showConfirm(key) {
        confirm({
            title: 'Are you sure you want to delete the case?',
            centered: true,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                const myQuery = mapQueryWithApi(query);
                deleteList(key, myQuery)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    useEffect(() => {
        onGetSelectedProbability()
    }, [] || [query]);

    useEffect(() => {
        if(probablitySelected) {
            setSelectCalculation(probablitySelected?.lhv_select)
            if (probablitySelected?.lhv_select === "custom") {
                getComplianceList();
            }
        }
    }, [probablitySelected]);

    const getComplianceList = async () => {
        const myArrayQry = mapQueryWithApi(query);
        getList({ queryItem: myArrayQry, path });
    };

    useEffect(() => {
        if (probablityList) {
            setTotalCount(probablityList?._meta?.totalCount);
            setCurrentPage(probablityList?._meta?.currentPage);
        }
    }, [probablityList]);


    const columns = [
        {
            title: '#',
            dataIndex: 'lhv_id',
            editable: false,
            key: (text, record, index) => record?.lhv_id,
            render: (text, record, index) => (currentPage - 1) * showing + index + 1,
        },
        {
            title: 'Section Number',
            dataIndex: 'lhv_name',
            sorter: true,
            editable: false,
            // key: (text, record, index) => record?.lhv_id,
        },
        {
            title: 'Section',
            dataIndex: 'lhv_value',
            editable: false,
            sorter: true,
            render: (text, record, index) => record.lhv_value,
        },
        {
            title: 'Actions',
            dataIndex: 'adv_id',
            width: 50,
            render: (text, record, index) => {

                const moreItems = [];
                if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-likelihood-value"))){
                    const updateLikelihoodValue=  {
                        key: 'edit',
                        label: 'Edit',
                        icon: <Pencil />,
                        onClickItem: () => {
                            setRecord(record)
                            setShowDrawer(true)
                        },

                    };
                    moreItems.push(updateLikelihoodValue);
                }
                if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-likelihood-value"))){
                    const updateLikelihoodValue= {
                        key: 'delete',
                        label: 'Delete',
                        icon: <Dustbin />,
                        onClickItem: () => showConfirm(record?.lhv_id),
                    };
                    moreItems.push(updateLikelihoodValue);
                }
                if(moreItems.length !==0 ) {
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
                applicationCategorySearch: {},
                QueryString: '',
            };
            if (parsedQuery.lhv_page_no) {
                queryObject.payload.page = parsedQuery.lhv_page_no;
            }
            if (parsedQuery.sort) {
                queryObject.payload.sort = parsedQuery.sort;
            }
            if (parsedQuery.lhv_subject) {
                queryObject.applicationCategorySearch.search = parsedQuery.lhv_subject;
            }
            if (parsedQuery.lhv_showing) {
                queryObject.payload['per-page'] = parsedQuery.lhv_showing;
            }
            const applicationCategorySearch = queryObject?.applicationCategorySearch;
            if (Object.keys(applicationCategorySearch).length !== 0) {
                Object.entries(applicationCategorySearch).forEach(([key, val]) => {
                    myArrayQry += 'ComplianceSearch[' + key + ']=' + val + '&';
                });
            }

            if (Object.keys(queryObject.payload).length !== 0) {
                Object.entries(queryObject.payload).forEach(([key, val]) => {
                    myArrayQry += key + '=' + val + '&';
                });
            }
        }

        if (location.pathname.split('/').pop() !== 'administration') {
            myArrayQry += 'ComplianceSearch[search]=' + searchText;
        }

        return myArrayQry;
    }

    const onPageChange = pageNumber => {
        handleChange('lhv_page_no', pageNumber);
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

    const handleChange = (name, value) => {
        if (value !== null || value !== undefined) {
            const obj = queryString.parse(query);
            if (value === 'all') {
                obj[name] = '';
            } else {
                obj[name] = value;
            }
            delete obj['active_tab'];
            const str = queryString.stringify(obj);
            if (name == 'lhv_showing') {
                setShowing(value);
            }
            handleQuery(str);
        }
    };

    const handleQuery = qs => {
        if (activeOption !== 'all') {
            history.push(
                '/administration/?active_tab=riskManagement&&' + activeOption + '?' + qs
            );
        } else {
            history.push('/administration/?active_tab=riskManagement&&' + qs);
        }
        setQuery(qs);
    };

    const handleSubmit = values => {
        const myArrayQry = mapQueryWithApi(query);
        if (isCreate) {
            createList(values, myArrayQry);
        } else {
            if (record?.lhv_id) {
                updateList(record?.lhv_id, values, myArrayQry);
            }
        }
        setShowDrawer(false);
        setRecord({});
        setIsCreate(false)
    };

    const handleCalculation = (e) => {
        setSelectCalculation(e.target.value)
        const payload = {
            lhv_select: e.target.value
        }
        if (payload) {
            updateFormula(payload)
        }
    }
    
    const change = (values) => {
        if (!_.isEmpty(values)) {
            changeNameHandler(values)
        }
        setShowChangeTitleModal(false)
    }
    return (
        <View>
            <SPDrawer
                title={`Change Title`}
                isVisible={showChangeTitleModal}
                onClose={() => setShowChangeTitleModal(false)}
            >
                <ChangeTitleForm
                    isVisble={showChangeTitleModal}
                    type={isCreate}
                    recordValue={riskmanagementProbability}
                    changeHandler={change}
                    closeDrawer={() => setShowChangeTitleModal(false)}
                />
            </SPDrawer>
            <PageHeader
                title={riskmanagementProbability?.lhv_label}
                options={[
                    (access!==undefined && (access.includes("all-super-admin") || access.includes("change-title-likelihood-value"))) &&
                    <SPButton
                    title="Change Title"
                    onButtonClick={() => {
                        setShowChangeTitleModal(true);
                    }}
                    size="small"
                />
                ]}
            />
            <Row>
                <Col span={12} style={{ marginBottom: 20 }}>
                    <Radio.Group onChange={handleCalculation} value={selectCalculation}>
                        <Space direction="horizontal">
                            <Radio value="auto" style={{ color: "#fff" }}>Auto Calculation</Radio>
                            <Radio value="custom" style={{ color: "#fff" }}>Custom Calculation</Radio>
                        </Space>
                    </Radio.Group>
                </Col>
            </Row>
            {selectCalculation === "auto" && (
                <Row>
                    <Col span={24}>
                        <AutoCalculationValue>
                            <AutoLabel>New Lable = Threat Value X Vulnerability Value</AutoLabel>
                        </AutoCalculationValue>
                    </Col>
                </Row>

            )}
            {selectCalculation === "custom" && <CustomView>
                <Row style={{ justifyContent: 'flex-end' }}>
                    <Col style={{ display: 'flex' }}>
                        <div >
                            {(access!==undefined && (access.includes("all-super-admin") || access.includes("create-likelihood-value"))) &&
                            <SPButton
                                title={`Create ${riskmanagementProbability?.lhv_label}`}
                                onButtonClick={() => {
                                    setIsCreate(true);
                                    setRecord({})
                                    setShowDrawer(true);
                                }}
                                size="small"
                            /> }
                        </div>
                    </Col>
                    {/* <Col
                        span={12}
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                    </Col> */}
                </Row>
                <SPTable
                    columns={columns}
                    dataSource={probablityList?.items}
                    onPageChange={onPageChange}
                    canPaginate
                    emptyText="No Data"
                    handleTableChange={handleTableChange}
                    totalRecords={totalCount}
                    showingTill={showing}
                    currentShowing={
                        currentPage === 1 ? currentPage : (currentPage - 1) * showing + 1
                    }
                    currentPage={currentPage}
                    isLoading={isLoading}
                />
                <SPDrawer
                    title={isCreate ? `Create ${riskmanagementProbability?.lhv_label}` : `Update ${riskmanagementProbability?.lhv_label}`}
                    isVisible={showDrawer}
                    onClose={() => {
                        setShowDrawer(false)
                        setIsCreate(false)
                    }}
                >
                    <CreateNewlabel
                        isVisible={showDrawer}
                        isCreate={isCreate}
                        recordValue={record}
                        submit={handleSubmit}
                        closeDrawer={() => {
                            setShowDrawer(false)
                            setIsCreate(false)
                        }}
                    />
                </SPDrawer>
            </CustomView>}

        </View>
    );
};

const mapStateToProps = state => ({
    probablitySelected: state.administration.riskManagement?.probablitySelected,
    probablityList: state.administration.riskManagement?.probablity,
    isLoading: state.administration.riskManagement.loading,
    riskmanagementProbability: state.administration.allTabsHeading?.listData?.riskmanagementProbability,
});

const mapDispatchToProps = dispatch => ({
    onGetSelectedProbability: (...args) => dispatch(getSelectedProbability(...args)),
    getList: (...args) => dispatch(riskManagementProbablity(...args)),
    deleteList: (...args) => dispatch(deleteRiskManagementProbablity(...args)),
    updateList: (...args) => dispatch(updateRiskManagementProbablity(...args)),
    createList: (...args) => dispatch(createRiskManagementProbablity(...args)),
    changeNameHandler: (...args) => dispatch(changeTitleRequest(...args)),
    updateFormula: (...args) => dispatch(updateFormulaForProbabilty(...args)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SetDocumentTitleHOC,
    AuthTokenHOC
)(Probability);
