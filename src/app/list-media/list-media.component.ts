import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-list-media',
  templateUrl: './list-media.component.html',
  styleUrls: ['./list-media.component.scss']
})
export class ListMediaComponent implements OnInit {

  printThis : string;
  mediaArray: any;

  constructor(public mediaService: MediaService) { }

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

}
