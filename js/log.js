function logar(){
    firebase.auth().
    signInWithEmailAndPassword(document.getElementById('inputEmail').value, document.getElementById('inputPassword').value)
    .then(response => { 
     // alert('Login e senha Corretos')
         window.location.href = "controle.html"
      }).catch(error => {
        console.log('error', error)
        alert('Login ou senha inválidos')
      })
}