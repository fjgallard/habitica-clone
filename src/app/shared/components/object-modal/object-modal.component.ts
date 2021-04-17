import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjectModalData } from '@shared/lib/object-modal.data';

@Component({
  selector: 'app-object-modal',
  templateUrl: './object-modal.component.html',
  styleUrls: ['./object-modal.component.scss']
})
export class ObjectModalComponent implements OnInit {

  @Output()
  deleteTask = new EventEmitter<boolean>();

  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ObjectModalData,
    public dialogRef: MatDialogRef<ObjectModalComponent>
  ) {

  }

  ngOnInit(): void {
    this.title = this.data.object.title || '';
  }

  delete() {
    this.dialogRef.close({ event: 'delete' });
  }
}
