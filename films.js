let currentPageUrl = 'https://swapi.dev/api/films/'

window.onload = async () => {
    try {
        await loadFilms(currentPageUrl)
    } catch (error) {
        console.log(error)
        alert ('Error loading cards')
    }
}

async function loadFilms(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    try {

        const response = await fetch(url)
        const responseJson = await response.json()

        responseJson.results.forEach((films) => {
            const card = document.createElement("div")
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/films/${films.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const filmsNameBG = document.createElement("div")
            filmsNameBG.className = "films-name-bg"

            const filmsName = document.createElement("span")
            filmsName.className = "films-name"
            filmsName.innerText = `${films.title}`

            filmsNameBG.appendChild(filmsName)
            card.appendChild(filmsNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const filmsImage = document.createElement("div")
                filmsImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/films/${films.url.replace(/\D/g, "")}.jpg')`
                filmsImage.className = "films-image"

                const title = document.createElement("span")
                title.className = "films-details"
                title.innerText = `Title: ${films.title}`

                const episode = document.createElement("span")
                episode.className = "films-details"
                episode.innerText = `Episode: ${films.episode_id}`

                const producer = document.createElement("span")
                producer.className = "films-details"
                producer.innerText = `Producer: ${films.producer}`

                const director = document.createElement("span")
                director.className = "films-details"
                director.innerText = `Director: ${films.director}`

                const releaseDate = document.createElement("span")
                releaseDate.className = "films-details"
                releaseDate.innerText = `Release date: ${films.release_date}`

                modalContent.appendChild(filmsImage)
                modalContent.appendChild(title)
                modalContent.appendChild(episode)
                modalContent.appendChild(producer)
                modalContent.appendChild(director)
                modalContent.appendChild(releaseDate)
            }

            mainContent.appendChild(card)
        })

        currentPageUrl = url
        
    } catch (error) {
        alert('Error loading films')
        console.log(error)
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}