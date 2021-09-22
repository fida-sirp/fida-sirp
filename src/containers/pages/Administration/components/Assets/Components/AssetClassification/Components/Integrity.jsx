import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import queryString from 'query-string';
import SPSearch from '../../../../../../../../components/SPSearch';
import SPSelect from '../../../../../../../../components/SPSelect';
import SPTable from '../../../../../../../../components/SPTable';
import Dustbin from '../../../../../../../../assets/svgIcon/dustbin';
import SPButton from '../../../../../../../../components/SPButton';
import Pencil from '../../../../../../../../assets/svgIcon/pencil';
import { createIntegirtyList, deleteIntegirtyList, getIntegirtyListRequest, updateIntegirtyList } from '../../../../../../../../actions/administration'
import SPDrawer from '../../../../../../../../components/SPDrawer';
import SPSingleSelectDropdown from '../../../../../../../../components/SPSingleSelectDropdown';
const { confirm } = Modal;
import { showingFilter } from '../../../../../constant';
import AuthTokenHOC from '../../../../../../../../HOCs/AuthTokenHOC';
import IntergrityForm from './IntergrityForm'

const Confidentiality = ({ getList, isLoading, dataList, createList, updateList, deleteList,access }) => {
    const [totalCount, setTotalCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [showing, setShowing] = useState('20');
    const history = useHistory();
    const [DataList, setDataList] = useState([]);
    const [showIntDrawer, setShowIntDrawer] = useState(false);
    const [showEditOrg, setshowEditOrg] = useState(false);
    const [isEditForm, setIsEditForm] = useState(false)
    const [record, setRecord] = useState({});
    const [query, setQuery] = useState(location.search);
    const {
        ing_showing = '20',
        ing_page_no = 1,
        ing_subject,
        sort = undefined,
    } = queryString.parse(query);

    const handleQuery = qs => {
        history.push(
            '/administration?' + qs
        );
        setQuery(qs);
    };

    const [searchText, setSearchText] = useState(ing_subject);

    function showConfirm(key) {
        confirm({
            title: 'Are you sure you want to delete this?',
            centered: true,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                const myArrayQry = mapQueryWithApi(query);
                deleteList(key, myArrayQry);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const onOpenCreateModal = () => {
        setShowIntDrawer(true);
        setIsEditForm(false)
    };
    const onCloseCreateModal = () => {
        setshowCreateOrg(false);
    };

    useEffect(() => {
        getPublisherList()
    }, [query])

    const getPublisherList = () => {
        const myArrayQry = mapQueryWithApi(query);
        getList({ queryItem: myArrayQry });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'ing_id',
            editable: false,
            key: (text, record, index) => record?.org_id,
            render: (text, record, index) => (currentPage - 1) * showing + index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'ing_name',
            editable: false,
            sorter: true,
            width: "80%",
        },
        {
            title: 'Value',
            dataIndex: 'ing_value',
            editable: false,
            sorter: true,
        },
        {
            title: 'Actions',
            dataIndex: 'org_actions',
            render: (text, record, index) => {



                const moreItems = [];
                if (access !== undefined && (access.includes("all-super-admin") || access.includes("update-integrity"))) {
                    const updateIntegrity =  {
                        key: 'edit',
                        label: 'Edit',
                        icon: <Pencil />,
                        onClickItem: () => {
                            setIsEditForm(true)
                            if (record) {
                                setRecord(record);
                            }
                            setShowIntDrawer(true);
                        },
                    };
                    moreItems.push(updateIntegrity);
                }
                if (access !== undefined && (access.includes("all-super-admin") || access.includes("update-integrity"))) {
                    const deleteIntegrity =  {
                        key: 'delete',
                        label: 'Delete',
                        icon: <Dustbin />,
                        onClickItem: () => {
                            showConfirm(record?.ing_id);
                        },
                    };
                    moreItems.push(deleteIntegrity);
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
                IntegritySearch: {},
                QueryString: '',
            };
            if (parsedQuery.ing_subject) {
                queryObject.IntegritySearch.search = parsedQuery.ing_subject;
            }
            if (parsedQuery.ing_page_no) {
                queryObject.payload.page = parsedQuery.ing_page_no;
            }
            if (parsedQuery.sort) {
                queryObject.payload.sort = parsedQuery.sort;
            }

            if (parsedQuery.ing_showing) {
                queryObject.payload['per-page'] = parsedQuery.ing_showing;
            }
            const { IntegritySearch } = queryObject;
            if (Object.keys(IntegritySearch).length !== 0) {
                Object.entries(IntegritySearch).forEach(([key, val]) => {
                    myArrayQry += 'IntegritySearch[' + key + ']=' + val + '&';
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
        if (dataList) {
            if (Object.keys(dataList).length !== 0) {
                setDataList(dataList?.items);
                setTotalCount(dataList?._meta?.totalCount);
                setCurrentPage(dataList?._meta?.currentPage);
            }
        }
    }, [dataList]);

    useEffect(() => {
        const queryObject = {
            ing_subject: ing_subject,
            ...(ing_showing !== '20' && { ing_showing: ing_showing }),
            ...(ing_page_no !== 1 && { ing_page_no: ing_page_no }),
            ...(sort !== undefined && { sort: sort }),
        };
        setShowing(ing_showing);
    }, [searchText, ing_showing, ing_page_no]);

    const handleChange = (name, value) => {
        if (value !== null || value !== undefined) {
            const obj = queryString.parse(query);
            obj[name] = value;
            const str = queryString.stringify(obj);
            if (name == 'ing_showing') {
                setShowing(value);
            }
            handleQuery(str);
        }
    };

    const onPageChange = pageNumber => {
        handleChange('ing_page_no', pageNumber);
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
    const closeDrawerModal = () => {
        setShowIntDrawer(false)
    }
    const handleSubmit = (value) => {
        const myQuery = mapQueryWithApi(query);
        if (isEditForm) {
            if (record?.ing_id) {
                updateList(record?.ing_id, value, myQuery)
            }
        } else {
            createList(value, myQuery)
        }
        closeDrawerModal()
    }

    return (
        <>
            <SPDrawer
                title={`${isEditForm ? "Update" : "Create"} Integrity`}
                isVisible={showIntDrawer}
                onClose={() => {
                    setShowIntDrawer(false);
                    setIsEditForm(false)
                    setRecord({})
                }}
            >
                <IntergrityForm isVisible={showIntDrawer} onClose={() => {
                    setShowIntDrawer(false)
                    setIsEditForm(false)
                }} record={record} isEditForm={isEditForm} submit={handleSubmit} />
            </SPDrawer>
            <Row gutter={[19, 25]}>
                <Col span={12} style={{ display: 'flex' }}>
                    <div style={{ marginRight: 10 }}>
                        {(access !== undefined && (access.includes("all-super-admin") || (access.includes("index-integrity") && access.includes("create-integrity")))) &&
                        <SPButton
                            title="Create Integrity"
                            onButtonClick={onOpenCreateModal}
                            size="small"
                        /> }
                    </div>
                </Col>
                <Col
                    span={12}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <div style={{ marginRight: 20 }}>
                        <SPSelect
                            title="Showing"
                            items={showingFilter}
                            selected={ing_showing || 20}
                            onChange={e => {
                                handleChange('ing_showing', e.key);
                            }}
                        />
                    </div>
                    <div>
                        <SPSearch
                            text={searchText}
                            onChange={e => {
                                setSearchText(e.target.value);
                            }}
                            onEnter={() => {
                                handleChange('ing_subject', searchText);
                            }}
                            size="420px"
                        />
                    </div>
                </Col>
            </Row>
            <SPTable
                columns={columns}
                dataSource={DataList}
                onPageChange={onPageChange}
                canPaginate
                isLoading={isLoading}
                emptyText="No Data"
                currentPage={currentPage}
                totalRecords={totalCount}
                handleTableChange={handleTableChange}
                currentShowing={
                    currentPage === 1 ? currentPage : (currentPage - 1) * ing_showing + 1
                }
                showingTill={ing_showing}
            />
        </>
    );
};

const mapStateToProps = state => {
    return {
        dataList: state.administration.assetsIntegrity.integrityList,
        isLoading: state.administration.assetsIntegrity.loading,
    };
};

const mapDispatchToProps = dispatch => ({
    getList: (...args) => dispatch(getIntegirtyListRequest(...args)),
    deleteList: (...args) => dispatch(deleteIntegirtyList(...args)),
    createList: (...args) => dispatch(createIntegirtyList(...args)),
    updateList: (...args) => dispatch(updateIntegirtyList(...args)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthTokenHOC
)(Confidentiality);
