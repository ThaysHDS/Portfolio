document.addEventListener("DOMContentLoaded", () => {
  // === BOLINHAS ===
  const maxBolinhas = 150;
  const cores = ["#301832", "#1A6E8A", "#94199E", "#10718B"];
  const container = document.getElementById("floating-bubbles");
  const header = document.querySelector("header");

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
            tocarBolinhas();
          } else {
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

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    toggleBtn.textContent = "🌞";
  } else {
    toggleBtn.textContent = "🌙";
  }

  updateLogo();

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
      barra.style.width = valor;
    });
  }

  const habilidadesSection = document.querySelector("#habilidades");

  if (habilidadesSection) {
    const observerHabilidades = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animarHabilidades();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observerHabilidades.observe(habilidadesSection);
  }

  // === Inicializar Glider ===
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
      gsap.set(footer, { y: 100, opacity: 0 });

      const footerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(footer, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
              });
            } else {
              gsap.to(footer, {
                y: 100,
                opacity: 0,
                duration: 0.3,
                ease: "power3.out",
              });
            }
          });
        },
        { threshold: 0.2 }
      );

      footerObserver.observe(footer);

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

  // === MENSAGEM DO FORMULÁRIO ===
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

  // === BOTÃO SCROLL TO TOP ===
  const scrollTopButton = document.querySelector(".scroll-top-btn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopButton.style.display = "block";
    } else {
      scrollTopButton.style.display = "none";
    }
  });

  scrollTopButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // === GEOLOCALIZAÇÃO COM IPINFO.IO ===
  fetch("https://ipinfo.io/json?token=SEU_TOKEN_AQUI") // <- Substitua com seu token real
    .then((res) => res.json())
    .then((data) => {
      console.log("IP:", data.ip);
      console.log("Cidade:", data.city);
      console.log("Região:", data.region);
      console.log("País:", data.country);
      console.log("Localização (lat,long):", data.loc);
    })
    .catch((err) => {
      console.warn("Erro ao obter geolocalização:", err);
    });
});

