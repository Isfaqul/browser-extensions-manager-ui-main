import Model from './model.js';
import View from './view.js';

async function Controller() {
    let model = await Model();
    let view = View();
    let currentTab = "all"; // All by default
    let currentTheme = 'light' // Light by default

    // Initial render
    view.renderExtensions(model.getAllExtensions())
    // Bind handlers
    view.bindFilterExtensions(handleFilterButton, handleTabChange)
    view.bindExtensionToggle(handleExtensionToggle)
    view.bindExtensionRemoval(handleExtensionRemoval)
    view.bindToggleTheme(handleThemeToggle, handleThemeVarUpdate)

    function handleFilterButton(value) {
        let data;
        if (value === "all") data = model.getAllExtensions();
        else if (value === "active") data = model.getActiveExtensions();
        else if (value === "inactive") data = model.getInactiveExtensions();

        view.renderExtensions(data);
    }

    function handleTabChange(tab) {
        // Update the currentTab whenever it's updated
        currentTab = tab;
    }

    function handleExtensionToggle(id) {
        model.toggleExtension(id); // Update data
        const TOGGLE_RENDER_DELAY = 150;

        // Fetch data accordingly
        let data;

        if (currentTab === "all") data = model.getAllExtensions();
        else if (currentTab === "active") data = model.getActiveExtensions();
        else if (currentTab === "inactive") data = model.getInactiveExtensions();

        // Render in after 200ms to allow switch toggle to show
        setTimeout(() => {
            view.renderExtensions(data)
        }, TOGGLE_RENDER_DELAY);
    }

    function handleExtensionRemoval(id) {
        model.removeExtension(id);
        const REMOVE_RENDER_DELAY = 100;

        // Fetch data accordingly
        let data;

        if (currentTab === "all") data = model.getAllExtensions();
        else if (currentTab === "active") data = model.getActiveExtensions();
        else if (currentTab === "inactive") data = model.getInactiveExtensions();

        // Render in after 200ms to allow switch toggle to show
        setTimeout(() => {
            view.renderExtensions(data)
        }, REMOVE_RENDER_DELAY);
    }

    function handleThemeToggle(button) {
        if (currentTheme === "light") {
            view.hideElement(button.querySelector("#sun-icon"));
            view.showElement(button.querySelector("#moon-icon"));
        } else {
            view.hideElement(button.querySelector("#moon-icon"));
            view.showElement(button.querySelector("#sun-icon"));
        }
    }

    function handleThemeVarUpdate(theme) {
        currentTheme = theme;
    }

}

export default Controller;

