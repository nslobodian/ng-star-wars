import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PEOPLE } from '../mock-people';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: Person[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeros().subscribe(people => this.people = people);
  }

}
