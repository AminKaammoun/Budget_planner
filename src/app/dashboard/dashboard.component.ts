import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { TransactionService } from 'src/Services/transaction.service';
import { Transaction } from 'src/Modeles/Transaction';
import { forkJoin } from 'rxjs';
import { map, switchMap, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);

  transactions !: Transaction[] ;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  monthTotals: { [key: string]: { income: number; expense: number } } = {};
  currentMonth !: string;
  totalIncome !: number;
  totalExpense !: number;

  constructor(private dataService: TransactionService) { }

  ngOnInit(): void {
    const observables = this.months.map(month => this.filterTransactionsByMonth(month));

    
    forkJoin(observables).subscribe({
      next: () => {
     
        this.getAllMonthsIncome();
        this.getAllMonthsExpense();
      },
      error: (err) => {
        console.error('Error processing transactions:', err);
      }
    });

    this.currentMonth = this.getCurrentMonth();
  }


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
   
  
    const date = new Date();
  
    return this.months[date.getMonth()];
  }

  getPreviousMonth(x:number): string {
    
    const date = new Date();
  
    return this.months[date.getMonth()+x];
  }


 getAllMonthsIncome(): void{
  this.totalIncome = 0;
  
  
  
  for (let month in this.monthTotals) {
    if (this.monthTotals.hasOwnProperty(month)) {

      this.totalIncome += this.monthTotals[month].income;
    }
  }
 
}

getAllMonthsExpense(): void{
  this.totalExpense = 0;
  
  
  for (let month in this.monthTotals) {
    if (this.monthTotals.hasOwnProperty(month)) {
  
      this.totalExpense += this.monthTotals[month].expense;
    }
  }
 
}
 
 

filterTransactionsByMonth(targetMonth: string) {
  return this.dataService.GetAll().pipe(
    tap((data: Transaction[]) => {
  
      if (!this.monthTotals[targetMonth]) {
        this.monthTotals[targetMonth] = { income: 0, expense: 0 };
      }

      this.transactions = data.filter(transaction => {
        if (transaction.createdDate) {
          const date = new Date(transaction.createdDate);
          const monthName = this.months[date.getMonth()];

          if (monthName.toLowerCase() === targetMonth.toLowerCase()) {
         
            if (transaction.type === 'Income') {
              this.monthTotals[targetMonth].income += transaction.amount;
            } else {
              this.monthTotals[targetMonth].expense += transaction.amount;
            }
            return true;
          }
        }
        return false; 
      });
    }),
    finalize(() => {
      console.log(`Transactions processed for ${targetMonth}`);
    })
  );
}
}