const searchField = document.getElementById('search-field');
const searchResult = document.getElementById('search-result');

const clearField = () => {
    searchField.value = '';
    searchResult.textContent = '';
    document.getElementById('total-result').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';
}
clearField();

const searchBook = () => {
    const searchText = searchField.value;
    if (searchText == '') {
        clearField();
        displayError('Please Enter Search Text!!');
    }
    else {
        clearField();
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
            .catch(() => displayError('Something went wrong, Please try again!!'))
    }
}

const displayTotalResultNumber = number => {
    const totalResult = document.getElementById('total-result');
    totalResult.innerText = `${number} Result's Found`;
    totalResult.style.display = 'block';
}

const displayError = error => {
    const er = document.getElementById('error-message');
    er.innerText = error;
    er.style.display = 'block';
}

const displaySearchResult = data => {
    // console.log(data.docs);
    displayTotalResultNumber(data.numFound);
    data.docs.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 shadow-lg">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://covers.openlibrary.org/b/id/${setText(book.cover_i, '10909258')}-M.jpg"
                            class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title text-success">${book.title}</h5>
                            
                            <p class="card-text">Author: ${setName(book.author_name, 'Author')}</p>
                            
                            <p class="card-text"><small class="text-muted">Edition: ${setText(book.edition_count, 'Unknown Edition')}</small>
                            
                            <p class="card-text"><small class="text-muted">First published in ${setText(book.first_publish_year, 'Unknown Year')}</small>
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
