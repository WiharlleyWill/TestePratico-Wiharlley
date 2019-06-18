import { Component, OnInit } from '@angular/core';
import { Employee } from "../utilitarios/employee"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService, Veiculo } from '../../services/admin.service'

@Component({
    selector: 'cadastro-veiculos',
    templateUrl: './cadastro-veiculos.component.html',
    styleUrls: ['./cadastro-veiculos.component.scss', '../../styles/estilo.padrao.css', '../../styles/estilo.padrao.scss']
})
export class CadastroVeiculosComponent implements OnInit
{
    submitted: boolean = false;
    cadastroForm: FormGroup;
    empSelectedAtivo = 0;
    employeeAtivo: Employee[];
    employeeAnoFabricacao: Employee[] = [];
    employeeAnoModelo: Employee[] = [];
    selectedItem = '0';
    consumoMedio = 1;
    date = new Date();

    constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

    ngOnInit()
    {
        this.employeeAtivo = [{ Id: 0, Name: 'Sim', value: true }, { Id: 1, Name: 'Não', value: false }];
        var aux = 0;
        for (var i = 1886; i <= this.date.getFullYear(); i++)
        {
            this.employeeAnoFabricacao.push({
                Id: aux,
                Name: '' + i,
                value: i
            });

            this.employeeAnoModelo.push({
                Id: aux,
                Name: '' + i,
                value: i
            });
        }

        this.cadastroForm = this.formBuilder.group({
            placa: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            ativo: [0, [Validators.required]],
            anoFabricacao: [this.date.getFullYear(), [Validators.required]],
            anoModelo: [this.date.getFullYear(), [Validators.required, Validators.minLength(4)]],
            chassi: ['', [Validators.required, Validators.minLength(40)]],
            dtCadastro: [this.adminService.tratarData(this.date.getDate()) + '/' + this.adminService.tratarData((this.date.getMonth() + 1)) + '/' + this.date.getFullYear(), Validators.required],
            dtDesativacao: ['- - -'],
            modelo: ['', [Validators.required, Validators.minLength(30)]],
            cor: [''],
            consumoMedio: [1, Validators.required],
            quantPassageiros: [4, Validators.required]
        });

        this.cadastroForm.get('dtCadastro').disable();
        this.cadastroForm.get('dtDesativacao').disable();

    }

    cadastrarVeiculo()
    {
        this.submitted = true;
        if (this.cadastroForm.valid)
        {
            var dadosVeiculo: Veiculo = {
                placa: this.cadastroForm.get('placa').value,
                ativo: this.cadastroForm.get('ativo').value,
                anoFabricacao: this.cadastroForm.get('anoFabricacao').value,
                anoModelo: this.cadastroForm.get('anoModelo').value,
                chassi: this.cadastroForm.get('chassi').value,
                dtCadastro: this.cadastroForm.get('dtCadastro').value,
                timestampCadastro: this.date.getTime(),
                dtDesativacao: this.cadastroForm.get('dtDesativacao').value,
                timestampDesativacao: this.date.getTime(),
                modelo: this.cadastroForm.get('modelo').value,
                cor: this.cadastroForm.get('cor').value,
                consumoMedio: 1.88,
                numeroPassageiros: this.cadastroForm.get('quantPassageiros').value,
                idFuncionario: "IDUSUARIOTESTE",
                nomeFuncionario: "Funcionário Teste"
            };
            //localStorage.getItem("usuario")
            this.adminService.setVeiculo(dadosVeiculo).subscribe(
                () =>
                {
                    console.log("Sucesso ao Cadastrar o veículo.");
                },
                err =>
                {
                    console.error(err);
                }
            );
        }
    }

    //FormGroup
    get f() { return this.cadastroForm.controls; }

    ativoAlterado(val: any)
    {
        if (val == 1)
        {
            this.cadastroForm.get('dtDesativacao').patchValue(this.adminService.tratarData(this.date.getDate()) + '/' + this.adminService.tratarData((this.date.getMonth() + 1)) + '/' + this.date.getFullYear());
        } else
        {
            this.cadastroForm.get('dtDesativacao').setValue('- - -');
        }
    }
}
