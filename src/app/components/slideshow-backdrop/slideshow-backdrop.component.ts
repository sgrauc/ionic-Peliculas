import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 1.2,
    freeMode: true
  };

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {
  }

  async verDetalle( peliculaId: string ) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id: peliculaId,
      }
    });

    modal.present();
  }

}
