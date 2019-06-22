import { Component, OnInit } from '@angular/core';
import { Employee } from "../utilitarios/employee"
import { AdminService } from '../../services/admin.service'
import { ToastrManager } from 'ng6-toastr-notifications';
import { LocalDataSource } from "ng2-smart-table";
import { ExcelService } from '../../services/excel.service';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
    selector: 'relatorio-aniversariantes',
    templateUrl: './relatorio-aniversariantes.component.html',
    styleUrls: ['./relatorio-aniversariantes.component.scss', '../../styles/estilo.padrao.css', '../../styles/estilo.padrao.scss']
})
export class RelatorioAniversariantesComponent implements OnInit
{
    empSelectedMes = 0;
    employeeMeses: Employee[];
    mesBusca: any = '01';
    sMes = 'Janeiro';
    exibirTabela: boolean = false;
    aniversariantes = [];
    source: LocalDataSource = new LocalDataSource();
    settings = {
        hideSubHeader: true,
        actions: false,
        pager: {
            display: false,
        },
        columns: {
            nome: {
                title: "Nome",
                type: "string"
            },
            login: {
                title: "Login",
                type: "string"
            },
            cpf: {
                title: "CPF",
                type: "string"
            },
            dtNasc: {
                title: "Data de Nascimento",
                type: "string"
            }
        }
    };
    constructor(private adminService: AdminService, private toastr: ToastrManager, private excelService: ExcelService) { }

    ngOnInit()
    {
        this.employeeMeses = [{ Id: 0, Name: 'Janeiro', value: '01' }, { Id: 1, Name: 'Fevereiro', value: '02' }, { Id: 2, Name: 'Março', value: '03' }, { Id: 3, Name: 'Abril', value: '04' }
            , { Id: 4, Name: 'Maio', value: '05' }, { Id: 5, Name: 'Junho', value: '06' }, { Id: 6, Name: 'Julho', value: '07' }, { Id: 7, Name: 'Agosto', value: '08' }
            , { Id: 8, Name: 'Setembro', value: '09' }, { Id: 9, Name: 'Outubro', value: '10' }, { Id: 10, Name: 'Novembro', value: '11' }, { Id: 11, Name: 'Dezembro', value: '12' }];

    }

    mesAlterado(val: any)
    {
        this.mesBusca = this.employeeMeses[val].value;
        this.sMes = this.employeeMeses[val].Name;
    }

    buscarAniversariantes()
    {

        this.adminService.getAniversariantes(this.mesBusca).subscribe(dados =>
        {
            if (dados.length > 0)
            {
                var aux = dados;

                this.aniversariantes = [];
                for (var i = 0; i < aux.length; i++)
                {
                    this.aniversariantes.push({
                        nome: aux[i].nome,
                        login: aux[i].login,
                        cpf: aux[i].cpf,
                        dtNasc: aux[i].dtNasc,
                        cpfResponsavelCadastro: aux[i].cpfResponsavelCadastro,
                        dtCadastro: aux[i].dtCadastro,
                    });
                }
                this.source.load(this.aniversariantes);
                this.exibirTabela = true;
            } else
            {   
                this.exibirTabela = false;
                this.toastr.errorToastr('Não há aniversariantes no período informado!', 'Erro', { position: 'top-center', animate: 'slideFromTop' });
            }
        });
    }

    exportar(tipo) {
        var date = new Date();

        switch (tipo) {
            //PDF
            case 0:
                var doc = new jsPDF('l', 'pt', 'landscape');
                // You can use html:
                //doc.autoTable({ html: '#my-table' });
                // Or JavaScript:
                let corpo: any = [];
                this.aniversariantes.forEach(dado => {
                    var aux = [dado.nome, dado.login, dado.cpf, dado.dtNasc,dado.cpfResponsavelCadastro, dado.dtCadastro];
                    corpo.push(aux);
                });

                doc.autoTable({
                    head: [["Nome", "Login", "CPF", "Data de Nascimento", "CPF (Resp. Cadastro)", "Data de Cadastro"]],
                    theme: 'grid',
                    body: corpo,
                    margin: { top: 10, right: 5, bottom: 10, left: 5 },
                    showHead: 'firstPage',
                    showFoot: 'lastPage',
                    //foot: [["", "", "", "", "Em aberto: " + this.naoFinalizadosTratados, "", "Cupons: " + this.totalCuponsTratados, "Total: " + this.totalTratado]]
                });
                doc.save('Relatório aniversariantes: ' + this.sMes + '. Exportado: ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '.pdf');
                break;

            //Excel
            case 1:
                var auxV: any = [];

                this.aniversariantes.forEach(dado => {
                    auxV.push({
                        Nome: dado.nome,
                        Login: dado.login,
                        CPF: dado.cpf,
                        DataNascimento: dado.dtNasc,
                        CPFResponsavelCadastro: dado.cpfResponsavelCadastro,
                        DataCadastro: dado.dtCadastro
                    });
                });

                this.excelService.exportAsExcelFile(auxV, 'Relatório aniversariantes: ' + this.sMes + '. Exportado: ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
                break;

            //CSV
            case 2:
                var options = {
                    fieldSeparator: ',',
                    quoteStrings: '"',
                    decimalseparator: '.',
                    showLabels: true,
                    showTitle: true,
                    title: 'Relatório aniversariantes: ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
                    useBom: true,
                    noDownload: false,
                    headers: ["Nome", "Login", "CPF", "Data de Nascimento", "CPF (Resp. Cadastro)", "Data de Cadastro"],
                    nullToEmptyString: true,
                };

                var auxV: any = [];

                this.aniversariantes.forEach(dado => {
                    auxV.push({
                        Nome: dado.nome,
                        Login: dado.login,
                        CPF: dado.cpf,
                        DataNascimento: dado.dtNasc,
                        CPFResponsavelCadastro: dado.cpfResponsavelCadastro,
                        DataCadastro: dado.dtCadastro
                    });
                });

                new Angular5Csv(auxV, 'Relatório aniversariantes: ' + this.sMes + '. Exportado: ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(), options);
                break;
        }
    }

}
