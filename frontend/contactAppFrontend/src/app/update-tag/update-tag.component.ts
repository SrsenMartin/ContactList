import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiService } from 'src/Shared/api.service';

@Component({
  selector: 'app-update-tag',
  templateUrl: './update-tag.component.html',
  styleUrls: ['./update-tag.component.css']
})
export class UpdateTagComponent implements OnInit {

  error: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService, public dialogRef: MatDialogRef<UpdateTagComponent>) { }

  ngOnInit() {
    var nameInput = <HTMLInputElement>document.getElementById('name');
    nameInput.value = this.data.tag.tagName;
  }

  public onClose() {
    this.dialogRef.close();
  }

  public onSubmit() {
    var nameInput = <HTMLInputElement>document.getElementById('name');

    if (nameInput.value == null || nameInput.value == "") {
      this.error = true;
    } else {
      this.error = false;
    }

    var tag = this.data.tag;
    tag.tagName = nameInput.value;

    this.api.updateTag(tag).subscribe(
      t => {
        this.dialogRef.close({ data: tag });
      },
      error1 => {
        console.log(error1);
      }
    );
  }
}
