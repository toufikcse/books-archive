document.getElementById('error-message').style.display = 'none';

const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if(searchText === '') {
        displayError('Please Input');
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs, data.numFound))
        .catch(error => displayError(error));
    } 
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = (books, number) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    books.forEach(book => {
        // console.log(book.title);
        // getting image
        try {
        const picUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;     
        
        const div  = document.createElement('div');
        div.classList.add('col');
       
            div.innerHTML = `
            <div class="card h-50">
                <img src="${picUrl}" class="card-img-top" alt="...">
                <div id="card-id" class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h6>Author: ${book.author_name[0]}</h6>
                    <h6>Publisher: ${book.publisher[0]}</h6>
                    <h6>First Publish Year: ${book.first_publish_year}</h6>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
        }
        catch {
            console.log("Error");
        }      
    })

    // total count set
    const countResult = document.getElementById('found-result');
    const div2  = document.createElement('div');
    div2.innerHTML = `<h5>Found Result: ${number}</h5>`;
    countResult.textContent = '';
    countResult.appendChild(div2);  
}