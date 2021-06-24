import { TableModel } from './../../services/tableModel';
import { ResonstopService } from './../../services/resonstop.service';
import { ResonStopModel } from './../../models/resonStopModel';
import { WorkModel } from './../../models/workModel';
import { WorkService } from './../../services/work.service';
import { StatuModel } from './../../models/statuModel';
import { StatuService } from './../../services/statu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  status:StatuModel[]=[];
  works:WorkModel[]=[];
  resonStops:ResonStopModel[]=[];
  tabledata:TableModel[]=[];
  tabelElement:TableModel={rowId:0,columnId:0,boxValue:0};
  totalColVal:TableModel[]=[];
  totalWorkStopsRow:number[]=[];
  totalWorkStopsCol:number[]=[];


  constructor(private statuService:StatuService,
              private workService:WorkService,
              private resonStopService:ResonstopService) { }

  ngOnInit(): void {
    this.getAllStatus();
    this.getAllWorks();
    this.getAllResonStop();

  }

  getAllStatus(){
    this.statuService.getAll().subscribe(response=>{
      this.status=response.data;
    })
  }

  getAllWorks(){
    this.workService.getAll().subscribe(response=>{
      this.works=response.data;
    })
  }

  getAllResonStop(){
    this.resonStopService.getAll().subscribe(response=>{
      this.resonStops=response.data;
      this.differenceDate(this.resonStops);
    })
  }

  differenceDate(resonStops:ResonStopModel[]){
    for(let i =0;i<resonStops.length;i++){
      this.tabelElement.rowId=resonStops[i].workId;
      this.tabelElement.columnId=resonStops[i].statuId;
      var start=new Date(this.resonStops[i].startTime);
      var end=new Date(this.resonStops[i].endTime);
      this.tabelElement.boxValue=(end.getTime()-start.getTime())/60000;
      this.tabledata[i]={rowId:this.tabelElement.rowId,columnId:this.tabelElement.columnId,boxValue:this.tabelElement.boxValue}
    }
    this.calculateTotalColValue();
  }

  calculateTotalRowValue(){
    let totalMin=0;
    for(let i =0;i<this.status.length;i++){
      for(let j=0;j<this.works.length;j++){
        for(let k =0; k<this.tabledata.length;k++){
          if(this.tabledata[k].rowId==j+1 && this.tabledata[k].columnId==i+1){
            totalMin+=this.tabledata[k].boxValue;
          }
        }
      }
      this.totalWorkStopsCol[i]=totalMin;
      totalMin=0;
    }

    let total=0;
    for(let i =0;i<this.status.length;i++){
      total+=this.totalWorkStopsCol[i];
    }
    this.totalWorkStopsCol[this.totalWorkStopsCol.length]=total;
  }

  calculateTotalColValue(){
    let totalMin=0;
    let t=0;
    for(let i =1;i<this.works.length+1;i++){
      for(let j =1;j<this.status.length+1;j++){
        for(let k =0; k<this.tabledata.length;k++){
          if(this.tabledata[k].rowId==i && this.tabledata[k].columnId==j){
            totalMin+=this.tabledata[k].boxValue;
          }
        }
        this.totalColVal[t]={rowId:i,columnId:j,boxValue:totalMin}
        t++;
        if(t%this.status.length==0){
          let totalWorkStop=0;
          for(let s=0;s<this.status.length;s++){
            totalWorkStop +=this.totalColVal[(t-this.status.length+s)].boxValue;
          }
          this.totalWorkStopsRow[i-1]=totalWorkStop;
          totalWorkStop=0;
        }
        totalMin=0;
      }

    }
    this.calculateTotalRowValue();
  }

}
