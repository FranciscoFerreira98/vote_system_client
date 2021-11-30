import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { CountVotesService } from '../_services/count-votes.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  allVotes = 0;
  co2 = 0;


  constructor(private userService: UserService, private countVotes: CountVotesService) { }

  ngOnInit(): void {
    this.retriveAllVotesFromBeggining();
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  retriveAllVotesFromBeggining(){
    this.countVotes.getAllVotersFromStart().subscribe(
      (data) => {
        console.log(data);
        this.allVotes = data.allVoters;

        this.co2 = (0.72 * data.allVoters) / 500;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
}
