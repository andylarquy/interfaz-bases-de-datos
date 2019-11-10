import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Documento } from '../domain/documento';
import { REST_SERVER_URL } from './serviceConfiguration';

@Injectable({
    providedIn: 'root'
})

export class ServiceDocumentos {

    constructor(public http: HttpClient) { }

    async getDocumentos(params: any): Promise<Documento[]> {
        return await this.http.get<Documento[]>(REST_SERVER_URL + '/documentos', { params }).toPromise()
    }

    async agregarDocumentoEnElBack(documento: Documento): Promise<void> {
        return await this.http.post<void>(REST_SERVER_URL + '/documentos', documento).toPromise()
    }

    async actualizarDocumentoEnElBack(documento: Documento): Promise<void> {
        return await this.http.put<void>(REST_SERVER_URL + '/documentos/' + documento.idContenido, documento).toPromise()
    }

}
