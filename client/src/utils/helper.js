export const formatSlug = (string) => {
    return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").split(' ').join('-')
}

export const formatYear = (dateMovie) => {
    const date = new Date(dateMovie)
    const year = date.getFullYear()
    return year
}