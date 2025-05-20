async function fetchData() {
    const response = await fetch('./data.json');
    return await response.json();
}


let mainData = await fetchData();

const container = document.querySelector('[data-extension-grid]');

function render(data) {
    container.innerHTML = '';

    data.forEach((item) => {
        let card = createCard(item);
        container.appendChild(card);
    })
}

render(mainData)


function createCard(obj) {
    let article = document.createElement('article');
    article.innerHTML = `
            <article class="extension-item" data-${obj.name}>
            <div class="extension-top-half">
                <img class="extension-icon" src="${obj.logo}" alt="${obj.name} icon">
                <div class="extension-details-wrapper">
                    <h2>${obj.name}</h2>
                    <p>${obj.description}</p>
                </div>
            </div>
            <div class="extension-bottom-half">
                <button type="button" class="btn remove-btn">Remove</button>
                <div class="on-off-toggle-container">
                    <label class="switch">
                        <input type="checkbox" ${obj.isActive ? "checked" : ""} data-toggle-switch>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
        </article>`

    article.addEventListener('click', handleOnOffToggle)

    return article;
}

function handleOnOffToggle(e) {
    let target = e.target;

    if (target.hasAttribute('data-toggle-switch')) {
        let article = target.parentElement.parentElement.parentElement.parentElement;
        let articleName = article.querySelector('h2').textContent;
        let newValue = target.checked;

        // Update Data Array
        updateData(articleName, newValue);
    }
}

function updateData(name, value) {
    mainData = mainData.map((item) => {
        if (item.name === name) {
            return {...item, isActive: value}
        } else {
            return item;
        }
    })
}

const filterButtonsContainer = document.querySelector('.filter-btn-container');
filterButtonsContainer.addEventListener('click', handleFilters)

function handleFilters(e) {
    const target = e.target

    if (target.classList.contains('filter-btn')) {
        if (target.hasAttribute('data-filter-active')) {
            removeActiveClass()
            target.classList.add('active');
            // Render active extensions
            let active = filter("active")
            render(active)
        } else if (target.hasAttribute('data-filter-inactive')) {
            removeActiveClass()
            target.classList.add('active');
            // Render inactive extension
            let inactive = filter("inactive")
            render(inactive)
        } else {
            removeActiveClass()
            target.classList.add('active');
            // render all
            let all = filter("all")
            render(all)
        }
    }
}

function removeActiveClass() {
    let filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(element => {
        element.classList.remove('active');
    });
}

function filter(value = "all") {
    if (value === "active") return mainData.filter((item) => item.isActive)
    else if (value === "inactive") return mainData.filter((item) => !item.isActive)
    else return mainData;
}