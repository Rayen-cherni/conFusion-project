import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../menu/shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[];

  constructor( private leaderService: LeaderService) { }

  ngOnInit(): void {

    this.leaderService.getLeaders()

    //Si on veut utiliser le promises on utilise .then mais dans le cas ou on veut utiliser observable on utilise .subscribe
    //.then((leaders) => this.leaders = leaders);
    .subscribe((leaders) => this.leaders = leaders);

  }

}
