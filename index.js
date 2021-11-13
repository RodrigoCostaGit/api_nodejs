const PORT = 8000
const express = require("express");
const axios = require("axios").default;
const cheerio = require("cheerio");

const app=express();

const movieList = []

app.get("/",(req,res) => {
    res.json("welcome to my imdb API ")
})

app.get("/topmovies",(req,res)=>{
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
            //const score = $(this).find(".ratings-bar").find(".ratings-imdb-rating").find("strong").text()
            const score2 = $(this).find("strong").text()
            const scoremeta=$(this).find(".metascore").text()
            popularList.push({
                "nome":name,
                "ano":ano,  
                "imbd score":score2,
                "Metascore":scoremeta,
                "link":"https://www.imdb.com/"+link,

            })
        })
        res.json(popularList)
    })


})

app.listen(PORT,() => console.log("server running on PORT ${PORT}"))


 
//idea: instead of having a full dict with genres and links, if the only thing that changes in the link itself is the keyword
// have the user input add itself on the link and searchh using that.