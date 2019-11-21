export const queryGetDocumentoConId = `
SELECT
    idContenido, extension, titulo, fecha_de_publicacion, contenido
 FROM
    Contenido, Documentos
WHERE
    Contenido.idContenido = Documentos.Contenido_idContenido
AND 
    Documentos.Contenido_idContenido = ?`


export const updateAContenidos = `
    START TRANSACTION;
UPDATE 
    Contenido
SET
    titulo = ?
WHERE
    Contenido.idContenido = ?;`


export const updateADocumentos = `
UPDATE 
    Documentos
SET
    contenido = ?
WHERE 
    Documentos.Contenido_idContenido = ?;`


export const bajaLogicaContenido = `
UPDATE 
    Contenido 
SET 
    activo = 1
WHERE
    Contenido.idContenido = ?;`