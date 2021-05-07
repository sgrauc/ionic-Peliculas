import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { RespuestaMDB } from '../interfaces/interfaces';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { RespuestaCredits } from '../interfaces/interfaces';

import { environment } from '../../environments/environment';

const URL = environment.url; //https://api.themoviedb.org/3
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService{

  private popularesPage = 0;

  constructor( private http: HttpClient ) { }

  // recibe una url parcial con ciertos datos y termina de montarla añadiendo el prefijo de la url para el API, el idioma y el API Key
  private ejecutarQuery<T>( query: string ) {
    query = URL + query; 
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;

    return this.http.get<T>( query );

  }

  getPopulares() {

    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

 // método del servicio para obtener la cartelera
  getFeature() {

    // Necesitamos una sintaxis de tipo '2021-05-01' (un string con guiones y dos cifras para mes y día)
    // Queremos para 'inicio' el primer día del mes actual y para 'fin' el último día del mes actual
    const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;
    let mesString;
    if( mes < 10 ){
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }
    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;

    // console.log(">>inicio: ", inicio);
    // console.log(">>fin: ", fin);

    // como ya tenemos las fechas para los resultados, le pasamos la url parcial al método que termina de montar la url final 
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }


  getPeliculaDetalle(id: string) {
    // https://api.themoviedb.org/3/movie/{movie_id}

    // Si nos fijamos, el id de la película no va como un parámetro, sino como parte del prefio de la propia url, por lo que 
    // la siguiente url que se montaría con nuestros métodos daría error:
    // https://api.themoviedb.org/3/movie/647302&api_key=4dd20d3556bc668e87a7313c4e012399&language=es&include_image_language=es
    // Porque el primer parámetro de una query va después de '?' y los siguientes después de '&'. Esa url no lleva '?' por lo que
    // no comienza a leer parámetros y da error.
    // Para evitar esto en nuestro sistema de montaje de urls, le podemos pasar un primer parámetro/valor cualquiera (xxx/xxx) con
    // la única finalidad de introducir el signo '?' necesario. La api ignorará el parámetro 'xxx'

    const query = `/movie/${id}?xxx=xxx`;

    return this.ejecutarQuery<PeliculaDetalle>(query);
  }

  getPeliculaActores(id: string) {
    // https://api.themoviedb.org/3/movie/{movie_id}/credits
    const query = `/movie/${id}/credits?xxx=xxx`;
    return this.ejecutarQuery<RespuestaCredits>(query);
  }
  


}
