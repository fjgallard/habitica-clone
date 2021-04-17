import { Component, Inject, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjectModalData } from '@shared/lib/object-modal.data';
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

  task: Task;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ObjectModalData,
    public dialogRef: MatDialogRef<ObjectModalComponent>
  ) {

  }

  ngOnInit(): void {
    this.task = this.data.object;
  }

  save() {
    this.task.title = this.titleInput.nativeElement.value;
    this.dialogRef.close({ event: 'save', task: this.task });
  }

  delete() {
    this.dialogRef.close({ event: 'delete' });
  }
}
