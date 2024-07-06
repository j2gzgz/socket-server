
export class Usuario {

    //Id del sockect conectado
    public id: string;
    public nombre: string;
    public sala: string;

    constructor( id: string ) {
        
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala = 'sin-sala';
    
    }
}