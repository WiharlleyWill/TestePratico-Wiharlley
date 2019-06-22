import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AdminService, Funcionario } from '../../services/admin.service'
import { ToastrManager } from 'ng6-toastr-notifications';
import { LocalDataSource } from "ng2-smart-table";

var moment = require('moment/moment');

@Component({
    selector: 'consultar-funcionario',
    templateUrl: './consultar-funcionario.component.html',
    styleUrls: ['./consultar-funcionario.component.scss', '../../styles/estilo.padrao.css']
})
export class ConsultarFuncionarioComponent implements OnInit
{
    bExibirFuncionario: boolean = false;
    antigoLogin = '';
    submitted: boolean = false;
    buscaForm: FormGroup;
    funcionarioForm: FormGroup;
    maxDateValue = new Date();
    exibirTabela: boolean = false;
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
            cpf: {
                title: "CPF",
                type: "string"
            }
        }
    };

    constructor(private formBuilder: FormBuilder, private adminService: AdminService, private toastr: ToastrManager) { }
    maskCPF = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];
    maskData = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];

    ngOnInit()
    {
        this.buscaForm = this.formBuilder.group({
            nome: ['', [Validators.required, Validators.minLength(3)]],
            cpf: ['077.899.156-30', [Validators.required, Validators.minLength(14)]]
        });

        this.funcionarioForm = this.formBuilder.group({
            cpf: ['', [Validators.required, Validators.minLength(14)]],
            nome: ['', [Validators.required, Validators.minLength(3)]],
            dtNasc: ['', [Validators.required, Validators.minLength(10), validarData]],
            login: ['', [Validators.required, Validators.minLength(4)]],
            dtCadastro: ['', [Validators.required, Validators.minLength(8)]],
            cpfResponsavelCadastro: ['', [Validators.required, Validators.minLength(8)]],
            timestampCadastro: ['', [Validators.required, Validators.minLength(8)]],
        });

        this.funcionarioForm.get('cpf').disable();
    }

    buscarFuncionario()
    {
        if (this.buscaForm.get('cpf').value != '')
        {
            this.adminService.getFuncionarioCPF(this.buscaForm.get('cpf').value).subscribe(dados =>
            {
                if (dados !== false)
                {
                    this.funcionarioForm.get('cpf').patchValue(dados.cpf);
                    this.funcionarioForm.get('cpfResponsavelCadastro').patchValue(dados.cpfResponsavelCadastro);
                    this.funcionarioForm.get('dtCadastro').patchValue(dados.dtCadastro);
                    this.funcionarioForm.get('dtNasc').patchValue(dados.dtNasc);
                    this.funcionarioForm.get('login').patchValue(dados.login);
                    this.funcionarioForm.get('nome').patchValue(dados.nome);
                    this.funcionarioForm.get('timestampCadastro').patchValue(dados.timestampCadastro);
                    this.bExibirFuncionario = true;
                    this.antigoLogin = dados.login;
                } else
                {
                    this.toastr.warningToastr('Funcionário não encontrado!', 'Erro', { position: 'top-center', animate: 'slideFromTop' });
                    this.bExibirFuncionario = false;
                    this.exibirTabela = false;
                }
            });
        } else
            if (this.buscaForm.get('nome').value != '')
            {
                this.adminService.getFuncionarioNome(this.buscaForm.get('nome').value).subscribe(dados =>
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
                                    cpf: aux[i].cpf,
                                    cpfResponsavelCadastro: aux[i].cpfResponsavelCadastro,
                                    dtCadastro: aux[i].dtCadastro,
                                    dtNasc: aux[i].dtNasc,
                                    login: aux[i].login,
                                    nome: aux[i].nome,
                                    timestampCadastro: aux[i].timestampCadastro
                                });
                            }
                            this.source.load(auxDados);
                            this.exibirTabela = true;
                        } else
                        {
                            var aux = dados;
                            this.funcionarioForm.get('cpf').patchValue(aux[0].cpf);
                            this.funcionarioForm.get('cpfResponsavelCadastro').patchValue(aux[0].cpfResponsavelCadastro);
                            this.funcionarioForm.get('dtCadastro').patchValue(aux[0].dtCadastro);
                            this.funcionarioForm.get('dtNasc').patchValue(aux[0].dtNasc);
                            this.funcionarioForm.get('login').patchValue(aux[0].login);
                            this.funcionarioForm.get('nome').patchValue(aux[0].nome);
                            this.funcionarioForm.get('timestampCadastro').patchValue(aux[0].timestampCadastro);
                            this.exibirTabela = false;
                            this.bExibirFuncionario = true;
                            this.antigoLogin = dados.login;
                        }
                    } else
                    {
                        this.toastr.warningToastr('Funcionário não encontrado!', 'Erro', { position: 'top-center', animate: 'slideFromTop' });
                        this.bExibirFuncionario = false;
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
            this.funcionarioForm.get('cpf').patchValue(event.data.cpf);
            this.funcionarioForm.get('cpfResponsavelCadastro').patchValue(event.data.cpfResponsavelCadastro);
            this.funcionarioForm.get('dtCadastro').patchValue(event.data.dtCadastro);
            this.funcionarioForm.get('dtNasc').patchValue(event.data.dtNasc);
            this.funcionarioForm.get('login').patchValue(event.data.login);
            this.funcionarioForm.get('nome').patchValue(event.data.nome);
            this.funcionarioForm.get('timestampCadastro').patchValue(event.data.timestampCadastro);
            this.exibirTabela = false;
            this.bExibirFuncionario = true;
        }
    }

    voltar()
    {
        this.funcionarioForm.get('cpf').patchValue('');
        this.funcionarioForm.get('cpfResponsavelCadastro').patchValue('');
        this.funcionarioForm.get('dtCadastro').patchValue('');
        this.funcionarioForm.get('dtNasc').patchValue('');
        this.funcionarioForm.get('login').patchValue('');
        this.funcionarioForm.get('nome').patchValue('');
        this.funcionarioForm.get('timestampCadastro').patchValue('');
        this.buscaForm.get('cpf').patchValue('');
        this.buscaForm.get('nome').patchValue('');
        this.bExibirFuncionario = false;
    }

    salvarFuncionario()
    {
        if (this.funcionarioForm.valid)
        {
            if (this.antigoLogin !== this.funcionarioForm.get('login').value)
            {
                this.adminService.getLoginFuncionario(this.funcionarioForm.get('login').value).subscribe(dados =>
                {
                    if (dados !== false)
                    {
                        this.toastr.errorToastr('Este Login está vínculado a um usuário no sistema!', 'Erro', { position: 'top-center', animate: 'slideFromTop' });
                        return null;
                    } else
                    {
                        var funcionario = {
                            cpf: this.funcionarioForm.get('cpf').value,
                            nome: this.funcionarioForm.get('nome').value,
                            dtNasc: this.funcionarioForm.get('dtNasc').value,
                            login: this.funcionarioForm.get('login').value,
                        }

                        this.adminService.updateFuncionario(funcionario).subscribe(
                            () =>
                            {
                                this.toastr.successToastr('Dados atualizados com sucesso!', 'Status', { position: 'top-center', animate: 'slideFromTop' });
                                this.voltar();
                            },
                            err =>
                            {
                                this.toastr.warningToastr('Houve um erro ao atualizar o Funcionário! Erro: ' + err, 'Erro', { position: 'top-center', animate: 'slideFromTop' });
                                console.error(err);
                            }
                        );
                        return null;
                    }
                });
            } else
            {
                var funcionario = {
                    cpf: this.funcionarioForm.get('cpf').value,
                    nome: this.funcionarioForm.get('nome').value,
                    dtNasc: this.funcionarioForm.get('dtNasc').value,
                    login: this.funcionarioForm.get('login').value,
                }

                this.adminService.updateFuncionario(funcionario).subscribe(
                    () =>
                    {
                        this.toastr.successToastr('Dados atualizados com sucesso!', 'Status', { position: 'top-center', animate: 'slideFromTop' });
                        this.voltar();
                    },
                    err =>
                    {
                        this.toastr.warningToastr('Houve um erro ao atualizar o Funcionário! Erro: ' + err, 'Erro', { position: 'top-center', animate: 'slideFromTop' });
                        console.error(err);
                    }
                );
            }
        }
    }
}

function validarData(control: AbstractControl): { [key: string]: any } | null
{
    if (!moment(control.value, "DD/MM/YYYY", true).isValid())
    {
        return { dtNasc: true };
    } else
    {
        return null;
    }
}
