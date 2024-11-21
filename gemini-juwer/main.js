import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyBcCyinKpfOLcWxIjKmouO1X2Lq0XBjcD0";
const genAI = new GoogleGenerativeAI(apiKey);

async function generateContent() {

  let textoPergunta = document.querySelector("#perguntaUsuario").value

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = textoPergunta;
    const result = await model.generateContent(prompt);
    let textoResposta = document.querySelector("#respostaIA")
    textoResposta.textContent = (result.response.text());

  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
  }
}

const buttonPergunta = document.querySelector("#perguntaEnviar")

buttonPergunta.addEventListener("click", ()=>{
  generateContent();
})



