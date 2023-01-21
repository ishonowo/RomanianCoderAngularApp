import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent implements OnInit {
  model:FeedbackInfo = {
    name:'',
    email:'',
    feedback:''
  };

  constructor(private apiService:ApiService) { }

  ngOnInit() {
  }

  sendFeedback(): void{
    //debugger;
    this.apiService.postFeedback(this.model).subscribe(
      res=>{
        alert("The feedback has been sent successfully.");
        location.reload();
      },
      err=>{
        alert("An error has occurred while sending feedback.");
      }
    );
  }

}

export interface FeedbackInfo{
  name:string;
  email:string;
  feedback:string;
}