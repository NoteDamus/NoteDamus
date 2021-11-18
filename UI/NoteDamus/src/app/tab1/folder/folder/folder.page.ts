import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  name;
  constructor(
    private router:ActivatedRoute,
  ) { 
    this.name = this.router.snapshot.queryParamMap.get('subfoldername');
    console.log(this.name);
  }

  ngOnInit() {
    console.log("main folder page");
  }

}
