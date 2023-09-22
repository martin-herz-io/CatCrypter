// React imports
import React, { useEffect, useState } from 'react'

// Properties: Textbox
export type Props = {
    value?: string;
    placeholder?: string;
    type?: string;
    className?: string;
    onValueChange?: (val: string) => void;
}

// Component: Textbox
export const Textbox: React.FC<Props> = (
    {
        value = "",
        placeholder = "",
        type = "text",
        className = "",
        onValueChange = () => {}
    }
) => {

    // Value state
    const [inputValue, setInputValue] = useState(value)

    // Update value state
    useEffect(() => {
        onValueChange(inputValue)
    }, [inputValue, onValueChange])

    // if value changes, update state
    useEffect(() => {
        setInputValue(value)
    }, [value])

    
    return <input type={type} placeholder={placeholder} className={`textbox ${className}`} value={inputValue} onChange={e => setInputValue(e.target.value)} />
}