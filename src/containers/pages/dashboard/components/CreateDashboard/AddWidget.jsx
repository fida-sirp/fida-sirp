import React, {useState, useEffect} from 'react';
import * as _ from 'lodash';
import {useHistory, useParams} from 'react-router-dom';
import queryString from 'query-string';
import {compose} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';

import {AddWidgetContainer, WidgetSelect} from './StyledComponents';
import SPSearch from '../../../../../components/SPSearch';
import SelectBox from '../../../../../components/SelectBox';
import SPButton from '../../../../../components/SPButton';
import {ReactComponent as AnalysisImg} from '../../../../../assets/svgIcon/dashboard/analysis.svg';
import {ReactComponent as ViewImg} from '../../../../../assets/svgIcon/dashboard/view.svg';
import AuthTokenHOC from '../../../../../HOCs/AuthTokenHOC';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';
import {Label} from '../../../../../components/SelectBox/StyledComponents';
import {
    onDashboardWidgetsLayoutChange,
    onGetDashboardWidgetData,
    onGetwidgetList,
} from '../../../../../actions/dashboard';
import {Skeleton} from 'antd';

const AddWidget = ({
                       onGetWidgetList,
                       widgetsList,
                       widgetGroups,
                       selectedWidgets,
                       widgetListLoading,
                       layoutData,
                       onGetDashboardWidgetData,
                       onDashboardWidgetsLayoutChange,
                   }) => {
    const startx = 0;
    const starty = 0;
    const param = useParams();
    const history = useHistory();
    const [query, setQuery] = useState(location.search);
    const {das_subject} = queryString.parse(query);
    const [searchString, setSearchString] = useState(das_subject || '');
    const [filterWidgetData, setFilterWidgetData] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedCateogry, setSelectedCateogry] = useState({
        key: '',
        value: '',
        count: 0,
    });

    useEffect(() => {
        if (widgetsList) {
            // setWidgetData(widgetsList);
            const keys = Object.keys(selectedWidgets);
            const filterWidgets = widgetsList.filter((item, index) => {
                return !keys.includes(String(item.gra_id));
            });
            if (filterWidgets.length !== 0) {
                setFilterWidgetData(filterWidgets);
            } else {
                setFilterWidgetData(widgetsList);
            }
            // debugger;widgetData
        }
    }, [widgetsList, selectedWidgets]);

    useEffect(() => {
        if (widgetGroups) {
            const groupsList = Object.keys(widgetGroups).map(item => {
                return {
                    key: item,
                    value: item,
                    label: widgetGroups[item],
                };
            });
            setCategories(groupsList);
        }
    }, [widgetGroups]);

    /**
     * Select widget group to be display
     * @param {*} name
     * @param {*} value
     * @param {*} option
     */
    const selectedWidgetGroups = (name, value, option) => {
        const selected = categories.find(item => item.key === value);
        setSelectedCateogry(selected);
        let query = `&GraphsSearch[group]=${Number(value)}`;
        if (das_subject) {
            query = query.concat(`&GraphsSearch[search]=${das_subject}`);
        }
        onGetWidgetList(query);
    };

    const dragOverHandler = (e) => {
        e.preventDefault();
        return false;
    }

    const handleAddWidget = (id, type, dataPath, title) => {
        const maxLayout = Math.max(...layoutData.map(item => item.y), 0);

        const newLayout = {
            i: String(id),
            x: 0,
            y: maxLayout + 1,
            w: 12,
            h: 2,
        };
        const widgetsLayout = [...layoutData, newLayout];

        const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
        const endOfYear = moment().endOf('year').format('YYYY-MM-DD');

        const payload = {
            start: '2010-07-15',
            end: '2021-07-15',
            dataPath,
            id,
            type,
            das_id: param.id,
            layoutData: newLayout,
            title,
        };
        if (type) {
            onGetDashboardWidgetData(payload);
            onDashboardWidgetsLayoutChange(widgetsLayout);
        }
    };

    const handleSearchEnter = event => {
        if (event.which == 13 || event.keyCode == 13) {
            const query = `&GraphsSearch[search]=${event.target.value}`;
            onGetWidgetList(query);
            history.replace(
                history.location.pathname + `?das_subject=${event.target.value}`
            );
        }
    };

    /**
     *  search widgets by title
     * @param {*} event - event object
     */
    const handleSearchFilter = event => {
        setSearchString(event.target.value);
    };


    const renderSkeleton = () => {
        return (
            <>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
            </>
        );
    };


    /**
     *
     * @returns Widget list
     * Render widget list
     */
    const renderWidgetList = () => {
        return filterWidgetData.length > 0 ? (
            _.map(filterWidgetData, data => (
                <div
                    key={data?.gra_id}
                    className="widget-data-container"
                    style={{cursor: 'grab', overflow: 'auto'}}
                    draggable
                    unselectable="off"
                    onDragOver={dragOverHandler}
                    onDragStart={e => {
                        const widgetInfo = {
                            id: data.gra_id,
                            type: data.gra_widget_type,
                            dataPath: data.dataPath,
                            das_id: param.id,
                            title: data?.gra_title,
                        };
                        e.dataTransfer.setData('text', JSON.stringify(widgetInfo));
                    }}
                >
                    <p className="widget-title">{data?.gra_title}</p>
                    <p className="widget-title">{data?.gra_widget_type}</p>
                    <div className="add-ons">
                        <AnalysisImg className="analysis-img"/>
                        <ViewImg className="view-img"/>
                        <SPButton
                            onButtonClick={() =>
                                handleAddWidget(
                                    data.gra_id,
                                    data.gra_widget_type,
                                    data.dataPath,
                                    data?.gra_title
                                )
                            }
                            title="Add"
                            size="small"
                        />
                    </div>
                </div>
            ))
        ) : (
            <Label style={{display: 'flex', justifyContent: 'center'}}>
                No widget to drag
            </Label>
        );
    };


    return (
        <AddWidgetContainer>
            <p className="title">Widget Library</p>
            <SPSearch
                text={searchString}
                onChange={handleSearchFilter}
                onEnter={handleSearchEnter}
                size="500px"
            />
            <WidgetSelect>
                <SelectBox
                    value={selectedCateogry.key}
                    placeholder="Select group"
                    onInputChange={selectedWidgetGroups}
                    options={categories}
                />
            </WidgetSelect>

            <div className="widgets-list">
                <p className="heading">Widgets</p>
                <div className="widget-inner-container">
                    {widgetListLoading ? renderSkeleton() : renderWidgetList()}
                </div>
            </div>
        </AddWidgetContainer>
    );
};

const mapStateToProps = state => ({
    widgetsList: state.dashboardStore?.widgetList?.listData,
    widgetGroups: state.dashboardStore?.widgetGroups?.listData,
    dashboardRequested: state.dashboardStore?.selectedDashboard?.requested,
    layoutData: state.dashboardStore.widgetLocalState.layoutData,
    selectedWidgets: state.dashboardStore.widgetLocalState.selectedWidgets,
    removeWidgetId: state.dashboardStore.widgetLocalState.removeWidgetId,
    addedWidgetId: state.dashboardStore.widgetLocalState.addedWidgetId,
    widgetListLoading: state.dashboardStore?.widgetList?.loading,
});

const mapDispatchToProps = dispatch => ({
    onGetWidgetList: payload => dispatch(onGetwidgetList(payload)),
    onDashboardWidgetsLayoutChange: payload =>
        dispatch(onDashboardWidgetsLayoutChange(payload)),
    onGetDashboardWidgetData: payload =>
        dispatch(onGetDashboardWidgetData(payload)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SetDocumentTitleHOC,
    AuthTokenHOC
)(AddWidget);
