const searchResult = document.getElementById('search-result');

const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    console.log(searchText);

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs))
}


displaySearchResult = data => {
    console.log(data);
    data.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"
                            class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">By ${authorName(book.author_name)}</p>
                            <p class="card-text"><small class="text-muted">First published in ${book.first_publish_year}</small>
                            </p>
                            <p class="card-text"><small class="text-muted">Edition: ${book.edition_count}</small>
                            <p class="card-text"><small class="text-muted">Pulisher: ${authorName(book.publisher)}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
}

// ${ authorName(book.author_name) }
const authorName = nameArray => {
    // console.log(nameArray);
    if (nameArray == undefined) {
        return "Unknown Author";
    }
    else {
        return nameArray[0];
        // for (let name of nameArray) {
        //     name = name + ' ';
        //     console.log(name)
        //     return name;
        // }
    }

}