import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { NoteComponent } from 'src/app/components/note/note.component';
import { OperationsService } from 'src/app/services/operations.service';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
name;
folderId;
  constructor(
    private router:ActivatedRoute,
    private alertController:AlertController,
    private operations:OperationsService,
    private modalController:ModalController,
    private storage: Storage


  ) { 
    this.name = this.router.snapshot.queryParamMap.get('mainfoldername');
    this.folderId = this.router.snapshot.queryParamMap.get('id');
    console.log(this.name);
  }

  async ngOnInit() {
    this.storage.create();
   let userid = await this.storage.get("userId")
    console.log("main folder page");
   // this.getSubFolders();
    //this.getNotes();
    this.getNotesDjango();
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
    var data = { name: folderName, date: new Date(),main: this.name }
    this.operations.addFolder(data);

  }
  folders:any[] = [];
  getSubFolders(){
    this.operations.getSubFolders(this.name).subscribe(items => {
      this.folders = [];
      items.forEach(item =>{
        var datam:any = item.payload.doc.data();
        this.folders.push(datam);
        console.log(datam)
      })
    })
  }
  note;
  title;
  async addNote() {
    const alert = await this.alertController.create({
      header: "Paste the Note",
      inputs :[{
        name: 'title',
        type: 'text',
        id: 'name2-id',
        value: this.title,
        placeholder: "title",//'Ad belirleyiniz',

      },{
        type: 'textarea',
        id: 'alert-input-1-0',
        name:"note",
        //cssClass:"textarea",
        value: this.note,
        placeholder: "Paste your note here"
    }],
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log();
          }
        }, {
          text: "Confirm",
          handler: (value:any) => {
            console.log(value.title, value.note);
            this.note = value.note;
            this.title = value.title;
            this.addNoteDb(this.title, this.note);
          }
        }
      ],
     
      
       
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  addNoteDb(title, note){
    let data = {main: this.name, title:title, note:note};
    this.operations.addNote(data);
  }

  notes:any[]=[];
  getNotes(){
    this.operations.getNotes(this.name).subscribe(items=>{
      this.notes = [];
      items.forEach(item => {
        let datam:any = item.payload.doc.data();
        datam.id = item.payload.doc.id;
        this.notes.push(datam);
      })
    })
  }




  //        django

  async getNotesDjango(){
    this.notes = [];
    let userid = await this.storage.get("userId")
    let params = {
      
      "user": userid,
      "title__icontains": "",
      "title":""
    
  }

  
  return axios({
    method: 'GET',
    url: "https://note-damus0.herokuapp.com/api/notes/?folder=" + this.folderId ,
    //data: ,//params,//JSON.stringify(data),
    //withCredentials: true,
    headers: {        
      'Content-Type': 'application/json',
    },
  }).then(async response =>{
    this.notes = response.data;
    this.notes.sort((a,b) => (new Date(a.creation_date) > new Date(b.creation_date)) ? 1 : ((new Date(b.creation_date) > new Date(a.creation_date)) ? -1 : 0))

    console.log(response);
    

  })
  }


  async showNoteModal(noteContent) {
    const modal = await this.modalController.create({
      component: NoteComponent,
      //cssClass:"modal-fullscreen",

      componentProps: {
        myNote: noteContent,
      }
    });
    return await modal.present();
  }
}

