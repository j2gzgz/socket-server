import express from 'express'; 
import socketIO from 'socket.io';
import http from 'http'

import { SERVER_PORT } from '../global/environment';
import * as socket from '../sockets/sockect';

export default class Server {
    public app: express.Application
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;
    private static _instance: Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server( this.app );
        this.io  = new socketIO.Server(this.httpServer,  { cors: { origin: true, credentials: true } });
        this.escucharSockets(); 
        
    }


    public static get instance(){
        return this._instance || (this._instance = new this())

    }
     
    private escucharSockets() {
        console.log('Escuchando conexiones - sockets')

        this.io.on('connection', cliente => {
            console.log('Cliente conectado');
            
            // Mensajes
            socket.mensaje( cliente, this.io );

            // Desconectar el cliente
            socket.desconectar( cliente );


        });

    }

    start(callback: () => void) {
        this.httpServer.listen(this.port, callback) ;
    }
}