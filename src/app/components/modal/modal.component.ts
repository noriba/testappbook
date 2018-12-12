import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { BookInterface } from '../../models/book';
import { NgForm } from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  imageLoad: any = {
    id: '',
    file: '',
    filePath: '',
    ref: '',
    task: ''
  }


  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  msgError: string;
  isError: any;

  constructor(/*private modalService: NgbModal,*/ private dataApi: DataApiService,private storage: AngularFireStorage) { }

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;
  @ViewChild('imageBook') inputImageBook: ElementRef;



  ngOnInit() {
  }

  onSaveBook(bookForm: NgForm): void {
    if (bookForm.value.id == null) {
      bookForm.value.userUid = this.userUid;
      bookForm.value.portada = this.inputImageBook.nativeElement.value;
      this.dataApi.addBook(bookForm.value)
        .then(()=>{
        bookForm.resetForm();
        this.btnClose.nativeElement.click();
          console.log("onSaveBook() ::: url = "+ bookForm.value.portada);
          console.log("onSaveBook() ::: url = "+ this.dataApi.selectedBook.portada);
      })
        .catch(err => {
          this.isError = true;
          this.msgError = err.message;
          console.log('error onSaveBook() ::: ' + err);
        });
    } else {
      // Update
      bookForm.value.portada = this.inputImageBook.nativeElement.value;

      this.dataApi.updateBook(bookForm.value)
        .then(()=>{
          bookForm.resetForm();
          this.btnClose.nativeElement.click();
          console.log("onSaveBook() ::: url = "+ bookForm.value.portada);
          console.log("onSaveBook() ::: url = "+ this.dataApi.selectedBook.portada);
      })
        .catch(err => {
          this.isError = true;
          this.msgError = err.message;
          console.log('error onSaveBook() ::: ' + err.message);
        });

    }

  }

  closeResult: string;

 /* private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }*/
  onUpload(event) {

 /*   this.modalService.open(event, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
*/
    this.imageLoad.id = Math.random().toString(36).substring(2);
    this.imageLoad.file = event.target.files[0];
    this.imageLoad.filePath = `uploads/book_${this.imageLoad.id}`;
    this.imageLoad.ref = this.storage.ref(this.imageLoad.filePath);
    this.imageLoad.task = this.storage.upload(this.imageLoad.filePath, this.imageLoad.file);
    try{
      this.uploadPercent = this.imageLoad.task.percentageChanges();
      this.imageLoad.task.snapshotChanges()
        .pipe(finalize(() => this.urlImage = this.imageLoad.ref.getDownloadURL()))
        .subscribe();
      console.log('Success onUpload ::: this.urlimage = '+ this.urlImage );

    }catch (error){
      this.msgError = error;
      console.log("Error in load image"+ error);
    }
  }

}
