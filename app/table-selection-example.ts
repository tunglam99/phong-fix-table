import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata';
import { MatTableDataSource } from '@angular/material';
import { cloneDeep } from 'lodash';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  isSelected?: boolean;
}

const ELEMENT_DATA: any[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: '910' },
  { position: 2, name: 'abc', weight: 4.0026, symbol: '900' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: '111' },
  { position: 4, name: 'ggg', weight: 9.0122, symbol: '900' },
  { position: 5, name: '2', weight: 10.811, symbol: '33' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: '22' },
  { position: 7, name: 'abc', weight: 14.0067, symbol: '111' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: '111' },
  { position: 9, name: 'abc', weight: 18.9984, symbol: '111' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: '111' },
];

/**
 * @title Table with selection
 */
@Component({
  selector: 'table-selection-example',
  styleUrls: ['table-selection-example.css'],
  templateUrl: 'table-selection-example.html',
})
export class TableSelectionExample implements OnInit {
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'weight',
    'symbol',
  ];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  selection = new SelectionModel<any>(true, []);
  selectedAll = false;
  indeterminate = false;
  dataTemp: any;
  mySelection: any;
  ngOnInit(): void {
    const data = this.dataSource.data.map((x) => {
      return {
        ...x,
        isSelected: false,
      };
    });
    this.dataSource.data = data;
  }
  changeDataStay(item: any) {
    if (this.dataSource.data.every((x) => x.isSelected)) {
      this.selectedAll = true;
      this.indeterminate = false;
    } else {
      this.selectedAll = false;
      this.indeterminate = this.dataSource.data.some((x) => x.isSelected);
    }
  }

  onSelectedAll() {
    if (this.selectedAll) {
      this.dataSource.data
        .filter((x) => x.name !== 'abc')
        .map((x) => (x.isSelected = true));
      // this.dataSource.data.map((x) => {
      //   if ((x.name = 'abc')) {
      //     x.isSelected = false;
      //   } else {
      //     x.isSelected = true;
      //   }
      // });
    } else {
      this.dataSource.data.map((x) => (x.isSelected = false));
    }
    // const dataDeletes = this.dataSource.data.filter((x) => x.isSelected);
    //   if (dataDeletes.length < this.dataSource.data.length) {
    //     this.indeterminate = true;
    //   } else {
    //     this.indeterminate = false;
    //   }
  }

  delete() {
    this.dataTemp = cloneDeep(this.dataSource.data);

    let i = -1;
    this.dataTemp = this.dataTemp.map((x) => {
      i = i + 1;
      return {
        ...x,
        index: i,
      };
    });
    this.mySelection = this.dataTemp;

    this.mySelection = this.mySelection
      .filter((item: any) => item.isSelected)
      .map((value: any) => {
        return {
          name: value.name,
          position: value.position,
          weight: value.weight,
          symbol: value.symbol,
          isSelected: value.isSelected,
          index: value.index,
        };
      });

    const checkSymbol = this.mySelection.find((x: any) => !x.name);
    // console.log(checkSymbol);
    if (checkSymbol) {
      console.log('name' + checkSymbol.index);
      document.getElementById('name' + checkSymbol.index).focus();
      return;
    }
    // console.log(checkSymbol);

    function check(value: any) {
      if (value.symbol === '900' || value.symbol === '910') {
        return true;
      } else return false;
    }

    const checkWeight = this.mySelection.every(check);
    // console.log(checkWeight);

    if (checkWeight) {
      // document.getElementById('weight' + checkWeight.index).focus();
      console.log(checkWeight);
      console.log('Được xóa');
    } else {
      const a = this.mySelection.filter(
        (a) => a.symbol !== '900' && a.symbol !== '910'
      );
      const checkWeight$$$$ = a.find((data) => data.weight === '');
      console.log(checkWeight$$$$);
      if (checkWeight$$$$) {
        document.getElementById('weight' + checkWeight$$$$.index).focus();
        // console.log(checkWeight$$$$)
        console.log('Nhập weight');
        return;
      } else console.log('Được xóa');
    }

    // if (checkWeight) {
    //   console.log('weight' + checkWeight.index);
    //   document.getElementById('weight' + checkWeight.index).focus();
    //   return;
    // }
    // console.log('ok');
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
