//DMS to Decimal Conversion
export function dmsConversion(long, lat) {
  //Split the EXIF data into an array
  let latArr = lat[0].split(',')
  let longArr = long[0].split(',')
  //Add back the cardinal direction
  latArr = [...latArr, lat[1]]
  longArr = [...longArr, long[1]]
  //Declare an output array
  let coord = [];

  //Set the output array to the proper converted decimal
  coord[1] = Number(latArr[0]) + Number(latArr[1]/60) + Number(latArr[2]/3600)
  coord[0] = Number(longArr[0]) + Number(longArr[1]/60) + Number(longArr[2]/3600)

  //If the cardinal direction is S or W we need to make that value negative
  if(latArr[3] === "S" || latArr[3] === "W") {
    coord[1] = coord[1] * -1
  }
  if(longArr[3] === "S" || longArr[3] === "W") {
    coord[0] = coord[0] * -1
  }
  return coord
}
