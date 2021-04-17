import { Component, Inject, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjectModalData } from '@shared/lib/object-modal.data';
import { Reward } from '@shared/models/reward.model';
import { Task } from '@shared/models/task.model';

@Component({
  selector: 'app-object-modal',
  templateUrl: './object-modal.component.html',
  styleUrls: ['./object-modal.component.scss']
})
export class ObjectModalComponent implements OnInit {

  @ViewChild('title')
  titleInput: ElementRef;

  @Output()
  deleteTask = new EventEmitter<boolean>();

  object: Task | Reward;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ObjectModalData,
    public dialogRef: MatDialogRef<ObjectModalComponent>
  ) {

  }

  ngOnInit(): void {
    this.object = this.data.object;
  }

  save() {
    this.object.name = this.titleInput.nativeElement.value;
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
}
