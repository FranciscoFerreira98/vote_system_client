import { Component, OnInit, ViewChild } from '@angular/core';


import { TokenStorageService } from '../_services/token-storage.service';
import { CountVotesService } from '../_services/count-votes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PollService } from 'src/app/_services/poll.service';
import { jsPDF } from "jspdf";
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

    var element = document.getElementById('div');

  }
}
