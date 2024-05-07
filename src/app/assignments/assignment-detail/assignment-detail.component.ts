import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, RouterLink,
    MatButtonModule, MatCardModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis!: Assignment | undefined;

  constructor(private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    localStorage.getItem('isAuthenticated');
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    const id = this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment;
      });
    console.log("admin sa tsy " + this.isAuthenticated());

  }

  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;
      this.assignmentsService.updateAssignment(this.assignmentTransmis)
        .subscribe(message => {
          console.log(message);
          this.router.navigate(['/home']);
        });
    }
  }

  onDelete() {
    // on va directement utiliser le service
    if (this.assignmentTransmis) {
      this.assignmentsService.deleteAssignment(this.assignmentTransmis)
        .subscribe(message => {
          console.log(message);
          // on va cacher la vue de detail en mettant assignmentTransmis à undefined
          this.assignmentTransmis = undefined;
          // on navigue vers la liste des assignments
          this.router.navigate(['/home']);
        });
    }
  }
  isAuthenticated(): boolean {
    return this.authService.getIsAuthenticated();
  }
}
