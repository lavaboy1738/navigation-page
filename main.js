$(".add-button").on("click", () => {
    let link = window.prompt("New Site URL:");
    let domain
    if (link.indexOf("http") !== 0) {
        domain = link;
        link = "https://" + link;
    }else{
        domain = link.slice(12)
    }
    const $sites = $(".sites")
    const $lastLi = $sites.find(".add-button")
    $(`
    <li class="site">
        <a href=${link}>
            <div class="site-abbreviation">${domain[0].toUpperCase()}</div>
            <div class="site-title">${domain[0].toUpperCase()+domain.slice(1,domain.indexOf("."))}</div>
        </a>
    </li>
    `).insertBefore($lastLi)
})