async function buscarDadosDaAPI() {
    let dados = [];
  
    try {
      const resposta = await fetch('https://api.tradetrack.online/tradepacks?world=angerhorn');
      if (!resposta.ok) {
        throw new Error('Erro na requisição: ' + resposta.status);
      }
      dados = await resposta.json();
    } catch (erro) {
      console.error('Erro ao buscar dados:', erro);
    }
  
    let materiaisUnicos = [];
    dados.forEach(entrada => {
      if (entrada.materials && entrada.materials.length) {
        entrada.materials.forEach(material => {
          let existente = materiaisUnicos.find(m => m.name === material.name);
          if (!existente) {
            materiaisUnicos.push({
              name: material.name,
              mediumValue: material.pricing.medianPrice
            });
          }
        });
      }
    });
    
    return materiaisUnicos;
  }
  
  module.exports = buscarDadosDaAPI;
  