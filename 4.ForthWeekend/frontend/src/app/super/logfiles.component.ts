import { Component, OnInit } from '@angular/core';
import { SuperService } from './super.service';

@Component({
  selector: 'app-logfiles',
  template: `
    <mat-toolbar color="success">
      Lists of Log Files
    </mat-toolbar>
    <mat-list *ngFor="let log of logs">
      <mat-list-item class="log">{{log}}</mat-list-item>
      <mat-divider></mat-divider>
    </mat-list>
  `,
  styles: ['.log{color:gray}'],
})
export class LogfilesComponent implements OnInit {
  logs;
  log;
  subscription;
  constructor(private data: SuperService) {}

  ngOnInit(): void {
    this.subscription = this.data.logfiles().subscribe((response) => {
      this.log = response;
      this.logs =this.log.slice(1)
      this
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
