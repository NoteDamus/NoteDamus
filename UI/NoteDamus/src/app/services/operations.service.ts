import { Injectable } from '@angular/core';
//import firebase from 'firebase/app';import 'firebase/auth';
//import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from '../auth/toast.service';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(
   // private db:AngularFirestore,
    private toast: ToastService
  ) { }



  /*addNote(data){
    
    const userid = firebase.auth().currentUser.uid
    if (userid) {
      this.db.collection(`Notes/${userid}/notes`).add(data).then(() => {
        this.toast.presentToast("folder created", 1250)
      });
    } 
  }
  getNotes(folderName){
    const userid = firebase.auth().currentUser.uid
  if (userid) {
    return this.db.collection(`Notes/${userid}/notes`, ref=> ref.where("main", "==", folderName)).snapshotChanges()
  } 

  }
  getClickedNote(noteId){
    const userid = firebase.auth().currentUser.uid
    if (userid) {
      return this.db.doc(`Notes/${userid}/notes/${noteId}`).get()
    } 
  }
  addFolder(data) {
    if(!data.main){data.main = "main";}
    const userid = firebase.auth().currentUser.uid
    if (userid) {
      this.db.collection(`Folders/${userid}/folders`).add(data).then(() => {
        this.toast.presentToast("folder created", 1250)
      });
    } 
  }
  getFolder(){
    const userid = firebase.auth().currentUser.uid
    if (userid) {
      return this.db.collection(`Folders/${userid}/folders`, ref=> ref.where("main", "==", "main")).snapshotChanges()
    } 
}
getSubFolders(name){
  const userid = firebase.auth().currentUser.uid
  if (userid) {
    return this.db.collection(`Folders/${userid}/folders`, ref=> ref.where("main", "==", name)).snapshotChanges()
  } 
}*/
}
