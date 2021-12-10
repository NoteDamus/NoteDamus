import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  name;
  constructor(
    private router:ActivatedRoute,
    private alertController:AlertController,
    private operations:OperationsService,
    private modalController:ModalController,

  ) { 
    this.name = this.router.snapshot.queryParamMap.get('subfoldername');
    console.log(this.name);
  }

  ngOnInit() {
    console.log("main folder page");
    this.getNotes();
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
        this.notes.push(datam);
      })
    })
  }
}

