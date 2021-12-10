import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { OperationsService } from '../services/operations.service';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(
    private alertController:AlertController,
    private operations:OperationsService,
    private storage: Storage
  ) {}

  async ngOnInit(){
   // this.getFolders();
   this.storage.create();
   let userid = await this.storage.get("userId")
   console.log("userId",userid)
    this.getFoldersDjango();
  }
  async addFolderAlertPrompt() {
    const alert = await this.alertController.create({
      header: "Create Folder",//'Diet Olustur',
      inputs: [
        {
          name: 'folderName',
          type: 'text',
          id: 'name2-id',
          value: '',
          placeholder: "...",//'Ad belirleyiniz',

        },

      ],
      buttons: [
        {
          text: "Cancel",//'Vazgec',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: "Confirm",//'Onayla',
          handler: data => {
            console.log(JSON.stringify(data)); //to see the object
            console.log(data.folderName);
            this.addFolder(data.folderName)
          }
        }
      ]
    });

    await alert.present();
  }

  
  addFolder(folderName) {
    var data = { name: folderName, date: new Date(), }
    //this.operations.addFolder(data);
    this.createFolderDjango(folderName)

  }
  folders:any[] = [];
  getFolders(){
    this.operations.getFolder().subscribe(items => {
      this.folders = [];
      items.forEach(item =>{
        var datam:any = item.payload.doc.data();
        this.folders.push(datam);
        console.log(datam)
      })
    })
  }

  folderss;
  async getFoldersDjango(){
    this.folderss = [];
    let userid = await this.storage.get("userId")
    let params = {
      
      "user": userid,
      "title__icontains": "",
      "title":""
    
  }

  
  return axios({
    method: 'GET',
    url: "https://note-damus0.herokuapp.com/api/folders/?user=" + userid ,
    //data: ,//params,//JSON.stringify(data),
    //withCredentials: true,
    headers: {        
      'Content-Type': 'application/json',
    },
  }).then(async response =>{
    this.folderss = response.data;
    this.folderss.sort((a,b) => (new Date(a.creation_date) > new Date(b.creation_date)) ? 1 : ((new Date(b.creation_date) > new Date(a.creation_date)) ? -1 : 0))

    console.log(response);
    

  })
  }




   async createFolderDjango(folderName){
      let params = {
      
        "title": folderName,
        "creation_date": new Date(),
        "user": await this.storage.get("userId")
    
  }


  return axios({
    method: 'POST',
    url: "https://note-damus0.herokuapp.com/api/folders/",
    data: params,//JSON.stringify(data),
    //withCredentials: true,
    headers: {        
      'Content-Type': 'application/json',
    },
  }).then(async response =>{
    console.log(response);
    this.getFoldersDjango()

  })
   }
}
