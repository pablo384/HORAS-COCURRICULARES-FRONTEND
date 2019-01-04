import { Component, OnInit } from '@angular/core';
import { Subject,Subscription } from 'rxjs';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';

@Component({
  selector: 'app-list-estudiantes',
  templateUrl: './list-estudiantes.component.html',
  styleUrls: ['./list-estudiantes.component.css']
})
export class ListEstudiantesComponent implements OnInit {
	searchText;
  EstudianteSeleccionado;
  filteredEstudiantes:any[];
  Estudiantes:any[];
  cDatosSearch:string;
	estudiante:any[];
  public static returned: Subject<any> = new Subject();
  subc:Subscription;
  constructor(private _funtions: FuncionesService, private _peticiones :PeticionesService) {
    this.subc = ListEstudiantesComponent.returned.subscribe(res => {
      this.getEstudiante(this.cDatosSearch);
    });
   }

  ngOnInit() {
    this.getEstudiante("fffff");
  }

  ngOnDestroy(): void {
    this.subc.unsubscribe();
  }
   doThingFactory() {
    return (cDatos) => this.getEstudiante(cDatos);
  }


  search(event) {
    this.filteredEstudiantes = [];

    let searchKeyword = event.query.toLowerCase();
      this.Estudiantes.forEach(item => {
        //Object.values(item) => gives the list of all the property values of the 'item' object
        let propValueList = Object.values(item);
        for(let i=0;i<propValueList.length;i++)
        {
          if (propValueList[i]) {
            if (propValueList[i].toString().toLowerCase().indexOf(searchKeyword) > -1)
            {
              this.filteredEstudiantes.push(item);
              break;
            }
          }
        }
      });



    // for(let i = 0; i < this.Estudiantes.length; i++) {
    //     let brand = this.Estudiantes[i];
    //     console.log("filterProductos",event.query)
    //     if(brand["nombres"].toLowerCase().indexOf(event.query.toLowerCase()) == 0 || brand["matricula"].toLowerCase().indexOf(event.query.toLowerCase()) == 0 ) {
    //         this.filteredEstudiantes.push(brand);
    //     }
    // }
  }


  getEstudiante(cDatos){
  	let value = {}
  	// if( cDatos && (cDatos.length < 0) ){
  	// 	return;
  	// }
    this.cDatosSearch = cDatos;
    if (!isNaN(parseInt(cDatos)) && parseInt(cDatos)>0){
      if (cDatos.length == 16){
        value["carnet"] = cDatos;
      }else
        value["matricula"] = cDatos;
    }else{
      value["usuario"] = cDatos
    }
    let correcto = false;
    // console.log("getEstudiante",value)
    // if(value["usuario"] != undefined || value["matricula"] != undefined || value["carnet"]){
    //   correcto = true;
    // }
    // if(!correcto){
    //   return;
    // }
    console.log("getEstudiante",value)
  	this._peticiones.getEstudiante(value).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log("getEstudiante",response);
        if (response.info) {        
          // this.estudiante = response.data;
        	this.Estudiantes = response.data;
        }
      },
      error => {
        let resultado;
        if (error.error && error.status !== 0) {
          resultado = this._funtions.sacarText(error.error);
        } else {
          resultado = error.error.error;
        }
        console.log(error.error)
        this._funtions.Toast("error","Error",resultado);

        this._funtions.blockUIO().stop(); 
      }
    );
  }
}
