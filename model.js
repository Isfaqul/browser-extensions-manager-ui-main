async function Model() {
    let data = await fetchData("./data.json")

    async function fetchData(url) {
        const response = await fetch(url);
        let data = await response.json();

        // ID the data
        data = data.map(extension => {
            const id = crypto.randomUUID()
            return {...extension, id};
        })

        return data;
    }

    function toggleExtension(id) {
        data = data.map(extension => {
            if (extension.id === id) {
                return {...extension, isActive: !extension.isActive};
            } else {
                return extension;
            }
        })
    }

    function removeExtension(id) {
        data = data.filter(extension => extension.id !== id);
    }

    function getActiveExtensions() {
        return data.filter(extension => extension.isActive)
    }

    function getInactiveExtensions() {
        return data.filter(extension => !extension.isActive)
    }

    function getAllExtensions() {
        return data;
    }

    function getExtension(id) {
        return data.filter(extension => extension.id === id);
    }

    return {
        getAllExtensions,
        getActiveExtensions,
        getInactiveExtensions,
        removeExtension,
        toggleExtension,
        getExtension
    }
}


export default Model;