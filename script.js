
// MENU PARA CELULAR
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const aberto = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(aberto));
        menuToggle.textContent = aberto ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// TAMANHO DAS LETRAS
let tamanhoFonte = Number(
    localStorage.getItem("luminaFonte")
) || 100;

const aumentar = document.getElementById("increaseFont");
const diminuir = document.getElementById("decreaseFont");
const restaurar = document.getElementById("resetFont");

function atualizarFonte() {
    document.documentElement.style.setProperty(
        "--font-scale",
        tamanhoFonte / 100
    );

    localStorage.setItem("luminaFonte", tamanhoFonte);
}

aumentar?.addEventListener("click", () => {
    tamanhoFonte = Math.min(tamanhoFonte + 10, 150);
    atualizarFonte();
});

diminuir?.addEventListener("click", () => {
    tamanhoFonte = Math.max(tamanhoFonte - 10, 80);
    atualizarFonte();
});

restaurar?.addEventListener("click", () => {
    tamanhoFonte = 100;
    atualizarFonte();
});

atualizarFonte();

// LEITURA EM VOZ ALTA
const botaoLer = document.getElementById("readText");
const botaoParar = document.getElementById("stopReading");

botaoLer?.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
        alert("Seu navegador não oferece leitura em voz alta.");
        return;
    }

    window.speechSynthesis.cancel();

    const conteudo = document.querySelector("main").innerText;
    const leitura = new SpeechSynthesisUtterance(conteudo);

    leitura.lang = "pt-BR";
    leitura.rate = 0.85;

    window.speechSynthesis.speak(leitura);
});

botaoParar?.addEventListener("click", () => {
    window.speechSynthesis?.cancel();
});

window.addEventListener("beforeunload", () => {
    window.speechSynthesis?.cancel();
});