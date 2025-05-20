function View() {
    const container = document.querySelector('.extensions-grid');
    let currentTab = "all";

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

    function bindFilterExtensions(filterHandler) {
        const filterBtnContainer = document.querySelector('.filter-btn-container');
        filterBtnContainer.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('filter-btn')) {
                // Handle active class toggle
                removeClass(target.parentElement.children, "active")
                addClass(target, "active")

                // update current Tab value
                currentTab = target.value;
                filterHandler(currentTab);
            }
        });
    }

    // Helper to remove classes
    function removeClass(elements, className) {
        Array.from(elements).forEach((element) => {
            element.classList.remove(className);
        })
    }

    // Helper to add classes
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

    function getCurrentTab() {
        return currentTab;
    }

    function bindExtensionRemoval(handler) {
        container.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('remove-btn')) {
                handler(target.closest(".extension-item").id);
            }
        })
    }

    return {renderExtensions, bindFilterExtensions, getCurrentTab, bindExtensionToggle, bindExtensionRemoval}
}

export default View;