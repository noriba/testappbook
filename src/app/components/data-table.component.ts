import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import * as moment from 'moment';


@Component({
  template: `
  <div class="p-3">
    <p-dataView  [value]="transactions" [paginator]="true" [rows]="10" [pageLinks]="3" [rowsPerPageOptions]="[5,10,20]" #dt>
      <ng-template pTemplate="header"  field="date" header="Date" >
        <ng-template let-col let-transaction="rowData" pTemplate="body">
            {{format(transaction[col.field])}}
        </ng-template>
      </ng-template>
      <ng-template  pTemplate="header" field="category" header="Category"  filterMatchMode="equals">
        <ng-template pTemplate="filter" let-col>
          <p-dropdown [options]="categories" [style]="{'width':'100%'}" (onChange)="dt.filter($event.value,col.field,col.filterMatchMode)" styleClass="ui-column-filter"></p-dropdown>
        </ng-template>
      </ng-template>
      <ng-template pTemplate="header" field="label" header="Label" ></ng-template>
      <ng-template pTemplate="header" field="amount" header="Amount" ></ng-template>
    </p-dataView >
  </div>
  `
})
export class DataTableComponent implements OnInit {
  transactions: {
    date: Date,
    label: string,
    amount: number,
    category: string
  }[];
  categories: SelectItem[];

  ngOnInit() {
    this.transactions = [
      {
        date: new Date(2017, 10, 10, 13, 10, 15),
        label: 'Third transaction',
        amount: 15,
        category: 'Transport'
      },
      {
        date: new Date(2017, 7, 3, 9, 35, 0),
        label: 'Second transaction',
        amount: 100,
        category: 'Bills'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Transport'
      }
    ];

    this.categories = [
      { label: 'All', value: null },
      { label: 'Bills', value: 'Bills' },
      { label: 'Transport', value: 'Transport' }
    ];
  }

  format(date) {
    return moment(date).format('lll');
  }
}
