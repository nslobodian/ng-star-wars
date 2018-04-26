import { Component, OnInit } from '@angular/core';
import { GetPeopleResponse } from '../person';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: GetPeopleResponse;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeros().subscribe(people => this.people = people);
  }

}
