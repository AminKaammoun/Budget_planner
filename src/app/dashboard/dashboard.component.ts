import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { TransactionService } from 'src/Services/transaction.service';
import { Transaction } from 'src/Modeles/Transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);

 
  //currentMonthIncome : number = 0;
  //currentMonthExpense : number = 0;
  transactions !: Transaction[] ;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  monthTotals: { [key: string]: { income: number; expense: number } } = {};
  currentMonth !: string;


  constructor(private dataService: TransactionService) { }

  ngOnInit(): void {
    this.months.forEach(month => {
      this.filterTransactionsByMonth(month);
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

  getPrviousMonth(x:number): string {
    
    const date = new Date();
  
    return this.months[date.getMonth()+x];
  }

 

  filterTransactionsByMonth(targetMonth: string) {
    // Initialize month totals if not already present
    if (!this.monthTotals[targetMonth]) {
      this.monthTotals[targetMonth] = { income: 0, expense: 0 };
    }

    // Get all transactions from DataService
    this.dataService.GetAll().subscribe((data: Transaction[]) => {
      // Filter transactions for the specified month
      this.transactions = data.filter(transaction => {
        if (transaction.createdDate) {
          const date = new Date(transaction.createdDate);
          const monthName = this.months[date.getMonth()];

          // Check if the month matches the targetMonth
          if (monthName.toLowerCase() === targetMonth.toLowerCase()) {
            // Update month totals based on transaction type
            if (transaction.type === 'Income') {
              this.monthTotals[targetMonth].income += transaction.amount;
            } else {
              this.monthTotals[targetMonth].expense += transaction.amount;
            }
            return true; // Include transaction in filtered results
          }
        }
        return false; // Exclude transactions that do not match the month
      });

      console.log('Filtered Transactions:', this.transactions);
      console.log('Month Totals:', this.monthTotals);
    });
  }
}