import { EstadoCivil } from "./enums/estado-civil.enum";

export class Cliente {
    id: string;
    nombre: string;
    apellidos: string;
    email: string;
    dni: string;
    telefono: number;
    direccion: string;
    fechaDeNacimiento: Date | null;
    estadoCivilId: EstadoCivil | null;

    constructor(item?: any) {
        this.id = item?.id ?? '';
        this.nombre = item?.nombre ?? '';
        this.apellidos = item?.apellidos ?? '';
        this.email = item?.email ?? '';
        this.fechaDeNacimiento = item?.fechaDeNacimiento ? new Date(item.fechaDeNacimiento) : null;
        this.dni = item?.dni ?? '';
        this.telefono = item?.telefono ?? '';
        this.direccion = item?.direccion ?? '';
        this.estadoCivilId = item?.estadoCivilId ?? null;
    }
}