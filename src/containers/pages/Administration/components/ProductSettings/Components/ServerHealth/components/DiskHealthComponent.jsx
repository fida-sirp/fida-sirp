import { useEffect, useState } from "react"
import SPTable from "../../../../../../../../components/SPTable";


const DiskHealthComponent = ({ diskData }) => {
    //   debugger
    const [diskDataList, setDiskDataList] = useState([]);

    const diskColumns = [
        {
            title: 'Filesystem',
            dataIndex: 'Filesystem',
            editable: false,
            // width: 90
        },
        {
            title: 'Size',
            dataIndex: 'Size',
            editable: false,
            // width: 90,
        },
        {
            title: 'Used',
            dataIndex: 'Used',
            editable: false,
            // width: 90
        },
        {
            title: 'Avail',
            dataIndex: 'Avail',
            editable: false,
            // width: 90,
        },

        {
            title: 'Use%',
            dataIndex: 'Use%',
            editable: false,
            // width: 90
        },
        {
            title: 'Mounted',
            dataIndex: 'Mounted',
            editable: false,
            // width: 90,
        },
    ]

    return (
        <SPTable
            columns={diskColumns}
            dataSource={diskData}
            totalRecords={10}
            emptyText="No Data"
            // isLoading={loading}
            headerBorderColor="#dc3545"
            noBottomPadding
            noTitle
        />
    )
}

export default DiskHealthComponent;