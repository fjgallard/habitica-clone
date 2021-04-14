import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjectModalData } from '@shared/lib/object-modal.data';

@Component({
  selector: 'app-object-modal',
  templateUrl: './object-modal.component.html',
  styleUrls: ['./object-modal.component.scss']
})
export class ObjectModalComponent implements OnInit {

  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ObjectModalData) {
  }

  ngOnInit(): void {
    this.title = this.data.object.title || '';
    console.log(this.data.object.title);
  }

}
