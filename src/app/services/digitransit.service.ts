import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DigitransitService {

  baseUrl =  'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

  /*requestHeaders = new Headers();
  requestHeaders.append('Content-Type', 'application/json');
  requestHeaders.append('Accept', 'application/json');*/

  constructor(private http: HttpClient) { }

  /*
    POST fetches the correct bus stop using the stop's name and then
    fetches the routes from that stop using the acquired bus stop ID number
  */
  getRoutesFromStop(busStop: string) {
    const body = `{
                  stops(name: "${busStop}") {
                    name
                    patterns {
                      name
                      route	{
                      shortName
                      longName
    		              }
    		            directionId
		                }
	                }
                }`;

    const requestSettings = {
      headers: new HttpHeaders().set('Content-type', 'application/graphql')
    };

    return this.http.post(this.baseUrl, body, requestSettings);
  }

}
