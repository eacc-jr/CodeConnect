const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

function lerConteudoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };
    leitor.onerror = () => {
      reject(`Erro na leitura do arquivo ${arquivo.name}`);
    };

    leitor.readAsDataURL(arquivo);
  });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
  const arquivo = evento.target.files[0];

  if (arquivo) {
    try {
      const conteudoArquivo = await lerConteudoArquivo(arquivo);
      imagemPrincipal.src = conteudoArquivo.url;
      nomeImagem.textContent = conteudoArquivo.nome;
    } catch (erro) {
      console.log("Erro na leitura do arquivo!");
    }
  }
});

const inputTags = document.getElementById("categoria");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("remove-tag")) {
    const tagRemover = evento.target.parentElement;
    listaTags.removeChild(tagRemover);
  }
});

const tagDisponiveis = [
  "Front-end",
  "Programação",
  "Data Science",
  "Full-stack",
  "HTML",
  "CSS",
  "JavaScript",
];

async function verificarTag(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(1000, () => {
      resolve(tagDisponiveis.includes(tagTexto));
    });
  });
}

inputTags.addEventListener("keypress", async (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      try {
        const tagExiste = await verificarTag(tagTexto);
        if (tagExiste) {
          const tagNova = document.createElement("li");
          tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
          listaTags.appendChild(tagNova);
          inputTags.value = "";
        } else {
          alert("Tag não encontrada!");
        }
      } catch (error) {
        console.error("Erro ao verificar a tag");
        alert("Em verificar a tag, verifique o console");
      }
    }
  }
});
