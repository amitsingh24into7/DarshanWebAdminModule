import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserAPIService {
  public readonly  apiurl:string;
  private  appid:string;
  private clientid:string;
  private roleid:string;

  public isLogin =false;
  public username ='';
 public readonly imageurl: string;
 public readonly rootfolder: string;
  constructor(private http: HttpClient) {
    this.apiurl = 'https://motleystack.com/darshanapp_common_dev/darshanapp/';
    this.imageurl = 'https://motleystack.com/darshanapp_common_dev/';
    this.rootfolder = 'https://motleystack.com/';
    this.appid = 'DARSHANAPP';
    this.clientid = 'CLIENTID6';
    this.roleid = 'DARSHANUSER';
  }

  appcommanconfig() {
        return this.http.get('assets/config.json').pipe(( Response) => {
            return Response;
        }, catchError(error => {
            // this.onError(error);
            return Promise.reject(error);
        }));

    }
    removelocaldata(keyName: any) {
      localStorage.removeItem(keyName);
    }
    setlocaldata(keyName: any , keyval: any) {
      if (localStorage.getItem(keyName) === null) { // check kye name iskeyName
       this.removelocaldata(keyName);
      }
      localStorage.setItem(keyName, JSON.stringify(keyval));
    }
    getlocaldata(token_name: any) {
      // this.storage.set(token_name,'English')
      return JSON.parse(localStorage.getItem(token_name));

    }
    callAPI(apiname: string, dataobj: any) {
        dataobj.clientid = this.clientid;
        dataobj.appid = this.appid;
        dataobj.roleid = this.roleid;
        return this.http.post(this.apiurl + apiname, dataobj)
        .pipe(( Response) => {
            return Response;
        }, catchError(error => {
            // this.onError(error);
            return Promise.reject(error);
        }));

    }
}
