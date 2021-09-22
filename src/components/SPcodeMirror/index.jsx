import React from 'react'
import { CodeViewer } from './StyledComponents'
import { Label, LabelDiv } from './StyledComponents'

const SpCodeMirror = ({ value, onChange, language, label, onBeforeChange }) => {
    return <>
        <LabelDiv>
            <Label>{label}</Label>
        </LabelDiv>
        <CodeViewer
            options={{
                lineWrapping: true,
                lint: true,
                mode: language,
                theme: 'material',
                lineNumbers: true
            }} value={value} onBeforeChange={onBeforeChange} onChange={onChange} />
    </>
}
export default SpCodeMirror