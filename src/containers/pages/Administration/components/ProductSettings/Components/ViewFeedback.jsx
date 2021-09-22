import { Descriptions } from 'antd';
import React from 'react';

const ViewFeedBack = ({ record }) => {
    return (
        <>
            <Descriptions labelStyle={{ backgroundColor: "transparent", color: "#fff" }} style={{ width: 700 }} column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }} layout="horizontal" bordered>
                <Descriptions.Item label="Subject" style={{color: "#FFF"}} >{record?.fdb_subject}</Descriptions.Item>
                <Descriptions.Item label="Description" style={{color: "#FFF"}} >{record?.fdb_description}</Descriptions.Item>
                <Descriptions.Item label="Created By" style={{color: "#FFF"}} >{record?.fdbCreatedBy?.usr_name}</Descriptions.Item>
                <Descriptions.Item label="Organization" style={{color: "#FFF"}} >{record?.fdbOrganization?.org_name}</Descriptions.Item>
                <Descriptions.Item label="Created" style={{color: "#FFF"}} >{record?.fdb_created_at}</Descriptions.Item>
                <Descriptions.Item label="Last Modified" style={{color: "#FFF"}} >{record?.fdb_updated_at}</Descriptions.Item>
            </Descriptions>
        </>
    );
};

export default ViewFeedBack



