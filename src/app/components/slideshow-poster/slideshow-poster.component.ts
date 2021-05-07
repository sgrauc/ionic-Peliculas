import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';



@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 3.3, //Esta vez queremos que para cada slide se muestren 3.3 imágenes en lugar de 1.3, ya que estas son más pequeñas
    freeMode: true
  };

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

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
