import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  Router,
  RouterLink,
  RouterModule,
  ActivatedRoute,
} from '@angular/router';
import { User } from '../../models/user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormService } from '../../services/form/form.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  imports: [NavbarComponent, RouterModule, RouterLink, ReactiveFormsModule],
})
export class FormComponent {
  users: User[] = [];
  usersForm!: FormGroup;
  userId: string | null = null;
  constructor(
    private toastService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private activatedRoute: ActivatedRoute
  ) {}
  // ngOnInit() {
  //   this.initializeForm();
  // }
  ngOnInit() {
    this.initializeForm();
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id']; // Get the user ID from route params
      if (this.userId) {
        this.formService.getUserById(this.userId).subscribe(user => {
          // Populate the form with user data
          this.usersForm.patchValue(user);
        });
      }
    });
  }

  initializeForm(): void {
    this.usersForm = this.formBuilder.group({
      id: [this.generateId(), Validators.required],
      name: ['', Validators.required],
      age: [null, Validators.required],
      dob: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }


  generateId(): string {
    return Math.random().toString(36).substring(2);
  }
  handleCancel() {
    this.router.navigateByUrl('');
  }
  handleSubmit() {
    // this.formService.pushData(this.usersForm.value).subscribe(() => {
    //   this.toastService.success(
    //     `Account with Name ${this.usersForm.value.name} Added Successfully`,
    //     'Added',
    //     {
    //       timeOut: 3000,
    //     }
    //   );
    //   this.router.navigate(['']);
    // });
    if (this.userId) {
      // Edit existing user
      this.formService.putData(this.userId, this.usersForm.value).subscribe(() => {
        this.toastService.success(`Account with Name : ${this.usersForm.value.name} Updated Successfully`, 'Updated', {
          timeOut: 3000,
        });
        this.router.navigate(['']);
      });
    } else {
      // Add new user
      this.formService.pushData(this.usersForm.value).subscribe(() => {
        this.toastService.success(`Account with Name :${this.usersForm.value.name} Added Successfully`, 'Added', {
          timeOut: 3000,
        });
        this.router.navigate(['']);
      });
    }
  }
}
