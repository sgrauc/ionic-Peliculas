import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.3, //Esta vez queremos que para cada slide se muestren 3.3 imágenes en lugar de 1.3, ya que estas son más pequeñas
    freeMode: true,
    spaceBetween: -10
  };

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

  onClick() {
    // de esta manera el slideshow-pares va a emitirle al padre con el output que hay que cargar más películas
    this.cargarMas.emit();
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
