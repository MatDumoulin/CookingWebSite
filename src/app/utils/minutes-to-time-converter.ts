
// Converts a time that is in minutes only to a time in hours and minutes.
export class MinutesToTimeConverter {

  constructor() {}

  // Returns only the hours of the given time.
  getHours(timeInMinutes:number):number {
    return Math.floor(timeInMinutes/60);
  }

  // Returns only the minutes of the given time.
  getMinutes(timeInMinutes:number):number {
    return timeInMinutes%60;
  }

  getTime(timeInMinutes:number):string {
    const hours = this.getHours(timeInMinutes);
    const minutes = this.getMinutes(timeInMinutes);
    let timeFormatted = "";

    if(hours > 0) {
      timeFormatted += hours + "h";
    }
    if(minutes > 0) {
      timeFormatted += ("0" + minutes).slice(-2) + "m";
    }
    if(timeFormatted == "") {
      timeFormatted = "0m";
    }

    return timeFormatted;
  }
}
