
export class Documento {
    constructor(
        public idContenido?: number,
        public extension?: string,
        public titulo?: string,
        public fecha?: Date,
        public contenido?: any,
        // tslint:disable-next-line: variable-name
        public velocidad_descarga?: number) { }

    static fromJson(documentoJSON): Documento {
        return Object.assign(new Documento(), documentoJSON)
    }

}