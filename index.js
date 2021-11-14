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


app.get("/popular/:nomeGenero",(req,res)=>{

    const baseLink="https://www.imdb.com/search/title/?genres="

    const popularList = []

    const generoFilme = req.params.nomeGenero

    generoUrl=baseLink+generoFilme
    axios.get(generoUrl)
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)

        $(".lister-item",html).each(function(){
            const name = $(this).find(".lister-item-header").find("a").text()
            const ano = $(this).find(".lister-item-year").text()
            const link = $(this).find(".lister-item-header").find("a").attr("href")
            const score2 = $(this).find("strong").text()
            const scoremeta=$(this).find(".metascore").text().trim()
            var genres = $(this).find(".genre").text().trim()
            var listGenres=[]
            // genres.forEach(b=>{
            //     var genreLink
            //     genreLink="<a href=\"https://www.imdb.com/search/title/?genres=\"+b>b</a>"
            //     listGenres.push(genreLink)
            // })

            popularList.push({
                "nome":name,
                "ano":ano,  
                "imbd score":score2,
                "Metascore":scoremeta,
                "gêneros":genres,
                "link":"https://www.imdb.com/"+link,

            })
        })
        res.json(popularList)
    })


})

app.listen(PORT,() => console.log("server running on PORT ${PORT}"))


//ideas: make a readme.file
//explain everything on a good json on the index file
//make a way to load more than 50 at a time
