import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, forkJoin } from 'rxjs';
import { tap, finalize, map } from 'rxjs/operators';
import { TransactionService } from 'src/Services/transaction.service';
import { Transaction } from 'src/Modeles/Transaction';
import { CategoryService } from 'src/Services/category.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Category } from 'src/Modeles/Category';
import { Goal } from 'src/Modeles/Goal';
import { GoalService } from 'src/Services/GoalService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chartData: ChartDataset[] = [];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {};

  chartData1: ChartDataset[] = [];
  chartLabels1: string[] = [];
  chartOptions1: ChartOptions = {};


  chartData2: ChartDataset[] = [];
  chartLabels2: string[] = [];
  chartOptions2: ChartOptions = {};


  chartDataGoal : ChartDataset[] = [];
  chartLabelsGoal: string[]  = ['Collected', 'Remaining'];

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  monthTotals: { [key: string]: { income: number; expense: number } } = {};
  savings: { [key: string]: { saving: number } } = {};
  trans: { [key: string]: { number: number } } = {};
  currentMonth: string = '';
  
  totalIncome: number = 0;
  totalExpense: number = 0;
  expenseByCategory: { [key: string]: {expense: number } } = {};

  categories !: Category[];
  numberOfTransaction : number = 0;
  numberOfCategories : number = 0;
  numberOfCurrentMonthTransactions : number = 0;

  goals !: Goal[];

  sliderValue: number = 50;
  constructor(
    private dataService: TransactionService,
    private categoryService: CategoryService,
    private breakpointObserver: BreakpointObserver,
    private goalService : GoalService
  ) { 

 

  }

  ngOnInit(): void {
    this.currentMonth = this.getCurrentMonth();
    for (let month of this.months) {
      if (month === this.currentMonth) {
        this.trans[month] = { number: 0 };
        break;
      } else {
        this.trans[month] = { number: 0 };
      }
    };
    this.getAllCategories();
    this.getAllTransactions();
    this.getAllGoals();
    // Fetch transactions for each month and calculate totals
    const observables = this.months.map(month => this.filterTransactionsByMonth(month,'yes'));
    this.months.map(month => this.getNumberOfTransactions(month));
    forkJoin(observables).subscribe({
      next: () => {
        this.getAllMonthsIncome();
        this.getAllMonthsExpense();
        this.pieChart();
        this.lineChart();
        this.lineChart1();
        this.donoughtChart();
        this.getNumberOfTransactionsCurrentMonth();
        
      },
      error: (err) => {
        console.error('Error processing transactions:', err);
      }
    });

    this.configureChartOptions();
  }

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          
          { img: 'income-header-image',subtitle : 'positive',title: 'Income', cols: 1, rows: 1 },
          { img: 'pie-header-image',subtitle : 'pie chart for expense',title: 'Expense By Category'+" ("+this.currentMonth+")", cols: 1, rows: 1 },
          { img: 'expense-header-image',subtitle : 'negative',title: 'Expense', cols: 1, rows: 1 }
        ];
      }

      return [
       
        { img: 'income-header-image',subtitle : 'positive',title: 'Income', cols: 1, rows: 1 },
        { img: 'pie-header-image',subtitle : 'pie chart for expense',title: 'Expense By Category'+" ("+this.currentMonth+")", cols: 1, rows: 2 },
        { img: 'expense-header-image',subtitle : 'negative',title: 'Expense', cols: 1, rows: 1 }
      ];
    })
  );

  cards1 = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          
          { img: 'goal-header-image',subtitle : 'Achieve your targets',title: 'Goals', cols: 1, rows: 1 },
      
          { img: 'trans-header-image',subtitle : 'pie chart for expense',title: 'Number of transactions per month', cols: 1, rows: 1 },
         
        ];
      }

      return [
       
        { img: 'goal-header-image',subtitle : 'Achieve your targets',title: 'Goals', cols: 1, rows: 3 },
      
        { img: 'trans-header-image',subtitle : 'transactions per month',title: 'Number of transactions per month', cols: 1, rows: 2 },
       
      ];
    })
  );


getAllTransactions(){
  this.dataService.GetAll().subscribe((r)=>{
    this.numberOfTransaction = r.length;
  })
}

getAllCategories(){
  this.categoryService.GetAll().subscribe((r)=>{
    this.numberOfCategories = r.length;
  })
}
getAllGoals(){
  this.goalService.GetAll().subscribe((r)=>{
   this.goals = r;
  })
}
getChartDataSet(progress: number, total : number) {
  return [
    {
      data: [progress, total - progress],
      backgroundColor: ['#50C878', '#eeeeee'], // Colors for the segments
      hoverBackgroundColor: ['#228B22', '#efefefef'],
      text: `${progress}%` // Custom text for the doughnut hole
    }
  ];
}
getNumberOfTransactionsCurrentMonth(): void {
  this.dataService.GetAll().pipe(
    map((transactions: Transaction[]) => {
      const currentMonthTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.createdDate);
        const transactionMonth = transactionDate.toLocaleString('en-US', { month: 'long' });
        return transactionMonth.toLowerCase() === this.currentMonth.toLowerCase();
      });
      return currentMonthTransactions.length;
    })
  ).subscribe(
    (count: number) => {
      this.numberOfCurrentMonthTransactions = count;
      console.log(`Number of transactions in ${this.currentMonth}: ${count}`);
    },
    (error) => {
      console.error('Error fetching transactions:', error);
    }
  );
}


