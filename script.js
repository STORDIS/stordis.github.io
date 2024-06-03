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

                img.src = `https://raw.githubusercontent.com/${owner}/${repo}/main/${
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

// function to set the link active state
function setActive(id) {
    const links = document.querySelectorAll(".sub-link");
    links.forEach((l) => l.classList.remove("active"));
    const link = document.getElementById(id);
    if (link) {
        link.classList.add("active");
    }
}

var orca_content = `<h1>ORCA - An OpenSource Orchestration Solution for SONiC</h1>
<ul>
<li> ORCA has following 3 Major components-
<ul>
<li class="link" id="orca_nw_lib" onclick="setActive('orca_nw_lib'),fetchReadme('STORDIS', 'orca_nw_lib')" >ORCA Network Library</li>
<li class="link" id="orca_ui" onclick="setActive('orca_ui'), fetchReadme('STORDIS', 'orca_ui')" >ORCA Backend</li>
<li class="link" id="orca_backend" onclick="setActive('orca_backend'), fetchReadme('STORDIS', 'orca_backend')" >ORCA UI</li>
</ul>
</li>
<li>Network Topology maintained Neo4j graph database.</li>
<li>Realtime updates in DB using gNMI subscriptions.</li>
<li>ORCA can discover and configure -
<ul>
<li>Interfaces</li>
<li>LLDP Neighbor Links</li>
<li>Port Groups</li>
<li>MCLAG with peer links</li>
<li>BGP and Neighbor links</li>
<li>VLAN</li>
</ul>
</li>


<li>Live Demo -
<ul>
<li><a href="http://orca.stordis.com:8880/">ORCA</a></li>
<li><a href="http://orcadb.stordis.com:8881/">ORCA Topology Database</a></li>
</ul>
</li>



</ul>
<h3> ORCA Architecture </h3>
<img class="diagram" src=orca_design.jpg alt="Orca Design"></img>
<h2>ORCASK - AI Enabled chatbot for SONiC configuration</h2>
<img class="diagram" src=orcask.jpg alt="Orca Design"></img>`;

var orca_video_content = `
<h2>ORCA Video Tutorials</h2>
<iframe width="560" height="315" src="https://www.youtube.com/embed/t38xiw1rfUs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/5aMdCqaim7A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;

var monsoon_video_content = `
<h2>ORCA Video Tutorials</h2>
<iframe width="560" height="315" src="https://www.youtube.com/embed/T1hULsw59n0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/VG8nhtzPtj4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;

function loadContent(htmlContent) {
    const contentContainer = document.getElementById("readme-content");
    contentContainer.innerHTML = htmlContent;
}

loadContent(orca_content);
