// Para prevenir inyecciones sql vamos a validar los campos que modifica
//el usuario y así rechazar peticiones invalidas

export const sortableColumns = ['idContenido', 'titulo', 'extension', 'fecha_de_publicacion'];
export const extensionesPosibles = ['txt', 'doc', 'pdf', 'rtf']
export function esUnaFechaValida(fecha: string) {

    console.log(Date.parse(fecha))
    console.log(!!Date.parse(fecha))
    return !!Date.parse(fecha)
}

export function paginadoEsValido(skip: number, limit: number) {
    console.log(isNaN(limit))
    return (!isNaN(skip) || skip == undefined) && (!isNaN(limit) || limit == undefined)
}