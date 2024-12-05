import {Component, Input, OnInit} from '@angular/core';
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/angular/standalone";
import {Cat} from "../../interfaces/cats";

@Component({
  standalone: true,
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle
  ]
})
export class CardComponent  implements OnInit {

  @Input() cat!: Cat;
  constructor() { }

  ngOnInit() {}

}
