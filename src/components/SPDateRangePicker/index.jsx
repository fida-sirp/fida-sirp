import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import { StyledDiv, StyleSpan } from './StyledComponent'
import CalenderIcon from '../../assets/svgIcon/calenderIcon';
import DropDownArrow from '../../assets/svgIcon/dropdownArrow';
import DateRangePicker from 'react-bootstrap-daterangepicker'
import './index.css'


export default function SpDateRangePicker({
    startDate,
    endDate,
    onChange,
    handleCallback
}) {
    const [fromDate, setFromDate] = useState(moment().toDate());
    const [toDate, setToDate] = useState(moment().toDate());

    // Input Range

    const range = {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "Last 7 Days": [moment().subtract(6, "days"), moment()],
        "Last 30 Days": [moment().subtract(29, "days"), moment()],
        "This Month": [moment().startOf("month"), moment().endOf("month")],
        "Last Month": [
            moment().subtract(1, "month").startOf("month"),
            moment().subtract(1, "month").endOf("month")
        ],
        "Last Year": [
            moment().subtract(1, "year").startOf("year"),
            moment().subtract(1, "year").endOf("year")
        ]
    };
    return (
        <DateRangePicker
            initialSettings={{
                startDate: startDate,
                endDate: endDate,
                alwaysShowCalendars: false,
                ranges: range,
                buttonClasses: "appply_button",
                cancelButtonClasses: "cancel_button",
            }}
            onCallback={handleCallback}
            onEvent={onChange}
        >
            <StyledDiv>
                <CalenderIcon />
                <StyleSpan>
                    {moment(startDate).format("LL")} - {moment(endDate).format("LL")}
                </StyleSpan>
                <DropDownArrow />
            </StyledDiv>
        </DateRangePicker>
    );
}