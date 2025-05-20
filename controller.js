import Model from './model.js';
import View from './view.js';

async function Controller() {
    let model = await Model();
    let view = View();
    let currentTab = "all"; // All by default

    // Initial render
    view.renderExtensions(model.getAllExtensions())
    // Bind handlers
    view.bindFilterExtensions(handleFilterButton, handleTabChange)
    view.bindExtensionToggle(handleExtensionToggle)
    view.bindExtensionRemoval(handleExtensionRemoval)

    function handleFilterButton(value) {
        let data;
        if (value === "all") data = model.getAllExtensions();
        else if (value === "active") data = model.getActiveExtensions();
        else if (value === "inactive") data = model.getInactiveExtensions();

        view.renderExtensions(data);
    }

    function handleTabChange(tab) {
        // Update the currentTab whenever it's updated
        console.log(tab)
        currentTab = tab;
    }

    function handleExtensionToggle(id) {
        model.toggleExtension(id); // Update data

        // Fetch data accordingly
        let data;

        if (currentTab === "all") data = model.getAllExtensions();
        else if (currentTab === "active") data = model.getActiveExtensions();
        else if (currentTab === "inactive") data = model.getInactiveExtensions();

        // Render in after 200ms to allow switch toggle to show
        setTimeout(() => {
            view.renderExtensions(data)
        }, 150);
    }

    function handleExtensionRemoval(id) {
        model.removeExtension(id);

        // Fetch data accordingly
        let data;

        if (currentTab === "all") data = model.getAllExtensions();
        else if (currentTab === "active") data = model.getActiveExtensions();
        else if (currentTab === "inactive") data = model.getInactiveExtensions();

        // Render in after 200ms to allow switch toggle to show
        setTimeout(() => {
            view.renderExtensions(data)
        }, 100);
    }

}

export default Controller;

