const $sites = $(".sites")
const $lastLi = $sites.find(".add-button")
const navigation = localStorage.getItem("navigation")
const navigationObject = JSON.parse(navigation)
const hashMap = navigationObject || [
    {
        abbreviation: "Y",
        url:"https://www.youtube.com",
        domain:"Youtube"
    },
    {
        abbreviation:"A",
        url:"https://www.amazon.ca",
        domain:"Amazon"
    },
    {
        abbreviation:"F",
        url:"https://www.facebook.com",
        domain:"Facebook"
    }
]

const render = () =>{
    $sites.find("li:not(.add-button)").remove();
    hashMap.forEach((node, index) =>{
        $(`
        <li class="site">
            <a href=${node.url}>
                <div class="site-abbreviation">${node.abbreviation}</div>
                <div class="site-title">${node.domain}</div>
            </a>
        </li>
        `).insertBefore($lastLi)
    })
}

render();

$(".add-button").on("click", () => {
    let url = window.prompt("New Site URL:");
    let domain, abbreviation
    if (url.indexOf("http") !== 0) {
        abbreviation = url[0].toUpperCase()
        domain = abbreviation + url.slice(1, url.indexOf("."));
        url = "https://" + url;
    }else{
        abbreviation = url[12].toUpperCase();
        const partialDomain = url.slice(12)
        domain = abbreviation + partialDomain.slice(1,partialDomain.indexOf("."));
    }
    hashMap.push({
        abbreviation,
        url,
        domain
    })
    render();
})

window.onbeforeunload = () =>{
    const string  = JSON.stringify(hashMap)
    localStorage.setItem("navigation", string)
}