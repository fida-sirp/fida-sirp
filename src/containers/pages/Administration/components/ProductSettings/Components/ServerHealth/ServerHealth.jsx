import { Col, Row } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { onProductSettingHealth } from "../../../../../../../actions/administration";
import { Label } from "../../../../../../../components/InputBox/StyledComponents";
import SPRoundProgress from "../../../../../../../components/SPRoundProgress";
import AuthTokenHOC from "../../../../../../../HOCs/AuthTokenHOC";
import SetDocumentTitleHOC from "../../../../../../../HOCs/SetDocumentTitleHOC";
import ConnectivityComponent from "./components/ConnectivityComponent";
import DiskHealthComponent from "./components/DiskHealthComponent";
import HealthProgressComponent from "./components/HealthProgressComponent";
import MemoryComponent from "./components/MemoryComponent";
import SystemComponent from "./components/SystemComponent";
import { StyledCol, StystemHeader } from "./StyleComponent";



const ServerHealth = ({
    productSettingHealth,
    onGetProductHealth
}) => {
    useEffect(onGetProductHealth, [])

    return (
        productSettingHealth ?
            <>
                <Row gutter={30} style={{ justifyContent: 'space-between' }}>
                    <Col>
                        <Row>
                            <Col>
                                <SystemComponent system={productSettingHealth?.system} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <Col>
                                <MemoryComponent memory={productSettingHealth?.Memory} />
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <HealthProgressComponent health={productSettingHealth?.health} />
                    </Col>
                    <Col>
                        <ConnectivityComponent connectivity={productSettingHealth?.Connectivity} />
                    </Col>
                </Row>
                <Row>
                    <Col style={{width: "100%"}}>
                      <DiskHealthComponent diskData={productSettingHealth?.disc}/>
                    </Col>
                </Row>
            </>
            : null
    )
}


const mapStateToProps = state => {
    return {
        productSettingHealth: state.administration?.productSettingList?.healthData,
    };
};

const mapDispatchToProps = dispatch => ({
    onGetProductHealth: () => dispatch(onProductSettingHealth())
});


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SetDocumentTitleHOC,
    AuthTokenHOC
)(ServerHealth);