import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Documento } from '../domain/documento';
import { REST_SERVER_URL } from './serviceConfiguration';

@Injectable({
    providedIn: 'root'
})

export class ServiceDocumentos {

    constructor(public http: HttpClient) { }

    async getDocumentos(params: any): Promise<Documento[]> {
        const a = await this.http.get<Documento[]>(REST_SERVER_URL + '/documentos', { params }).toPromise()
        return a
    }

}
