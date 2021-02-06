import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <section class="hero is-info is-fullheight is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title"></h1>
          <h4>
            In response to the Coronavirus, we are taking special precautions
            for customers, vendors and staff. We are monitoring crowd size and
            enforcing social distancing measures to prevent crowding and
            gathering.
          </h4>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        background-image: url('https://images.squarespace-cdn.com/content/v1/5eb849b9eb1c7b5da7d17010/1589843794983-9190ORDT6WWQ5KWL2SGP/ke17ZwdGBToddI8pDm48kK60W-ob1oA2Fm-j4E_9NQB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0kD6Ec8Uq9YczfrzwR7e2Mh5VMMOxnTbph8FXiclivDQnof69TlCeE0rAhj6HUpXkw/bayview+students+market+health.jpg');
        background-size: cover;
        background-position: center center;
      }
      h1 {
        padding: 10px;
      }
      h4 {
        color: white;
        padding-bottom: 600px;
        font-style: italic;
        font-size: 18px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

