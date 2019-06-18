import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AdminService, Funcionario } from '../../services/admin.service'
var moment = require('moment/moment');

@Component({
    selector: 'consultar-funcionario',
    templateUrl: './consultar-funcionario.component.html',
    styleUrls: ['./consultar-funcionario.component.scss', '../../styles/estilo.padrao.css']
})
export class ConsultarFuncionarioComponent implements OnInit
{
    inputType = "password";
    imagemSenha = "glyphicon glyphicon-eye-close";
    submitted: boolean = false;
    cadastroForm: FormGroup;
    maxDateValue = new Date();

    constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }
    maskData = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];

    ngOnInit()
    {
        this.cadastroForm = this.formBuilder.group({
            cpf: ['', [Validators.required, Validators.minLength(14)]],
            nome: ['', [Validators.required, Validators.minLength(3)]],
            dtNasc: ['', [Validators.required, Validators.minLength(10), validarData]],
            login: ['', [Validators.required, Validators.minLength(4)]],
            senha: ['', [Validators.required, Validators.minLength(8)]],
        });
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
