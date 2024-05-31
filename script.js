// async function fetchReadme() {
async function fetchReadme(owner, repo) {
    // const owner = "STORDIS";
    // const repo = "monsoon";

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

                let temp = img.src.replace("http://127.0.0.1:5500", "");

                img.src = `https://raw.githubusercontent.com/STORDIS/monsoon/main/${temp}`;
            });
        })
        .catch((error) => {});
}

// fetchReadme();
fetchReadme("STORDIS", "monsoon");

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

function setActive(link) {
    const links = document.querySelectorAll(".sub-link");
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
}
