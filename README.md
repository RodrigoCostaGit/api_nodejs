O projeto consiste num API do website IMDb(https://www.imdb.com/), uma base de dados de informações de filmes e televisão.

O API de momento dá scrape a 2 paginas diferentes, no entanto, é possivel mudar o URL de forma a juntar tipos de filmes na pesquisa

foi utilizado express, axios e cheerios para o desenvolvimento do projeto, a  linguagem utilizada para o desenvolvimento foi javascript

As subpaginas que o projeto consegue dar scrape são:
    
    * os top 250 filmes segundo o imdb rating  https://www.imdb.com/chart/top/?ref_=nv_mv_250
    * os top 50 filmes e programas de tv segundo a popularidade https://www.imdb.com/search/title/?genres

As subpaginas para acedar aos dados são:
    * http://localhost:8000/topmovies
    * http://localhost:8000/popular/**  

sendo o ** o gênero do filme/série que se queira procurar, por exemplo http://localhost:8000/popular/fantasy irá procurar os top 50 filmes/séries de fantasia, http://localhost:8000/popular/fantasy,horror irá procurar os top 50 de fantasia e horror

os possiveis gêneros que se podem procurar são:
    - sci-fi
    - horror
    - romance
    - action
    - thriller
    - drama
    - mystery
    - animation
    - adventure
    - fantasy
    - comedy
    - superhero

os dados que o API dá scrape na pagina de top250 são:
    - nome do filme
    - ano de estreia
    - o score de imdb(0 a 10)
    - o link para à pagina imdb

os dados que o API dá scrape na pagina de top 50 filmes e programas de tv segundo a popularidade são:
    - nome
    - ano de estreia, ou no caso de serie ano de estreia e de final, séries que ainda não acabaram só têm ano de estreia
    - imdb score (0 a 10)
    - metascore score(0 a 100) é a classificação de outro site de review de filmes
    - uma lista dos gêneros do filme/serie
    - um link para a pagina imdb

Parte do trabalho teve base no tutorial feito por Ania Kubów: https://www.youtube.com/watch?v=GK4Pl-GmPHk&t=2s&ab_channel=CodewithAniaKub%C3%B3w

O API foi desenvolvido para a disciplina de Web Development, do Professor Laércio Cruvinel.