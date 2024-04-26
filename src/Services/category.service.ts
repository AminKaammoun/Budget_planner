import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/Modeles/Article';
import { GLOBAL } from 'src/app/app-config';
import { Category } from 'src/Modeles/Category';

@Injectable({
  providedIn: 'root'
})

// le service accepte d'etre injecté dans les composants
export class CategoryService {
  tab: Category[] = [];
  
  constructor(private httpClient :HttpClient){}
  
  
  GetAll():Observable<Category[]>{

  //envoyer une requete http au serveur json
  return this.httpClient.get<Category[]>
  ('http://localhost:3000/categories');
  }

  OnSave(categoryToSave: any): Observable<any> {
    //generer la requette http en mode post vers le back end
    return this.httpClient.post('http://localhost:3000/categories', categoryToSave)
    /*const member1 = {
      ...memberToSave,
      id: Math.ceil(Math.random() * 1000),
      createdDate: new Date().toISOString()
    }
    this.tab.push(member1);
    return new Observable(observer => observer.next())
*/
  }

  updateCategory(id:string, categoryToUpdate: any): Observable<any>{
    return this.httpClient.put(`http://localhost:3000/categories/${id}`,categoryToUpdate);
   /* const index = this.tab.findIndex(item => item.id == id);
    this.tab[index] = {
      id : id,
      ...memberToUpdate,
      createdDate:new Date().toISOString()
    }
    return new Observable(observer => observer.next())
*/
  }

  onDelete(id: string): Observable<any> {
    return this.httpClient.delete<void>(`http://localhost:3000/categories/${id}`);
    /*this.tab = this.tab.filter(item => item.id != id)
    return new Observable(observer => observer.next())*/
  }

  getCategoryById(id: String): Observable<Category> {
    return this.httpClient.get<Category>(`http://localhost:3000/categories/${id}`);

    /* new Observable(observer => observer.next(
      this.tab.filter(item => item.id == id)[0] ?? null))*/
  }


 
}
