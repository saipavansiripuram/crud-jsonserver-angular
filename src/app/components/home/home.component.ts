import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormService } from '../../services/form/form.service';
import { User } from '../../models/user';
import { NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [NavbarComponent, NgFor, RouterModule],
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  constructor(
    private formService: FormService,
    private toastService: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.formService.getData().subscribe((data: any) => {
      this.users = data;
    });
  }
  deleteData(id: any) {
    this.formService.deleteData(id).subscribe(() => {
      this.toastService.error(
        `Account with Id:${id} Deleted Successfully`,
        'Deleted',
        {
          timeOut: 3000,
        }
      );
      console.log(`User with ID ${id} deleted successfully`);
      this.fetchData();
    });
  }

  editData(user: any) {
    this.router.navigate(['/form', user.id]);
  }
}
