import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Documento } from '../domain/documento';
import { REST_SERVER_URL } from './serviceConfiguration';

@Injectable({
    providedIn: 'root'
})

export class ServiceReporte {

    constructor(public http: HttpClient) { }

    async getDocumentosReporte(params: any): Promise<Documento[]> {
        return await this.http.get<Documento[]>(REST_SERVER_URL + '/reporteDocumentos', { params }).toPromise()
    }
}