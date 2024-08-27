import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'CastOverlap';

  public item1!: string
  public result1: any = []
  public selectedItem1: any
  private cast1: any = []
  public item1type!: any

  public item2!: string
  public result2: any = []
  public selectedItem2: any
  private cast2: any = []
  public item2type!: any

  public actorNumber!: number

  public castOverlap: any = []
  
  ngOnInit(): void {
    this.changePlaceholder();
  }

  selectType(event: any) {
    if(event.target.name == 'item1type') {
      this.item1type = event.target.value
      if(this.item1 != undefined && this.item1 != '') {
        this.findItem1()
      }
    }
    if(event.target.name == 'item2type') {
      this.item2type = event.target.value
      if(this.item2 != undefined && this.item2 != '') {
        this.findItem2()
      }
    }
    this.changePlaceholder()
  }

  async findItem1() {
    if(this.item1type != undefined && this.item1 != undefined && this.item1 != '') {
      document.querySelector('.left-side .type')!.classList.remove('warning')
      document.getElementById('warning1')!.style.display= 'none'
      const url = 'https://tvshow.p.rapidapi.com/'+ this.item1type + '/Search?Language=en-US&Content=' + this.item1 + '&Adult=false&Page=1';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '29c32e6534mshcac274e267b2f89p10c8a8jsndf388e3f504d',
          'x-rapidapi-host': 'tvshow.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        this.result1 = JSON.parse(result);
        if(this.item1type == 'Movie') {
          this.result1.forEach((film: any) => {
            film.releaseYear = new Date(film.releaseDate).getFullYear()
          });
        }
        if(this.item1type == 'Serie') {
          this.result1.forEach((serie: any) => {
            serie.releaseYear = new Date(serie.firstAirDate).getFullYear()
            serie.title = serie.name
          });
        }
        this.result1.sort((a: any, b: any) => b.releaseYear - a.releaseYear)
      } catch (error) {
        console.log(error);
      }
    } else {
      setTimeout(() => {
        if(this.item1type == undefined && this.item1 != undefined && this.item1 != '') {
          document.querySelector('.left-side .type')!.classList.add('warning')
          document.getElementById('warning1')!.style.display= 'block'
        }
      }, 500);
    }
    
  }

  async findItem2() {
    if(this.item2type != undefined && this.item2 != undefined && this.item2 != '') {
      document.querySelector('.right-side .type')!.classList.remove('warning')
      document.getElementById('warning2')!.style.display= 'none'
      const url = 'https://tvshow.p.rapidapi.com/'+ this.item2type + '/Search?Language=en-US&Content=' + this.item2 + '&Adult=false&Page=1';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '29c32e6534mshcac274e267b2f89p10c8a8jsndf388e3f504d',
          'x-rapidapi-host': 'tvshow.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        this.result2 = JSON.parse(result);
        if(this.item2type == 'Movie') {
          this.result2.forEach((film: any) => {
            film.releaseYear = new Date(film.releaseDate).getFullYear()
          });
        }
        if(this.item2type == 'Serie') {
          this.result2.forEach((serie: any) => {
            serie.releaseYear = new Date(serie.firstAirDate).getFullYear()
            serie.title = serie.name
          });
        }
        this.result2.sort((a: any, b: any) => b.releaseYear - a.releaseYear)
      } catch (error) {
        console.log(error);
      }
    } else {
      setTimeout(() => {
        if(this.item2type == undefined && this.item2 != undefined && this.item2 != '') {
          document.querySelector('.right-side .type')!.classList.add('warning')
          document.getElementById('warning2')!.style.display= 'block'
        }
      }, 500);
    }
    
  }

  async selectItem(event: any, id: any) {
    let buttonId = event.target.id

    if(buttonId == 'listItem1') {
      document.querySelector('.left-side .type')!.classList.remove('warning')
      document.getElementById('warning1')!.style.display= 'none'
      const url = 'https://tvshow.p.rapidapi.com/'+ this.item1type + '/Detail?Items=' + id + '&Language=en-US';
      const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '29c32e6534mshcac274e267b2f89p10c8a8jsndf388e3f504d',
        'x-rapidapi-host': 'tvshow.p.rapidapi.com'
      }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        let selectedItems = JSON.parse(result);
        this.selectedItem1 = {}
        this.selectedItem1 = selectedItems[0];
        document.getElementById('ul1')!.style.display = 'none'
        if(this.item1type == 'Serie') {
          this.selectedItem1.title = this.selectedItem1.name
        }
      } catch (error) {
        console.log(error);
      }
    }

    if(buttonId == 'listItem2') {
      document.querySelector('.right-side .type')!.classList.remove('warning')
      document.getElementById('warning2')!.style.display= 'none'
      const url = 'https://tvshow.p.rapidapi.com/'+ this.item2type + '/Detail?Items=' + id + '&Language=en-US';
      const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '29c32e6534mshcac274e267b2f89p10c8a8jsndf388e3f504d',
        'x-rapidapi-host': 'tvshow.p.rapidapi.com'
      }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        let selectedItems = JSON.parse(result);
        this.selectedItem2 = {}
        this.selectedItem2 = selectedItems[0];
        document.getElementById('ul2')!.style.display = 'none'
        if(this.item2type == 'Serie') {
          this.selectedItem2.title = this.selectedItem2.name
        }
      } catch (error) {
        console.log(error);
      }
    }

    if(this.selectedItem1 != undefined && this.selectedItem2 != undefined && this.item1type != undefined && this.item2type != undefined) {
      this.checkForOverlap()
    }
  }

  async checkForOverlap() {
    this.castOverlap = []
    this.countActors()
    const url1 = 'https://tvshow.p.rapidapi.com/Cast/'+ this.item1type + '?ItemId=' + this.selectedItem1.id + '&Language=en-US';
    const options1 = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '29c32e6534mshcac274e267b2f89p10c8a8jsndf388e3f504d',
        'x-rapidapi-host': 'tvshow.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url1, options1);
      const result = await response.text();
      this.cast1 = JSON.parse(result);
    } catch (error) {
      console.log(error);
    }

    const url2 = 'https://tvshow.p.rapidapi.com/Cast/'+ this.item2type + '?ItemId=' + this.selectedItem2.id + '&Language=en-US';
    const options2 = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '29c32e6534mshcac274e267b2f89p10c8a8jsndf388e3f504d',
        'x-rapidapi-host': 'tvshow.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url2, options2);
      const result = await response.text();
      this.cast2 = JSON.parse(result);
    } catch (error) {
      console.log(error);
    }

    this.cast1.forEach((actor1: any) => {
      let index = this.cast2.findIndex((actor2: any) => actor2.name == actor1.name)
      if(index != -1) {
        this.cast2[index].character2 = this.cast2[index].character
        this.cast2[index].character1 = this.cast1.find((actor: any) => actor.name == actor1.name).character
        this.castOverlap.push(this.cast2[index])
      }
      this.countActors();
    });
    this.changeJustification();
  }

  countActors() {
    this.actorNumber = this.castOverlap.length
  }

  showList(elementId: string) {
    document.getElementById(elementId)!.style.display = 'block'
  }

  showInstructions() {
    let p = document.getElementById('instructionsContent')!
    if(p.style.display == 'none') {
      p.style.display = 'block'
      document.getElementById('background')?.classList.add('visibleInstructions');
      (document.getElementsByClassName('content')[0] as HTMLElement)!.style.display = 'none';
      (document.getElementsByClassName('content')[1] as HTMLElement)!.style.display = 'none';
    } else {
      p.style.display = 'none'
      document.getElementById('background')?.classList.remove('visibleInstructions');
      (document.getElementsByClassName('content')[0] as HTMLElement)!.style.display = 'flex';
      (document.getElementsByClassName('content')[1] as HTMLElement)!.style.display = 'flex';
    }

  }

  checkPressedEnter(event: any) {
    if(event.key == 'Enter' && event.target.id == 'item1') {
      this.findItem1()
    }
    if(event.key == 'Enter' && event.target.id == 'item2') {
      this.findItem2()
    }
  }

  changePlaceholder() {
    let item1Placeholder!: string
    let item2Placeholder!: string
    switch (this.item1type) {
      case 'Movie':
        item1Placeholder = 'Film';
        break;
      case 'Serie':
        item1Placeholder = 'Serie TV';
        break;
      default:
        item1Placeholder = 'Selezionare "Film" o "Serie TV"'
        break;
    }
    switch (this.item2type) {
      case 'Movie':
        item2Placeholder = 'Film';
        break;
      case 'Serie':
        item2Placeholder = 'Serie TV';
        break;
      default:
        item2Placeholder = 'Selezionare "Film" o "Serie TV"'
        break;
    }

    document.getElementById('item1')?.setAttribute('placeholder', item1Placeholder)
    document.getElementById('item2')?.setAttribute('placeholder', item2Placeholder)
  }

  waitForElement(selector: any, callback: any) {
    const interval = setInterval(() => {
        const element = document.getElementById(selector);
        if (element) {
            clearInterval(interval);
            callback(element);
        }
    }, 100);
  }

  changeJustification() {
    this.waitForElement('actors', (row: any) => {
        const totalWidth = row.scrollWidth;
        const visibleWidth = window.innerWidth;
        if (totalWidth > visibleWidth) {
            row.style.justifyContent = 'left';
        } else {
            row.style.justifyContent = 'center';
        }
    });
  }

}