import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    this.http.post(
      this.baseUrl,
      {
        query : `{ stops(name: "${busStop}") {
                      gtfsId
                      id
                      name
                      wheelchairBoarding
                    }
                  }`
      }).subscribe( gtfsIdResponse => {
      const busStopId = gtfsIdResponse.data.stops[0].gtfsId;
      console.log("Acquired stop ID: " + busStopId );
      /*POST a new query with the extracted bus stop id number and agency
       and return it */
      return this.http.post(
      this.baseUrl,
      {
        query : `{
                  stop(id: "${busStopId}") {
                    name
                    lat
                    lon
                    patterns {
                      id
                      name
                      route {
                        gtfsId
                        shortName
                        longName
                      }
                      directionId
                    }
                  }
                }`
          }).subscribe( busRoutes => {
              console.log(busRoutes.data.stop);
              return busRoutes.data.stop;
        });
    })
  }

}
