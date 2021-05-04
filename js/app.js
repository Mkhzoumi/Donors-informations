'use strict';

let allDonation=[];

let Donation = function (donerName , amount ,age) {
  this.donerName= donerName;
  this.amount = amount;
  this.age= age;
  allDonation.push(this);

};


Donation.prototype.randomAge=function () {
  this.age = Math.floor(Math.random() * (30 - 18 + 1)) + 18 ;
};



let container = document.getElementById('container');
let table = document.createElement('table');
container.appendChild(table);


// rendering the header table row
function tableHeaderRow() {
  let headerRow=document.createElement('tr');
  table.appendChild(headerRow);
  let headerArr = ['Doner Name' , 'Doner Age' , 'Amount'];

  for (let i = 0; i < headerArr.length; i++) {
    let tableData= document.createElement('td');
    headerRow.appendChild(tableData);
    tableData.textContent=headerArr[i];
  }

}
tableHeaderRow();



let totalRender = document.createElement('p');
let total = 0;

// rendering the table data
Donation.prototype.render = function () {
  let index = allDonation.length-1;
  let tableRow = document.createElement('tr');
  table.appendChild(tableRow);

  let tableData= document.createElement('td');
  tableRow.appendChild(tableData);
  tableData.textContent= allDonation[index].donerName;

  tableData= document.createElement('td');
  tableRow.appendChild(tableData);
  tableData.textContent= allDonation[index].age;

  tableData= document.createElement('td');
  tableRow.appendChild(tableData);
  tableData.textContent= allDonation[index].amount;

  total+= parseInt(allDonation[index].amount);

  container.appendChild(totalRender);
  totalRender.textContent=`Total : ${total} JD`;

  setLocal();

};


//handle submitted information from user
let form = document.getElementById('form');
form.addEventListener('submit' , submitHandle);

function submitHandle(event) {
  event.preventDefault();

  let donerName = event.target.doner.value;
  let amount = event.target.amount.value;

  let newDonation = new Donation(donerName , amount);
  newDonation.randomAge();
  newDonation.render();

}


// saving data to local storage
function setLocal() {
  localStorage.setItem('Donation' , JSON.stringify(allDonation));

}


// taking data from local storage
function getLocal() {
  let data = localStorage.getItem('Donation');
  let dataParsed = JSON.parse(data);

  if (dataParsed) {
    for (let i = 0; i < dataParsed.length; i++) {
      let reinst = new Donation(dataParsed[i].donerName , dataParsed[i].amount , dataParsed[i].age);
      reinst.render();

    }

  }
}

getLocal();
