import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import SPRoundProgress from '../SPRoundProgress'
import SPAddItemDropdown from '../SPAddItemDropdown';
import {SMainBox,StyleSelectBox,SPTable} from './StyledComponents';

const AssetTableSelection = props => {

    const originData = [
        {
            ast_ip_address:"192.168.10.1",
            ast_s3_score:50,
            netbois_name: "Test",
            ast_owner_id:"Testing",
        },
        {
            ast_ip_address:"192.168.10.1",
            ast_s3_score:50,
            netbois_name: "Test",
            ast_owner_id:"Testing",
        },
        {
            ast_ip_address:"192.168.10.1",
            ast_s3_score:50,
            netbois_name: "Test",
            ast_owner_id:"Testing",
        }
    ];

    const columns =[
    
        {
          title: 'IP ADDRESS',
          dataIndex: 'ast_ip_address',
          editable: false,
        },
        {
            title: 'SIRP SECURITY SCORE',
            dataIndex: 's3',
            render: (text, record, index) => {
              let s3Score = 0;
              if (record.ast_s3_score) {
                s3Score = record.ast_s3_score;
              }
    
              return (
                <div
                  role="presentation"
                  onClick={() => {
                    history.push(`/assets/asset-details/${record.ast_id}`);
                  }}
                >
                  <SPRoundProgress type="success" progress={s3Score} />
                </div>
              );
            },
        },
        {
            title: 'NetBOIS Name',
            dataIndex: 'netbois_name',
            editable: false,
        },    
        {
          title: 'OWNER',
          dataIndex: 'ast_owner_id',
          editable: false,
        },
        {
          title: '',
          dataIndex: 'operation',
          render: (text, record, index) => {
            return (
              <div><CloseOutlined /></div>
            );
          },
        },
    ];

    const items = [
        {
          key: 'inci1',
          label: '192.168.10.1',
          id: 80,
        },
        {
          key: 'inci2',
          label: '41.52.58.310',
          id: 84,
        },
      ];

    const onAdd = (key) => {
    
    }

  return (
    <SMainBox>
        <SPTable
            noTitle={true}
            columns={columns}
            dataSource={originData}
            pagination={false}  
        />
        <StyleSelectBox>
            <SPAddItemDropdown
            title="Add Asset"
            onSelect={({ key }) => onAdd(key)}
            items={items}
            searchSize="300px"
            noBottomPadding={true}
            />
        </StyleSelectBox>
        
    </SMainBox>
  );
};
export default AssetTableSelection;
