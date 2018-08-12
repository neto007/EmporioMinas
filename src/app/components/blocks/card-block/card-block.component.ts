import { Component } from '@angular/core';

@Component({
  selector: 'app-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss']
})
export class CardBlockComponent {
  titleCard = 'Emporio de Minas';
  subTitleCard = 'Site de gerencia da Loja';
  contentCard = 'Um pouco de nossos Produtos.';
  angularImage: string;

  constructor() {
    this.angularImage = '/assets/img/Asset 2.svg'; }

}
