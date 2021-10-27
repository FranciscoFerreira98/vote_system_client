import { Component, OnInit } from '@angular/core';
import { PollService } from '../_services/poll.service';
import { UserService } from '../_services/user.service';

import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from 'flatpickr';

export function flatpickrFactory() {
  flatpickr.localize(Portuguese);
  return flatpickr;
}

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css'],
})
export class CreatePollComponent implements OnInit {
  content?: string;
  message?: string;
  isSuccessful = false;
  submitted = false;
  isError = false;
  poll = {
    nome: '',
    startDate: '',
    endDate: '',
  };


  getDate = new Date();
  dd = String(this.getDate.getDate()).padStart(2, '0');
  mm = String(this.getDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.getDate.getFullYear();

  today = this.yyyy + '-' + this.mm + '-' + this.dd;

  basicDemoValue = new Date();
  startDate = new Date();
  constructor(
    private userService: UserService,
    private pollService: PollService
  ) {}

  ngOnInit(): void {
    flatpickrFactory();
    this.userService.getAdminBoard().subscribe(
      (data) => {
        this.content = data;
      },
      (err) => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  createPoll() {
    const data = {
      name: this.poll.nome,
      start_date: this.poll.startDate,
      end_date: this.poll.endDate,
    };

    console.log(data);
    this.pollService.create(data).subscribe(
      (response) => {
        console.log(response);
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

}
