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

// render the entire list of buttons
const render = () =>{
    $sites.find("li:not(.add-button)").remove();
    hashMap.forEach((node, index) =>{
        const $li = $(`
        <li class="site">
            <a href=${node.url}>
                <div class="site-abbreviation">${node.abbreviation}</div>
                <div class="site-title">${node.domain}</div>
            </a>
            <div class="delete-button">&#x2573;</div>
        </li>
        `).insertBefore($lastLi)
// adding the delete button function
        $li.on("click", ".delete-button", (e)=>{
            e.target.parentElement.classList.add("deleted");
            hashMap.splice(index, 1);
            setTimeout(render, 800)
        })
    })
}

const changeColor = () =>{
    const randomColorCode = () =>{
        return Math.floor(Math.random()*256);
    }
    const r = randomColorCode();
    const g = randomColorCode();
    const b = randomColorCode();

    document.documentElement.style.setProperty("--background-color", `rgb(${r}, ${g}, ${b})`);
}

// click add button to add new website
$(".add-button").on("click", () => {
    let url = window.prompt("New Site URL:");
    let domain, abbreviation
    if(url.indexOf("https://") === 0){
        const cutOff = url.slice(8);
        if(cutOff.indexOf("www.") ===0){
            const cutOff2 = cutOff.slice(4);
            abbreviation = cutOff2[0].toUpperCase();
            domain = abbreviation + cutOff2.slice(1, cutOff2.indexOf("."));
        }else{
            abbreviation = cutOff[0].toUpperCase();
            domain = abbreviation + cutOff.slice(1, cutOff.indexOf("."));
        }
    }else if(url.indexOf("http://") ===0){
        const cutOff = url.slice(7);
        if(cutOff.indexOf("www.") ===0){
            const cutOff2 = cutOff.slice(4);
            abbreviation = cutOff2[0].toUpperCase();
            domain = abbreviation + cutOff2.slice(1, cutOff2.indexOf("."));
        }else{
            abbreviation = cutOff[0].toUpperCase();
            domain = abbreviation + cutOff.slice(1, cutOff.indexOf("."));
        }
    }else if(url.indexOf("www.") === 0){
        const cutOff= url.slice(4);
        abbreviation = cutOff[0].toUpperCase();
        domain = abbreviation + cutOff.slice(1, cutOff.indexOf("."));
        url = "https://" + url;
    }else{
        abbreviation = url[0].toUpperCase();
        domain = abbreviation + url.slice(1, url.indexOf("."));
        url = "https://" + url;
    }
    hashMap.push({
        abbreviation,
        url,
        domain
    })
    render();
})

// saving the list of button in local storage
window.onbeforeunload = () =>{
    const string  = JSON.stringify(hashMap)
    localStorage.setItem("navigation", string)
}

render();
changeColor();