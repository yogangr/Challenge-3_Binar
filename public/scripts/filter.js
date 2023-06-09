class Car {
  constructor(cars) {
    this.cars = cars;
  }
  filterCarAvailable() {
    return this.cars.filter((car) => car.available === true);
  }
  filterCarUnAvailable() {
    return this.cars.filter((car) => car.available === false);
  }

  filterCarByUser() {
    let driver = document.getElementById("driver").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let dateTime = date + time;
    let passanger = document.getElementById("passanger").value;

    if (driver === undefined || driver === "") {
      document.getElementById("notMatch").innerHTML = `
        <div class="alert alert-danger " style="padding: 10px 10px 10px 10px; margin-left: auto; margin-right: auto; margin-top: -80px; width: 50%;" role="alert">
        Pilih Tipe Driver!
        </div>
        `;
      return;
    } else if (date === undefined || date === "") {
      document.getElementById("notMatch").innerHTML = `
        <div class="alert alert-danger " style="padding: 10px 10px 10px 10px; margin-left: auto; margin-right: auto; margin-top: -80px; width: 50%;" role="alert">
        Pilih Tanggal!
        </div>
        `;
      return;
    } else if (time === undefined || time === "") {
      document.getElementById("notMatch").innerHTML = `
        <div class="alert alert-danger " style="padding: 10px 10px 10px 10px; margin-left: auto; margin-right: auto; margin-top: -80px; width: 50%;" role="alert">
        Pilih Waktu Jemput/Ambil!
        </div>
        `;
      return;
    } else if (dateTime < getDateTimeNow()) {
      document.getElementById("notMatch").innerHTML = `
        <div class="alert alert-danger " style="padding: 10px 10px 10px 10px; margin-left: auto; margin-right: auto; margin-top: -80px; width: 50%;" role="alert">
        Waktu yang anda pilih sudah terlewat, harap pilih tanggal dan waktu yang akan datang!
        </div>
        `;
      return;
    } else if (passanger == "" && driver.toString() == "true") {
      return this.cars.filter(
        (car) => car.available === true && car.availableAt <= dateTime
      );
    } else if (passanger != "" && driver.toString() == "true") {
      return this.cars.filter(
        (car) =>
          car.available === true &&
          car.capacity >= passanger &&
          car.availableAt <= dateTime
      );
    } else if (passanger == "" && driver.toString() == "false") {
      return this.cars.filter(
        (car) => car.available === false && car.availableAt <= dateTime
      );
    } else if (passanger != "" && driver.toString() == "false") {
      return this.cars.filter(
        (car) =>
          car.available === false &&
          car.capacity >= passanger &&
          car.availableAt <= dateTime
      );
    }
  }
}

let xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "http://localhost:8000/api/cars", false);
xmlHttp.send(null);

let data = JSON.parse(xmlHttp.responseText);

let cars = new Car(data);

let app = document.getElementById("dataCars");
htmlData = "";

data = cars.filterCarAvailable();
data = cars.filterCarUnAvailable();

function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

let btnFilterCar = document
  .getElementById("btnFilter")
  .addEventListener("click", getCars);

function getDateTimeNow() {
  let today = new Date();
  let date =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");
  let time =
    String(today.getHours()).padStart(2, "0") +
    ":" +
    String(today.getMinutes()).padStart(2, "0") +
    ":" +
    String(today.getSeconds()).padStart(2, "0");
  let dateNow = date + "T" + time + ".000Z";
  return dateNow;
}

function getCars() {
  let htmlData = "";
  data = cars.filterCarByUser();
  if (data === "" || data === undefined) {
    htmlData = "";
    app.innerHTML = htmlData;
    return;
  } else {
    for (let index = 0; index < data.length; index++) {
      let car = data[index];
      let rentCost = rupiah(car.rentPerDay);
      htmlData += `<div style="width: 333px; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 20px; height: fit-content; margin-bottom: 35px;">
                      <img src=${car.image} alt="${car.manufacture}" style="width: 100%; height: 250px; border-radius: 3px;">
                      <p style="margin: 16px 0px 8px 0px; font-family: 'Helvetica'; font-style: normal; font-weight: 400;font-size: 14px; line-height: 20px;">${car.manufacture} ${car.model}</p>
                      <h5 style="margin-bottom: 8px; font-family: 'Helvetica'; font-style: normal; font-weight: 700; font-size: 16px; line-height: 24px;">${rentCost} / hari</h5>
                      <h6 style="height: 60px; margin-bottom: 16px; font-family: 'Helvetica'; font-style: normal; font-weight: 300; font-size: 14px; line-height: 20px;">${car.description}</h6>
                      <div style="display: flex; ">
                          <div style="margin-right: 8px; padding: 0px;"> 
                              <i class="bi bi-people" aria-hidden="true" style="font-size:24px;"></i>
                          </div> 
                          <p style="font-family: 'Helvetica'; font-style: normal; font-weight: 300; font-size: 14px; line-height: 26px;">
                          ${car.capacity} Orang
                          </p>
                      </div>
                      <div style="display: flex; ">
                          <div style="margin-right: 8px; padding: 0px;"> 
                              <i class="bi bi-gear" aria-hidden="true" style="font-size:20px;"></i>
                          </div> 
                          <p style="font-family: 'Helvetica'; font-style: normal; font-weight: 300; font-size: 14px; line-height: 26px;">
                          ${car.transmission}
                          </p>
                      </div>
                      <div style="display: flex;">
                          <div style="margin-right: 8px; padding: 0px;"> 
                              <i class="bi bi-calendar4" aria-hidden="true" style="font-size:20px;"></i>
                          </div> 
                          <p style="font-family: 'Helvetica'; font-style: normal; font-weight: 300; font-size: 14px; line-height: 26px;">
                          Tahun : ${car.year}
                          </p>
                      </div>
                      <button style="margin-top:8px; width: 100%; padding: 14px 0px; background: #5CB85F; border-radius: 3px; border: none; color: white; text-align: center; text-decoration: none; font-family: 'Helvetica';
                      font-style: normal;
                      font-weight: 700;
                      font-size: 14px; font-family: 'Helvetica'; line-height: 20px;">
                          Pilih Mobil
                      </button>
                  </div>`;
    }
    app.innerHTML = htmlData;
    if (htmlData == "") {
      document.getElementById("notMatch").innerHTML = `
        <div class="alert alert-danger " style="padding: 10px 10px 10px 10px; margin-left: auto; margin-right: auto; margin-top: -80px; width: 50%;" role="alert">
        Mobil Tidak Tersedia!
        </div>
        `;
    }
  }
}
