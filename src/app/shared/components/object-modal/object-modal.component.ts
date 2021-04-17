import { Component, Inject, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjectModalData } from '@shared/lib/object-modal.data';

interface Object {
  id?: string;
  name: string;
  user: string;
  done?: boolean;
  cost?: number;
}

@Component({
  selector: 'app-object-modal',
  templateUrl: './object-modal.component.html',
  styleUrls: ['./object-modal.component.scss']
})
export class ObjectModalComponent implements OnInit {

  @ViewChild('nameInput')
  nameInput: ElementRef;

  @ViewChild('costInput')
  costInput: ElementRef;

  @Output()
  deleteTask = new EventEmitter<boolean>();

  object: Object;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ObjectModalData,
    public dialogRef: MatDialogRef<ObjectModalComponent>
  ) {

  }

  ngOnInit(): void {
    this.object = this.data.object;
  }

  save() {
    this.object.name = this.nameInput.nativeElement.value;
    this.object.cost = this.costInput.nativeElement.value;

    this.dialogRef.close({ event: 'save', object: this.object });
  }

  delete() {
    this.dialogRef.close({ event: 'delete' });
  }


  get headerText() {
    return this.data.type === 'task' ? 'Edit To Do' : 'Edit Reward';
  }

  get deleteText() {
    return this.data.type === 'task' ? 'Delete this todo' : 'Delete this reward';
  }

  get name() {
    return this.object.name || '';
  }

  get cost() {
    return this.object.cost || 0;
  }

  get objectType() {
    return this.data.type;
  }
}
