import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { RestServiceService } from 'src/app/services/rest-service.service';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-colombia-data-table',
  templateUrl: './colombia-data-table.component.html',
  styleUrls: ['./colombia-data-table.component.css']
})
export class ColombiaDataTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  cities: any = [];
  headElements = ['ID', 'Fecha de notificación', 'Ciudad', 'Departamento',
    'Atención', 'Edad', 'Sexo', 'Tipo', 'Estado', 'Prosedencia', 'Fecha diagnostico'];

  searchText: string = '';
  previous: string;
  maxVisibleItems: number = 7;

  private loading = false;
  @ViewChild('colombiaDataTable') table: ElementRef;


  constructor(
    private restService: RestServiceService,
    private cdRef: ChangeDetectorRef
    ) {}

  // @HostListener('input') oninput() {
  //   this.mdbTablePagination.searchText = this.searchText;
  // }

  ngOnInit(): void {

    this.restService.getColombiaData();
    this.restService.colombiaData$.subscribe(res => {
      res.forEach(e => {
        if (!this.cities.includes(e.ciudad_municipio_nom)) {
          this.cities.push(e.ciudad_municipio_nom);
        }
      });
      this.cities.sort();
    });
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  getSelectedCity(city) {
    this.loading = false;
    this.mdbTable.setDataSource([]);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
    this.loading = false;
    this.restService.getCityData(city).subscribe(res => {
      res.forEach(row => {
        this.elements.push({
          id_caso: row.id_de_caso,
          fecha: row.fecha_de_notificaci_n,
          ciudad: row.ciudad_municipio_nom,
          departamento: row.departamento_nom,
          atencion: row.ubicacion,
          edad: row.edad,
          sexo: row.sexo,
          tipo: row.fuente_tipo_contagio,
          estado: row.estado,
          pais: row.pais_viajo_1_nom,
          diagnostico: row.fecha_diagnostico
        });
      });
      this.loading = false;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }

  data() {
    return this.restService.colombiaData$;
  }

  isLoading(): boolean {
    return this.loading;
  }

  /* DATATABLE FUNCTIONS */

  addNewRow() {
    this.mdbTable.addRow({
      id_caso: this.elements.length.toString(),
      fecha: 'fecha ' + this.elements.length,
      ciudad: 'ciudad ' + this.elements.length,
      departamento: 'dep ' + this.elements.length,
      atencion: 'at ' + this.elements.length,
      edad: 'ed ' + this.elements.length,
      sexo: 'sexo ' + this.elements.length,
      tipo: 'tip ' + this.elements.length,
      estado: 'est ' + this.elements.length,
      pais: 'pais ' + this.elements.length,
      diagnostico: 'diag ' + this.elements.length,
    });
    this.emitDataSourceChange();
  }

  addNewRowAfter() {
    this.mdbTable.addRowAfter(1, {id_caso: '2', first: 'Nowy', last: 'Row', handle: 'Kopytkowy'});
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
  }

  removeLastRow() {
    this.mdbTable.removeLastRow();
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  removeRow() {
    this.mdbTable.removeRow(1);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  searchItems() {
    this.mdbTablePagination.searchText = this.searchText;

    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  onRowCreate($event) {}

  onRowRemove($event) {}

}
