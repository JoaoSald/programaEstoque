  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
 
   //Your web app's Firebase configuration
   const firebaseConfig = {
     apiKey: "AIzaSyB-McZOCjnnfhv9DG5Zfzp0-Q066IwD7XA",
     authDomain: "crud-js-4a0f3.firebaseapp.com",
     projectId: "crud-js-4a0f3",
     storageBucket: "crud-js-4a0f3.appspot.com",
     messagingSenderId: "956311866729",
     appId: "1:956311866729:web:28ab7aa80454ea8b9b41f8"
   };
 
  // Initialize Firebase
   const app = initializeApp(firebaseConfig);
 
     import{ getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField}
     from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
 
 
     const db = getFirestore();
 
     //-----------------------References------------------------//
     let Codigo = document.getElementById("inputcodigo")
     let Produto = document.getElementById("inputNovoProduto")
     let PrecoCompra =  document.getElementById("preco-compra")
     let PrecoVenda = document.getElementById("preco-venda")
     let Situacao = document.getElementById("situacao")
     let NomeCliente = document.getElementById("inputNomeCli")
     let NumeroCliente = document.getElementById("inputNumeroCli")
     const MesVenda = document.getElementById("mes-venda")
     const AnoVenda = document.getElementById("inputAnoVenda")
 
     let insBtn = document.getElementById("insBtn")
     let selBtn = document.getElementById("selBtn")
     let updBtn = document.getElementById("updBtn")
     let delBtn= document.getElementById("delBtn")
     //-----------------------Adding Document------------------------//
   
     async function AddDocument_AutoID(){
         var ref = collection(db, "ListaProdutos")
 
         const docRef =await addDoc(
             ref, {
                 CodigoOfstd: Codigo.value,
                 ProdutoNovo: Produto.value,
                 PrecoDeCompra: PrecoCompra.value,
                 PrecoDeVenda:PrecoVenda.value,
                 Situacao : Situacao.value,
                 NomeCliente : NomeCliente.value,
                 NumeroCliente : NumeroCliente.value,
                 MesVenda : MesVenda.value,
                 AnoVenda : AnoVenda.value
             }
         )
         .then(()=>{
             alert("Produto foi adicionado com Sucesso !!!");
         })
         .catch((error)=>{
             alert("erro na operação:"+ error);
         });
         console.log("document id is" + docRef.id);
     }
 
     async function AddDocument_CustomID(){
         var ref = doc(db, "ListaProdutos", Codigo.value);
 
         await setDoc(
             ref, {
                 CodigoOfstd: Codigo.value,
                 ProdutoNovo: Produto.value,
                 PrecoDeCompra: PrecoCompra.value,
                 PrecoDeVenda:PrecoVenda.value,
                 Situacao : Situacao.value,
                 NomeCliente : NomeCliente.value,
                 NumeroCliente : NumeroCliente.value,
                 MesVenda : MesVenda.value,
                 AnoVenda : AnoVenda.value
             }
         )
         .then(()=>{
             alert("Produto foi adicionado ou alterado com Sucesso !!!");
         })
         .catch((error)=>{
             alert("erro na operação:"+ error);
         });
     }
 
 
       //-----------------------GETTING DOCUMENT------------------------//
           async function GetADocument(){
             var ref = doc(db, "ListaProdutos", Codigo.value);
             const docSnap = await getDoc(ref);
 
             if(docSnap.exists()){
               // Codigo.value = docSnap.data().CodigoOfstd
               Produto.value = docSnap.data().ProdutoNovo;
               PrecoCompra.value = docSnap.data().PrecoDeCompra;
               PrecoVenda.value = docSnap.data().PrecoDeVenda;
               Situacao.value = docSnap.data().Situacao;
               NomeCliente.value = docSnap.data().NomeCliente;
               NumeroCliente.value = docSnap.data().NumeroCliente;
               MesVenda.value = docSnap.data().MesVenda;
               AnoVenda.value = docSnap.data().AnoVenda;

             } else{
               alert("Produto não encontrado")
             }
        }
 
       //-----------------------UPDATING DOCUMENT DATA------------------------//
         async function UpdateFieldInADocument(){
           var ref = doc(db, "ListaProdutos", Codigo.value);
 
             await updateDoc(
                 ref, {
                     ProdutoNovo: Produto.value,
                     PrecoDeCompra: PrecoCompra.value,
                     PrecoDeVenda:PrecoVenda.value,
                     Situacao : Situacao.value,
                     NomeCliente : NomeCliente.value,
                     NumeroCliente : NumeroCliente.value,
                     MesVenda : MesVenda.value,
                     AnoVenda : AnoVenda.value
                 }
             )
             .then(()=>{
                 alert("Produto foi alterado com Sucesso !!!");
             })
             .catch((error)=>{
                 alert("erro na operação:"+ error);
             });
         }
         //-----------------------DELETING DOCUMENT------------------------//
             async function DeleteDocument(){
             var ref = doc(db, "ListaProdutos", Codigo.value);
             const docSnap = await getDoc(ref);
 
             if(!docSnap.exists()){
               alert("Document does not exist")
                 return;
                   } 
 
                 await deleteDoc(ref)
                 .then(()=>{
                   alert("Produto removido com sucesso !!")
                 })
                 .catch((error)=>{
                   alert("erro na operação:"+ error);
             });
               }
 
      //-----------------------Assign Events to btns------------------------//
     insBtn.addEventListener("click", AddDocument_CustomID);
     insBtn.addEventListener("click", clicou => {
       clicou.preventDefault();
       document.getElementById("inputcodigo").value = "";
       document.getElementById("inputNovoProduto").value = "";
       document.getElementById("preco-compra").value = "";
       document.getElementById("preco-venda").value = "";
       document.getElementById("inputNomeCli").value = "";
       document.getElementById("inputNumeroCli").value = "";
       document.getElementById("mes-venda").value = "";
       document.getElementById("inputAnoVenda").value = "";
     })
     selBtn.addEventListener("click", GetADocument);
     // updBtn.addEventListener("click", UpdateFieldInADocument);
     delBtn.addEventListener("click", clicou => {
       const confirmDelete = window.confirm("Tem certeza que deseja remover o dado?");
       if (confirmDelete) {
         // Se o usuário confirmar, executar a função DeleteDocument
         DeleteDocument();
       } else {
         // Se o usuário cancelar, nada acontece
         console.log("Ação de deletar cancelada pelo usuário.");
       }
       clicou.preventDefault();
       document.getElementById("inputcodigo").value = "";
       document.getElementById("inputNovoProduto").value = "";
       document.getElementById("preco-compra").value = "";
       document.getElementById("preco-venda").value = "";
       document.getElementById("inputNomeCli").value = "";
       document.getElementById("inputNumeroCli").value = "";
       document.getElementById("mes-venda").value = "";
       document.getElementById("inputAnoVenda").value = "";
     })
 