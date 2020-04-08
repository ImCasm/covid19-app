import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  private apiUrl: string = 'https://api.covid19api.com/';

  constructor(
    private _http: HttpClient
  ) { }

  getCountries(): Observable<any> {
    return this._http.get(this.apiUrl + 'countries');
  }

  getCountryData(country): Observable<any> {
    return this._http.get(`${this.apiUrl}live/country/${country}/status/confirmed`);
  }

  getSummary(): Observable<any> {
    return this._http.get(this.apiUrl + 'summary');
  }

}
