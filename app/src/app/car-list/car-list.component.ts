import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Car } from '../models/Car';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  public loading = true;
  public cars: Car[];
  public error: string;
  public filters;

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.getFilters()
      .pipe(
        mergeMap(filters => {
          this.filters = filters;
          return this.carService.getCarList();
        })
      )
      .subscribe((cars: Car[]) => {
        this.cars = cars;
        this.loading = false;
      },
      (error) => {
        this.error = error.message;
        this.loading = false;
      });
  }

  filterValues(type, value) {
    this.loading = true;
    this.carService.getFilteredCarList(type, value)
      .subscribe((cars: Car[]) => {
        this.cars = cars;
        this.loading = false;
      },
      (error) => {
        this.error = error.message;
        this.loading = false;
      });
  }
}
