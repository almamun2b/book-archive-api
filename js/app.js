const searchField = document.getElementById('search-field');
const searchResult = document.getElementById('search-result');

// clear Field
const clearField = () => {
    searchField.value = '';
    searchResult.textContent = '';
    document.getElementById('total-result').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';
}
clearField();

// Search Books
const searchBook = () => {
    const searchText = searchField.value;
    if (searchText == '') {
        clearField();
        displayError("Input Can't be Empty, Please Enter Search Text!!");
    }
    else {
        clearField();
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
            .catch(() => displayError('Something Went Wrong, Please Try Again!!'))
    }
}

// Display Total Number of Results
const displayTotalResultNumber = number => {
    const totalResult = document.getElementById('total-result');
    if (number === 0) {
        totalResult.innerText = "Oops.. No Results Found!!";
    }
    else {
        totalResult.innerText = `${number} Results Found`;
    }
    totalResult.style.display = 'block';
}

// Display Errors
const displayError = error => {
    const err = document.getElementById('error-message');
    err.innerText = error;
    err.style.display = 'block';
}

// Display Search Result
const displaySearchResult = data => {
    displayTotalResultNumber(data.numFound);
    data.docs.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 shadow-lg">
                <div class="row g-0">
                    <div class="col-md-4 my-auto">
                        <img src="https://covers.openlibrary.org/b/id/${setText(book.cover_i, '10909258')}-M.jpg"
                            class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title text-success">${book.title}</h5>
                            
                            <p class="card-text">Author: ${setName(book.author_name, 'Author')}</p>
                            
                            <p class="card-text"><small class="text-muted">Edition: ${setText(book.edition_count, 'Unknown Edition')}</small>
                            
                            <p class="card-text"><small class="text-muted">First Published in ${setText(book.first_publish_year, 'Unknown Year')}</small>
                            </p>
                            
                            <p class="card-text"><small class="text-muted">Publisher: ${setName(book.publisher, 'Publisher')}</small>
                            
                            <p class="card-text"><small class="text-muted">Language: ${setText(book.language, 'Not Specified')}, ISBN: ${setText(book.isbn, 'Unknown ISBN')}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
}

// Set Authors & Publishers Name
const setName = (nameArray, errorName) => {
    if (nameArray === undefined) {
        return `Unknown ${errorName}`;
    }
    else {
        const name = nameArray.join(', ');
        if (name.length < 100) {
            return name;
        }
        else {
            return name.slice(0, 100);
        }
    }
}

// Set Books Edition, Published Year, Language & ISBN
const setText = (properties, errorMessage) => {
    if (properties === undefined) {
        return errorMessage;
    }
    else {
        if (Array.isArray(properties)) {
            return properties[0];
        }
        else {
            return properties;
        }
    }
}
