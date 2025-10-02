import countries from "world-countries"

export const COUNTRIES = countries.map(item => {
    const nativeNames = item.name.native 
    ? Object.values(item.name.native) 
    : []

    const nativeCommon = nativeNames.length > 0 
        ? nativeNames[0].common 
        : item.name.common

    return {
        value: item.cca2,
        label: nativeCommon
    }
})