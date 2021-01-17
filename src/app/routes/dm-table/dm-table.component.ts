import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-dm-table',
  templateUrl: './dm-table.component.html',
  styleUrls: ['./dm-table.component.scss']
})
export class DmTableComponent implements OnInit {

  constructor(private dragulaService: DragulaService) {
    // use these if you want

    this.dragulaService.createGroup("VAMPIRES", {
      // ...
    });

    this.dragulaService.dropModel("VAMPIRES").subscribe(args => {
      console.log(args);
    });
  }

  ngOnInit(): void {
  }

}
