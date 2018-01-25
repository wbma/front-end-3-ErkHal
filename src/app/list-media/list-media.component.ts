import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';
import { DigitransitService } from '../services/digitransit.service';

@Component({
  selector: 'app-list-media',
  templateUrl: './list-media.component.html',
  styleUrls: ['./list-media.component.scss']
})
export class ListMediaComponent implements OnInit {

  printThis : string;
  mediaArray: any;
  busRouteArray: any;
  stopName: string;

  constructor(public mediaService: MediaService, public digiTransit: DigitransitService) { }

  ngOnInit() {

    this.printThis = this.mediaService.printWord();
    this.mediaService.getAllMedia().subscribe( data => {
      console.log(data);

      this.mediaArray = data;

      this.mediaArray.forEach( media => {
        const oldUrl = media.filename.split('.');
        const newUrl = oldUrl[0] + '-tn320.png';

        media.thumbnail = newUrl;

      });
    });
  }

  getBusRoutes() {
    this.digiTransit.getRoutesFromStop(this.stopName).subscribe( result => {
      this.busRouteArray = result["data"].stops[0].patterns;
    });
  }
}
