import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminPageService } from './admin-page.service';
declare var $: any;
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  newMovieForm!: FormGroup;
  title:any
  description:any
  programType:any
  movieList:any
  Movies: any = [];
  movie: any;
  submitted: boolean = false; 
  action: any = null;
  cartItems: any = [];
  searchMovie: any;

  constructor(private formBuilder: FormBuilder, private adminPageService : AdminPageService) { }

  ngOnInit(): void {
    this.newMovieForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      programType: ['', Validators.required],
      releaseYear: ['', Validators.required],
      poster: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
    this.getMovies();
  }

  get f() {
    return this.newMovieForm.controls;
  }

  addNewMovie() {
    this.submitted = false;
    $("#AddNewMovie").modal("show");
    this.action = "";
    this.newMovieForm.reset();
  }

  getMovies() {
    this.Movies = this.adminPageService.getAllMovies();
  }

  onSubmit(form: any, action: any) {
    if(this.action === 'update') {
      this.updateMovieDetails();
    } else {
      this.onCreateNewMovie();
  }
  }
  
  onCreateNewMovie() {
    this.submitted = true;
    if(this.newMovieForm.valid) {
      this.adminPageService.addNewMovie(this.newMovieForm.value).subscribe((resp:any) => {
        $("#AddNewMovie").modal("hide");
        this.newMovieForm.reset();
        Swal.fire({
         position: 'center',
         icon: 'success',
         title: 'Your data has been saved',
         showConfirmButton: false,
         timer: 1500
       });
       this.getMovies();
     }, errorMessage => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Unable to add movie',
          showConfirmButton: false,
          timer: 1500
        });
        $("#AddNewMovie").modal("hide");
      });
    }
}

updateMovieDetails() {
  if(this.newMovieForm.valid) {
  this.adminPageService.updateMovie(this.newMovieForm.value).subscribe((resp:any) => {
    $("#AddNewMovie").modal("hide");
    this.newMovieForm.reset();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your data has been saved',
      showConfirmButton: false,
      timer: 1500
    });
    this.getMovies();
 }, errorMessage => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Unable to update movie data',
      showConfirmButton: false,
      timer: 1500
    });
    $("#AddNewMovie").modal("hide");
  });
}
}

deleteMovie(id: any) {
  this.adminPageService.deleteMovie(id).subscribe((resp:any) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Movie has been deleted',
      showConfirmButton: false,
      timer: 1500
    });
    this.getMovies();
 }, errorMessage => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Unable to delete movie',
      showConfirmButton: false,
      timer: 3000
    });
});
}

getMovieById(id: any) {
  this.adminPageService.getMovie(id).subscribe((resp:any) => {
    this.movie = resp;
    this.newMovieForm.patchValue(this.movie);
    $("#AddNewMovie").modal("show");
    this.action = "update";
 });
}

buyMovie(id: any) {
  this.adminPageService.getMovie(id).subscribe((resp:any) => {
    this.cartItems.push(resp);
  })
}

viewCart() {
  $("#cart").modal("show");
}

}
