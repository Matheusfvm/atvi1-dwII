const express = require("express") // Depois de instalado o express eu importo o express dentro da variável express
const bodyParser = require("body-parser") // Módulo que auxilia a leitura de variável no método POST, estrutura "req.body"
const app = express() // Inicio o express dentro da variável 'app'

app.set('view engine', 'ejs') // Informando ao express, para usar o ejs como view engine do projeto

app.use(bodyParser.urlencoded({extended: true})) // Informando ao express, que usamos o body parser 


app.get('/',(req, res) => {
    res.render("index") // Enviando uma resposta(index.ejs) para o servidor(porta 3000)
})


/* ---------- Atividade 1 ------------- */
app.get("/idade", (req, res) => {
    res.render("idade")
})
/* Rota que recebe informação com o POST */
app.post("/idade", (req, res) => {
    const idade = req.body.idade; // Estrutura do body parser
    function analisaIdade(valor) { // Função que analisa as codições do exercício
        let resposta = ""
        if (valor < 15){
            resposta = "Criança"
        } 
        else if (15 <= valor && valor < 30){
            resposta = "Jovem"
        }
        else if (30 <= valor && valor < 60){
            resposta = "Adulto"
        }
        else {
            resposta = "Idoso"
        }
        return resposta
    }
    res.render("respostaIdade", {idade: analisaIdade(idade)}) // Arquivo ejs, responsável por informar o resultado da função
})

/* -------- Atividade 2 ------- */
app.get("/media", (req, res) =>{
    res.render("notas")
})

app.post("/media", (req, res) => {
    const nota1 = req.body.nota1
    const nota2 = req.body.nota2
    const nota3 = req.body.nota3
    
    /* Função para calcular a média das notas */
    function calculaMedia(notaA, notaB, notaC){
        let resposta = ((notaA * 2) + (notaB * 5) + (notaC * 3)) / 10
        return resposta
    }
    
    /* Função para identificar a classificação, segundo a média */
    let classificacao = (valor) => {
        if (valor <= 5){
            return "F"
        }
        else{
            if (valor > 5 && valor <= 6){
                return "E"
            }
            else if (valor > 6 && valor <= 7){
                return "D"
            }
            else if (valor > 7 && valor <= 8){
                return "C"
            }
            else if (valor > 8 && valor <= 9){
                return "B"
            }
            else{
                return "A"
            }
        }
    }

    res.render("resultado", {media: calculaMedia(nota1, nota2, nota3), classificacao: classificacao(calculaMedia(nota1, nota2, nota3))})
})


/*------------- Atividade 3 --------------- */
app.get("/cadastro", (req, res) => {
    res.render("informacoes")
})

app.post("/cadastro", (req, res) => {
    const nome = req.body.nome
    const sobrenome = req.body.sobrenome
    const idade = req.body.idade
    const pais = req.body.pais

    res.render("usuario", {nome: nome, sobrenome: sobrenome, idade: idade, pais: pais})
})

app.post("/usuario", (req, res) => {
    res.redirect("/cadastro")
}) // Serve para redirecionar da rota '/usuario' para a rota '/informacoes', para que consiga editar as informações novamente

app.listen(3000, () => {
    console.log("Servidor rodado")
})