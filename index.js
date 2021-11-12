const PORT = 8000
const express = require("express");
const axios = require("axios").default;
const cheerio = require("cheerio");

const app=express();

const generos=[
    {
        name:"comedy",
        url:"https://www.imdb.com/search/title/?genres=comedy",
    },
    {
        name:"Sci-fi",
        url:"https://www.imdb.com/search/title/?genres=sci-fi",
    },
    {
        name:"Horror",
        url:"https://www.imdb.com/search/title/?genres=Horror",
    },
    {
        name:"Romance",
        url:"https://www.imdb.com/search/title/?genres=Romance",
    },
    {
        name:"Action",
        url:"https://www.imdb.com/search/title/?genres=Action",
    },
    {
        name:"Thriller",
        url:"https://www.imdb.com/search/title/?genres=Thriller",
    },
    {
        name:"Drama",
        url:"https://www.imdb.com/search/title/?genres=Drama",
    },
    {
        name:"Mystery",
        url:"https://www.imdb.com/search/title/?genres=Mystery",
    },
    {
        name:"crime" ,
        url:"https://www.imdb.com/search/title/?genres=Crime" ,
    },
    {
        name:"Animation" ,
        url:"https://www.imdb.com/search/title/?genres=Animation",
    },
    {
        name:"Adventure" ,
        url:"https://www.imdb.com/search/title/?genres=Adventure",
    },
    {
        name:"Fantasy" ,
        url:"https://www.imdb.com/search/title/?genres=Fantasy",
    },
    {
        name:"Comedy-romance",
        url:"https://www.imdb.com/search/title/?genres=Comedy-romance",
    },
    {
        name:"action-comedy" ,
        url:"https://www.imdb.com/search/title/?genres=Action-comedy",
    },
    {
        name:"Superhero",
        url:"https://www.imdb.com/search/title/?genres=Superhero",
    },


]


const movieList = []

app.get("/",(req,res) => {
    res.json("welcome to my imdb API ")
})

app.get("/topMovies",(req,res)=>{
    axios.get("https://www.imdb.com/chart/top/?ref_=nv_mv_250")
    .then((response) =>{
        const html = response.data
        const $ =cheerio.load(html)

        $("tr",html).slice(1).each(function(){
            
            /*const name = $(this).attr("href","title")*/
            const titulo = $(this).find(".titleColumn").find("a").text()
            const score = $(this).find("strong").text()
            movieList.push({
                /*"nome2" : titulo2  returns all the text from tr*/
                "nome" : titulo,
                "score" : score



                
            })
        })
        res.json(movieList)

    }).catch((err) => console.log(err))
})


app.get("/:nomeGenero",(req,res)=>{
    const generoFilme = req.params.nomeGenero

    const generoUrl = generos.filter(genero =>genero.name==generoFilme)[0].url
    console.log("entrou em "+generoFilme)
    const tempUrl = generoUrl + encodeURIComponent(Array)
    res.json(tempUrl)

})

app.listen(PORT,() => console.log("server running on PORT ${PORT}"))
