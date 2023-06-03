let currentPageUrl = 'https://swapi.dev/api/species/'

window.onload = async () => {
    try {
        await loadSpecies(currentPageUrl)
    } catch (error) {
        console.log(error)
        alert ('Error loading cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
}

async function loadSpecies(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    try {

        const response = await fetch(url)
        const responseJson = await response.json()

        responseJson.results.forEach((species) => {
            const card = document.createElement("div")
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/species/${species.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const speciesNameBG = document.createElement("div")
            speciesNameBG.className = "species-name-bg"

            const speciesName = document.createElement("span")
            speciesName.className = "species-name"
            speciesName.innerText = `${species.name}`

            speciesNameBG.appendChild(speciesName)
            card.appendChild(speciesNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const speciesImage = document.createElement("div")
                speciesImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/species/${species.url.replace(/\D/g, "")}.jpg')`
                speciesImage.className = "species-image"

                const name = document.createElement("span")
                name.className = "species-details"
                name.innerText = `Name: ${species.name}`

                const classification = document.createElement("span")
                classification.className = "species-details"
                classification.innerText = `Classification: ${species.classification}`

                const designation = document.createElement("span")
                designation.className = "species-details"
                designation.innerText = `Designation: ${species.designation}`

                const averageHeight = document.createElement("span")
                averageHeight.className = "species-details"
                averageHeight.innerText = `Average Height: ${convertHeight(species.average_height)}`

                const averageLifespan = document.createElement("span")
                averageLifespan.className = "species-details"
                averageLifespan.innerText = `Average Lifespan: ${convertLifespan(species.average_lifespan)}`

                const language = document.createElement("span")
                language.className = "species-details"
                language.innerText = `Language: ${species.language}`

                const hairColors = document.createElement("span")
                hairColors.className = "species-details"
                hairColors.innerText = `Hair Colors: ${species.hair_colors}`

                const eyeColors = document.createElement("span")
                eyeColors.className = "species-details"
                eyeColors.innerText = `Eye Colors: ${species.eye_colors}`

                const skinColors = document.createElement("span")
                skinColors.className = "species-details"
                skinColors.innerText = `Skin Colors: ${species.skin_colors}`

                modalContent.appendChild(speciesImage)
                modalContent.appendChild(name)
                modalContent.appendChild(classification)
                modalContent.appendChild(designation)
                modalContent.appendChild(averageHeight)
                modalContent.appendChild(averageLifespan)
                modalContent.appendChild(language)
                modalContent.appendChild(hairColors)
                modalContent.appendChild(eyeColors)
                modalContent.appendChild(skinColors)
            }

            mainContent.appendChild(card)
        })

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url
        
    } catch (error) {
        alert('Error loading species')
        console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadSpecies(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Error loading next page')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadSpecies(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Error loading previous page')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertHeight(averageHeight) {
    return (averageHeight / 100).toFixed(2)
}

function convertLifespan(averageLifespan) {
    return `${averageLifespan} years`
}