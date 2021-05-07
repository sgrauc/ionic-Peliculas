import { Component, OnInit, Input } from '@angular/core';

import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  constructor( private moviesService: MoviesService) { }

  ngOnInit() {

    console.log(">> id: ", this.id);

    this.moviesService.getPeliculaDetalle( this.id ).subscribe( peliDetalle => {
      console.log(">> peliDetalle: ", peliDetalle.title);
    });

    this.moviesService.getPeliculaActores( this.id ).subscribe( respActores => {
      console.log(">> respActores: ", respActores.cast);
    });


    
  }

}
