function delayedFunction() {
  let login = localStorage.getItem('Login')
  if(login === null){
    window.location.href = './pages/login.html'
  }else{
    window.location.href = './pages/home.html'
  }
  }
  setTimeout(delayedFunction, 5000);
  