getNumberOfTransactions(month : string): void {
  this.dataService.GetAll().pipe(
    map((transactions: Transaction[]) => {
      const currentMonthTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.createdDate);
        const transactionMonth = transactionDate.toLocaleString('en-US', { month: 'long' });
        return transactionMonth.toLowerCase() === month.toLowerCase();
      });
     
      return currentMonthTransactions.length;
    })
  ).subscribe(
    (count: number) => {
      this.trans[month].number=count;
      console.log(`Number of transactions in ${this.currentMonth}: ${count}`);
    },
    (error) => {
      console.error('Error fetching transactions:', error);
    }
  );
}


  getCurrentMonth(): string {
    const date = new Date();
    return this.months[date.getMonth()];
  }
  getPreviousMonth(x:number): string { 
    
    const date = new Date();
  
    return this.months[date.getMonth()+x];
  }
  
  filterTransactionsByMonth(targetMonth: string, caller: string): Observable<Transaction[]> {
   
    return this.dataService.GetAll().pipe(
      
      map((transactions: Transaction[]) => {
        transactions.forEach(transaction => {
          if (transaction.createdDate) {
            const date = new Date(transaction.createdDate);
            const monthName = this.months[date.getMonth()];

            if (monthName.toLowerCase() === targetMonth.toLowerCase()) {
              if (!this.monthTotals[targetMonth]) {
                this.monthTotals[targetMonth] = { income: 0, expense: 0 };
              }
             

              if (transaction.type === 'Income' && caller === 'yes') {
                this.monthTotals[targetMonth].income += transaction.amount;
                
              } else if (transaction.type === 'Expense' && caller === 'yes') {
                this.monthTotals[targetMonth].expense += transaction.amount;
                
              }
              this.savings[targetMonth] = { saving: this.monthTotals[targetMonth].income - this.monthTotals[targetMonth].expense };
          
            }
          }
        });

        return transactions.filter(transaction => {
         
          const date = new Date(transaction.createdDate);
          const monthName = this.months[date.getMonth()];
          //this.trans["monthName"].number=this.trans["monthName"].number+1;
          return monthName.toLowerCase() === targetMonth.toLowerCase();
        });
      }),
      finalize(() => {
        console.log(`Transactions processed for ${targetMonth}`);
      })
    );
  }

  getAllMonthsIncome(): void {
    this.totalIncome = 0;



  for (let month in this.monthTotals) {
    if (this.monthTotals.hasOwnProperty(month)) {

      this.totalIncome += this.monthTotals[month].income;
    }
  }
  }

  getAllMonthsExpense(): void {
    this.totalExpense = 0;

  for (let month in this.monthTotals) {
    if (this.monthTotals.hasOwnProperty(month)) {

      this.totalExpense += this.monthTotals[month].expense;
    }
  }
  }

  getExpenseByCategory(category: string): Observable<number> {
    return this.filterTransactionsByMonth(this.getCurrentMonth(),'no').pipe(
      map((transactions: Transaction[]) => {
        const totalExpense = transactions
          .filter(transaction => transaction.category === category && transaction.type === 'Expense')
          .reduce((sum, transaction) => sum + transaction.amount, 0);

        if (!this.expenseByCategory[category]) {
          this.expenseByCategory[category] = { expense: 0 };
        }
        this.expenseByCategory[category].expense = totalExpense;

        return totalExpense;
      })
    );
  }

  pieChart(): void {
    this.categoryService.GetAll().subscribe((categories) => {
      this.categories = categories;
      const observables = categories.map(category => this.getExpenseByCategory(category.name));

      forkJoin(observables).subscribe((expenses: number[]) => {
        this.chartLabels = categories.map(category => category.name);
        this.chartLabels = this.chartLabels.filter(label => label !== 'Salary');

        this.chartData = [
          { data: expenses, 
            label: '$ in millions' 
          }];
      }, (error) => {
        console.error('Error fetching expenses:', error);
      });
    });
  }

  donoughtChart(): void {
    this.chartDataGoal = [
      { data: [5632,4368], 
        label: '$ in millions' ,
        backgroundColor: ['#50C878', '#eeeeee'], // Colors for the segments
        hoverBackgroundColor: ['#7CFC00', '#efefefef']
      }];
  } 


lineChart(): void {
  this.chartLabels1 = this.months;
  this.chartData1 = [
    { data: Object.values(this.savings).map(record => record.saving), 
      label: 'Savings' 
    },
    { data: Object.values(this.monthTotals).map(record => record.income), 
      label: 'Income' 
    },
    { data: Object.values(this.monthTotals).map(record => record.expense), 
      label: 'Expense' 
    }
 
  ];
}

lineChart1(): void {
  this.chartLabels2 = this.months;
  this.chartData2 = [
    { data: Object.values(this.trans).map(record => record.number), 
      label: 'Transactions' 
    },
 
  ];
}



  configureChartOptions(): void {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false // Adjust as needed
    };
  }

}
