function aprimenu(event) {
    const burger = document.querySelector("#burger");
    const menutendina = document.querySelector("#menutendina");
    const header=document.querySelector("#header")
    document.body.classList.add("no_scroll");
    menutendina.classList.remove("hidden");
    burger.classList.add("hidden");
    header.style.justifyContent="right";
    event.stopPropagation();
    document.addEventListener("click", chiudiMenu);
}

function chiudiMenu(event){
    const menu = document.querySelector("#menutendina");
        if (!menu.contains(event.target)) {
            const burger = document.querySelector("#burger");
            const header=document.querySelector("#header")
            menutendina.classList.add("hidden");
            burger.classList.remove("hidden");
            header.style.justifyContent="space-between";
            document.body.classList.remove("no_scroll");
            event.stopPropagation();
        }
}

function opensearchbar(event) {
    const search = event.currentTarget
    search.removeEventListener("click", opensearchbar);
    document.addEventListener("click", closeSearchbar);
    const searchbar = document.createElement("input");
    const searching= search.parentElement;
    searchbar.type = "text";
    searchbar.id = "searchbar";
    searchbar.placeholder = "Cerca...";
    searching.appendChild(searchbar);
    searchbar.addEventListener("input", ricerca);
}

function closeSearchbar(event) {
    const searchbar = document.querySelector("#searchbar");
    const search= event.currentTarget.querySelector(".search");
    if (searchbar && !searchbar.contains(event.target) && event.target.id !== "search") {
        searchbar.remove();
        search.addEventListener("click", opensearchbar);
        document.removeEventListener("click", closeSearchbar);
    }
}

function ricerca() {
    const searchbar = document.querySelector("#searchbar");
    const query = searchbar.value.toLowerCase();
    const items = document.querySelectorAll(".listd1");
    for (const item of items) {
        const textContent = item.textContent.toLowerCase();
        if (textContent.includes(query) || (item.dataset.facolta && item.dataset.facolta.toLowerCase().includes(query))) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
    }
}

function inevidenza(event) {
    const evidenzatendina = document.querySelector("#evidenzatendina");
    const evidence_box = document.querySelector(".evidence_box");
    if (evidence_box && evidence_box.classList.contains("hidden")) {
        evidence_box.classList.remove("hidden");
        evidenzatendina.removeEventListener("click", inevidenza);
        document.addEventListener("click", chiudiEvidenza);
        event.stopPropagation();
    }
}

function chiudiEvidenza(event){
    const evidenzatendina = document.querySelector("#evidenzatendina");
    const evidence_box=document.querySelector(".evidence_box");
    if (evidence_box && !evidence_box.contains(event.target)) {
        evidence_box.classList.add("hidden");
        evidenzatendina.addEventListener("click", inevidenza);
        document.removeEventListener("click", chiudiEvidenza);
    }   
}

function browsedipartimenti(event) {
    const dipartimenti = document.querySelector("#dipartimenti");
    const sceltamininav= document.querySelector("#sceltamininav");
    const dipartimentibox= document.querySelector("#dipartimenti_box");
    const back=document.createElement("img");
    const items = document.querySelectorAll(".listd1");
    const welcome= document.querySelector("#welcome");
    for (const item of items) {
        item.classList.remove("hidden");
    }
    back.style.cursor="pointer";
    back.src="back.png";
    back.style.float="left";

    sceltamininav.classList.add("hidden");
    welcome.classList.add("hidden");
    if(dipartimenti && dipartimenti.classList.contains("hidden")){
        dipartimenti.classList.remove("hidden");
    }
    if(dipartimentibox && dipartimentibox.classList.contains("hidden")){
        dipartimentibox.classList.remove("hidden");
    }
    event.stopPropagation();
    dipartimenti.prepend(back);
    back.addEventListener("click", gobackdipartimenti);
}

function gobackdipartimenti(event){
    const dipartimenti = document.querySelector("#dipartimenti");
    const sceltamininav= document.querySelector("#sceltamininav");
    const dipartimentibox= document.querySelector("#dipartimenti_box");
    const welcome= document.querySelector("#welcome");

    dipartimenti.classList.add("hidden");
    dipartimentibox.classList.add("hidden");
    if(sceltamininav && sceltamininav.classList.contains("hidden")){
        sceltamininav.classList.remove("hidden");
    }
    if(welcome && welcome.classList.contains("hidden")){
        welcome.classList.remove("hidden");
    }
    event.currentTarget.remove();
}
function browselibri(event) {
    const libriuniversitari = document.querySelector("#libriuniversitari");
    const sceltamininav= document.querySelector("#sceltamininav");
    const libribox= document.querySelector("#libri_box");
    const back=document.createElement("img");
    const items = document.querySelectorAll(".listl1");
    const welcome= document.querySelector("#welcome");
    welcome.classList.add("hidden");

    for (const item of items) {
        item.classList.remove("hidden");
    }
    back.style.cursor="pointer";
    back.src="back.png";
    back.style.float="left";

    sceltamininav.classList.add("hidden");
    if(libriuniversitari && libriuniversitari.classList.contains("hidden")){
        libriuniversitari.classList.remove("hidden");
    }
    if(libribox && libribox.classList.contains("hidden")){
        libribox.classList.remove("hidden");
    }
    event.stopPropagation();
    libriuniversitari.prepend(back);
    back.addEventListener("click", gobacklibri);

    rest_url="http://openlibrary.org/subjects/textbooks.json";
    fetch(rest_url).then(onresponse).then(onjson);
}

function onresponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("PROBLEMA");
    }
}

