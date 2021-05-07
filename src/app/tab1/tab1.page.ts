import { Component, OnInit } from '@angular/core';

import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  peliculasPopulares: Pelicula[] = [];

  constructor( private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.getFeature()
      .subscribe( resp => {
        // console.log( resp );
        this.peliculasRecientes = resp.results;
      });

    this.getPopulares();

  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares()
      .subscribe( resp => {
        // console.log('>>Populares: ', resp );

        // this.peliculasPopulares = resp.results;
        // ya no queremos sobrescribir el valor, si no agregar las imágenes al final de la lista
        // this.peliculasPopulares.push( ...resp.results );
        // pero como tenemos un pipe que filtra para hacer el array de pares tenemos que hacer algo diferente para 
        // concatenar los nuevos valores,  ya que el pipe 'pares' no es asíncrono y no está pendiente de los cambios del array 
        const arrTemp = [...this.peliculasPopulares, ...resp.results]; //concatenamos los valores actuales con lso nuevos
        this.peliculasPopulares = arrTemp; //en vez de concatenar, asignamos el valor del array temporal que los tiene concatenados
        // Como Angular no puede gestionar en este caso el cambio en el Array, estamos indicándolo explícitamente
      });
  }

}
