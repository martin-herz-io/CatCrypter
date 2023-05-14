export const get_ionic_line_icon = async (icon: string) => {
    return await import(`./icons/line/${icon}.svg`)
}

export const get_ionic_sharp_icon = async (icon: string) => {
    return await import(`./icons/sharp/${icon}.svg`)
}

export const get_ionic_solid_icon = async (icon: string) => {
    return await import(`./icons/solid/${icon}.svg`)
}