export class Utils {

  static GetDateString( theDate: Date) : string {
    let year = theDate.getFullYear();
    let month = theDate.getMonth() + 1;
    let day = theDate.getDate()
    return year + "-" + month + "-" + day;
  }
}
