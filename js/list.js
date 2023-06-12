url = "https://nicko-skogen.no/square-eyes/wp-json/wc/store/products"

const tags = [
    {
        name: "Action",
        slug: "action",
    },
    {
        name: "Comedy",
        slug: "comedy",
    },
    {
        name: "Thriller",
        slug: "thriller",
    },
    {
        name: "Drama",
        slug: "drama",
    },
    {
        name: "Live Action",
        slug: "live-action",
    },
    {
        name: "Animated",
        slug: "animated",
    },
]

const container = document.querySelector(".film-scroll")
const tagCont = document.querySelector(".film-list-tags")

async function getFilms() {
    const response = await fetch(url);
    const data = await response.json();
    const link = new URLSearchParams(window.location.search)
    if (link.get("tags")) {
        for(let i = 0; i < data.length; i++) {
            if (link.get("tags") === data[i].tags[0].slug || link.get("tags") === data[i].tags[1].slug) {
                printFilm(data[i])
            }
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            printFilm(data[i])
        }
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

function printTagList() {
    tags.forEach(element => {
        printTag(element)
    });
}

function printTag(tag) {
    const tagLink = document.createElement("a")
    const tagBox = document.createElement("div")
    const tagText = document.createElement("p")
    tagLink.href = "film-list.html" + "?tags=" + tag.slug
    tagBox.classList.add("list-tag", "button")
    tagText.innerText = tag.name
    tagBox.append(tagText)
    tagLink.append(tagBox)
    tagCont.append(tagLink)
}

printTagList()