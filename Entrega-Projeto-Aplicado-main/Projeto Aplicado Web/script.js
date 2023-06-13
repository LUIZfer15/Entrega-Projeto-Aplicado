const produtos = [
  {nome:"Latex Acrílico Fosco Standard", link:"TintaLatex.html", imagem:"./Imagens/Latex Acrilico.png", alt:"Latex Acrilico"},
  {nome:"Esmalte Sintetico", link:"EsmalteSintetico.html", imagem:"Imagens/Esmalte Sintetico.png", alt:"Esmalte Sintetico"},
  {nome:"Tinta Spray Amarelo", link:"SprayAmarelo.html", imagem:"Imagens/Spray Amarelo.png", alt:"Spray Amarelo"},
  {nome:"Tinta Spray Preto", link:"SprayPreto.html", imagem:"Imagens/Spray Preto.png", alt:"Spray Preto"},
  {nome:"Tinta Spray Aluminio", link:"SprayAluminio.html", imagem:"Imagens/Spray Aluminio.png", alt:"Cosmeticos"}
];

document.addEventListener('DOMContentLoaded', function() {
  var displayProdutos = document.getElementsByClassName('produtos');

  Array.from(displayProdutos).forEach(function(displayProduto) {
    produtos.forEach(function(produto) {
      var produtoDiv = document.createElement('div');
      var produtoLink = document.createElement('a');
      var produtoImg = document.createElement('img');
      var produtoNome = document.createElement('p');
      var productNomeLink = document.createElement('a');

      produtoLink.href = produto.link;
      produtoImg.src = produto.imagem;
      produtoImg.alt = produto.alt;
      productNomeLink.href = produto.link;
      productNomeLink.textContent = produto.nome;

      produtoLink.classList.add('link-produto');
      produtoImg.classList.add('imagem-produto');

      produtoLink.appendChild(produtoImg);
      produtoNome.appendChild(productNomeLink);
      produtoDiv.appendChild(produtoNome);
      produtoDiv.appendChild(produtoLink);
      displayProduto.appendChild(produtoDiv);
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var displayProdutos = document.getElementsByClassName('produtos');
  var searchForm = document.getElementById('search-box');
  var searchBox = document.getElementById('inputSearch');
  var searchButton = document.querySelector('#search-box a');

  searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar
    buscar();
  });

  searchButton.addEventListener('click', function(event) {
    event.preventDefault(); 
    buscar();
  });

  // Adiciona event listener pro "Enter"
  searchBox.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      buscar();
    }
  });

  function buscar() {
    var searchString = normalizarString(searchBox.value.trim());
    
    Array.from(displayProdutos).forEach(function(displayProduto) {
      displayProduto.innerHTML = ''; // Apaga todos produtos da tela

      if (searchString === '') {
        // Se a caixa de busca estiver vazia, mostra todos os produtos
        produtos.forEach(function(produto) {
          addProductToDisplay(produto, displayProduto);
        });
      } else {
        // Filtrar produtos baseado na string da busca
        var produtosFiltrados = produtos.filter(function(produto) {
          var nomeNormalizado = normalizarString(produto.nome);
          return nomeNormalizado.includes(searchString);
        });

        if (produtosFiltrados.length > 0) {
          produtosFiltrados.forEach(function(produto) {
            addProductToDisplay(produto, displayProduto);
          });
        } else {
          var noProductMsg = document.createElement('p');
          noProductMsg.textContent = 'Nenhum produto encontrado.';
          displayProduto.appendChild(noProductMsg);
        }
      }
    });
  }

  function addProductToDisplay(produto, displayProduto) {
    var produtoDiv = document.createElement('div');
    var produtoLink = document.createElement('a');
    var produtoImg = document.createElement('img');
    var produtoNome = document.createElement('p');
    var productNomeLink = document.createElement('a');

    produtoLink.href = produto.link;
    produtoImg.src = produto.imagem;
    produtoImg.alt = produto.alt;
    productNomeLink.href = produto.link;
    productNomeLink.textContent = produto.nome;

    produtoLink.classList.add('link-produto');
    produtoImg.classList.add('imagem-produto');

    produtoLink.appendChild(produtoImg);
    produtoNome.appendChild(productNomeLink);
    produtoDiv.appendChild(produtoNome);
    produtoDiv.appendChild(produtoLink);
    displayProduto.appendChild(produtoDiv);
  }

  function normalizarString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
});
