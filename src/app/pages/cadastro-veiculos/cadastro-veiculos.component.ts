import { Component, OnInit } from '@angular/core';
import { Employee } from '../utilitarios/employee'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService, Veiculo } from '../../services/admin.service'
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';

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

    constructor(private formBuilder: FormBuilder, private adminService: AdminService, private toastr: ToastrManager, protected router: Router) { }

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
            dtAtivacao: ['- - -'],
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

            this.adminService.getVeiculoPlaca(this.cadastroForm.get('placa').value).subscribe(dados =>
            {
                if (dados !== false)
                {
                    this.toastr.errorToastr('Esta placa está vínculado a outro veículo no sistema!', 'Erro', { position: 'top-center', animate: 'slideFromTop' });
                    return null;
                } else
                {
                    return this.adminService.getVeiculoChassi(this.cadastroForm.get('chassi').value).subscribe(dados =>
                    {
                        if (dados !== false)
                        {
                            this.toastr.errorToastr('Este chassi está vínculado a outro veículo no sistema!!', 'Erro', { position: 'top-center', animate: 'slideFromTop' });
                            return null;
                        } else
                        {
                            var auxTimeDesativacao: any = '';
                            var auxTimeAtivacao: any = '';
                            if (this.empSelectedAtivo === 0)
                            {
                                this.cadastroForm.get('dtAtivacao').patchValue(this.adminService.tratarData(this.date.getDate()) + '/' + this.adminService.tratarData((this.date.getMonth() + 1)) + '/' + this.date.getFullYear());
                                auxTimeAtivacao = this.date.getFullYear() + '-' + this.adminService.tratarData(this.date.getMonth() + 1) + '-' + this.adminService.tratarData(this.date.getDate())
                            } else
                            {
                                auxTimeDesativacao = this.date.getFullYear() + '-' + this.adminService.tratarData(this.date.getMonth() + 1) + '-' + this.adminService.tratarData(this.date.getDate());
                                this.cadastroForm.get('dtAtivacao').patchValue('- - -');
                            }

                            var dadosVeiculo: Veiculo = {
                                placa: this.cadastroForm.get('placa').value,
                                ativo: this.cadastroForm.get('ativo').value,
                                anoFabricacao: this.cadastroForm.get('anoFabricacao').value,
                                anoModelo: this.cadastroForm.get('anoModelo').value,
                                chassi: this.cadastroForm.get('chassi').value,
                                dtCadastro: this.cadastroForm.get('dtCadastro').value,
                                dtAtivacao: this.cadastroForm.get('dtAtivacao').value,
                                timestampAtivacao: auxTimeAtivacao,
                                timestampCadastro: this.date.getFullYear() + '-' + this.adminService.tratarData(this.date.getMonth() + 1) + '-' + this.adminService.tratarData(this.date.getDate()),
                                dtDesativacao: this.cadastroForm.get('dtDesativacao').value,
                                timestampDesativacao: auxTimeDesativacao,
                                modelo: this.cadastroForm.get('modelo').value,
                                cor: this.cadastroForm.get('cor').value,
                                consumoMedio: this.cadastroForm.get('consumoMedio').value,
                                numeroPassageiros: this.cadastroForm.get('quantPassageiros').value,
                                cpfFuncionario: localStorage.getItem('cpf'),
                                nomeFuncionario: localStorage.getItem('usuario')
                            };
                            this.adminService.setVeiculo(dadosVeiculo).subscribe(
                                () =>
                                {
                                    this.toastr.successToastr('Veículo cadastrado com sucesso!', 'Status', { position: 'top-center', animate: 'slideFromTop' });
                                    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() =>
                                        this.router.navigate(['/pages/cadastro-veiculo']));
                                },
                                err =>
                                {
                                    this.toastr.warningToastr('Houve um erro ao cadastrar o Veículo! Erro: ' + err, 'Erro', { position: 'top-center', animate: 'slideFromTop' });
                                    console.error(err);
                                }
                            );
                        }
                    });
                }
            });
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
