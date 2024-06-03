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

                img.src = `https://raw.githubusercontent.com/STORDIS/monsoon/main/${
                    ary[len - 2]
                }/${ary[len - 1]}`;
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


fetchReadme("STORDIS", "orca_nw_lib");

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

// function to set the link active state
function setActive(link) {
    const links = document.querySelectorAll(".sub-link");
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
}
