import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @Input() person: Person;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getPerson();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.person).subscribe(
      _ => this.goBack()
    );
  }

  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.person = hero);
  }
}
