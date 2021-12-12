const PORT = 8000
const express = require("express");
const axios = require("axios").default;
const cheerio = require("cheerio");
const path = require("path");
const app=express();

app.set("views",path.join(__dirname, "views"));

app.set("view engine", "pug");

app.use(express.static("./public"))


app.get("/",(req,res) => {
    // res.json("Bem vindo ao meu API de IMDB, use http://localhost:8000/topmovies para aceder aos top250 filmes do imdb. "+
    // "Para procurar os top50 filmes/séries do momento use http://localhost:8000/popular/**, sendo o ** o gênero que queira procurar, por exemplo: http://localhost:8000/popular/fantasy ou http://localhost:8000/popular/fantasy,horror "+
    // " Leia o ficheiro README para mais informações, incluindo a lista completa de gêneros de filmes/tv "
    // )

    res.render("index",{title:"home"});

})

app.get("/login",(req,res)=>{
    res.render("login2")
})

app.get("/registar",(req,res)=>{
    res.render("registar")
})

app.get("/demo",(req,res)=>{
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
        })

    }).catch((err) => console.log(err))
    var jsonList = JSON.stringify(movieList)
    res.render("demo",{layout : "layout",json : jsonList})
})


//para aceder a subpagina dos top250
app.get("/topmovies",(req,res)=>{ 
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
        })
        res.json(movieList)
    

    }).catch((err) => console.log(err))
})

// para aceder a pagina dos top 50 filmes e programas de tv
app.get("/popular/:nomeGenero",(req,res)=>{ // :nomeGenero é usado para procurar segundo o genero que o utilizador quer

    const baseLink="https://www.imdb.com/search/title/?genres="
    const popularList = []
    const movieGenre = req.params.nomeGenero
    generoUrl=baseLink+movieGenre //junta o link base com o gênero, criando assim o link completo 
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


