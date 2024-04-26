import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from 'src/Modeles/Transaction';
import { GLOBAL } from 'src/app/app-config';


@Injectable({
  providedIn: 'root'
})

// le service accepte d'etre injecté dans les composants
export class TransactionService {
  tab: Transaction[] = [];
  
  constructor(private httpClient :HttpClient){}
  
  
  GetAll():Observable<Transaction[]>{

  //envoyer une requete http au serveur json
  return this.httpClient.get<Transaction[]>
  ('http://localhost:3000/transactions');
  }

  OnSave(transactionToSave: any): Observable<any> {
    //generer la requette http en mode post vers le back end
    return this.httpClient.post('http://localhost:3000/transactions', transactionToSave)
    /*const member1 = {
      ...memberToSave,
      id: Math.ceil(Math.random() * 1000),
      createdDate: new Date().toISOString()
    }
    this.tab.push(member1);
    return new Observable(observer => observer.next())
*/
  }

  updateTransaction(id:string, transactionToUpdate: any): Observable<any>{
    return this.httpClient.put(`http://localhost:3000/transactions/${id}`,transactionToUpdate);
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
    return this.httpClient.delete<void>(`http://localhost:3000/transactions/${id}`);
    /*this.tab = this.tab.filter(item => item.id != id)
    return new Observable(observer => observer.next())*/
  }

  getTransactionById(id: String): Observable<Transaction> {
    return this.httpClient.get<Transaction>(`http://localhost:3000/transactions/${id}`);

    /* new Observable(observer => observer.next(
      this.tab.filter(item => item.id == id)[0] ?? null))*/
  }

  getSumOfMonthlyAmount(month: number, year: number) {
    return this.httpClient.get<number>(`http://localhost:3000/transactions/sumOfMonthlyAmount?month=${month}&year=${year}`);
  }
 
}
