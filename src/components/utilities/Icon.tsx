// React imports
import React from 'react'
import { ReactSVG } from 'react-svg';

// Icons import
import { get_ionic_line_icon, get_ionic_sharp_icon, get_ionic_solid_icon } from '../../assets/ionic'; // Ionic Icons

// Properties
export type props = {
    name: string;
    type?: string;
    className?: string;
}

// Component
export const Icon: React.FC<props> = ({ name, type, className = 'w-5' }) => {
    let SvgIcon

    if (!type) { type = 'solid' }
    if (type === 'solid') {
        SvgIcon = get_ionic_solid_icon(name)
    }
    if (type === 'sharp') {
        SvgIcon = get_ionic_sharp_icon(name)
    }
    if (type === 'line') {
        SvgIcon = get_ionic_line_icon(name)
    }

    if (!SvgIcon) {
        return <></>
    }

    return <ReactSVG src={SvgIcon} className={className} />
}