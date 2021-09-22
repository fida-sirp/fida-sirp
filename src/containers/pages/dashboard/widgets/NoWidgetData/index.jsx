import { Card } from "antd"
import { Label } from "../../../../../components/SelectBox/StyledComponents"



const NoWidgetData = ({ width, height }) => {
    return (
        <Card style={{
            width: width,
            height: height,
            background: '#1c1c24',
            display: 'flex',
            border: 'none',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Label>No data found</Label>
        </Card>
    )
}

export default NoWidgetData;