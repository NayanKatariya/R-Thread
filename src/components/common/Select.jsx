import React from "react";
import { default as ReactSelect } from "react-select";

// You can override these styles or pass custom ones via props
const defaultStyles = {
    control: (provided) => ({
        ...provided,
        border: "none",
        borderBottom: "1px solid #f9f9f6", // Tailwind gray-200
        borderRadius: "0",
        boxShadow: "none",
        fontSize: "16px",
        fontWeight: "400",
        minHeight: "36px",
        backgroundColor: "white", // Tailwind gray-100
        paddingLeft: "0px",
    }),
    placeholder
        : (provided) => ({
            ...provided,
            color: "#000000",
        }),
    indicatorSeparator: () => null,
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: "0px",
        color: "#6b7280", // Tailwind gray-500
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 10,
        width: "600px",
        fontSize: "11px",
        fontWeight: "400",
    }),
};

const Select = ({
    options = [],
    placeholder = "Select an option",
    onChange,
    value,
    isDisabled = false,
    isClearable = false,
    className = "",
    styles = {},
}) => {
    return (
        <ReactSelect
            options={options}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            isDisabled={isDisabled}
            isClearable={isClearable}
            styles={{ ...defaultStyles, ...styles }}
            className={`w-full ${className}`}
            components={{
                IndicatorSeparator: () => null,
            }}
        />
    );
};

export default Select;
