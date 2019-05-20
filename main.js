const carregando = () => {
  $.getJSON("https://dog.ceo/api/breeds/list/all", function(data){
    let lista = (Object.keys(data.message));
    lista.forEach(element => {
      $("#racas").before(`<option value="${element}">${element}</option>`);
    });    
  });
}
const lista = (raca) => {
  $.getJSON("https://dog.ceo/api/breeds/list/all", function(data){
    let lista = (data.message[raca]);
    if (lista.length>0) {
      $("#formSubRaca").show();
      lista.forEach(element => {
        $("#subraca").before(`<option value="${element}">${element}</option>`)
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