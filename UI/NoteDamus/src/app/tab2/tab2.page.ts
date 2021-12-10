import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private iab: InAppBrowser) {}


  url;
  execute(){
    const browser = this.iab.create(this.url,'_blank', {location:'yes'}); 

    
    //browser.on('loadstop').subscribe(event => {
       
   // });
    
    //browser.close();
  }


}
