import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { Product } from 'src/app/products/product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(users: any[] , searchText: string): User[] | Product [] {
    if(!users || !searchText){
        return users;
    }

      return users.filter(user => {
        return user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchText.toLowerCase()) 
      })
  
   }
}