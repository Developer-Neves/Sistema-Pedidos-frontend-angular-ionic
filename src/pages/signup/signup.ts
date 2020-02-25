import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder){

    this.formGroup = this.formBuilder.group({
      nome: ['Jonas Neves',[Validators.required, Validators.minLength(5),Validators.maxLength(120)]],
      email: ['jonas.neves@outlook.com',[Validators.required, Validators.email]],
      tipo: ['1',[Validators.required]],
      cpfOuCnpj:['453.349.110-30',[Validators.required, Validators.minLength(11),Validators.maxLength(14)]],
      senha: ['123',[Validators.required]],
      logradouro: ['Rua Presbítero',[Validators.required]],
      numero: ['31',[Validators.required]],
      complemento: ['casa',[]],
      bairro: ['',[]],
      cep: ['12212145',[Validators.required]],
      telefone1: ['983055394',[Validators.required]],
      telefone2: ['',[]],
      telefone3: ['',[]],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]],
    });
  }

  singnupUser(){
    console.log('Enviou o form');
  }

}
