import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent implements OnInit {
  modalRef: any;
  task:any= {};
  edittask: any = {};
  errMsg="";
  @ViewChild("createtaskManagement", { static: false }) createtaskManagement: any;
  @ViewChild("edittaskManagement", { static: false }) edittaskManagement: any;
  allTasks: any = [];

  constructor(private api: ApiService,   private modalService: NgbModal){

  }

  ngOnInit(): void {
      this.getAllTasks();
  }

  createTask(){
    this.modalService.open(this.createtaskManagement, {
      centered: true,
    });
  }

  close(){
    this.modalService.dismissAll();
  }

  addTask(){
    console.log(this.task);
    this.api.createTask(this.task).subscribe((res)=>{
      console.log(res);
      this.modalService.dismissAll();
      this.task = {};
      this.getAllTasks();
    })
  }

  getAllTasks(){
    this.api.getAllTasks().subscribe((res)=>{
      console.log(res);
      this.allTasks = res;
    })
  }


  deleteTask(id: string){
      console.log(id);
      this.api.deleteTask(id).subscribe((res)=>{
        console.log(res);
        this.getAllTasks();
      });
  }


  editTaskModel(id: string){
    this.modalService.open(this.edittaskManagement, {
      centered: true,
    });
    this.api.getTask(id).subscribe((res)=>{
      this.edittask = res.result;
    })
  }

  editTask(id: string){
    console.log(this.edittask);
    this.api.editTask(this.edittask, id).subscribe((res)=>{
      console.log(res);
      this.modalService.dismissAll();
      this.edittask = {};
      this.getAllTasks();
    })
  }

}
