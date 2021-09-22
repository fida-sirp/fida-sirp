import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'antd'
import _ from 'lodash';
import SPTab from '../../../../../../components/SPTab';
import { playbookQueueLog } from '../../../../../../actions/playbooks'
import { StyleEditor } from '../../../../assets/components/output/StyledComponents';

const ActionLogsContainer = ({ actionData, playbookQueueid }) => {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const playBookLogListStore = useSelector((state) => state?.playbookStore?.playbookQueueLogs)



    useEffect(() => {
        if (playBookLogListStore?.data) {
            const array = [];
            const objectValue = playBookLogListStore?.data?.automation;
            for (const key in objectValue) {
                array.push({
                    label: key,
                    output: objectValue[key].output,
                    html: objectValue[key].html,
                    outputIsJson: objectValue[key].outputIsJson
                })
            }
            setData(array)
        }
    }, [playBookLogListStore])

    useEffect(() => {
        if (actionData?.key) {
            dispatch(playbookQueueLog({ queueId: playbookQueueid, actionId: actionData.key }))
        }
    }, [actionData.key])



    return <>
        {playBookLogListStore && <>
            <Row>
                <Col span={24} style={{ width: "100%", display: "flex", paddingBottom: 15, borderBottom: "1px solid grey" }}>
                    <div>
                        {playBookLogListStore?.data?.app_icon && <img src={playBookLogListStore?.data?.app_icon} alt="playbookqueue" />}
                    </div>
                    <div style={{ marginLeft: 27 }}>
                        <div>
                            <h1 style={{ margin: 0, fontWeight: 500, color: "#fff" }}>{playBookLogListStore?.data?.app_name}</h1>
                            <h3 style={{ margin: 0, fontWeight: 500, color: "#fff" }}>{playBookLogListStore?.data?.act_name}</h3>
                        </div>
                    </div>
                </Col>
            </Row>
            {data && data.map((item, index) => {
                return (
                    <div>
                        <Row style={{ marginTop: 10 }}>
                            <Col span={24} style={{ background: "#33C758", padding: "1rem", borderRadius: 5, color: "#fff", marginBottom: 10 }}>{item?.label}</Col>
                        </Row>
                        <SPTab
                            height={'auto'}
                            tabs={[{
                                title: 'Output',
                                key: 'Output',
                                component: <div contentEditable='true' dangerouslySetInnerHTML={{ __html: item?.html }}></div>,
                            },
                            {
                                title: 'Raw',
                                key: 'Raw',
                                component: <div>
                                    {item?.outputIsJson ? (
                                        <StyleEditor
                                        mode={'view'}
                                        value={JSON.parse(item?.output?.replace(/\\/g, ""))}
                                        onChange={() => { }}
                                    />
                                    ) : (
                                        <div style={{maxHeight: "150px", overflow: "auto", maxHeight: "485px"}}>{item?.output}</div>
                                    )}
                                </div>,
                            }]}
                            showScroll={true}
                        />
                    </div>
                )
            })}
        </>}

    </>
}

export default ActionLogsContainer