const PORT = 8000
const express = require("express");
const axios = require("axios").default;
const cheerio = require("cheerio");

const app=express();

reviewSites=[
    {
        name:"guardian",
        url:"https://www.theguardian.com/film+tone/reviews"
    },
    {
        name:""

    }
]



app.get("/",(req,res) => {
    res.json("welcome to my imdb API ")
})

app.get("/topmovies",(req,res)=>{
    const movieList = []
    axios.get("https://www.imdb.com/chart/top/?ref_=nv_mv_250")
    .then((response) =>{
        const html = response.data
        const $ =cheerio.load(html)

        $("tr",html).slice(1).each(function(){
            
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
        })
        res.json(movieList)

    }).catch((err) => console.log(err))
})


app.get("/popular/:nomeGenero",(req,res)=>{

    const baseLink="https://www.imdb.com/search/title/?genres="

    const popularList = []

    const movieGenre = req.params.nomeGenero

    generoUrl=baseLink+movieGenre
    axios.get(generoUrl)
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)

        $(".lister-item",html).each(function(){
            const name = $(this).find(".lister-item-header").find("a").text()
            const year = $(this).find(".lister-item-year").text()
            const link = $(this).find(".lister-item-header").find("a").attr("href")
            const score = $(this).find("strong").text()
            const scoremeta=$(this).find(".metascore").text().trim()
            var genres = $(this).find(".genre").text().trim()

            popularList.push({
                "nome":name,
                "ano":year,  
                "imbd score":score,
                "Metascore":scoremeta,
                "gêneros":genres,
                "link":"https://www.imdb.com/"+link,

            })
        })
        res.json(popularList)
    }).catch((err) => console.log(err))


})



app.listen(PORT,() => console.log("server running on PORT ${PORT}"))


