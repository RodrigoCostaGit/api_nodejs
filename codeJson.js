const axios = require("axios").default;
const cheerio = require("cheerio");

function top250()
{
const movieList = [] // lista onde vai ficar armazenado todos os filmes
axios.get("https://www.imdb.com/chart/top/?ref_=nv_mv_250") //obitem o conteudo html da pagina
.then((response) =>{
    const html = response.data
    const $ =cheerio.load(html)

    $("tr",html).slice(1).each(function(){ // dá filter ao conteudo html, slice é usado para começar a partir do segundo resultado, visto que o primeiro não tinha conteudo 
        
        const title = $(this).find(".titleColumn").find("a").text()
        const score = $(this).find("strong").text()
        const year = $(this).find(".secondaryInfo").text()
        const link = $(this).find(".titleColumn").find("a").attr("href")
        movieList.push({
            "nome" : title,
            "ano": year,
            "score" : score,
            "link":"https://www.imdb.com/"+link,


            
        })
    })})
}