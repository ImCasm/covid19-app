import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  private apiUrl: string = 'https://api.covid19api.com/';
  public colombiaData$: Observable<any>;
  public colombiaDataSubject: Subject<any> = new Subject<any>();

  constructor(
    private _http: HttpClient
  ) {
    this.colombiaData$ = this.colombiaDataSubject.asObservable();
  }

  getCountries(): Observable<any> {
    return this._http.get(this.apiUrl + 'countries');
  }

  getCountryData(country): Observable<any> {
    return this._http.get(`${this.apiUrl}live/country/${country}/status/confirmed`);
  }

  getSummary(): Observable<any> {
    return this._http.get(this.apiUrl + 'summary');
  }

  getColombiaData() {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('$limit', '10000');
    httpParams = httpParams.append('$$app_token', 'ZB1KAD7Upgc0cvos3iV6X6ASo');
    this._http.get('https://www.datos.gov.co/resource/gt2j-8ykr.json', {params: httpParams})
      .subscribe(this.colombiaDataSubject);
  }

  getCityData(city: string): Observable<any> {
    let httpParams: HttpParams = new HttpParams();
    const url = 'https://www.datos.gov.co/resource/gt2j-8ykr.json?ciudad_municipio_nom=' + city;
    //httpParams = httpParams.append('$limit', '10000');
    httpParams = httpParams.append('$$app_token', 'ZB1KAD7Upgc0cvos3iV6X6ASo');
    return this._http.get(url, {params: httpParams});
  }
}
