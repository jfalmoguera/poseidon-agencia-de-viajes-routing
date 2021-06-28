export class Usuario {
    id: string;
    nombre: string;
    email: string;
    rol: string;
    bearer: string;

    constructor(item?: any) {
        this.id = item?.id ?? '';
        this.nombre = item?.nombre ?? '';
        this.email = item?.email ?? '';
        this.rol = item?.rol ?? '';
        this.bearer = item?.bearer ?? '';
    }
}