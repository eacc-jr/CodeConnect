const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name})
        }
        leitor.onerror = () => {
            reject(`Èrro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeImagem = document.querySelector(".container-imagem-nome p")

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
          const conteudoArquivo = await lerConteudoArquivo(arquivo);
          imagemPrincipal.src = conteudoArquivo.url;
          nomeImagem.textContent = conteudoArquivo.name;
        } catch (erro) {
            console.log("Erro na leitura do arquivo!")
        } 
    }
} )