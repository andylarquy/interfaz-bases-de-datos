export const queryGetDocumentoConId = 
`SELECT * FROM Contenido, Documentos
WHERE Contenido.idContenido = Documentos.Contenido_idContenido
AND Documentos.Contenido_idContenido = ?`



export const updateAContenidos = 
`START TRANSACTION;
UPDATE Contenido SET titulo = ?
WHERE Contenido.idContenido = ?;`

export const updateADocumentos =
`UPDATE Documentos SET contenido = ?
WHERE Documentos.Contenido_idContenido = ?;`