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
import { assetConfidentiality, createConfidentiality, deleteConfidentiality, updateConfidentiality } from '../../../../../../../../actions/administration'
import SPDrawer from '../../../../../../../../components/SPDrawer';
import SPSingleSelectDropdown from '../../../../../../../../components/SPSingleSelectDropdown';
const { confirm } = Modal;
import { showingFilter } from '../../../../../constant';
import AuthTokenHOC from '../../../../../../../../HOCs/AuthTokenHOC';
import ConfidentialityForm from './ConfidentialityForm'

const Confidentiality = ({ getList, isLoading, dataList, createList, updateList, deleteList,access }) => {
    const [totalCount, setTotalCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [showing, setShowing] = useState('20');
    const history = useHistory();
    const [conDataList, setConDataList] = useState([]);
    const [showConDrawer, setShowConDrawer] = useState(false);
    const [showEditOrg, setshowEditOrg] = useState(false);
    const [isEditForm, setIsEditForm] = useState(false)
    const [record, setRecord] = useState({});
    const [query, setQuery] = useState(location.search);
    const {
        con_showing = '20',
        con_page_no = 1,
        con_subject,
        sort = undefined,
    } = queryString.parse(query);

    const handleQuery = qs => {
        history.push(
            '/administration?' + qs
        );
        setQuery(qs);
    };

    const [searchText, setSearchText] = useState(con_subject);

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
        setShowConDrawer(true);
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
            dataIndex: 'con_id',
            editable: false,
            key: (text, record, index) => record?.org_id,
            render: (text, record, index) => (currentPage - 1) * showing + index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'con_name',
            editable: false,
            sorter: true,
            width: "80%",
        },
        {
            title: 'Value',
            dataIndex: 'con_value',
            editable: false,
            sorter: true,
        },
        {
            title: 'Actions',
            dataIndex: 'org_actions',
            render: (text, record, index) => {

                const moreItems = [];
                if (access !== undefined && (access.includes("all-super-admin") || access.includes("update-confidentiality"))) {
                    const updateConfidentiality = {
                        key: 'edit',
                        label: 'Edit',
                        icon: <Pencil />,
                        onClickItem: () => {
                            setIsEditForm(true)
                            if (record) {
                                setRecord(record);
                            }
                            setShowConDrawer(true);
                        },
                    };
                    moreItems.push(updateConfidentiality);
                }

                if (access !== undefined && (access.includes("all-super-admin") || access.includes("delete-confidentiality"))) {
                    const deleteConfidentiality = {
                        key: 'delete',
                        label: 'Delete',
                        icon: <Dustbin />,
                        onClickItem: () => {
                            showConfirm(record?.con_id);
                        },
                    };
                    moreItems.push(deleteConfidentiality);
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
                ConfidentialitySearch: {},
                QueryString: '',
            };
            if (parsedQuery.con_subject) {
                queryObject.ConfidentialitySearch.search = parsedQuery.con_subject;
            }
            if (parsedQuery.con_page_no) {
                queryObject.payload.page = parsedQuery.con_page_no;
            }
            if (parsedQuery.sort) {
                queryObject.payload.sort = parsedQuery.sort;
            }

            if (parsedQuery.con_showing) {
                queryObject.payload['per-page'] = parsedQuery.con_showing;
            }
            const { ConfidentialitySearch } = queryObject;
            if (Object.keys(ConfidentialitySearch).length !== 0) {
                Object.entries(ConfidentialitySearch).forEach(([key, val]) => {
                    myArrayQry += 'ConfidentialitySearch[' + key + ']=' + val + '&';
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
                setConDataList(dataList?.items);
                setTotalCount(dataList?._meta?.totalCount);
                setCurrentPage(dataList?._meta?.currentPage);
            }
        }
    }, [dataList]);

    useEffect(() => {
        const queryObject = {
            con_subject: con_subject,
            ...(con_showing !== '20' && { con_showing: con_showing }),
            ...(con_page_no !== 1 && { con_page_no: con_page_no }),
            ...(sort !== undefined && { sort: sort }),
        };
        setShowing(con_showing);
    }, [searchText, con_showing, con_page_no]);

    const handleChange = (name, value) => {
        if (value !== null || value !== undefined) {
            const obj = queryString.parse(query);
            obj[name] = value;
            const str = queryString.stringify(obj);
            if (name == 'con_showing') {
                setShowing(value);
            }
            handleQuery(str);
        }
    };

    const onPageChange = pageNumber => {
        handleChange('con_page_no', pageNumber);
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
        setShowConDrawer(false)
    }
    const handleSubmit = (value) => {
        const myQuery = mapQueryWithApi(query);
        if (isEditForm) {
            if (record?.con_id) {
                updateList(record?.con_id, value, myQuery)
            }
        } else {
            createList(value, myQuery)
        }
        closeDrawerModal()
    }

    return (
        <>
            <SPDrawer
                title={`${isEditForm ? "Update" : "Create"}   Confidentiality`}
                isVisible={showConDrawer}
                onClose={() => {
                    setRecord({})
                    setShowConDrawer(false);
                    setIsEditForm(false)
                }}
            >
                <ConfidentialityForm isVisible={showConDrawer} onClose={() => { setShowConDrawer(false), setIsEditForm(false) }} record={record} isEditForm={isEditForm} submit={handleSubmit} />
            </SPDrawer>
            <Row gutter={[19, 25]}>
                <Col span={12} style={{ display: 'flex' }}>
                    <div style={{ marginRight: 10 }}>
                        {(access !== undefined && (access.includes("all-super-admin") || (access.includes("index-confidentiality") && access.includes("create-confidentiality")))) &&
                        <SPButton
                            title="Create Confidentiality"
                            onButtonClick={onOpenCreateModal}
                            size="small"
                        />}
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
                            selected={con_showing || 20}
                            onChange={e => {
                                handleChange('con_showing', e.key);
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
                                handleChange('con_subject', searchText);
                            }}
                            size="420px"
                        />
                    </div>
                </Col>
            </Row>
            <SPTable
                columns={columns}
                dataSource={conDataList}
                onPageChange={onPageChange}
                canPaginate
                isLoading={isLoading}
                emptyText="No Data"
                currentPage={currentPage}
                totalRecords={totalCount}
                handleTableChange={handleTableChange}
                currentShowing={
                    currentPage === 1 ? currentPage : (currentPage - 1) * con_showing + 1
                }
                showingTill={con_showing}
            />
        </>
    );
};

const mapStateToProps = state => {
    return {
        dataList: state.administration.assetsConfidentiality.confidentialityData,
        isLoading: state.administration.assetsConfidentiality.loading,
    };
};

const mapDispatchToProps = dispatch => ({
    getList: (...args) => dispatch(assetConfidentiality(...args)),
    deleteList: (...args) => dispatch(deleteConfidentiality(...args)),
    createList: (...args) => dispatch(createConfidentiality(...args)),
    updateList: (...args) => dispatch(updateConfidentiality(...args)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthTokenHOC
)(Confidentiality);
