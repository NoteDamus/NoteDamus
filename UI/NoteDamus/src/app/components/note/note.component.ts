import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {

  noteId;
  myNote;
  constructor(
    private modalController:ModalController,
    private operations:OperationsService
  ) { }

  ngOnInit() {
    //console.log(this.noteId);
   // this.getClickedNote()
  }

  closeModal() {
    this.modalController.dismiss(null, 'cancel');
  }

 /* getClickedNote(){
    this.operations.getClickedNote(this.noteId).subscribe(items =>{
      let myNote:any = items.data()
      this.myNote = myNote;
      console.log(this.myNote)
    })
  }*/

}
