let mainframe = document.getElementById("mainframe");
let navbar = document.getElementById("navbar");

let last_path_set = null;

function pathChange(source, path) {
    if (source === "hash" && path.length > 1) {
        path = path.substring(1);
    }
    if (path === last_path_set) {
        return;
    }
    last_path_set = path;
    if (source !== "iframe") {
        // Force iframe to local website, to avoid security errors
        // related to accessing an iframe on a different domain.
        mainframe.contentWindow.location = window.location.origin;
        mainframe.contentWindow.location.pathname = path;
    }
    if (source !== "hash") {
        window.location.hash = path;
    }
    if (source !== "navbar") {
        navbar.value = path;
    }
}

mainframe.addEventListener("load", function () {
    pathChange("iframe", mainframe.contentWindow.location.pathname);
});
window.addEventListener("hashchange", function() {
    pathChange("hash", window.location.hash);
});
navbar.addEventListener("change", function() {
    pathChange("navbar", navbar.value);
});
pathChange("hash", window.location.hash);
