//Personal Payment Gateway
const tColorA = document.getElementById('tColorA');
const tColorB = document.getElementById('tColorB');
const tColorC = document.getElementById('tColorC');
const iconA = document.querySelector('.fa-credit-card');
const iconB = document.querySelector('.fa-building-columns'); 
const iconC = document.querySelector('.fa-wallet');
const cDetails = document.querySelector('.card-details');

function doFun() {
  tColorA.style.color = '#ff8c00';
  tColorB.style.color = 'black';
  tColorC.style.color = 'black';
  iconA.style.color = '#ff8c00';
  iconB.style.color = '#898888';
  iconC.style.color = '#898888';
  cDetails.style.display = 'block';
}

function doFunA() {
  tColorA.style.color = 'black';
  tColorB.style.color = '#ff8c00';
  tColorC.style.color = 'black';
  iconA.style.color = '#898888';
  iconB.style.color = '#ff8c00';
  iconC.style.color = '#898888';
  cDetails.style.display = 'none';
}

function doFunB() {
  tColorA.style.color = 'black';
  tColorB.style.color = 'black';
  tColorC.style.color = '#ff8c00';
  iconA.style.color = '#898888';
  iconB.style.color = '#898888';
  iconC.style.color = '#ff8c00';
  cDetails.style.display = 'none';
}
