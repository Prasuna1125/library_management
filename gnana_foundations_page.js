let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults")
let spinnerEl = document.getElementById("spinner")
let messageEl = document.getElementById("message")
let heading = document.createElement("h1")

function createAndAppend(search_results) {
    if (search_results.length < 1) {
        messageEl.textContent = "No Results Found";
        searchResultsEl.textContent = "";
        heading.textContent = "";
    } else {
        searchResultsEl.textContent = "";
        messageEl.textContent = "";
        heading.textContent = "Popular Books"
        for (let each of search_results) {
            let title = each.title;
            let image = each.imageLink;
            let author = each.author;
            let imageEl = document.createElement("img")
            let textEl = document.createElement("p")
            imageEl.setAttribute("src", image)
            textEl.textContent = author;
            searchResultsEl.appendChild(imageEl)
            searchResultsEl.appendChild(textEl)
        }
    }
}
searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none")
        let searchInputVal = searchInputEl.value
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputVal
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json()
            }).then(function(jsonData) {
                let {
                    search_results
                } = jsonData
                createAndAppend(search_results)
                spinnerEl.classList.toggle("d-none")
            })
    }
})