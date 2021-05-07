import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pares'
})
export class ParesPipe implements PipeTransform {

  transform( arr: any[] ): any[] {
      /**La función reduce nos va a permitir creaar estos array de 2 */
      const pares = arr.reduce( (result, value, index, array) => {

        if ( index % 2 === 0) {
          result.push(array.slice(index, index + 2));
        }
        return result;
      }, []);

      // console.log('>>pares: ', pares);
      
      return pares;
  }

}
