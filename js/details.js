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

const container = document.querySelector(".textbody")

async function getDetails() {
    const response = await fetch(url);
    const data = await response.json();
    const link = new URLSearchParams(window.location.search)
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === Number(link.get("id"))) {
            document.title = document.title.replace("Details", data[i].name)
            printDetail(data[i])
        }
    }
}
getDetails()

function printDetail(entryData) {
    const title = document.createElement("h1")
    const entryContainer = document.createElement("div")
    const imageContainer = document.createElement("div")
    const image = document.createElement("img")
    const tagContainer = document.createElement("div")
    const textContainer = document.createElement("div")
    const purchaseContainer = document.createElement("div")
    const price = document.createElement("h2")
    const purchaseLink = document.createElement("a")
    const purchaseButton = document.createElement("div")
    const buttonText = document.createElement("h3")

    title.innerText = entryData.name
    title.classList.add("text-on-dark")

    imageContainer.classList.add("film-entry", "specific-entry")
    image.src = entryData.images[0].src
    image.alt = entryData.images[0].alt
    image.classList.add("film-poster")
    imageContainer.append(image)

    tagContainer.classList.add("film-list-tags")
    tags.forEach(element => {
        for (i = 0; i < entryData.tags.length; i++) {
            if (element.slug === entryData.tags[i].slug) {
                const tagLink = document.createElement("a")
                const tagBox = document.createElement("div")
                const tagText = document.createElement("p")
                tagLink.href = "film-list.html" + "?tags=" + element.slug
                tagBox.classList.add("list-tag", "button")
                tagText.innerText = element.name
                tagBox.append(tagText)
                tagLink.append(tagBox)
                tagContainer.append(tagLink)
            }
        }
    });

    textContainer.classList.add("text-on-dark")
    textContainer.innerHTML = "<b>" + entryData.short_description + "</b>" + "<br>" + entryData.description

    purchaseContainer.classList.add("purchase-container")
    price.classList.add("text-on-dark")
    price.innerText = entryData.prices.price.slice(0, -2) + "." + entryData.prices.price.slice(-2) + entryData.prices.currency_symbol
    purchaseLink.href = "purchase.html"
    purchaseButton.classList.add("buy-buttons", "action-button", "flex")
    buttonText.innerText = "Purchase"
    purchaseButton.append(buttonText)
    purchaseLink.append(purchaseButton)
    purchaseContainer.append(price, purchaseLink)

    entryContainer.append(title, imageContainer, tagContainer, textContainer, purchaseContainer)

    container.append(entryContainer)
}