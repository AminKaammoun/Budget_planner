import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { TransactionService } from 'src/Services/transaction.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);

  currentMonth !: string;
  currentYear !: number;
  totalAmount !: number;
  constructor(private dataService: TransactionService) { }

  ngOnInit(): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-based in JavaScript
    const currentYear = currentDate.getFullYear();

    this.dataService.getSumOfMonthlyAmount(currentMonth, currentYear)
    .subscribe(totalAmount => {
      this.totalAmount = totalAmount;
    });
  }

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { img: 'income-header-image',subtitle : 'Card 1',title: 'Card 1', cols: 1, rows: 1 },
          { img: 'income-header-image',subtitle : 'positive',title: 'Income', cols: 1, rows: 1 },
          { img: 'income-header-image',subtitle : 'Card 1',title: 'Card 3', cols: 1, rows: 1 },
          { img: 'expense-header-image',subtitle : 'negative',title: 'Expense', cols: 1, rows: 1 }
        ];
      }

      return [
        { img: 'income-header-image',subtitle : 'Card 1',title: 'Card 1', cols: 2, rows: 1 },
        { img: 'income-header-image',subtitle : 'positive',title: 'Income', cols: 1, rows: 1 },
        { img: 'income-header-image',subtitle : 'Card 1',title: 'Card 3', cols: 1, rows: 2 },
        { img: 'expense-header-image',subtitle : 'negative',title: 'Expense', cols: 1, rows: 1 }
      ];
    })
  );

  getCurrentMonth(): string {
    // Get the current month as a string
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    return months[date.getMonth()];
  }
}

