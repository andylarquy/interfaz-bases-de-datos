const extensionesPosiblesDesordenadas = ['pdf', 'doc', 'txt', 'xls', 'xlsx', 'xlsxm', 'xlsb', 'epub', 'csv', 'mobi', 'rtf', 'html',]
export const extensionesPosibles = extensionesPosiblesDesordenadas.sort((a, b) => a.localeCompare(b))
