const delay = ms => new Promise(res => setTimeout(res, ms));

async function pageScroll() {
    window.scrollBy(0,4);
    scrolldelay = setTimeout(pageScroll,0);
    await delay(1400);
    clearTimeout(scrolldelay);
    
    console.log("scroll clicked")
    //window.location.href = "#navbar"
}