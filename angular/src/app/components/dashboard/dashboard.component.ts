import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CAROUSEL_DATA_ITEMS } from '../carousel/carousel.const';
import { ICarouselItem } from '../carousel/Icarousel-item.metadata';
import * as Hammer from 'hammerjs';
import { Router } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', './dashboard.component.less', './dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public carouselData: ICarouselItem[] = CAROUSEL_DATA_ITEMS;

  constructor(private auth: AuthenticationService, private router: Router) {

  }

  user: any;
  ngOnInit(): void {
    /* Inicio */
    const self = this; 

    $(document).ready(function () {
      if ($(".container_carru").html() != null) {
        var objects = $(".container_carru #items img");
        var items = $(".container_carru #items img").length - 1;
        
        var i = 0;
        $(".container_carru #items img").each(function (index:any) {
          if (i == 0) {
            $(self).addClass('img_left');
          } else if (i == 1) {
            $(self).addClass('img_center');
          } else if (i == 2) {
            $(self).addClass('img_rigth');
          };
          i++;
        });
        var dataimg_Cen = 1;
        var dataimg_left: any;
        var dataimg_rigth:any;
        $("#arrowleft").on("click", function (event:any) {
          $(".container_carru #items img").attr('class', '');
          if (dataimg_Cen == 0) {
            dataimg_left = items;
          } else {
            dataimg_left = dataimg_Cen - 1;
          };
          if (dataimg_left == 0) {
            dataimg_rigth = items;
          } else {
            dataimg_rigth = dataimg_left - 1;
          };
          //center

          const img_center = $(objects[dataimg_Cen]);
          img_center.addClass('animaterigthR');
          img_center.addClass("img_rigth");
          //left 
          const img_left = $(objects[dataimg_left]);
          img_left.addClass("animaterigthC");
          img_left.addClass("img_center");
          //rigght
          const img_rigth = $(objects[dataimg_rigth]);
          img_rigth.addClass("animaterigthL");
          img_rigth.addClass("img_left");
          if (dataimg_Cen == 0) {
            dataimg_Cen = items;
          } else {
            dataimg_Cen = dataimg_Cen - 1;
          };
        });
        //izquierdo
        $("#arrowrigth").on("click", function (event:any) {
          $(".container_carru #items img").attr('class', '');
          if (dataimg_Cen == items) {
            dataimg_rigth = 0;
          } else {
            dataimg_rigth = dataimg_Cen + 1;
          };
          if (dataimg_rigth == items) {
            dataimg_left = 0;
          } else {
            dataimg_left = dataimg_rigth + 1;
          };
          //center
          const img_center = $(objects[dataimg_Cen]);
          img_center.addClass('animateleftL');
          img_center.addClass("img_left");
          // //  //left 
          const img_left = $(objects[dataimg_left]);
          img_left.addClass("animateleftR");
          img_left.addClass("img_rigth");
          // // // //rigght
          const img_rigth = $(objects[dataimg_rigth]);
          img_rigth.addClass("animateleftC");
          img_rigth.addClass("img_center");
          //
          if (dataimg_Cen == items) {
            dataimg_Cen = 0;
          } else {
            dataimg_Cen = dataimg_Cen + 1;
          };
        });
        //sweet
        var myElement:any = document.getElementsByClassName('container_carru')[0];
       
         var mc = new Hammer(myElement) ;
        mc.on("swipeleft", function (ev:any) {
          $("#arrowrigth").trigger("click");
        });
        mc.on("swiperight", function (ev:any) {
          $("#arrowleft").trigger("click");
        }); 
      }
    });

    // Check status
    this.auth.status().subscribe((res) => {
      console.log(res);
    })
    this.auth.user().subscribe((res) => {
      this.user = res;
    }, (err) => {
      console.log(err);
    })
  }

  chachagui(){
    this.router.navigate(['chachagui']);  
  }
}

