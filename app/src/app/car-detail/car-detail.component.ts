import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../car.service';
import { Car } from '../models/Car';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {

  public car: Car;
  public error: string;
  public loading = true;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.carService.getCar(id)
      .subscribe((car: Car) => {
        this.car = car;
        this.loading = false;
      },
      (error) => {
        this.error = error.message;
        this.loading = false;
      }
      );
  }

}
