function View() {
    const container = document.querySelector('.extensions-grid');
    let currentTheme = 'light';

    // Render Extensions
    function renderExtensions(extensions) {
        container.innerHTML = ''; // Clear existing content first

        extensions.forEach(extension => {
            let element = createExtensionElement(extension);
            container.appendChild(element);
        })
    }

    // Create extension card
    function createExtensionElement(extension) {
        const element = document.createElement('article');
        element.id = extension.id;
        element.classList.add("extension-item");
        element.innerHTML = `
            <div class="extension-top-half">
                <img class="extension-icon" src="${extension.logo}" alt="${extension.name} logo">
                <div class="extension-details-wrapper">
                    <h2>${extension.name}</h2>
                    <p>${extension.description}</p>
                </div>
            </div>
            <div class="extension-bottom-half">
                <button type="button" class="btn remove-btn">Remove</button>
                <div class="on-off-toggle-container">
                    <label class="switch">
                        <input type="checkbox" class="extension-toggle-switch" ${extension.isActive ? "checked" : ""}>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            `

        return element;
    }


    function bindFilterExtensions(filterHandler, tabChangeHandler) {
        const filterBtnContainer = document.querySelector('.filter-btn-container');
        filterBtnContainer.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('filter-btn')) {

                // Handle active class toggle in filter buttons
                removeClass(target.parentElement.children, "active")
                addClass(target, "active")

                filterHandler(target.value); // To handle filtering logic
                tabChangeHandler(target.value); // To update current Tab in Controller
            }
        });
    }

    // Helper to remove classes
    function removeClass(elements, className) {
        Array.from(elements).forEach((element) => {
            element.classList.remove(className);
        })
    }

    // Helper to add class
    function addClass(element, className) {
        element.classList.add(className);
    }


    function bindExtensionToggle(handler) {
        container.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('extension-toggle-switch')) {
                // get extension id
                handler(target.closest(".extension-item").id);
            }
        })
    }


    function bindExtensionRemoval(handler) {
        container.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('remove-btn')) {
                handler(target.closest(".extension-item").id);
            }
        })
    }

    function bindToggleTheme(handler, themeVarHandler) {
        const themeButton = document.querySelector('.theme-toggle-btn');
        themeButton.addEventListener('click', (e) => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.body.classList.toggle('dark');

            themeVarHandler(currentTheme);
            handler(themeButton)
        })
    }

    function hideElement(element) {
        element.style.display = 'none';
    }

    function showElement(element) {
        element.style.display = 'block';
    }

    return {
        renderExtensions,
        bindFilterExtensions,
        bindExtensionToggle,
        bindExtensionRemoval,
        bindToggleTheme,
        hideElement,
        showElement
    }
}

export default View;