import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyBcCyinKpfOLcWxIjKmouO1X2Lq0XBjcD0";
const genAI = new GoogleGenerativeAI(apiKey);

let numeroPerguntas = 0
let dots = ''
let interval;

const messages = document.querySelector(".messages")

async function generateContent() {

  let textoPergunta = document.querySelector("#perguntaUsuario").value

  messages.innerHTML += `
      <div class="message userMessage">
        <p>${textoPergunta}</p>
      </div>
    `

  messages.innerHTML += `
    <div class="message botMessage">
      <p id="respostaIA-${numeroPerguntas}"></p>
    </div>
  `

  try {
    let respostaPergunta = document.querySelector(`#respostaIA-${numeroPerguntas}`)
    interval = setInterval(() => {
      dots = dots.length < 3 ? dots + '.' : '.'; // Adiciona "." até 3, depois reseta
      respostaPergunta.textContent = `${dots}`;
    }, 1000); // Atualiza a cada 1 segundo
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = textoPergunta;
    const result = await model.generateContent(prompt);
    
    respostaPergunta.textContent = result.response.text()
    numeroPerguntas+=1
    clearInterval(interval);
    

  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
  }
}

const buttonPergunta = document.querySelector("#perguntaEnviar")

buttonPergunta.addEventListener("click", ()=>{
  generateContent();
})



