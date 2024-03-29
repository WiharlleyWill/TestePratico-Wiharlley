import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { AuthenticationService } from './auth/authentication.service'

export interface Veiculo
{
    placa: string
    ativo: boolean
    anoFabricacao: string
    anoModelo: string
    chassi: string
    dtCadastro: string
    timestampCadastro: any
    dtDesativacao: string
    dtAtivacao: string
    timestampAtivacao: any
    timestampDesativacao: any
    modelo: string
    cor: string
    consumoMedio: number
    numeroPassageiros: number
    cpfFuncionario: string
    nomeFuncionario: string
}

export interface Funcionario
{
    cpf: string
    nome: string
    dtNasc: string
    login: string
    senha: string
    dtCadastro: string
    timestampCadastro: number
    cpfResponsavelCadastro: string
    mesAniversario: string
}

@Injectable()
export class AdminService
{
    url = '/Admin/';
    item: any;
    constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

    //Cadastrar veiculo
    setVeiculo(veiculo: Veiculo): Observable<any>
    {
        console.log("Clicou salvar");
        return this.http.post(`/veiculos/registrarVeiculo`, veiculo);
    }

    //Cadastrar funcionario
    setFuncionario(funcionario: Funcionario): Observable<any>
    {
        console.log("Clicou salvar");
        return this.http.post(`/funcionarios/registrarFuncionario`, funcionario);
    }

    //Recuperar funcionario por CPF
    getFuncionarioCPF(cpf): Observable<any>
    {
        return this.http.get(`/funcionarios/buscaCPF`, {
            headers: { Authorization: ` ${this.authenticationService.getToken()}`, search: cpf }
        });
    }

    //Recuperar funcionario pelo nome
    getFuncionarioNome(nome): Observable<any>
    {
        return this.http.get(`/funcionarios/buscaNome`, {
            headers: { Authorization: ` ${this.authenticationService.getToken()}`, search: nome }
        });
    }

    //AtualizarFuncionario
    updateFuncionario(funcionario): Observable<any>
    {
        return this.http.post(`/funcionarios/updateFuncionario`, funcionario);
    }

    //Recuperar veiculo pela placa
    getVeiculoPlaca(placa): Observable<any>
    {
        return this.http.get(`/veiculos/buscaPlaca`, {
            headers: { Authorization: ` ${this.authenticationService.getToken()}`, search: placa }
        });
    }

    //Recuperar veiculo pelo modelo
    getVeiculoModelo(modelo): Observable<any>
    {
        return this.http.get(`/veiculos/buscaModelo`, {
            headers: { Authorization: ` ${this.authenticationService.getToken()}`, search: modelo }
        });
    }

    //Recuperar aniversariantes pelo mes
    getAniversariantes(mes): Observable<any>
    {
        return this.http.get(`/funcionarios/buscaAniversariantes`, {
            headers: { Authorization: ` ${this.authenticationService.getToken()}`, search: mes }
        });
    }
    
    //Recuperar veiculos ativados
    getVeiculosAtivados(date1, date2): Observable<any>
    {   
        console.log('date: ' + date1);
        console.log('date2: ' + date2);
        return this.http.get(`/veiculos/buscaAtivados`, {
            headers: { Authorization: ` ${this.authenticationService.getToken()}`, search: '' + date1,  search2: '' + date2}
        });
    }

    //recuperar dados pelo login
    getLoginFuncionario(login): Observable<any>
    {
        return this.http.get(`/funcionarios/buscaLogin`, {
            headers: { Authorization: ` ${this.authenticationService.getToken()}`, search: login }
        });
    }

    //recuperar dados pelo chassi
    getVeiculoChassi(chassi): Observable<any>
    {
        return this.http.get(`/veiculos/buscaChassi`, {
            headers: { Authorization: ` ${this.authenticationService.getToken()}`, search: chassi }
        });
    }

    //Atualizar veiculo
    updateVeiculo(veiculo: Veiculo): Observable<any>
    {
        return this.http.post(`/veiculos/updateVeiculo`, veiculo);
    }



    tratarMes(mes)
    {
        switch (mes)
        {
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

    tratarData(data)
    {
        if (data.toString().length < 2)
        {
            return "0" + data;
        } else
        {
            return "" + data;
        }
    }
}
