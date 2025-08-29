document.addEventListener("DOMContentLoaded", () => {
  // === BOLINHAS ===
  const maxBolinhas = 150;
  const cores = ["#301832", "#1A6E8A", "#94199E", "#10718B"];
  const container = document.getElementById("floating-bubbles");
  const header = document.querySelector("header"); // Ajuste se o header tem id ou classe diferente

  for (let i = 0; i < maxBolinhas; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const size = Math.random() * 15 + 5;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";
    bubble.style.left = Math.random() * 100 + "vw";
    bubble.style.animationDelay = Math.random() * 20 + "s";
    bubble.style.animationDuration = Math.random() * 20 + 10 + "s";
    bubble.style.backgroundColor =
      cores[Math.floor(Math.random() * cores.length)];

    container.appendChild(bubble);
  }

  function pausarBolinhas() {
    const bolinhas = container.querySelectorAll(".bubble");
    bolinhas.forEach((b) => {
      b.style.animationPlayState = "paused";
    });
  }

  function tocarBolinhas() {
    const bolinhas = container.querySelectorAll(".bubble");
    bolinhas.forEach((b) => {
      b.style.animationPlayState = "running";
    });
  }

  if (header) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Header visível -> toca bolinhas
            tocarBolinhas();
          } else {
            // Header não visível -> pausa bolinhas
            pausarBolinhas();
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(header);
  }

  // Começa pausado até header aparecer
  pausarBolinhas();

  // === TOGGLE TEMA ===
  const toggleBtn = document.getElementById("toggle-theme");
  const body = document.body;

  function updateLogo() {
    const isLight = body.classList.contains("light-mode");
    const logos = document.querySelectorAll(".logo-img");

    logos.forEach((img) => {
      img.src = isLight ? "img/logo_b.png" : "img/logo_w.png";
    });
  }

  // Verifica tema salvo no localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    toggleBtn.textContent = "🌞";
  } else {
    toggleBtn.textContent = "🌙";
  }

  // Atualiza a logo após aplicar tema salvo
  updateLogo();

  // Listener para troca de tema
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    const isLight = body.classList.contains("light-mode");
    toggleBtn.textContent = isLight ? "🌞" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");

    updateLogo();
  });

  // === FILTRO DE PROJETOS ===
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projetos = document.querySelectorAll(".projeto-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projetos.forEach((projeto) => {
        if (filter === "all" || projeto.dataset.category === filter) {
          projeto.classList.remove("hide");
        } else {
          projeto.classList.add("hide");
        }
      });
    });
  });

  // === BOTÃO CARREGAR MAIS PROJETOS ===
  const carregarMaisBtn = document.getElementById("carregar-mais-btn");
  const projetosList = document.querySelector(".projetos-list");

  if (carregarMaisBtn) {
    carregarMaisBtn.addEventListener("click", () => {
      const projetosExtras = document.querySelectorAll(".projeto-item.hide");
      projetosExtras.forEach((projeto) => {
        projeto.classList.remove("hide");
      });

      // Adiciona imagem card final
      const cardFinal = document.createElement("div");
      cardFinal.classList.add("projeto-item");

      cardFinal.innerHTML = `
        <img src="img/card.png" alt="Mais projetos em breve" style="width: 100%; border-radius: 8px;" loading="lazy" />
      `;

      projetosList.appendChild(cardFinal);

      carregarMaisBtn.style.display = "none";
    });
  }

  // === GIRO DA IMAGEM COMO MOEDA ===
  const moeda = document.getElementById("moeda");
  if (moeda) {
    const moedaInner = moeda.querySelector(".moeda-inner");

    setTimeout(() => {
      moedaInner.classList.add("girar");
    }, 5000);

    moeda.addEventListener("click", () => {
      moedaInner.classList.toggle("girar");
    });
  }

  // === ANIMAÇÃO DE HABILIDADES ===
  function animarHabilidades() {
    const barras = document.querySelectorAll(".progresso");
    barras.forEach((barra) => {
      const valor = barra.getAttribute("data-progresso");
      barra.style.width = valor; // Espera um valor tipo '80%'
    });
  }

  const habilidadesSection = document.querySelector("#habilidades");

  if (habilidadesSection) {
    const observerHabilidades = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animarHabilidades();
            observer.disconnect(); // Para não animar de novo
          }
        });
      },
      { threshold: 0.1 }
    );

    observerHabilidades.observe(habilidadesSection);
  }

  // Inicializar Glider
  if (document.querySelector(".glider")) {
    new Glider(document.querySelector(".glider"), {
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      dots: ".dots",
      arrows: {
        prev: ".glider-prev",
        next: ".glider-next",
      },
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ],
    });
  }

  // === FOOTER ANIMAÇÃO COM GSAP ===
  const footers = document.querySelectorAll(".site-footer");

  if (footers.length && typeof gsap !== "undefined") {
    footers.forEach((footer) => {
      // Inicializa no estado inicial
      gsap.set(footer, { y: 100, opacity: 0 });

      const footerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Quando footer aparece na tela, anima para visível
              gsap.to(footer, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
              });
            } else {
              // Quando footer sai da tela, reseta para o estado inicial
              gsap.to(footer, {
                y: 100,
                opacity: 0,
                duration: 0.3,
                ease: "power3.out",
              });
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      footerObserver.observe(footer);

      // Força animação se o footer já estiver visível ao carregar a página
      if (footer.getBoundingClientRect().top < window.innerHeight) {
        gsap.to(footer, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });
      }
    });
  }

  //Mensagem do form
  const form = document.getElementById("contato-form");
  const statusDiv = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const data = new FormData(form);
      const action = form.action;

      statusDiv.innerHTML = "Enviando...";
      statusDiv.style.color = "#444";

      try {
        const response = await fetch(action, {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          form.reset();
          statusDiv.innerHTML = "Mensagem enviada com sucesso!";
          statusDiv.style.color = "green";
        } else {
          const result = await response.json();
          if (result.errors) {
            statusDiv.innerHTML = result.errors
              .map((error) => error.message)
              .join(", ");
          } else {
            statusDiv.innerHTML =
              "Erro ao enviar o formulário. Tente novamente.";
          }
          statusDiv.style.color = "red";
        }
      } catch (error) {
        statusDiv.innerHTML = "Erro de conexão. Verifique sua internet.";
        statusDiv.style.color = "red";
      }
    });
  }

  // Obter o botão
  const scrollTopButton = document.querySelector(".scroll-top-btn");

  // Exibir o botão quando o usuário rolar para baixo
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      // Se o usuário rolar 300px ou mais
      scrollTopButton.style.display = "block";
    } else {
      scrollTopButton.style.display = "none";
    }
  });

  // Ao clicar no botão, rola para o topo
  scrollTopButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Rolagem suave
    });
  });
});
