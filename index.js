const PORT = 8000
const express = require("express");
const axios = require("axios").default;
const cheerio = require("cheerio");

const app=express();

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

app.listen(PORT,() => console.log("server running on PORT ${PORT}"))
