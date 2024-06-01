import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GLOBAL } from 'src/app/app-config';
import { Goal } from 'src/Modeles/Goal';

@Injectable({
  providedIn: 'root'
})

// le service accepte d'etre injecté dans les composants
export class GoalService {
  tab: Goal[] = [];
  
  constructor(private httpClient :HttpClient){}
  
  
  GetAll():Observable<Goal[]>{

  //envoyer une requete http au serveur json
  return this.httpClient.get<Goal[]>
  ('http://localhost:3000/goals');
  }

  OnSave(goalToSave: any): Observable<any> {
    //generer la requette http en mode post vers le back end
    return this.httpClient.post('http://localhost:3000/goals', goalToSave)
    /*const member1 = {
      ...memberToSave,
      id: Math.ceil(Math.random() * 1000),
      createdDate: new Date().toISOString()
    }
    this.tab.push(member1);
    return new Observable(observer => observer.next())
*/
  }

  updateGoal(id:string, goalToUpdate: any): Observable<any>{
    return this.httpClient.put(`http://localhost:3000/goals/${id}`,goalToUpdate);
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
    return this.httpClient.delete<void>(`http://localhost:3000/goals/${id}`);
    /*this.tab = this.tab.filter(item => item.id != id)
    return new Observable(observer => observer.next())*/
  }

  getGoalById(id: String): Observable<Goal> {
    return this.httpClient.get<Goal>(`http://localhost:3000/goals/${id}`);

    /* new Observable(observer => observer.next(
      this.tab.filter(item => item.id == id)[0] ?? null))*/
  }


 
}
