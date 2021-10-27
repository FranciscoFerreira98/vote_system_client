import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { Poll } from 'src/app/models/poll.model';
import { PollService } from 'src/app/_services/poll.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import {FileUploadRepresentativeService } from '../_services/file-upload-representatives.service';
import { FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from 'flatpickr';
import { any } from 'sequelize/types/lib/operators';
import { HttpEventType, HttpResponse } from '@angular/common/http';

export function flatpickrFactory() {
  flatpickr.localize(Portuguese);
  return flatpickr;
}


declare let KTStepper : any;


@Component({
  selector: 'app-dashboard-mesa',
  templateUrl: './dashboard-mesa.component.html',
  styleUrls: ['./dashboard-mesa.component.css'],
})
export class DashboardMesaComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;

  selectedFilesRepresents?: FileList;
  currentFileRepresent?: File;
  progressRepresent = 0;

  messageRepresent ?: string;

  fileInfos?: Observable<any>;
  fileInfosRepresent?: Observable<any>;

  content?: string;
  private roles: string[] = [];

  polls: Poll[] = [];
  currentPoll: Poll = {};
  currentIndex = -1;

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [3, 6, 9];

  title = '';
  isLoggedIn = false;
  showAdminBoard = false;
  showMesaBoard = false;
  element:any;
  stepper:any;

  message?: string;
  isSuccessful = false;
  submitted = false;
  isError = false;
  poll = {
    nome: '',
  };

  pollId : any;
  date : any;
  submitBtn : any;

  getDate = new Date();
  dd = String(this.getDate.getDate()).padStart(2, '0');
  mm = String(this.getDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.getDate.getFullYear();

  today = this.yyyy + '-' + this.mm + '-' + this.dd;

  basicDemoValue = new Date();
  startDate = new Date();

  constructor(
    private userService: UserService,
    private pollService: PollService,
    private tokenStorageService: TokenStorageService,
    private uploadService: FileUploadService,
    private uploadRepresentService: FileUploadRepresentativeService
  ) {}

  ngOnInit(): void {

    
  

    flatpickrFactory();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.element = document.querySelector("#kt_stepper_example_vertical");
    this.submitBtn = document.querySelector('[data-kt-stepper-action="submit"]'), 
    this.stepper = new KTStepper(this.element);
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
  
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showMesaBoard = this.roles.includes('ROLE_MESA');

      this.userService.getAdminBoard().subscribe(
        (data) => {
          this.content = data;
          this.retrievePolls();
        },
        (err) => {
          this.content = JSON.parse(err.error).message;
        }
      );
    }
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrievePolls();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrievePolls();
  }


  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  selectFileRepresent(event: any): void {
    this.selectedFilesRepresents = event.target.files;
  }


  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        const data = {
         file: file,
         pollId: this.pollId, 
        }
        

        this.uploadService.upload(this.currentFile,this.pollId).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
  }


  uploadRepresent(): void {
    this.progress = 0;
  
    if (this.selectedFilesRepresents) {
      const file: File | null = this.selectedFilesRepresents.item(0);
      console.log("entrei 1");
      if (file) {
        this.currentFileRepresent = file;
        console.log("entrei 2");
        this.uploadRepresentService.upload(this.currentFileRepresent,this.pollId).subscribe(
          (event: any) => {
            console.log("entrei 3");
            if (event.type === HttpEventType.UploadProgress) {
              this.progressRepresent = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.messageRepresent = event.body.message;
              this.fileInfosRepresent = this.uploadRepresentService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.messageRepresent = err.error.message;
            } else {
              this.messageRepresent = 'Could not upload the file!';
            }

            this.currentFileRepresent = undefined;
          });

      }

      this.selectedFilesRepresents = undefined;
    }
  }

  retrievePolls(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.pollService.getAll().subscribe(
      (data) => {
        this.polls = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrievePolls();
    this.currentPoll = {};
    this.currentIndex = -1;
  }

  setActivePoll(tutorial: Poll, index: number): void {
    this.currentPoll = tutorial;
    this.currentIndex = index;
  }

  removeAllPolls(): void {
    this.pollService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  goBack(){
    
    this.stepper.goPrevious(); // go next step 
    this.submitBtn.classList.remove("d-inline-block");
  }

  goNext(){
    if(this.stepper.getCurrentStepIndex() == 4){
      this.submitBtn.classList.add("d-inline-block");
    }
    if(this.stepper.getCurrentStepIndex() != 4){
      this.submitBtn.classList.remove("d-inline-block");
    }
    

    this.stepper.goNext(); // go next step

  }


  createPoll() {
    const data = {
      name: this.poll.nome,
      start_date: this.date.from,
      end_date: this.date.to
    };

    this.pollService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.pollId = response.id;
        this.isSuccessful = true;
        this.isError = false;
      },
      (error) => {
        this.isError = true;
        this.message = error.statusText;
        console.log(error);
      }
    );
  }

  submitVoters(){
    console.log(this.pollId);
  }
}
