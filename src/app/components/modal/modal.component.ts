import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import {finalize} from 'rxjs/internal/operators/finalize';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/internal/Observable';
import {AngularFireStorage} from '@angular/fire/storage';


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
  };


  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  msgError: string;
  isError: any;

  constructor(public dataApi: DataApiService,
              private storage: AngularFireStorage) {
  }

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
        .then(() => {
          bookForm.resetForm();
          this.btnClose.nativeElement.click();
        })
        .catch(err => {
          this.isError = true;
          this.msgError = err.message;
        });
    } else {
      // Update
      bookForm.value.portada = this.inputImageBook.nativeElement.value;
      this.dataApi.updateBook(bookForm.value)
        .then(() => {
          bookForm.resetForm();
          this.btnClose.nativeElement.click();
        })
        .catch(err => {
          this.isError = true;
          this.msgError = err.message;
          console.log('error onSaveBook() ::: ' + err.message);
        });

    }

  }

  onUpload(event) {

    this.imageLoad.id = Math.random().toString(36).substring(2);
    this.imageLoad.file = event.target.files[0];
    this.imageLoad.filePath = `uploads/book_${this.imageLoad.id}`;
    this.imageLoad.ref = this.storage.ref(this.imageLoad.filePath);
    this.imageLoad.task = this.storage.upload(this.imageLoad.filePath, this.imageLoad.file);
    try {
      this.uploadPercent = this.imageLoad.task.percentageChanges();
      this.imageLoad.task.snapshotChanges()
        .pipe(finalize(() => this.urlImage = this.imageLoad.ref.getDownloadURL()))
        .subscribe();
      console.log('Success onUpload ::: this.urlimage = ' + this.urlImage);

    } catch (error) {
      this.msgError = error;
      console.log('Error in load image' + error);
    }
  }

}
