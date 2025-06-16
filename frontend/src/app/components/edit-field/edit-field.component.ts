import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-field.component.html',
  styleUrl: './edit-field.component.scss'
})
export class EditFieldComponent {
  @Input() label = '';
  @Input() value: string | number = '';
  @Input() type: string = 'text';
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string | number>();

  editing = false;
  editValue: string | number = '';

  startEdit() {
    if (this.disabled) return;
    this.editing = true;
    this.editValue = this.value;
  }

  save() {
    this.editing = false;
    this.valueChange.emit(this.editValue);
  }

  cancel() {
    this.editing = false;
  }
}
