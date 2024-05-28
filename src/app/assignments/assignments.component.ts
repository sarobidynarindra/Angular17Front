import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { RenduDirective } from '../shared/rendu.directive';
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentsService } from '../shared/assignments.service';
import { RouterLink } from '@angular/router';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { AssignmentDialogComponent } from '../assignment-dialog/assignment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    RouterLink,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSliderModule,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    MatCardModule,
    MatDialogModule,
    DragDropModule,
  ],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments';
  page = 1;
  limit = 3;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  totalDocsRendu!: number;
  totalPagesRendu!: number;
  nextPageRendu!: number;
  prevPageRendu!: number;
  hasNextPageRendu!: boolean;
  hasPrevPageRendu!: boolean;

  displayedColumns: string[] = ['Listes des assignments non rendu', 'Listes des assignments rendus'];
  assignments: Assignment[] = [];
  assignmentsRendu: Assignment[] = [];

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  constructor(private assignmentsService: AssignmentsService,
    private ngZone: NgZone, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  ngOnInit() {
    this.getAssignmentsFromServiceRenduFalse();
    this.getAssignmentsFromServiceRenduTrue();
    console.log("toto");
  }

  ngAfterViewInit() {
    console.log(' ----- after view init ----');
    if (!this.scroller) return;

    this.scroller
      .elementScrolled()
      .pipe(
        tap(() => { }),
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 100),
        throttleTime(200)
      )
      .subscribe(() => {
        console.log('On demande de nouveaux assignments');
        console.log('je CHARGE DE NOUVELLES DONNEES page = ' + this.page);
        this.ngZone.run(() => {
          if (!this.hasNextPage) return;
          this.page = this.nextPage;
          this.getAssignmentsFromServicePourScrollInfini();
        });
      });
  }

  getAssignmentsFromServiceRenduFalse() {
    this.assignmentsService
      .getAssignmentAvecRenduFalsePagine(this.page, this.limit)
      .subscribe((data) => {
        console.log('Données arrivées');
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
      });
    console.log('Requête envoyée');
  }

  getAssignmentsFromServiceRenduTrue() {
    this.assignmentsService
      .getAssignmentAvecRenduTruePagine(this.page, this.limit)
      .subscribe((data) => {
        console.log('Données arrivées');
        this.assignmentsRendu = data.docs;
        this.totalDocsRendu = data.totalDocs;
        this.totalPagesRendu = data.totalPages;
        this.nextPageRendu = data.nextPage;
        this.prevPageRendu = data.prevPage;
        this.hasNextPageRendu = data.hasNextPage;
        this.hasPrevPageRendu = data.hasPrevPage;
      });
    console.log('Requête envoyée');
  }

  getAssignmentsFromServicePourScrollInfini() {
    this.assignmentsService
      .getAssignmentsPagines(this.page, this.limit)
      .subscribe((data) => {
        console.log(data);
        this.assignments = [...this.assignments, ...data.docs];
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
      });
    console.log('Requête envoyée');
  }

  pagePrecedenteRendu() {
    this.page = this.prevPageRendu;
    this.getAssignmentsFromServiceRenduTrue();
  }

  pageSuivanteRendu() {
    this.page = this.nextPageRendu;
    this.getAssignmentsFromServiceRenduTrue();
  }

  premierePageRendu() {
    this.page = 1;
    this.getAssignmentsFromServiceRenduTrue();
  }

  dernierePageRendu() {
    this.page = this.totalPagesRendu;
    this.getAssignmentsFromServiceRenduTrue();
  }

  handlePageEventRendu(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignmentsFromServiceRenduTrue();
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignmentsFromServiceRenduFalse();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignmentsFromServiceRenduFalse();
  }

  premierePage() {
    this.page = 1;
    this.getAssignmentsFromServiceRenduFalse();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignmentsFromServiceRenduFalse();
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignmentsFromServiceRenduFalse();
  }

  onCardDragEnded(event: any, assignment: Assignment) {
    console.log('Card drag ended', event);
    this.openDialog(assignment);
  }

  openDialog(assignment: Assignment): void {
    const dialogRef = this.dialog.open(AssignmentDialogComponent, {
      width: '400px',
      data: { assignment } // Pass the assignment data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed with result: ', result);
        this.assignmentsService.updateAssignmentNoteRemarque(result).subscribe(updatedAssignment => {
          console.log('Assignment updated:', updatedAssignment);
          this.snackBar.open('Assignment updated successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          this.getAssignmentsFromServiceRenduFalse();
          this.getAssignmentsFromServiceRenduTrue();
        }, error => {
          console.error('Error updating assignment:', error);
          // Show error snackbar
          this.snackBar.open('Error updating assignment!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        });
      }
    });
  }
}