import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service'
import { ToastrManager } from 'ng6-toastr-notifications';
import { LocalDataSource } from "ng2-smart-table";
import { ExcelService } from '../../services/excel.service';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
    selector: 'relatorio-veiculos-ativados',
    templateUrl: './relatorio-veiculos-ativados.component.html',
    styleUrls: ['./relatorio-veiculos-ativados.component.scss', '../../styles/estilo.padrao.css', '../../styles/estilo.padrao.scss']
})
export class RelatorioVeiculosAtivadosComponent implements OnInit
{
    contPedidos: number = 0;
    bExibirTabela: boolean = false;
    nbSize: string = 'auto';
    rangeDates: Date[];
    maxDateValue = new Date();
    veiculosAtivados = [];
    source: LocalDataSource = new LocalDataSource();
    settings = {
        hideSubHeader: true,
        actions: false,
        pager: {
            display: false,
        },
        columns: {
            placa: {
                title: "Placa",
                type: "string"
            },
            ativo: {
                title: "Ativo",
                type: "string"
            },
            dtAtivacao: {
                title: "Data Ativação",
                type: "string"
            },
            anoFabricacao: {
                title: "Ano Fabricação",
                type: "string"
            },
            anoModelo: {
                title: "Ano Modelo",
                type: "string"
            },
            modelo: {
                title: "Modelo",
                type: "string"
            },
            cor: {
                title: "cor",
                type: "string"
            },
            numeroPassageiros: {
                title: "Numero Passageiros",
                type: "string"
            },
        }
    };
    pt: any = {
        firstDayOfWeek: 0,
        dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        dayNamesMin: ["Do", "Se", "Te", "Qa", "Qi", "Sx", "Sa"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        today: 'Hoje',
        clear: 'Limpar',
        dateFormat: 'dd/mm/yy'
    };

    constructor(private adminService: AdminService, private toastr: ToastrManager, private excelService: ExcelService) { }

    ngOnInit()
    {

        this.rangeDates = [this.maxDateValue, this.maxDateValue];
    }

    gerarRelatorio()
    {

        if (this.rangeDates[1])
        {
            var date1 = this.rangeDates[0].getFullYear() + '-' + this.adminService.tratarData(this.rangeDates[0].getMonth() + 1) + '-' + this.adminService.tratarData(this.rangeDates[0].getDate());
            var date2 = this.rangeDates[1].getFullYear() + '-' + this.adminService.tratarData(this.rangeDates[1].getMonth() + 1) + '-' + this.adminService.tratarData(this.rangeDates[1].getDate());

            this.adminService.getVeiculosAtivados(date1, date2).subscribe(dados =>
            {
                if (dados !== false)
                {   
                    this.contPedidos = 0;
                    this.veiculosAtivados = [];
                    if (dados.length > 0)
                    {
                        var ativo;
                        for (var i = 0; i < dados.length; i++)
                        {
                            if (dados[i].ativo == 0)
                            {
                                ativo = 'Sim'
                            } else
                            {
                                ativo = 'Não'
                            }
                            this.veiculosAtivados.push({
                                placa: dados[i].placa,
                                ativo: ativo,
                                dtAtivacao: dados[i].dtAtivacao,
                                anoFabricacao: dados[i].anoFabricacao,
                                anoModelo: dados[i].anoModelo,
                                modelo: dados[i].modelo,
                                consumoMedio: dados[i].consumoMedio,
                                cor: dados[i].cor,
                                numeroPassageiros: dados[i].numeroPassageiros,
                                dtCadastro: dados[i].dtCadastro,
                                cpfFuncionario: dados[i].cpfFuncionario,
                                nomeFuncionario: dados[i].nomeFuncionario
                            });
                            this.contPedidos++;
                        }
                        this.source.load(this.veiculosAtivados);
                        this.bExibirTabela = true;
                    } else
                    {
                        this.toastr.errorToastr("Não há veículos ativados no período informado!", 'Erro', { position: 'top-center', animate: 'slideFromTop', showCloseButton: true });
                    }
                } else
                {
                    this.toastr.errorToastr("Não há veículos ativados no período informado!", 'Erro', { position: 'top-center', animate: 'slideFromTop', showCloseButton: true });
                }
            });
        } else
        {
            this.toastr.errorToastr("Informe o período final!", 'Erro', { position: 'top-center', animate: 'slideFromTop', showCloseButton: true });
        }
    }

    dataClicado(b) {
        if (b) {
            if (this.contPedidos < 5) {
                this.nbSize = "xlarge"
                console.log("< 5 cont");
            }
        } else {
            if (!this.bExibirTabela || this.contPedidos > 0 && this.contPedidos < 5) {
                this.nbSize = "auto"
            }
        }
    }

    exportar(tipo)
    {
        var date = new Date();

        switch (tipo)
        {
            //PDF
            case 0:
                var doc = new jsPDF('l', 'pt', 'landscape');
                // You can use html:
                //doc.autoTable({ html: '#my-table' });
                // Or JavaScript:
                let corpo: any = [];
                this.veiculosAtivados.forEach(dado =>
                {
                    var aux = [dado.placa, dado.ativo, dado.dtAtivacao, dado.anoFabricacao, dado.anoModelo, dado.modelo, dado.consumoMedio, dado.cor, dado.numeroPassageiros, dado.dtCadastro, dado.cpfFuncionario, dado.nomeFuncionario];
                    corpo.push(aux);
                });

                doc.autoTable({
                    head: [["Placa", "Ativo", "D. Ativação", "Ano Fab.", "Ano Modelo", "Modelo", "Consumo Médio", "Cor", "Num. Passag.", "D. Cadastro", "CPF Funcionario", "Nome Funcionario"]],
                    theme: 'grid',
                    body: corpo,
                    margin: { top: 10, right: 5, bottom: 10, left: 5 },
                    showHead: 'firstPage',
                    showFoot: 'lastPage',
                    //foot: [["", "", "", "", "Em aberto: " + this.naoFinalizadosTratados, "", "Cupons: " + this.totalCuponsTratados, "Total: " + this.totalTratado]]
                });
                doc.save('Relatório veículos ativados ' + ' Exportado: ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '.pdf');
                break;

            //Excel
            case 1:
                var auxV: any = [];

                this.veiculosAtivados.forEach(dado =>
                {
                    auxV.push({
                        Placa: dado.placa,
                        Ativo: dado.ativo,
                        DtAtivacao: dado.dtAtivacao,
                        AnoFabricacao: dado.anoFabricacao,
                        AnoModelo: dado.anoModelo,
                        Modelo: dado.modelo,
                        ConsumoMedio: dado.consumoMedio,
                        Cor: dado.cor,
                        NumeroPassageiros: dado.numeroPassageiros,
                        DtCadastro: dado.dtCadastro,
                        CPFfuncionario: dado.cpfFuncionario,
                        NomeFuncionario: dado.nomeFuncionario
                    });
                });

                this.excelService.exportAsExcelFile(auxV, 'Relatório veículos ativados ' + ' Exportado: ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
                break;

            //CSV
            case 2:
                var options = {
                    fieldSeparator: ',',
                    quoteStrings: '"',
                    decimalseparator: '.',
                    showLabels: true,
                    showTitle: true,
                    title: 'Relatório veículos ativados ' + ' Exportado: ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
                    useBom: true,
                    noDownload: false,
                    headers: ["Placa", "Ativo", "D. Ativação", "Ano Fab.", "Ano Modelo", "Modelo", "Consumo Médio", "Cor", "Num. Passageiros", "D. Cadastro", "CPF Funcionario", "Nome Funcionario"],
                    nullToEmptyString: true,
                };

                var auxV: any = [];

                this.veiculosAtivados.forEach(dado =>
                {
                    auxV.push({
                        Placa: dado.placa,
                        Ativo: dado.ativo,
                        DtAtivacao: dado.dtAtivacao,
                        AnoFabricacao: dado.anoFabricacao,
                        AnoModelo: dado.anoModelo,
                        Modelo: dado.modelo,
                        ConsumoMedio: dado.consumoMedio,
                        Cor: dado.cor,
                        NumeroPassageiros: dado.numeroPassageiros,
                        DtCadastro: dado.dtCadastro,
                        CPFfuncionario: dado.cpfFuncionario,
                        NomeFuncionario: dado.nomeFuncionario
                    });
                });

                new Angular5Csv(auxV, 'Relatório veículos ativados ' + ' Exportado: ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(), options);
                break;
        }
    }

}
