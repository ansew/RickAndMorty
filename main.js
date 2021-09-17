document.addEventListener("DOMContentLoaded", function (event) {

    const defaultURL = "https://rickandmortyapi.com/api/character?page=";
    const container = document.querySelector('.container');
    const paginationWrapper = document.querySelector(".pagination .buttons")  // zasto obe klase?
    const prevArrow = document.querySelector('.first');
    const nextArrow = document.querySelector('.last');
    const butt = document.getElementsByTagName('span');
    let activePage = 1;
    let totalPages = 1;

    let fetchCharacter = function (url) {
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (data) {
            const character = data.results;
            totalPages = data.info.pages

            data.info.prev && prevArrow.setAttribute('data-url', data.info.prev)
            data.info.next && nextArrow.setAttribute('data-url', data.info.next)

            // pagination render
            renderPagination()
            //render
            renderChracters(character)
        })
    }
    // on load call fetch with default url with page 1
    fetchCharacter(defaultURL + 1);

    function renderChracters(chacters) {
        container.innerHTML = '';
        chacters.forEach(e => {
            let img = e.image;
            let name = e.name;
            container.innerHTML += `<div class='frame'><img src=${img} alt=${name}> <p> ${name}</p> <button>Like</button></div>`;
        });
    }

    prevArrow.addEventListener('click', function (event) {
        const newUrl = event.target.getAttribute('data-url');
        if (newUrl) {
            console.log(newUrl);
            activePage = Number(urlParser(newUrl, "page"))
            fetchCharacter(newUrl);
        }
    });

    nextArrow.addEventListener('click', function (event) {
        const newUrl = event.target.getAttribute('data-url');
        if (newUrl) {
            console.log(newUrl);
            activePage = Number(urlParser(newUrl, "page"))
            fetchCharacter(newUrl);
        }
    });

    function renderPagination() {
        paginationWrapper.innerHTML = ""

        const min = activePage - 4 >= 0 ? activePage - 4 : 0
        const max = activePage + 3 >= totalPages ? totalPages : activePage + 3

        for (let i = min; i < max; i++) {
            paginationWrapper.innerHTML += `<span class="${activePage === i+1 ? 'active': ''}" data-page="${i+1}">${i+1}</span>`
        }
        
        Array.from(paginationWrapper.children).forEach(button => {
            button.addEventListener("click", (e) => {
                const page = Number(e.target.dataset.page)
                activePage = page
                fetchCharacter(defaultURL + page)
            })
        })
    }

    // https://dmitripavlutin.com/parse-url-javascript/
    function urlParser(url, query) {
        const parser = new URL(url)
        return parser.searchParams.get(query)
    }
});