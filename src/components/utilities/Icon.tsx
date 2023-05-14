// React imports
import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg';

// Icons import
import { get_ionic_line_icon, get_ionic_sharp_icon, get_ionic_solid_icon } from '../../assets/ionic/get_ionic_icons'; // Ionic Icons

// Properties
export type iconComponentProps = {
    src: string;
    className: string;
}

// Get Icon component
const IconComponent: React.FC<iconComponentProps> = ({ src, className }) => {
    return <ReactSVG src={src} className={className} />
}

// Properties
export type iconProps = {
    name: string;
    type?: string;
    className?: string;
}

// Component
export const Icon: React.FC<iconProps> = ({ name, type, className = 'w-5' }) => {
    const [svgIcon, setSvgIcon] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        if (!type) {
            type = 'solid'
        }

        if (type === 'solid') {
            get_ionic_solid_icon(name).then((importedIcon) => {
              if (isMounted) {
                setSvgIcon(importedIcon.default)
              }
            });
        }

        if (type === 'sharp') {
            get_ionic_sharp_icon(name).then((importedIcon) => {
              if (isMounted) {
                setSvgIcon(importedIcon.default)
              }
            });
        }

        if (type === 'line') {
            get_ionic_line_icon(name).then((importedIcon) => {
              if (isMounted) {
                setSvgIcon(importedIcon.default)
              }
            });
        }

        return () => {
            isMounted = false
        }
    }, [name, type])

    if (!svgIcon) {
        return <></>
    }

    return <IconComponent src={svgIcon} className={className} />
}