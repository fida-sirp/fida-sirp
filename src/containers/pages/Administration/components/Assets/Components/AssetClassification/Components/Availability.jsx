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
import { createAvaiabilityList, deleteAvaiabilityList, getAvaiabilityListRequest, updateAvaiabilityList } from '../../../../../../../../actions/administration'
import SPDrawer from '../../../../../../../../components/SPDrawer';
import SPSingleSelectDropdown from '../../../../../../../../components/SPSingleSelectDropdown';
const { confirm } = Modal;
import { showingFilter } from '../../../../../constant';
import AuthTokenHOC from '../../../../../../../../HOCs/AuthTokenHOC';
import AvailabilityForm from './AvailabilityForm'

const Confidentiality = ({ getList, isLoading, dataList, createList, updateList, deleteList , access}) => {
    const [totalCount, setTotalCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [showing, setShowing] = useState('20');
    const history = useHistory();
    const [DataList, setDataList] = useState([]);
    const [showAvailDrawer, setShowAvailDrawer] = useState(false);
    const [showEditOrg, setshowEditOrg] = useState(false);
    const [isEditForm, setIsEditForm] = useState(false)
    const [record, setRecord] = useState({});
    const [query, setQuery] = useState(location.search);
    const {
        avl_showing = '20',
        avl_page_no = 1,
        avl_subject,
        sort = undefined,
    } = queryString.parse(query);

    const handleQuery = qs => {
        history.push(
            '/administration?' + qs
        );
        setQuery(qs);
    };

    const [searchText, setSearchText] = useState(avl_subject);

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
        setShowAvailDrawer(true);
        setIsEditForm(false)
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
            dataIndex: 'avl_id',
            editable: false,
            key: (text, record, index) => record?.avl_id,
            render: (text, record, index) => (currentPage - 1) * showing + index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'avl_name',
            editable: false,
            sorter: true,
            width: "80%",
        },
        {
            title: 'Value',
            dataIndex: 'avl_value',
            editable: false,
            sorter: true,
        },
        {
            title: 'Actions',
            dataIndex: 'avl_actions',
            render: (text, record, index) => {



                const moreItems = [];
                if (access !== undefined && (access.includes("all-super-admin") || access.includes("update-availability"))) {
                    const updateAvailability = {
                        key: 'edit',
                        label: 'Edit',
                        icon: <Pencil />,
                        onClickItem: () => {
                            setIsEditForm(true)
                            if (record) {
                                setRecord(record);
                            }
                            setShowAvailDrawer(true);
                        },
                    };
                    moreItems.push(updateAvailability);
                }
                if (access !== undefined && (access.includes("all-super-admin") || access.includes("delete-availability"))) {
                    const deleteAvailability = {
                        key: 'delete',
                        label: 'Delete',
                        icon: <Dustbin />,
                        onClickItem: () => {
                            showConfirm(record?.avl_id);
                        },
                    };
                    moreItems.push(deleteAvailability);
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
                AvailabilitySearch: {},
                QueryString: '',
            };
            if (parsedQuery.avl_subject) {
                queryObject.AvailabilitySearch.search = parsedQuery.avl_subject;
            }
            if (parsedQuery.avl_page_no) {
                queryObject.payload.page = parsedQuery.avl_page_no;
            }
            if (parsedQuery.sort) {
                queryObject.payload.sort = parsedQuery.sort;
            }

            if (parsedQuery.avl_showing) {
                queryObject.payload['per-page'] = parsedQuery.avl_showing;
            }
            const { AvailabilitySearch } = queryObject;
            if (Object.keys(AvailabilitySearch).length !== 0) {
                Object.entries(AvailabilitySearch).forEach(([key, val]) => {
                    myArrayQry += 'AvailabilitySearch[' + key + ']=' + val + '&';
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
        setShowing(avl_showing);
    }, [searchText, avl_showing, avl_page_no]);

    const handleChange = (name, value) => {
        if (value !== null || value !== undefined) {
            const obj = queryString.parse(query);
            obj[name] = value;
            const str = queryString.stringify(obj);
            if (name == 'avl_showing') {
                setShowing(value);
            }
            handleQuery(str);
        }
    };

    const onPageChange = pageNumber => {
        handleChange('avl_page_no', pageNumber);
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
        setShowAvailDrawer(false)
    }
    const handleSubmit = (value) => {
        const myQuery = mapQueryWithApi(query);
        if (isEditForm) {
            if (record?.avl_id) {
                updateList(record?.avl_id, value, myQuery)
            }
        } else {
            createList(value, myQuery)
        }
        closeDrawerModal()
    }

    return (
        <>
            <SPDrawer
                title={`${isEditForm ? "Update" : "Create"} Availability`}
                isVisible={showAvailDrawer}
                onClose={() => {
                    setShowAvailDrawer(false);
                    setIsEditForm(false)
                    setRecord({})
                }}
            >
                <AvailabilityForm isVisible={showAvailDrawer} onClose={() => {
                    setShowAvailDrawer(false)
                    setIsEditForm(false)
                }} record={record} isEditForm={isEditForm} submit={handleSubmit} />
            </SPDrawer>
            <Row gutter={[19, 25]}>
                <Col span={12} style={{ display: 'flex' }}>
                    <div style={{ marginRight: 10 }}>
                        {(access !== undefined && (access.includes("all-super-admin") || (access.includes("index-availability") && access.includes("create-availability")))) &&
                        <SPButton
                            title="Create Availability"
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
                            selected={avl_showing || 20}
                            onChange={e => {
                                handleChange('avl_showing', e.key);
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
                                handleChange('avl_subject', searchText);
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
                    currentPage === 1 ? currentPage : (currentPage - 1) * avl_showing + 1
                }
                showingTill={avl_showing}
            />
        </>
    );
};

const mapStateToProps = state => {
    return {
        dataList: state.administration.assetsAvailability.availabilityList,
        isLoading: state.administration.assetsAvailability.loading,
    };
};

const mapDispatchToProps = dispatch => ({
    getList: (...args) => dispatch(getAvaiabilityListRequest(...args)),
    deleteList: (...args) => dispatch(deleteAvaiabilityList(...args)),
    createList: (...args) => dispatch(createAvaiabilityList(...args)),
    updateList: (...args) => dispatch(updateAvaiabilityList(...args)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthTokenHOC
)(Confidentiality);
