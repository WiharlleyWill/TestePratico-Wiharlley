import { Injectable } from '@angular/core';


@Injectable()
export class AdminService {
    url = '/Admin/';
    item: any;
    constructor() { }

    


    tratarMes(mes) {
        switch (mes) {
            case '0':
            case 0:
                return 'Janeiro';
            case '1':
            case 1:
                return 'Fevereiro';
            case '2':
            case 2:
                return 'Março';
            case '3':
            case 3:
                return 'Abril';
            case '4':
            case 4:
                return 'Maio';
            case '5':
            case 5:
                return 'Junho';
            case '6':
            case 6:
                return 'Julho';
            case '7':
            case 7:
                return 'Agosto';
            case '8':
            case 8:
                return 'Setembro';
            case '9':
            case 9:
                return 'Outubro';
            case '10':
            case 10:
                return 'Novembro';
            case '11':
            case 11:
                return 'Dezembro';

            default: return 'Erro Mês';
        }
    }

    tratarData(data){
        if(data.toString().length < 2){
            return "0" + data;
        }else{
            return "" + data;
        }
    }
}
