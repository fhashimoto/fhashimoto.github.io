const carregando = () => {
  $.getJSON("https://dog.ceo/api/breeds/list/all", function(data){
    let lista = (Object.keys(data.message));
    lista.forEach(element => {
      $("#formRaca").append(`<option value="${element}">${element}</option>`);
    });    
  });
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
  let subRaca = ($("#formSubRaca").val());
  if (subRaca)
    raca = `${raca}/${subRaca}`;
  imgBanner(raca);
}

const subTitle = (e)=> {
  $('#subImg').html(e.target.value).css({"color":cor,"font-family":font})
}
const attFont = (e) => {
  let font = e.target.value;
  $('#subImg').css("font-family",font);
}
const attCor = (e) => {
  let cor = $('#corTexto').val();
  $('#subImg').css("color",cor);
}