function onjson(json) {
    console.log('JSON ricevuto');
    const libribox = document.querySelector("#libri_box");
    libribox.innerHTML = "";
    let num_res=json.work_count;
    if(num_res>20){
        num_res=20;
    }
    else{
        console.log("errore");
    }
    for(let i=0; i<num_res; i++)
        {
          const doc = json.works[i];
          if (doc && doc.title.length > 20) {
            doc.title = doc.title.slice(0, 20) + "...";
          }
          else if(!doc){
            break;
          }
          const title = doc.title;
          
          const cover_url = 'http://covers.openlibrary.org/b/id/' + doc.cover_id + '-L.jpg';
          const book = document.createElement('div');
          book.classList.add('listd1');
          const img = document.createElement('img');
          img.src = cover_url;
          img.style.maxHeight="200px";
          img.style.maxWidth="200px";
          const br=document.createElement("br");
          const caption = document.createElement("span");
          caption.textContent = title;
          book.appendChild(img);
          book.appendChild(br);
          book.appendChild(caption);
          libribox.appendChild(book);
        }

}

function gobacklibri(event){
    const libriuniversitari = document.querySelector("#libriuniversitari");
    const sceltamininav= document.querySelector("#sceltamininav");
    const libribox= document.querySelector("#libri_box");
    const welcome= document.querySelector("#welcome");

    libriuniversitari.classList.add("hidden");
    libribox.classList.add("hidden");
    if(sceltamininav && sceltamininav.classList.contains("hidden")){
        sceltamininav.classList.remove("hidden");
    }

    if(welcome && welcome.classList.contains("hidden")){
        welcome.classList.remove("hidden");
    }
    event.currentTarget.remove();
}

const burger = document.querySelector('#burger');
burger.addEventListener('click', aprimenu);

const searchall = document.querySelectorAll('.search');
for (const search of searchall) {
    search.addEventListener('click', opensearchbar);
}

let token = null;

function ontokenresponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("PROBLEMA");
    }
}

function ontokenjson(json) {
    token = json.access_token;
    console.log(token);
    fetchMusicData();
}

function onresponse2(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("PROBLEMA");
    }
}

function onjson2(json) {
    console.log(json);
    const musicabox = document.querySelector("#musica_box");
    musica.innerHTML = "";
    let num_res = json.tracks.items.length;
    if(num_res>20){
        num_res=20;
    }
    else{
        console.log("errore");
    }
    for(let i=0; i<num_res; i++)
        {
          const doc = json.tracks.items[i];
          const name = doc.track.name;
          const cover_url = doc.track.album.images[0].url;
          const spotify_url = doc.track.external_urls.spotify;
          const traccia = document.createElement('div');
          traccia.classList.add('listd1');
          traccia.style.cursor = "pointer";
          traccia.addEventListener('click', () => {
              window.open(spotify_url, '');
          });
          const img = document.createElement('img');
          img.src = cover_url;
          img.style.maxHeight = "200px";
          img.style.maxWidth = "200px";
          const br = document.createElement("br");
          const caption = document.createElement("span");
          caption.textContent = name;
          traccia.appendChild(img);
          traccia.appendChild(br);
          traccia.appendChild(caption);
          musicabox.appendChild(traccia);
        }
}

function fetchMusicData() {
    const playlist_value = "7id2MqDNGaebcgGufiAEtb";
    fetch("https://api.spotify.com/v1/playlists/" + playlist_value, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }).then(onresponse2).then(onjson2).catch(error => console.error("ERRORE", error));
}

function browsemusica(event) {
    const client_id = "SECRET";
    const client_secret = "SECRET";
    const musicauniversitaria = document.querySelector("#musicauniversitaria");
    const sceltamininav = document.querySelector("#sceltamininav");
    const musicabox = document.querySelector("#musica_box");
    const back = document.createElement("img");
    const items = document.querySelectorAll(".listm1");
    const welcome = document.querySelector("#welcome");
    welcome.classList.add("hidden");

    for (const item of items) {
        item.classList.remove("hidden");
    }
    back.style.cursor = "pointer";
    back.src = "back.png";
    back.style.float = "left";

    sceltamininav.classList.add("hidden");
    if (musicauniversitaria && musicauniversitaria.classList.contains("hidden")) {
        musicauniversitaria.classList.remove("hidden");
    }
    if (musicabox && musicabox.classList.contains("hidden")) {
        musicabox.classList.remove("hidden");
    }
    event.stopPropagation();
    musicauniversitaria.prepend(back);
    back.addEventListener("click", gobackmusica);

    fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        }
    }).then(ontokenresponse).then(ontokenjson);
}

function gobackmusica(event){
    const musicauniversitaria = document.querySelector("#musicauniversitaria");
    const sceltamininav= document.querySelector("#sceltamininav");
    const musicabox= document.querySelector("#musica_box");
    const welcome= document.querySelector("#welcome");

    musicauniversitaria.classList.add("hidden");
    while (musicabox.firstChild) {
        musicabox.removeChild(musicabox.firstChild);
    }
    musicabox.classList.add("hidden");
    if(sceltamininav && sceltamininav.classList.contains("hidden")){
        sceltamininav.classList.remove("hidden");
    }

    if(welcome && welcome.classList.contains("hidden")){
        welcome.classList.remove("hidden");
    }
    event.currentTarget.remove();
}


const evidenzatendina = document.querySelector("#evidenzatendina");
evidenzatendina.addEventListener("click", inevidenza)

const browse = document.querySelector("#browse");
browse.addEventListener("click", browsedipartimenti);

const libribrowse=document.querySelector("#libri");
libribrowse.addEventListener("click", browselibri);

const musicabrowse=document.querySelector("#musica");
musicabrowse.addEventListener("click", browsemusica);