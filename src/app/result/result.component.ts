import { Component, OnInit, ViewChild } from '@angular/core';


import { TokenStorageService } from '../_services/token-storage.service';
import { CountVotesService } from '../_services/count-votes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PollService } from 'src/app/_services/poll.service';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { Poll } from '../models/poll.model';
import { Votes } from '../models/votes.model';


import {
  ApexAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTheme,
  ApexTitleSubtitle,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
  labels: any;
  responsive: ApexResponsive[];

};



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptionsPie: Partial<ChartOptions> | any;
  public chartOptionsTree: Partial<ChartOptions> | any;

  showChart = 0;

  arvore = [] = [];
  names = [];
  votos = [];
  result: any;
  numResults: Votes = new Votes();
  numberVoters: Votes = new Votes();
  abst: any;
  currentPoll: Poll = new Poll();
  votosBranco: any;
  votados = 0;


  constructor(
    private countVotes: CountVotesService,
    private route: ActivatedRoute,
    private pollService: PollService) {
  }


  ngOnInit(): void {
    this.getPoll(this.route.snapshot.paramMap.get('id'));
    this.retrieveResults();
    this.retrieveNumberOfResults();
    this.retrieveAllVoters();
  }



  getPoll(id: any): void {
    this.pollService.get(id).subscribe(
      (data) => {
        this.currentPoll = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  retrieveResults(): void {
    this.countVotes.getAll(this.route.snapshot.paramMap.get('id')).subscribe(
      (data) => {
        const results = [] as any;
        const votosAr = [] as any;
        const objArvore = [] as any;
        var array = [];
        this.result = data;
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          this.votados = data[i].votes + this.votados;
          if (data[i].votes > 0) {
            results.push(data[i].name);
            votosAr.push(data[i].votes);

            var obj = {
              x: data[i].name,
              y: data[i].votes
            }

            objArvore.push(obj);
          }
        }

        this.showChart = results.length;

        this.arvore = objArvore;
        this.names = results;
        this.votos = votosAr;

        this.initChart();
        this.initPiechart();
        this.treeChartInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  retrieveNumberOfResults(): void {
    this.countVotes.getNumberOfVotes(this.route.snapshot.paramMap.get('id')).subscribe(
      (data) => {
        this.numResults = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  retrieveAllVoters(): void {
    this.countVotes.getAllVoters(this.route.snapshot.paramMap.get('id')).subscribe(
      (data) => {
        const result = [] as any;

        this.numberVoters = data;
        this.abst = this.numberVoters.allVoters - this.numResults.nVotes;
        this.votosBranco = this.numResults.nVotes - this.votados;

        this.abst = (this.abst / this.numberVoters.allVoters) * 100;

      },
      (error) => {
        console.log(error);
      }
    );
  }

  initChart() {
    this.chartOptions = {
      series: [
        { name: "",
          data: this.votos
        },

      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 10
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: this.names
      },
      yaxis: {
        title: {
          text: "Votos"
        }
      },

      fill: {
        opacity: 1,
        colors: [
          "#20d489",

        ],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " votos";
          }
        }
      }
    };
  }

  initPiechart() {
    this.chartOptionsPie = {
      series: this.votos,
      chart: {
        type: "donut"
      },
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        }
      },
      labels: this.names,
      
    };
  }

  treeChartInit() {
    this.chartOptionsTree = {
      series: [
        {
          data: this.arvore,
        }
      ],

      chart: {
        height: 350,
        type: "treemap"
      },
      
      colors: [
        "#3B93A5",
        "#F7B844",
        "#ADD8C7",
        "#EC3C65",
        "#CDD7B6",
        "#C1F666",
        "#D43F97",
        "#1E5D8C",
        "#421243",
        "#7F94B0",
        "#EF6537",
        "#C0ADDB"
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false
        }
      }
    };
  }
  generatepdf() {

    const doc = new jsPDF("p", "mm", "a4");

    var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAnCAYAAACout71AAAABmJLR0QA/wD/AP+gvaeTAAAD4UlEQVRoge3YXYiWRRQH8N+uta5rlJkXZUQJFmUQlXgRddEHFVkWlBQFddMHZlAXFRh9LdSFEXUZFUKRF6FCGRQE9h1BWkKK0JcWSmXuttmmLtbabhfzvvns7MzzPu/uRkLPHwbed87/nDNz5pkzZ4YaNWrUqFGjRo0aNf5FdGAGuhOyQ9hXotvd0I3xF36f/NCOPNyM0UQbwFElei9n9FZP8fg2Y0fUvpliH5UwE/ulJ31RRqcTP2d0rp3i8Q0kfByaYh+VsS4xmFGszPAvyPAHpbfxZHBEBKq5tdZhaUK+BCsS/Vdn7K3HwRJf52EuZmE3tuO7DP8s9Ehv/w4sbPz+AXsyNk7DfJyI37AL2zCS4bdEj/z2m5/gb8lwr0lwj8ezwmRSOptwW0Lv8ww/bvcndG/AJxn+TjxuEl/+mozh+yLeKcKKxLy9mB5xLxRWvMqE1+OYgu5EAjUNqyrqbcG8irEZg6UZg+9EvOUZ3ksR71T0Vxx0s70ubCsmFqgn2/S3VdhNbaFHqJtiY38KOaWJtzJOr4rsvd/moJvtpoZ+u4FaINRw7fp7pM04gVczxm5syGfgQEL+K7oKds4tGVg/NmI4I/+gYeM5bBAWKuaMNGQbHD6EnsnYe0VYxIeE0zKWfy+UO23h+hJnhBopJV8V2bk3w/tKSO6EkzPFGTE2V1UtD7YleINYJJyQC4UFSvlMHVil6G4Yjw01q/QXM46ujOw8neHFpcbXGd6CAqdqoFLjrtoubhGXcZ/cQbyZ4M0WiszFCdleIR8VMSvBg1+i/wMZXk4/h05jv8J2cWwrQqqYW4tbEv2P4uRE/2tCHinix4y/swu/p+P0DK+oP5qQd0T/R4Q67aSo/1s8nPFRxMZWhFSg3hY+4+Oi/sszNtYk+rZnuHfiM3yBBzEnwdlvbKD24YSI04nbG3Z24yfhshwHai4+Fu6li3Fdwt8B4WZCOJDuEebaI1zIn0JfZj5Wq7a3+6WDPQdDFW3E7YXI1nst+L0NXq6+24OP8EdGvrah3yHsjli+y/iF+gdLKk7q+ZwBPDGBIA0Jd7wiVlQMVPP+2I6/YaGUgTNKeHflJtkl1EatHF1WEqhpQp3TzsBvTdiZ3SIAvQXuJdK1Uq4Vq/rzS3gPlMwz+zDXbH3KH/YI5cZKrSvmPun80cQi+Ttjb8S9VMhxZf4GcUek14UvE9whnFk2ySuMf1ksttxbVQrnCJXzVuFLHRYm/i7udrgILcNMLBNyyqfCK+cO4y/thG24HB8KiX5EeJ7ejMeMT/pNzMMbwoEy3OCX7ZoaOPq/HkCNGjVq1KhRo0aN/xH+Btg2fmKXhzKYAAAAAElFTkSuQmCC'

    doc.addImage(logo, 'png', 16 , 15, 10, 5);
    doc.setFontSize(8);
    doc.setTextColor(59, 74, 84);
    doc.text("Campus do IPCA - Lugar do Aldão",16, 25);
    doc.text("4750-810 Vila Frescainha (São Martinho)",16, 28);

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('No dia ' + this.currentPoll.end_date + ' deu o fim da eleição de delegados ' + this.currentPoll.name + ' com a seguinte lista ',16,40);
    doc.text("de votos.",16, 45);

    (doc as any).autoTable({
      body: this.result,
      theme: 'plain', 
      startY: 50,  
      didDrawCell: data => {
        console.log(data.column.index)
      }
    })

    doc.output('dataurlnewwindow')
    //doc.save( this.currentPoll.name + "_Ata.pdf");


  }
}
