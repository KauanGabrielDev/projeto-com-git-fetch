const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info"> <img src="${
      user.avatarUrl
    }" alt="Foto do perfil do usuário"/>
  
      <div class="data"
          <h1>${user.name ?? "Não possui nome cadastrado 😢"}</h1>
          <p>${user.bio ?? "Não possui bio cadastrada 😢"}</p>
          <div class ="follows">
      <h2>👀 Seguidores ${user.followers}</h2>
      <h2>💖 Seguindo ${user.following}</h2>
      </div>
      </div>
      
      </div>`;

    let repositoriesItens = "";
    user.repositories.forEach(
      (repo) =>
        (repositoriesItens += `<li><a href="${
          repo.html_url
        }" target ="_blank">${repo.name}
        <ul>
        <li class ="repositories-info">🍴 ${repo.forks}</li>
        <li class ="repositories-info">⭐ ${repo.stargazers_count}</li>
        <li class ="repositories-info">👀 ${repo.watchers}</li>
        <li class ="repositories-info">👨‍💻 ${
          repo.language ?? "Linguagem não definida"
        }</li>
        </ul>
        </a>
       
        </li>`)
    );
    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
      <h2>Repositórios</h2>
      <ul>${repositoriesItens}</ul>
      </div>`;
    }

    let eventsItens = "";
    user.events.forEach((event) => {
      if (event.type === "PushEvent") {
        eventsItens += `<li><h3>${event.repo.name}</h3>
        <p>=>${event.payload.commits[0].message}</p>
        </li>`;
      } else {
        eventsItens += `
        <li>
        <h3>${event.repo.name}</h3>
        <p> Criado um ${event.payload.ref_type}</p>
        </li>
        `;
      }
    });

    this.userProfile.innerHTML += `<div class = "events section">
    <h2>Eventos</h2>
    <ul class ="eventlist">${eventsItens}</ul>
  </div>`;
  },

  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
