import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua Quinze de Novembro",
        numero: "300",
        complemento: "Apto 200",
        bairro: "Santa Mônica",
        cep: "12212496",
        cidade: {
          id: "1",
          nome: "Uberlândia",
          estado: {
            id: "1",
            nome: "Minas Gerais",
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua Presbitero Cicero Lima Correia",
        numero: "31",
        complemento: "casa",
        bairro: "Parque Residencial Jundiaí 2",
        cep: "13213115",
        cidade: {
          id: "3",
          nome: "Jundiaí",
          estado: {
            id: "2",
            nome: "São Paulo",
          }
        }
      }
    ];
  }

}
