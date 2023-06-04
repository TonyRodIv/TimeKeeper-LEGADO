fetch('../src/data.json').then(response => response.json()).then(infoAulas => {
    console.log(infoAulas);
  });
