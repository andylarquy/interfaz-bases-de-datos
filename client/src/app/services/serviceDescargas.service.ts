import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Documento } from '../domain/documento';
import { REST_SERVER_URL } from './serviceConfiguration';

@Injectable({
    providedIn: 'root'
})

export class ServiceDescargas {

    constructor(public http: HttpClient) { }

    async agregarDescargaEnElBack(documento: Documento): Promise<void> {
        documento.velocidad_descarga = this.asignarVelocidadDescarga()
        return await this.http.post<void>(REST_SERVER_URL + '/descargas', documento).toPromise()
    }

    asignarVelocidadDescarga(): number {
        // Numero entre 400 y 1
        const velocidad = Math.floor((Math.random() * 400) + 1);
        console.log('velocidad de descarga: ', velocidad)
        return velocidad
    }

}