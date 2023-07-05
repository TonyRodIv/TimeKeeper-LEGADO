function delayedFunction() {
  let login = localStorage.getItem('Login')
  if(login === null){
    window.location.href = './pages/login.html'
  }else{
    window.location.href = './pages/home.html'
  }
  }
  setTimeout(delayedFunction, 5000);

  
  const numerosSorteados = [];
    while (numerosSorteados.length < 6) {
      const numero = Math.floor(Math.random() * 6);
      if (!numerosSorteados.includes(numero)) {
        numerosSorteados.push(numero);
      }
    }
    for(let i = 0;i<numerosSorteados.length;i++){
      localStorage.setItem(`CardOrder${i}`, numerosSorteados[i])
    }
  

    function isScreenLarge() {
      // Obter a largura da tela
      let screenWidth = window.innerWidth;
      // Retornar verdadeiro se for maior que 800px, falso caso contrário
      
    }