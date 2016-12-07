import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "...";

  delay(milliseconds: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds)
    })
  }

  async ngOnInit() {
    await this.delay(2000);
    this.title = "Hello World";


  }

}
