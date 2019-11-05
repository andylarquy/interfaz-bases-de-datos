
export class Documento {
    constructor(
        public idContenido?: number,
        public extension?: string,
        public titulo?: string,
        public fecha?: Date) { }

    static fromJson(individuoJSON): Documento {
        return Object.assign(new Documento(), individuoJSON)
    }

}