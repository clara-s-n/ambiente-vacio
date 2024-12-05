import {Component, inject, OnInit, WritableSignal} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {CatsService} from "../../services/cats.service";
import {Router} from "@angular/router";
import {Cat} from "../../interfaces/cats";

@Component({
  standalone: true,
  selector: 'app-cats',
  templateUrl: './cats.page.html',
  styleUrls: ['./cats.page.scss'],
  imports: [
    CardComponent,
    IonicModule,
    NgForOf
  ]
})
export class CatsPage  implements OnInit {

  private catsService = inject(CatsService);
  private router: Router = inject(Router);
  private allCats!: WritableSignal<Cat[]>;
  cats!: Cat[];

  constructor() {
  }

  async ngOnInit() {
    await this.catsService.fetchCats();
    this.allCats = this.catsService.getCats();
    if(this.allCats) {
      this.cats = this.allCats();
    }
  }
}
