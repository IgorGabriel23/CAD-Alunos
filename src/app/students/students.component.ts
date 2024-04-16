import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  formGroupStudents: FormGroup;
  isEditing: boolean = false;
  submited: boolean = false;

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.service.getStudents().subscribe({
      next: data => this.students = data
    });
  }

  constructor(private formBuilder: FormBuilder,
    private service: StudentService
  ) {
    this.formGroupStudents = formBuilder.group({
      id: [''],
      name: ['', [Validators.minLength(3), Validators.required]],
      course: ['', [Validators.required]]
    });
  }

  save() {
    this.submited = true;
    if (this.formGroupStudents.valid) {
      if (this.isEditing) {
        this.service.update(this.formGroupStudents.value).subscribe({
          next: () => {
            this.loadStudents();
            this.isEditing = false;
            this.formGroupStudents.reset();
          }
        })
      }
      else {
        this.service.save(this.formGroupStudents.value).subscribe({
          next: data => {
            this.students.push(data);
            this.formGroupStudents.reset();
          }
        })
      }
    }
  }

  delete(student: Student) {
    this.service.delete(student).subscribe({
      next: () => this.loadStudents()
    })
  }

  edit(student: Student) {
    this.formGroupStudents.setValue(student);
    this.isEditing = true;
  }
  get name(): any{
    return this.formGroupStudents.get("name");
  }

  get course(): any{
    return this.formGroupStudents.get("course");
  }
}
