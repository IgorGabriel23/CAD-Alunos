import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
  students: Student[] = [];

  formGroupStudents: FormGroup;
  
  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(){
    this.service.getStudents().subscribe({
      next: data => this.students = data
    });
  }

  constructor(private formBuilder: FormBuilder,
              private service: StudentService
    ){
    this.formGroupStudents =formBuilder.group({
      id : [''],
      name : [''],
      course : [''],
    });
  }

  save(){
    this.service.save(this.formGroupStudents.value).subscribe({
      next: data => this.students.push(data)
    })
    
  }
}
