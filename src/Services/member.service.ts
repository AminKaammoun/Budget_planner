import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/Modeles/Member';
import { GLOBAL } from 'src/app/app-config';

@Injectable({
  providedIn: 'root'
})

// le service accepte d'etre injecté dans les composants
export class MemberService {
  tab: Member[] = GLOBAL.DB.members;
  OnSave(memberToSave: any): Observable<any> {
    //generer la requette http en mode post vers le back end
    //return this.httpClient.post('127.0.01:8080/api/Member', memberToSave)
    const member1 = {
      ...memberToSave,
      id: Math.ceil(Math.random() * 1000),
      createdDate: new Date().toISOString()
    }
    this.tab.push(member1);
    return new Observable(observer => observer.next())

  }

  updateMember(id:string, memberToUpdate: any): Observable<any>{
    //return this.httpClient.put('127.0.0.1:8080/api/Member/$(id)',memberToUpdate);
    const index = this.tab.findIndex(item => item.id == id);
    this.tab[index] = {
      id : id,
      ...memberToUpdate,
      createdDate:new Date().toISOString()
    }
    return new Observable(observer => observer.next())

  }

  onDelete(id: String): Observable<any> {
    //return this.httpClient.delete('127.0.0.1:8080/api/Member/$(id)');
    this.tab = this.tab.filter(item => item.id != id)
    return new Observable(observer => observer.next())
  }

  getMemberById(id: String): Observable<Member> {
    //return this.httpClient.get<Member>('127.0.0.1:8080/api/Member/$(id)');

    return new Observable(observer => observer.next(
      this.tab.filter(item => item.id == id)[0] ?? null))
  }


  constructor(private httpClient: HttpClient) { }
}
