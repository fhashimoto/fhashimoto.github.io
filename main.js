const carregando = () => {
  $.getJSON("https://dog.ceo/api/breeds/list/all", function(data){
    let lista = (Object.keys(data.message));
    lista.forEach(element => {
      $("#formRaca").append(`<option value="${element}">${element}</option>`);
    });    
  });
  listaSalva();
}

const lista = (raca) => {
  $.getJSON("https://dog.ceo/api/breeds/list/all", function(data){
    let lista = (data.message[raca]);
    if (lista.length>0) {
      $("#formSubRaca").show();
      $(".subRaca").remove();
      lista.forEach(element => {
        $("#formSubRaca").append(`<option value="${element}" class="subRaca">${element}</option>`);
      })
    }else{
      $("#formSubRaca").hide();
      $(".subRaca").remove();
    }
    imgBanner(raca)
  })
}

const sublista = (subRaca) => {
  let raca = $("#formRaca").val();
  raca += `/${subRaca}`;
  imgBanner(raca)
}

const numRandom = (max) => {
  return (Math.random()*(max))
}

const imgBanner = (raca) => {
  $.getJSON(`https://dog.ceo/api/breed/${raca}/images`, function(imagem){
    let index = Math.trunc(numRandom(imagem.message.length));      
    let novaImg = imagem.message[index];
    $("#imgDog").attr("src",novaImg);
  })
}

const trocarImg = () => {
  let raca = $("#formRaca").val();
  let subRaca = $("#formSubRaca").val();
  if (subRaca)
    raca = `${raca}/${subRaca}`;
  imgBanner(raca);
}

const subTitle = (e)=> {
  $('#subImg').html(e.target.value);
}
const attFont = (e) => {
  let font = e.target.value;
  $('#subImg').css("font-family",font);
}
const attCor = (e) => {
  let cor = $('#corTexto').val();
  $('#subImg').css("color",cor);
}
const attSize = (e) => {
  let size = `${e.target.value}px`;
  $('#subImg').css('font-size',size);
}

const handleSave = () => {
  let file = {
    img: $('#imgDog').attr('src'),
    raca: $("#formRaca").val(),
    subRaca: $("#formSubRaca").val(),
    nome: $("#subImg").text(),
    cor: $("#corTexto").val(),
    font: $("#fontTexto").val(),
    size: $("#fontSize").val(),
    data: (new Date()).toString()
  }
  let key = (new Date()).getTime(); 
  localStorage.setItem(key, JSON.stringify(file));
  alert('Dog registrado com sucesso');
  location.reload();
}

const listaSalva = () => {  
  if (localStorage.length > 0){
    let keys = Object.keys(localStorage);
    keys.forEach(element => {
      let dog = JSON.parse(localStorage.getItem(element));
      $('.listAll').append(
        `
        <figure class="text-center">
          <img src="${dog.img}" style="max-width:500px; height:auto">
          <figcaption style="color:${dog.cor};font-family:${dog.font};font-size:${dog.size}px; position:relative; top:-50px">${dog.nome}</figcaption>
        </figure>
        `
      )
    });
  }
}