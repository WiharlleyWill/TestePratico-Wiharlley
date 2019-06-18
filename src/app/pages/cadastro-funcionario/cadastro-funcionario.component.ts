import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AdminService, Funcionario } from '../../services/admin.service'
var moment = require('moment/moment');

@Component({
    selector: 'cadastro-funcionario',
    templateUrl: './cadastro-funcionario.component.html',
    styleUrls: ['./cadastro-funcionario.component.scss', '../../styles/estilo.padrao.css']
})
export class CadastroFuncionarioComponent implements OnInit
{
    inputType = "password";
    imagemSenha = "glyphicon glyphicon-eye-close";
    submitted: boolean = false;
    cadastroForm: FormGroup;
    maxDateValue = new Date();

    constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }
    maskCPF = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];
    maskData = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];

    ngOnInit()
    {
        this.cadastroForm = this.formBuilder.group({
            cpf: ['', [Validators.required, Validators.minLength(14), cpfVerdadeiro]],
            nome: ['', [Validators.required, Validators.minLength(3)]],
            dtNasc: ['', [Validators.required, Validators.minLength(10), validarData]],
            login: ['', [Validators.required, Validators.minLength(4)]],
            senha: ['', [Validators.required, Validators.minLength(8)]],
        });

    }

    cadastrarFuncionario()
    {
        this.submitted = true;
        var date = new Date();

        var dadosFuncionario: Funcionario = {
            cpf: this.cadastroForm.get('cpf').value,
            nome: this.cadastroForm.get('nome').value,
            dtNasc: this.cadastroForm.get('dtNasc').value,
            login: this.cadastroForm.get('login').value,
            senha: this.cadastroForm.get('senha').value,
            dtCadastro: this.adminService.tratarData(date.getDate()) + '/' + this.adminService.tratarData((date.getMonth() + 1)) + '/' + date.getFullYear(),
            timestampCadastro: date.getTime(),
            cpfResponsavelCadastro: "000.000.000-00"
        };
        this.adminService.setFuncionario(dadosFuncionario).subscribe(
            () =>
            {
                console.log("Sucesso ao Cadastrar o funcionário.");
            },
            err =>
            {
                console.error(err);
            }
        );
    }

    //FormGroup
    get f() { return this.cadastroForm.controls; }

    exibirSenha()
    {
        switch (this.inputType)
        {
            case "password":
                this.inputType = "text";
                this.imagemSenha = "glyphicon glyphicon-eye-open";
                break;
            case "text":
                this.inputType = "password";
                this.imagemSenha = "glyphicon glyphicon-eye-close";
                break;

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

function cpfVerdadeiro(control: AbstractControl): { [key: string]: any } | null
{
    var strCPF = control.value.replace(/[.-]/g, '');
    console.log(strCPF);
    var Soma = 0;
    var Resto;

    if (strCPF == "00000000000") return { cpfValido: true };
    if (strCPF == "11111111111") return { cpfValido: true };
    if (strCPF == "22222222222") return { cpfValido: true };
    if (strCPF == "33333333333") return { cpfValido: true };
    if (strCPF == "44444444444") return { cpfValido: true };
    if (strCPF == "55555555555") return { cpfValido: true };
    if (strCPF == "66666666666") return { cpfValido: true };
    if (strCPF == "77777777777") return { cpfValido: true };
    if (strCPF == "88888888888") return { cpfValido: true };
    if (strCPF == "99999999999") return { cpfValido: true };

    for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return { cpfValido: true };

    Soma = 0;
    for (var i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return { cpfValido: true };
    return null;
}


