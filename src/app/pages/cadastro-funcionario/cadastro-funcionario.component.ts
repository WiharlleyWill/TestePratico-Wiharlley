import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AdminService } from '../../services/admin.service'
var moment = require('moment/moment');

@Component({
  selector: 'cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.scss', '../../styles/estilo.padrao.css']
})
export class CadastroFuncionarioComponent implements OnInit {
  inputType = "password";
  imagemSenha = "glyphicon glyphicon-eye-close";
  submitted: boolean = false;
  cadastroForm: FormGroup;
  maxDateValue = new Date();
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

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }
  maskCPF = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];
  maskData = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      cpf: ['', [Validators.required, Validators.minLength(14), cpfVerdadeiro]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dtNasc: ['', [Validators.required, Validators.minLength(10), validarData]],
      login: ['', [Validators.required, Validators.minLength(4)]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
    });

  }

  cadastrarFuncionario() {
    this.submitted = true;
  }

  //FormGroup
  get f() { return this.cadastroForm.controls; }

  exibirSenha() {
    switch (this.inputType) {
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

function validarData(control: AbstractControl): { [key: string]: any } | null {
  if (!moment(control.value, "DD/MM/YYYY", true).isValid()) {
    return { dtNasc: true };
  } else {
    return null;
  }
}

function cpfVerdadeiro(control: AbstractControl): { [key: string]: any } | null {
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


