
//----------FILLING THE TABLE-----------------//
var prodNo = 0;
var tbody = document.getElementById('tbody1')
var li = document.getElementById('somaqtd')
var liInvestimento = document.getElementById('investimento')
var liLucro = document.getElementById('lucro')

function AddItemToTable(cod, prod, compra, venda, situ){
  let trow = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");
  let td6 = document.createElement("td");

  if(situ !== 'vendido'){
    td1.innerHTML= ++prodNo;
  }
  td2.innerHTML= cod;
  td3.innerHTML= prod;
  td4.innerHTML= compra;
  td5.innerHTML= venda;
  td6.innerHTML= situ;
  if(situ === 'vendido'){
   td6.style.color='red'
  }

  trow.appendChild(td1)
  trow.appendChild(td2)
  trow.appendChild(td3)
  trow.appendChild(td4)
  trow.appendChild(td5)
  trow.appendChild(td6)

  tbody.appendChild(trow)
  td1.classList.add('d-none')
}

function AddAllItemsToTable(TheProdutos){
  prodNo = 0;
  tbody.innerHTML="";
  TheProdutos.sort((a, b) => a.CodigoOfstd - b.CodigoOfstd); //odena coluna código
  TheProdutos.forEach(element => {
    AddItemToTable(element.CodigoOfstd, element.ProdutoNovo, element.PrecoDeCompra, element.PrecoDeVenda, element.Situacao);
       li.innerHTML = `Quantidade de produtos: ${prodNo}`
  });
  
}

function SomaInvestimento(TheProdutos){
 const arrayTeste = TheProdutos
 let aux = 0;
 let aux2 = 0;
 arrayTeste.forEach(element => {
   const transfNumero = parseFloat(element.PrecoDeCompra)
   aux =  aux + transfNumero

   if(element.Situacao === "vendido"){
     const tranfNumb = parseFloat(element.PrecoDeVenda)
     aux2 =  (aux2 + tranfNumb) - transfNumero
   }
 })
 
 liInvestimento.innerHTML = `Investimento de: R$ ${aux}`
 liLucro.innerHTML = `Lucro de: R$ ${aux2}`
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";

const firebaseConfig = {
apiKey: "AIzaSyB-McZOCjnnfhv9DG5Zfzp0-Q066IwD7XA",
authDomain: "crud-js-4a0f3.firebaseapp.com",
databaseURL: "https://crud-js-4a0f3-default-rtdb.firebaseio.com",
projectId: "crud-js-4a0f3",
storageBucket: "crud-js-4a0f3.appspot.com",
messagingSenderId: "956311866729",
appId: "1:956311866729:web:28ab7aa80454ea8b9b41f8"
};

const app = initializeApp(firebaseConfig);

import{ 
 getFirestore, doc, getDoc, getDocs, onSnapshot, collection
}
from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

const db = getFirestore();

//--------------------GET ALL DATA-----------------------//
async function GetAllDataOnce(){
    const querySnapshot = await getDocs(collection(db, "ListaProdutos"));

 var produtos = [];

 querySnapshot.forEach(doc => {
   produtos.push(doc.data());
 });
 AddAllItemsToTable(produtos);
 SomaInvestimento(produtos);
}

async function GetAllDataRealTime(){
 const dbRef = collection(db, "ListaProdutos");

   onSnapshot(dbRef, (querySnapshot) =>{
    var produtos = [];

    querySnapshot.forEach(doc =>{
     produtos.push(doc.data());
    });   
    AddAllItemsToTable(produtos);
    SomaInvestimento(produtos);
   })
 }

 window.onload = GetAllDataRealTime;
 

