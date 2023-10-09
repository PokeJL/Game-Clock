import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { battery } from "power";
import { charger } from "power";

// Update the clock every minute
clock.granularity = "minutes";
clock.granularity = "seconds";

// Get elements
const digit1 = document.getElementById("digit1");
const digit2 = document.getElementById("digit2");
const digit3 = document.getElementById("digit3");
const digit4 = document.getElementById("digit4");
const sec1 = document.getElementById("sec1");
const sec2 = document.getElementById("sec2");
const today = document.getElementById("today");
const month = document.getElementById("month");
const bat = document.getElementById("bat");
const year1 = document.getElementById("year1");
const year2 = document.getElementById("year2");
const day1 = document.getElementById("day1");
const day2 = document.getElementById("day2");

clock.ontick = (evt) => {
  let hours = evt.date.getHours();
  let mins = ("0" + evt.date.getMinutes()).slice(-2);
  let mon = evt.date.getMonth() + 1;
  let year = ("0" + evt.date.getYear()).slice(-2);
  let date = ("00" + evt.date.getDate()).slice(-2);
  let sec = ("0" + evt.date.getSeconds()).slice(-2);
  
  if (preferences.clockDisplay === "12h") {
    if (hours > 12)
      hours = hours - 12;
    else if (hours === 0)
      hours = hours + 12;
  }
  
  hours = ("0" + hours).slice(-2);
  
  digit1.href = "time/" + hours.slice(0, 1) + ".png";
  digit2.href = "time/" + hours.slice(1, 2) + ".png";
  digit3.href = "time/" + mins.slice(0, 1) + ".png";
  digit4.href = "time/" + mins.slice(1, 2) + ".png";
  
  sec1.href = "time/" + sec.slice(0, 1) + ".png";
  sec2.href = "time/" + sec.slice(1, 2) + ".png";
  
  today.href = "day/" + evt.date.getDay() + ".png";
  month.href = "month/" + mon + ".png";
  
  year1.href = "digits/" + year.slice(0, 1) + ".png";
  year2.href = "digits/" + year.slice(1, 2) + ".png";
  
  day1.href = "digits/" + date.slice(0, 1) + ".png";
  day2.href = "digits/" + date.slice(1, 2) + ".png";
};

battery.onchange = (charger, evt) => {
  if(Math.floor(battery.chargeLevel) > 75)
    bat.href = "battery/Full.png";
  else if(Math.floor(battery.chargeLevel) > 50)
    bat.href = "battery/3Qs.png";
  else if(Math.floor(battery.chargeLevel) > 25)
    bat.href = "battery/2Qs.png";
  else if(Math.floor(battery.chargeLevel) > 10)
    bat.href = "battery/1Q.png";
  else
    bat.href = "battery/Dead.png";
}