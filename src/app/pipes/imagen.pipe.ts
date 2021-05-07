import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): unknown {
    // https://image.tmdb.org/t/p/w500/3N316jUSdhvPyYTW29G4v9ebbcS.jpg

    // Si no existe imagen, que devuelva la que tenemos por defecto
    if( !img ) {
      return './assets/no-image-banner.jpg ';
    }

    const imgUrl = `${ URL }/${ size }${ img }`;
    // console.log('>> URL: ', imgUrl);

    return imgUrl;
  }
}
