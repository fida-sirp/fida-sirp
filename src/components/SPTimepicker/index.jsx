import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
    CancelButton,
    StyledTimePicker,
    ContainerDiv,
} from './StyledComponents';
import {
    StyledDiv,
    TextInputWrapper,
    Label,
    LabelDiv,
    ErrorDiv,
} from '../SelectBox/StyledComponents';
import './index.css'

function SpTimepicker({
    id,
    suffixIcon,
    width,
    label,
    placeholder,
    onBlur,
    format,
    value,
    onInputChange,
    touched,
    errorMessage,
    disabled,
    isHide,
    onSelect,
    name,
    noMargin,
    showNow,
    defaultValue,
}) {
    const onChangeTime = (time) => {
        onInputChange(name, time)
    }
    function renderData() {
        let renderItems = (
            <StyledDiv>
                <TextInputWrapper noMargin={noMargin}>
                    {label ? (
                        <LabelDiv>
                            <Label>{label}</Label>
                        </LabelDiv>
                    ) : null}
                    <ContainerDiv >
                        <StyledTimePicker
                            getPopupContainer={triggerNode => getScrollParent(triggerNode)}
                            format={format || "HH:mm"}
                            getPopupContainer={trigger => trigger.parentNode.parentNode}
                            width={width}
                            id={id}
                            allowClear={false}
                            value={
                                _.isFunction(value?.isValid)
                                  ? value?.isValid()
                                    ? value
                                    : moment()
                                  : value
                              }
                            popupClassName="timepicker"
                            showNow={showNow}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            disabled={disabled}
                            onSelect={onChangeTime}
                            dropdownClassName="dropdown"
                            defaultValue={defaultValue}
                        />
                    </ContainerDiv>
                </TextInputWrapper>
                {touched && errorMessage ? <ErrorDiv>{errorMessage}</ErrorDiv> : null}
            </StyledDiv>
        );
        if (isHide === true) {
            renderItems = <></>;
        }

        return renderItems;
    }

    return <>{renderData()}</>;
}

export default SpTimepicker;
