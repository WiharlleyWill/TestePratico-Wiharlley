import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AdminService, Funcionario } from '../../services/admin.service'
import { ToastrManager } from 'ng6-toastr-notifications';
import { LocalDataSource } from "ng2-smart-table";
import { Employee } from "../utilitarios/employee"

@Component({
    selector: 'consultar-veiculo',
    templateUrl: './consultar-veiculo.component.html',
    styleUrls: ['./consultar-veiculo.component.scss', '../../styles/estilo.padrao.css', '../../styles/estilo.padrao.scss']
})
export class ConsultarVeiculoComponent implements OnInit
{
    bExibirVeiculo: boolean = false;
    exibirTabela: boolean = false;
    veiculoForm: FormGroup;
    buscaForm: FormGroup;
    empSelectedAtivo = 0;
    employeeAtivo: Employee[];
    date = new Date();
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
            anoFabricacao: {
                title: "Ano Fabricação",
                type: "string"
            },
            dtCadastro: {
                title: "Data Cadastro",
                type: "string"
            },
            ativo: {
                title: "Ativo",
                type: "string"
            }
        }
    };

    constructor(private formBuilder: FormBuilder, private adminService: AdminService, private toastr: ToastrManager) { }

    ngOnInit()
    {

        this.buscaForm = this.formBuilder.group({
            placa: ['', [Validators.required, Validators.minLength(10)]],
            modelo: ['', [Validators.required, Validators.minLength(40)]]
        });

        this.veiculoForm = this.formBuilder.group({
            placa: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            ativo: [0, [Validators.required]],
            anoFabricacao: ['', [Validators.required]],
            anoModelo: ['', [Validators.required, Validators.minLength(4)]],
            chassi: ['', [Validators.required, Validators.minLength(40)]],
            dtCadastro: ['', Validators.required],
            dtDesativacao: ['- - -'],
            modelo: ['', [Validators.required, Validators.minLength(30)]],
            cor: [''],
            consumoMedio: [0, Validators.required],
            numeroPassageiros: [0, Validators.required]
        });
        this.veiculoForm.get('placa').disable();
        this.veiculoForm.get('anoFabricacao').disable();
        this.veiculoForm.get('anoModelo').disable();
        this.veiculoForm.get('chassi').disable();
        this.veiculoForm.get('dtCadastro').disable();
        this.veiculoForm.get('dtDesativacao').disable();
        this.veiculoForm.get('modelo').disable();
        //this.adminService.tratarData(this.date.getDate()) + '/' + this.adminService.tratarData((this.date.getMonth() + 1)) + '/' + this.date.getFullYear()
        this.employeeAtivo = [{ Id: 0, Name: 'Sim', value: true }, { Id: 1, Name: 'Não', value: false }];

    }

    buscarVeiculo()
    {
        if (this.buscaForm.get('placa').value != '')
        {
            this.adminService.getVeiculoPlaca(this.buscaForm.get('placa').value).subscribe(dados =>
            {
                if (dados !== false)
                {
                    this.veiculoForm.get('placa').patchValue(dados.placa);
                    this.veiculoForm.get('ativo').patchValue(dados.ativo);
                    this.veiculoForm.get('anoFabricacao').patchValue(dados.anoFabricacao);
                    this.veiculoForm.get('anoModelo').patchValue(dados.anoModelo);
                    this.veiculoForm.get('chassi').patchValue(dados.chassi);
                    this.veiculoForm.get('dtCadastro').patchValue(dados.dtCadastro);
                    this.veiculoForm.get('dtDesativacao').patchValue(dados.dtDesativacao);
                    this.veiculoForm.get('modelo').patchValue(dados.modelo);
                    this.veiculoForm.get('cor').patchValue(dados.cor);
                    this.veiculoForm.get('consumoMedio').patchValue(dados.consumoMedio);
                    this.veiculoForm.get('numeroPassageiros').patchValue(dados.numeroPassageiros);
                    this.bExibirVeiculo = true;
                } else
                {
                    this.toastr.warningToastr('Veículo não encontrado!', 'Erro', { position: 'top-center', animate: 'slideFromTop' });
                    this.bExibirVeiculo = false;
                    this.exibirTabela = false;
                }
            });
        } else
            if (this.buscaForm.get('modelo').value != '')
            {
                this.adminService.getVeiculoModelo(this.buscaForm.get('modelo').value).subscribe(dados =>
                {
                    if (dados !== false)
                    {
                        var aux = dados;
                        if (aux.length >= 2)
                        {
                            const auxDados = [];
                            for (var i = 0; i < aux.length; i++)
                            {
                                auxDados.push({
                                    placa: aux[i].placa,
                                    ativo: aux[i].ativo,
                                    anoFabricacao: aux[i].anoFabricacao,
                                    anoModelo: aux[i].anoModelo,
                                    chassi: aux[i].chassi,
                                    dtCadastro: aux[i].dtCadastro,
                                    modelo: aux[i].modelo,
                                    cor: aux[i].cor,
                                    consumoMedio: aux[i].consumoMedio,
                                    numeroPassageiros: aux[i].numeroPassageiros
                                });
                            }
                            this.source.load(auxDados);
                            this.exibirTabela = true;
                        } else
                        {
                            var aux = dados;
                            this.veiculoForm.get('placa').patchValue(aux[0].placa);
                            this.veiculoForm.get('ativo').patchValue(aux[0].ativo);
                            this.veiculoForm.get('anoFabricacao').patchValue(aux[0].anoFabricacao);
                            this.veiculoForm.get('anoModelo').patchValue(aux[0].anoModelo);
                            this.veiculoForm.get('chassi').patchValue(aux[0].chassi);
                            this.veiculoForm.get('dtCadastro').patchValue(aux[0].dtCadastro);
                            this.veiculoForm.get('dtDesativacao').patchValue(aux[0].dtDesativacao);
                            this.veiculoForm.get('modelo').patchValue(aux[0].modelo);
                            this.veiculoForm.get('cor').patchValue(aux[0].cor);
                            this.veiculoForm.get('consumoMedio').patchValue(aux[0].consumoMedio);
                            this.veiculoForm.get('numeroPassageiros').patchValue(aux[0].numeroPassageiros);
                            this.bExibirVeiculo = true;
                            this.exibirTabela = false;
                        }
                    } else
                    {
                        this.toastr.warningToastr('Veículo não encontrado!', 'Erro', { position: 'top-center', animate: 'slideFromTop' });
                        this.bExibirVeiculo = false;
                        this.exibirTabela = false;
                    }
                });

            } else
            {
                this.toastr.errorToastr('Informe um dos campos para busca!', 'Erro', { position: 'top-center', animate: 'slideFromTop' });
            }
    }

    public onUserRowSelect(event)
    {
        console.log(event);
        if (event.selected.length > 0)
        {
            this.veiculoForm.get('placa').patchValue(event.data.placa);
            this.veiculoForm.get('ativo').patchValue(event.data.ativo);
            this.veiculoForm.get('anoFabricacao').patchValue(event.data.anoFabricacao);
            this.veiculoForm.get('anoModelo').patchValue(event.data.anoModelo);
            this.veiculoForm.get('chassi').patchValue(event.data.chassi);
            this.veiculoForm.get('dtCadastro').patchValue(event.data.dtCadastro);
            this.veiculoForm.get('dtDesativacao').patchValue(event.data.dtDesativacao);
            this.veiculoForm.get('modelo').patchValue(event.data.modelo);
            this.veiculoForm.get('cor').patchValue(event.data.cor);
            this.veiculoForm.get('consumoMedio').patchValue(event.data.consumoMedio);
            this.veiculoForm.get('numeroPassageiros').patchValue(event.data.numeroPassageiros);
            this.exibirTabela = false;
            this.bExibirVeiculo = true;
        }
    }

    //FormGroup
    get f() { return this.veiculoForm.controls; }

    ativoAlterado(val: any)
    {
        if (val == 1)
        {
            this.veiculoForm.get('dtDesativacao').patchValue(this.adminService.tratarData(this.date.getDate()) + '/' + this.adminService.tratarData((this.date.getMonth() + 1)) + '/' + this.date.getFullYear());
        } else
        {
            this.veiculoForm.get('dtDesativacao').setValue('- - -');
        }
    }

    voltar()
    {
        this.veiculoForm.get('placa').patchValue('');
        this.veiculoForm.get('ativo').patchValue(0);
        this.veiculoForm.get('anoFabricacao').patchValue('');
        this.veiculoForm.get('anoModelo').patchValue('');
        this.veiculoForm.get('chassi').patchValue('');
        this.veiculoForm.get('dtCadastro').patchValue('');
        this.veiculoForm.get('dtDesativacao').patchValue('');
        this.veiculoForm.get('modelo').patchValue('');
        this.veiculoForm.get('cor').patchValue('');
        this.veiculoForm.get('consumoMedio').patchValue('');
        this.veiculoForm.get('numeroPassageiros').patchValue('');
        this.buscaForm.get('placa').patchValue('');
        this.buscaForm.get('modelo').patchValue('');
        this.bExibirVeiculo = false;
    }

}
