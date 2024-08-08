// function to fetch the readme.md from the git hub repository

async function fetchReadme(owner, repo) {
    const readmeUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;

    // Fetch the README file
    fetch(readmeUrl)
        .then((response) => response.text())
        .then((markdown) => {
            const html = marked.parse(markdown);

            document.getElementById("readme-content").innerHTML = html;

            const images = document.querySelectorAll("#readme-content img");
            images.forEach((img) => {
                // If the image source is relative, convert it to an absolute URL

                let len = img.src.split("/").length;
                let ary = img.src.split("/");

                if (
                    ary[len - 1].includes(".jpg") ||
                    ary[len - 1].includes(".png")
                ) {
                    img.src = `https://raw.githubusercontent.com/${owner}/${repo}/main/${
                        ary[len - 2]
                    }/${ary[len - 1]}`;

                    img.setAttribute("width", "500");
                    img.setAttribute("height", "325");
                } else {
                    img.style.width = "auto";
                }
            });

            // add bootstrap class to table
            const tables = document.querySelectorAll("#readme-content table");
            tables.forEach((table) => {
                table.classList.add("table");
                table.classList.add("table-bordered");
            });
        })
        .catch((error) => {});
}

//fetchReadme("STORDIS", "orca_nw_lib");

// function to make the side bar sticky when the page is scrolled down
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const sidebarTop = sidebar.offsetTop;

    window.addEventListener("scroll", function () {
        if (window.scrollY >= sidebarTop) {
            sidebar.classList.add("fixed");
        } else {
            sidebar.classList.remove("fixed");
        }
    });
});

let active_id = "orca_content";

// function to set the link active state
function setActive(id) {
    active_id = id;
    const links = document.querySelectorAll(".sub-link");
    links.forEach((l) => l.classList.remove("active"));
    const link = document.getElementById(id);
    if (link) {
        link.classList.add("active");
    }

    let valid_ids = ["orca_video_content", "monsoon_video_content"]; // id's add in this array will not be shown with buttons

    if (valid_ids.includes(active_id)) {
        document.getElementById("pdf_button").classList.add("d-none");
        document.getElementById("dox_button").classList.add("d-none");
    } else {
        document.getElementById("pdf_button").classList.remove("d-none");
        document.getElementById("dox_button").classList.remove("d-none");
    }
}

function get_orca_content() {
    return fetch("./orca_content.html")
        .then((response) => response.text())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error loading HTML file:", error);
        });
}

function get_orca_video_content() {
    return fetch("./orca_video_content.html")
        .then((response) => response.text())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error loading HTML file:", error);
        });
}

function get_monsoon_video_content() {
    return fetch("./monsoon_video_content.html")
        .then((response) => response.text())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error loading HTML file:", error);
        });
}

function loadContent(htmlContent) {
    const contentContainer = document.getElementById("readme-content");
    contentContainer.innerHTML = htmlContent;
}

get_orca_content().then((content) => {
    loadContent(content);
});

// ============================================

function downloadHtmlAsDocx() {
    var preHtml =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html =
        preHtml +
        document.getElementById("readme-content").innerHTML +
        postHtml;

    var blob = new Blob(["\ufeff", html], {
        type: "application/msword",
    });

    var url =
        "data:application/vnd.ms-word;charset=utf-8," +
        encodeURIComponent(html);

    filename = active_id + ".doc";

    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        downloadLink.href = url;

        downloadLink.download = filename;

        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}

function downloadPDF() {
    var content = document.getElementById("readme-content").innerHTML;

    content = replaceImageURLs(content);

    var options = {
        margin: [0.5, 0.5, 0.5, 0.5], // top, left, bottom, right margins
        filename: `${active_id}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf().set(options).from(content).save();
}

function replaceImageURLs(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const urlToRemove =
        "https://raw.githubusercontent.com/STORDIS/stordis.github.io/main/";

    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
        const src = img.getAttribute("src");
        if (src && src.includes(urlToRemove)) {
            img.setAttribute("src", src.replace(urlToRemove, ""));
        }
    });

    const updatedHTML = new XMLSerializer().serializeToString(doc);
    return updatedHTML;
}
