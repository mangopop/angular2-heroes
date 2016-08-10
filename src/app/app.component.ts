import {Component} from '@angular/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';


// The (*) prefix to ngFor indicates that the <li> element and its children constitute a master template.
// [hero]="selectedHero" binding: we need this as an input on the other class: inputs: ['hero']
// target (hero) is left source is right (selectedHero)
@Component({
    selector: 'my-app',
    directives: [HeroDetailComponent],
    template: `    
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="#hero of heroes" 
        (click)="onSelect(hero)"
        [class.selected]="hero === selectedHero">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>
    `,
    styles:[`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 10em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0em;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #EEE;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0em 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0px 0px 4px;
  }
`],
  providers: [HeroService]
})


export class AppComponent {
  public heroes: Hero[];
  public title = 'Tour of Heroes';
  public selectedHero: Hero;
  
  // hero service added by provider
  // providers: [HeroService] The providers array tells Angular to create a fresh instance of the HeroService when it creates a new AppComponent. The AppComponent can use that service to get heroes and so can every child component of its component tree.
  constructor(private _heroService: HeroService) { }
  
  ngOnInit() {
    this.getHeroes();
  }
  
  // example of initialising
  // public selectedHero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };
  
  getHeroes() {
    // this.heroes = this._heroService.getHeroes();
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  
  onSelect(selectedHero: Hero) { 
    this.selectedHero = selectedHero; 
  }
  
}

