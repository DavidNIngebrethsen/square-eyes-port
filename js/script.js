url = "https://nicko-skogen.no/square-eyes/wp-json/wc/store/products"

const container = document.querySelector(".frontpage-movies")

async function getFilms() {
    const response = await fetch(url);
    const data = await response.json();
    for (let i = 0; i < 3; i++) {
        printFilm(data[i])
    }
}
getFilms()

function printFilm(data) {
    const link = document.createElement("a")
    const box = document.createElement("div")
    const img = document.createElement("img")
    link.href = "details.html" + "?id=" + data.id
    box.classList.add("film-entry", "button")
    img.src = data.images[0].src
    img.alt = data.images[0].alt
    img.classList.add("film-poster")
    box.append(img)
    link.append(box)
    container.append(link)
}