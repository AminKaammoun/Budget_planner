import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/Modeles/Article';
import { GLOBAL } from 'src/app/app-config';


@Injectable({
  providedIn: 'root'
})

// le service accepte d'etre injecté dans les composants
export class ArticleService {
  tab: Article[] = [];
  
  constructor(private httpClient :HttpClient){}
  
  
  GetAll():Observable<Article[]>{

  //envoyer une requete http au serveur json
  return this.httpClient.get<Article[]>
  ('http://localhost:3000/articles');
  }

  OnSave(memberToSave: any): Observable<any> {
    //generer la requette http en mode post vers le back end
    return this.httpClient.post('http://localhost:3000/articles', memberToSave)
    /*const member1 = {
      ...memberToSave,
      id: Math.ceil(Math.random() * 1000),
      createdDate: new Date().toISOString()
    }
    this.tab.push(member1);
    return new Observable(observer => observer.next())
*/
  }

  updateMember(id:string, memberToUpdate: any): Observable<any>{
    return this.httpClient.put(`http://localhost:3000/articles/${id}`,memberToUpdate);
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
    return this.httpClient.delete<void>(`http://localhost:3000/articles/${id}`);
    /*this.tab = this.tab.filter(item => item.id != id)
    return new Observable(observer => observer.next())*/
  }

  getArticleById(id: String): Observable<Article> {
    return this.httpClient.get<Article>(`http://localhost:3000/articles/${id}`);

    /* new Observable(observer => observer.next(
      this.tab.filter(item => item.id == id)[0] ?? null))*/
  }


 
}
