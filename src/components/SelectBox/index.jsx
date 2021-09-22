import React from 'react';
import { map, pull } from 'lodash';
import Tag from '../UploadedItem';
import {
  TextInputWrapper,
  TextInputDiv,
  SelectInput,
  ErrorDiv,
  LabelDiv,
  Label,
  OuterWrongImage,
  OuterRightImage,
  StyledDiv,
} from './StyledComponents';
import './index.css';
import right from '../../assets/images/right.png';
import wrong from '../../assets/images/wrong.png';

const SelectBox = props => {
  const { errorMessage, setHightAuto, showSearch } = props;
  const { type } = props;
  const { mode } = props;
  const { className } = props;
  const { placeholder } = props;
  const { name } = props;
  const { value } = props;
  const { label } = props;
  const { group } = props;
  const { groupList } = props;
  const { onInputChange } = props;
  const { onBlur } = props;
  const { touched } = props;
  const { id } = props;
  const { width } = props;
  const { options } = props;
  const { disabled } = props;
  const { loading = false } = props;
  const { isHide, onSelect, noMargin, padding, defaultValue } = props;

  const onSelectData = (name, val) => {
    if (onSelect !== undefined) {
      onSelect(name, val);
    }
  };

  function tagRender(props) {
    const { label, value, closable, onClose } = props;

    return (
      <Tag
        color={value}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  }

  function renderData() {
    let renderItem = (
      <StyledDiv className={className} padding={padding}>
        <TextInputWrapper width={width} noMargin={noMargin}>
          {label ? (
            <LabelDiv>
              <Label>{label}</Label>
            </LabelDiv>
          ) : null}
          <TextInputDiv>
            <SelectInput
              showSearch={options}
              loading={loading}
              width={width}
              id={id}
              type={type}
              mode={mode}
              name={name}
              value={value}
              onChange={(val, option) => {
                onInputChange(name, val, option);
              }}
              onBlur={onBlur}
              filterOption={(input, option) =>
                option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              getPopupContainer={trigger => trigger.parentNode.parentNode}
              onSelect={val => onSelectData(name, val)}
              tagRender={props => {
                return (
                  <Tag
                    name={props.label}
                    margin="5px 5px"
                    height={setHightAuto ? 'auto' : 28}
                    onRemove={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      onInputChange(name, pull(value, props.value));
                    }}
                  />
                );
              }}
              placeholder={placeholder}
              disabled={disabled}
            >
              {group
                ? map(groupList, (group, index) => {
                  return (
                    <SelectInput.OptGroup label={group.groupName} key={index}>
                      {map(options, (option, index) => {
                        if (option.GroupLabel === group.groupName) {
                          return (
                            <SelectInput.Option
                              key={option.value}
                              value={option.value}
                              disabled={option.disabled}
                            >
                              {option.label}
                            </SelectInput.Option>
                          );
                        }
                        return null;
                      })}
                    </SelectInput.OptGroup>
                  );
                })
                : map(options, (option, index) => {
                  return (
                    <SelectInput.Option
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </SelectInput.Option>
                  );
                })}
            </SelectInput>
          </TextInputDiv>
        </TextInputWrapper>
        {touched && errorMessage ? <ErrorDiv>{errorMessage}</ErrorDiv> : null}
      </StyledDiv>
    );

    if (isHide === true) {
      renderItem = <></>;
    }
    return renderItem;
  }
  return <>{renderData()}</>;
};

SelectBox.defaultProps = {
  group: false,
};
export default SelectBox;
