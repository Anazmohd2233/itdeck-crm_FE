// location.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private checkInSource = new Subject<void>();
  private checkOutSource = new Subject<void>();

  checkIn$ = this.checkInSource.asObservable();
  checkOut$ = this.checkOutSource.asObservable();

  triggerCheckIn() {
    this.checkInSource.next();
  }

  triggerCheckOut() {
    this.checkOutSource.next();
  }
}
