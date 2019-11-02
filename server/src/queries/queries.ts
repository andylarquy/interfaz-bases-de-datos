
export const queryGetDocumentos =
`SELECT idContenido, extension, titulo, fecha_de_publicacion, contenido
FROM Contenido, Documentos
WHERE Contenido.idContenido = Documentos.Contenido_idContenido`

export const queryGetDocumentoConId = 
`SELECT * FROM Contenido, Documentos
WHERE Contenido.idContenido = Documentos.Contenido_idContenido
AND Documentos.Contenido_idContenido = ?`

export const insertADocumentos = `START TRANSACTION; INSERT INTO Contenido set ?;`

export const insertAContenidos = `INSERT INTO Documentos VALUES(?,LAST_INSERT_ID())`

export const updateAContenidos = 
`START TRANSACTION;
UPDATE Contenido SET titulo = ?
WHERE Contenido.idContenido = ?;`

export const updateADocumentos =
`UPDATE Documentos SET contenido = ?
WHERE Documentos.Contenido_idContenido = ?;`
