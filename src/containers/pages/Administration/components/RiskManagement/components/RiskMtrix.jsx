import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { filter } from 'lodash';

import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import PageHeader from '../../../../../layout/pageHeader';
import PlusIcon from '../../../../../../assets/svgIcon/plusIcon';
import SPButton from '../../../../../../components/SPButton';
import SPDrawer from '../../../../../../components/SPDrawer';
import CreateRiskMatrix from './CreateRiskMatrix';

import {
    getRiskMtrix,
    resetRiskColor,
    createRiskMatrix,
    getRiskDropDownsData,
} from '../../../../../../actions/administration';
import { Label } from '../../../../../../components/InputBox/StyledComponents';

const RiskMtrix = ({
    parsedQuery,
    history,
    onGetRiskMtrix,
    onResetRiskColor,
    onGetRiskDropDownsData,
    riskMatrixRngeFrom,
    riskMatrixRngeTo,
    riskMatrixColorList,
    riskMatrixList,
    createRiskMatrix,
    access
}) => {
    const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
    const [colorOptions, setColorOptions] = useState([]);
    const [rangeFromOptions, setRngeFromOptions] = useState([]);
    const [rangeToOptions, setRngeToOptions] = useState([]);

    useEffect(()=>{
        onGetRiskMtrix()
    }, []);

    useEffect(() => {
        const colorOptions = [];
        if (riskMatrixColorList) {
            filter(riskMatrixColorList, (color, colorKey) => {
                colorOptions.push({ key: colorKey, value: colorKey, label: color })
            })
        }
        setColorOptions(colorOptions);

        const rangeFromOptions = [];
        if (riskMatrixRngeFrom) {
            filter(riskMatrixRngeFrom, (rangeFrom, rangeFromKey) => {
                rangeFromOptions.push({ key: rangeFromKey, value: rangeFromKey, label: rangeFrom })
            })
        }
        setRngeFromOptions(rangeFromOptions);

        const rangeToOptions = [];
        if (riskMatrixRngeTo) {
            filter(riskMatrixRngeTo, (rangeTo, rangeToKey) => {
                rangeToOptions.push({ key: rangeToKey, value: rangeToKey, label: rangeTo })
            })
        }
        setRngeToOptions(rangeToOptions);
    }, [riskMatrixRngeFrom, riskMatrixRngeTo, riskMatrixColorList]);

    const onCreateDrawerOpen = () => {
        onGetRiskDropDownsData()
        setIsCreateDrawerVisible(true);
    };
    const onCreateDrawerClose = () => {
        setIsCreateDrawerVisible(false);
    };

    const ShowMatrixCells = () => {
        const matrix = Object.keys(riskMatrixList.values);
        if (matrix.length > 0) {
            return (
                <table class="container" style={{ borderCollapse: 'collapse', border: '1px solid #FFF', width: '100%', marginTop: '10%' }}>
                    <thead>
                        <tr style={{ border: '1px solid #FFF', width: '100%', }}>
                            <th colSpan={10} style={{
                                border: '1px solid #FFF',
                                padding: '10px 0 0 10px',
                                textAlign: 'center'
                            }}>
                                <Label>
                                    Risk Matrix
                            </Label>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            preparedColorMatrix(matrix)
                        }
                    </tbody>
                </table>);
        } else {
            return null
        }
    }



    const preparedColorMatrix = (matrix) => {
        return matrix.map((key, index) => {
            return (
                <tr style={{ border: '1px solid #FFF' }} key={index}>
                    {
                        riskMatrixList.values[key].map((item, i) => {
                            const selected = findColorCode(item);
                            const style = {
                                border: '1px solid #FFF',
                                padding: '20px', textAlign: 'center',
                                color: '#FFF',
                                background: selected?.color
                            }
                            // console.log(style);
                            return <td style={style} key={i}>
                                {item}
                            </td>
                        })
                    }
                </tr>
            );
        })
    }

    const CreatedColorMatrix = () => {
        const legends = Object.keys(riskMatrixList.Legends);
        if (legends.length > 0) {
            return (
                <table class="container" style={{ borderCollapse: 'collapse', border: '1px solid #FFF', width: '100%', marginTop: '10%' }}>
                    <thead>
                        <tr style={{ border: '1px solid #FFF', width: '100%', }}>
                            <th style={{ border: '1px solid #FFF', padding: '10px 0 0 10px', textAlign: 'center' }}>
                                <Label>
                                    Name
                     </Label>
                            </th>
                            <th style={{ border: '1px solid #FFF', padding: '10px 0 0 10px', textAlign: 'center' }}>
                                <Label>
                                    From
                     </Label>
                            </th>
                            <th style={{ border: '1px solid #FFF', padding: '10px 0 0 10px', textAlign: 'center' }}>
                                <Label>
                                    To
                     </Label>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            preparedCreatedMatrix(legends)
                        }
                    </tbody>

                </table>);
        } else {
            return null;
        }

    }

    const preparedCreatedMatrix = (legends) => {
        const colorMatrix = legends.map((key, index) => {
            return {
                name: key,
                from: riskMatrixList.Legends[key].from,
                to: riskMatrixList.Legends[key].to,
                color: riskMatrixList.Legends[key].color,
            }
        })

        return colorMatrix.map((item, index) => {
            return (
                <React.Fragment key={index}>
                    <tr style={{ border: '1px solid #FFF', background: item.color }}>
                        <td style={{ border: '1px solid #FFF', padding: '20px', textAlign: 'center', color: '#FFF' }}>{item.name}</td>
                        <td style={{ border: '1px solid #FFF', padding: '20px', textAlign: 'center', color: '#FFF' }}>{item.from}</td>
                        <td style={{ border: '1px solid #FFF', padding: '20px', textAlign: 'center', color: '#FFF' }}>{item.to}</td>
                    </tr>
                </React.Fragment>
            );
        })
    }

    const findColorCode = (value) => {
        // debugger
        const legends = Object.keys(riskMatrixList.Legends);
        const data = legends.map(key => {
            return riskMatrixList.Legends[key]
        }).find(item => (value >= item.from && value <= item.to));
        return data;
    }

    function showConfirm() {
        Modal.confirm({
            title: 'Are you sure want to reset colors?',
            centered: true,
            icon: <ExclamationCircleOutlined />,
            className: 'test',
            onOk() {
                onResetRiskColor()
            },
            onCancel() { },
        });
    }


    const handleSubmit = (values)=> {
        setIsCreateDrawerVisible(false);
        createRiskMatrix(values);
    }

    return (
        <>
            <PageHeader
                title="Risk Matrix"
                options={[
                    (access!==undefined && (access.includes("all-super-admin") || access.includes("reset-risk-rating-color"))) &&
                    <SPButton
                        onButtonClick={showConfirm}
                        title="Reset Tisk Color"
                        size="small"
                    />,
                    (access!==undefined && (access.includes("all-super-admin") || access.includes("create-risk-rating-color"))) &&
                    <SPButton
                        onButtonClick={onCreateDrawerOpen}
                        title={`Create Risk Color`}
                        size="small"
                        image={<PlusIcon />}
                    />,
                ]}
            />
            <SPDrawer
                title="Create Risk Matrix"
                isVisible={isCreateDrawerVisible}
                maskClosable={false}
                onClose={onCreateDrawerClose}
            >
                <CreateRiskMatrix
                    createRiskMatrix={(data) => {handleSubmit(data) }}
                    onCloseDrawer={onCreateDrawerClose}
                    colorOptions={colorOptions}
                    rangeFromOptions={rangeFromOptions}
                    rangeToOptions={rangeToOptions}
                />
            </SPDrawer>

            {
                riskMatrixList?.values ?
                    <ShowMatrixCells />
                    : null
            }

            {
                riskMatrixList?.Legends ?
                    <CreatedColorMatrix />
                    : null
            }

        </>
    );
}


const mapStateToProps = state => ({
    probablityList: state.administration.riskManagement?.probablity,
    riskMatrixRngeFrom: state.administration?.riskMatrixRngeFrom?.listData,
    riskMatrixRngeTo: state.administration?.riskMatrixRngeTo?.listData,
    riskMatrixColorList: state.administration?.riskMatrixColorList?.listData,
    riskMatrixList: state.administration?.riskMatrixList?.listData
});

const mapDispatchToProps = dispatch => ({
    onGetRiskMtrix: () => dispatch(getRiskMtrix()),
    onResetRiskColor: (...args) => dispatch(resetRiskColor(...args)),
    onGetRiskDropDownsData: (...args) => dispatch(getRiskDropDownsData(...args)),
    createRiskMatrix: (...args) => dispatch(createRiskMatrix(...args))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SetDocumentTitleHOC,
    AuthTokenHOC
)(RiskMtrix);