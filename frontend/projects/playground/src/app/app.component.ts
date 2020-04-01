import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'playground';
  baseUrl = 'https://flow-dev.nexys.io/query';
  data: any = {};

  constructor(private http: HttpClient) {}

  getAll() {
    this.execute({ User: {} });
  }

  getFiltered() {
    this.execute({User: { filters: { name: 'raphael'}}});
  }

  getFilteredRegex() {
    // see: https://digis.gitbook.io/lowcode/unified-data-fetching
    this.execute({User: { filters: { name: { $regex: 'Ma*'}}}});
  }

  private execute(query: any, url = '/data') {
    this.http.post(
      `${this.baseUrl}${url}`,
      query,
      {
        headers: new HttpHeaders(
          {
            // tslint:disable-next-line:max-line-length
            'app-token': ''
          }
        )
      }
    )
      .subscribe((res) => {
        this.data = res;
      });
  }

  createPerson() {
    this.execute(
      {Person: { insert: { data: {}}}},
      '/mutate'
    );
  }

  createUser() {
    this.execute(
      {User: { insert: { data: { person: '19642e82-6951-11ea-90f0-42010aac0009', email: 'test'}}}},
      '/mutate'
    );
  }

}
