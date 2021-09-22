import { Col, Row } from "antd";
import { Label } from "../../../../../../../../components/InputBox/StyledComponents";
import { StystemHeader } from "../StyleComponent";




const ConnectivityComponent = ({ connectivity }) => {
    return (
        <Row style={{ background: '#1C1C24', maxWidth: 360 }}>
            <Col>
                <StystemHeader>
                Connectivity
                </StystemHeader>
                {
                    Object.keys(connectivity).map(item => {
                        return (
                            <>
                                <Row style={{ padding: 10, alignItems: 'center' }}>
                                    <Col>
                                        {item}
                                    </Col>
                                </Row>
                                <hr style={{ background: '#FFF', height: 1, border: 'none' }} />
                            </>
                        )
                    })
                }
            </Col>
        </Row>);
}

export default ConnectivityComponent;