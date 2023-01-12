let backgroundOption = true;
//control interval
let background_interval;

//remove active class from all spans 1
document.querySelectorAll(".random_backgrounds span").forEach(e => {
    e.classList.remove("active");

});
//type of true n local storage is string
//put active class on yes or no
//check if is random option item in local storage
let bglocalitem = localStorage.getItem("backgroun_option");
if (bglocalitem !== null) {
    if (bglocalitem === "true") {
        backgroundOption = true;
        document.querySelector(".random_backgrounds .yes").classList.add("active");
    }
    else {
        backgroundOption = false;
        document.querySelector(".random_backgrounds .no").classList.add("active");
    }
}
//landing s
let landing = document.querySelector(".landing-page");
let imgs_arr = ["bg3.jpg", "bg4.jpg", "bg5.jpg", "bg1.jpg", "bg6.jpg"];



function random_backgroundOption() {
    //see the background option true or not
    if (backgroundOption === true) {
        background_interval = setInterval(() => {
            let randomnum = Math.floor(Math.random() * imgs_arr.length);
            //change backg img url
            landing.style.backgroundImage = 'url("imgs/' + imgs_arr[randomnum] + '")';
        }, 5000);

    }

}
random_backgroundOption();
//landing end

//settings s
let settings = document.querySelector(".setting-box");
let con_icon = document.querySelector(".toggle_settings .fa-cog");
//check if is color in local storage
let maincolors = localStorage.getItem("color-option");
if (maincolors !== null) {
    //there is color in ls you can set it in web page
    document.documentElement.style.setProperty('--main-color', maincolors);
    document.querySelectorAll(".colors_list li").forEach(r => { //all lis in ul get it and remove active class
        r.classList.remove("active");
        //add active class to element in local storage
        if (r.dataset.color === maincolors) {
            r.classList.add("active");

        }

    });



}


con_icon.onclick = function () {
    //to make icon rotation it self
    this.classList.toggle("fa-spin");
    //to open the settings add open class move left
    settings.classList.toggle("open");
}
//swich colors
let thecolor = document.querySelectorAll(".colors_list li");
// let listofcolors=document.querySelector("")
thecolor.forEach((e) => {

    //loop on list items and put event click get the color i press and make it root color
    //e is the loop item now and ee.target wich i make on it click event
    e.addEventListener("click", (ee) => {
        //set color on root
        document.documentElement.style.setProperty('--main-color', ee.target.dataset.color);
        //set color on local storage
        localStorage.setItem("color-option", ee.target.dataset.color);
        //remove active from all children  //all elements has class active
        handleActive(ee);

    });
});

//back ground settings
//swich backgrounds
//background options yes or no


let theBG_settings = document.querySelectorAll(".random_backgrounds span");
// let listofcolors=document.querySelector("")
theBG_settings.forEach((e) => {

    //loop on spans
    //e is the loop item now and ee.target wich i make on it click event
    e.addEventListener("click", (ee) => {

        //remove active from all children  //all elements has class active
        handleActive(ee);
        if (ee.target.dataset.background === "yes") {
            backgroundOption = true;
            random_backgroundOption();
            localStorage.setItem("backgroun_option", true);
        }
        else {
            backgroundOption = false;
            clearInterval(background_interval);
            localStorage.setItem("backgroun_option", false);

        }

    });
});
//settings eour skills scroll on s
let ourskills = document.querySelector(".our_skills");
window.onscroll = function () {
    //skills offset top
    let skilllsoffsettop = ourskills.offsetTop;
    //outer height of skills
    let skillsouterhieght = ourskills.offsetHeight;

    let windowhieght = this.innerHeight;
    let windowscrolltop = this.pageYOffset;
    //reach skill  our skills section
    if (windowscrolltop > (skilllsoffsettop + skillsouterhieght - windowhieght)) {
        // if(window.scrollY>=ourskills.offsetTop- 30){//more easies
        let allskills = document.querySelectorAll(".skill_box .skill-progress span");
        allskills.forEach(s => {
            s.style.width = s.dataset.progress;
        });
    }
}
//settings e our skills scroll on e

//gallery images create pop up
let imagesofgallery = document.querySelectorAll(".imagesbox img");
imagesofgallery.forEach(img => {
    img.addEventListener("click", (e) => {
        let overlayy = document.createElement("div");
        overlayy.className = "popup_overlay";
        document.body.appendChild(overlayy);
        //create the pop box
        let pop_box = document.createElement("div");
        pop_box.className = "pop_box";
        //create image
        if (img.alt !== null) {
            //create heading for alt calue
            let imghead = document.createElement("h3");
            let imgtext = document.createTextNode(img.alt);
            imghead.appendChild(imgtext);
            //to popup box
            pop_box.appendChild(imghead);
        }
        let pop_img = document.createElement("img");
        pop_img.src = img.src;
        pop_box.appendChild(pop_img);

        let closebtn = document.createElement("span");
        let closetext = document.createTextNode("x");
        closebtn.appendChild(closetext);
        closebtn.className = "closebtn";
        //add to pop box the close btn
        pop_box.appendChild(closebtn);
        document.body.appendChild(pop_box);
    });
});
//close pop up from the ceated span --closebtn
document.addEventListener("click", function (e) {
    //e.target the element that i press now
    if (e.target.className == "closebtn") {
        e.target.parentElement.remove();
        //remove overlay
        document.querySelector(".popup_overlay").remove();
    }
});
//testemonials
//nav-bullets
let navbullets = document.querySelectorAll(".nav-bullets .bullet");
scrolltosection(navbullets);

//for links
let linkss = document.querySelectorAll(".header-area .links li");
scrolltosection(linkss);

function scrolltosection(X) {
    X.forEach(l => {

        l.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({ behavior: 'smooth' });
        });
    });
}
//handle active stats function
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(r => {//go to parent of  span =>ul all the active get it then remove active class
        r.classList.remove("active");
    });
    //add class active to the new color
    ev.target.classList.add("active");

}
//show bullets or not
let bulletspan = document.querySelectorAll(".bullets-option span");
let bulletsscontainer = document.querySelector(".nav-bullets");

let bulletlS = localStorage.getItem("bullets-option");
if (bulletlS !== null) {
    bulletspan.forEach(e => {
        e.classList.remove("active");
    });
    if (bulletlS === "block") {
        bulletsscontainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    }
    else {
        bulletsscontainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }

}
bulletspan.forEach(s => {
    s.addEventListener("click", (e) => {
        if (s.dataset.display === "yes") {
            bulletsscontainer.style.display = "block";
            localStorage.setItem("bullets-option", "block");

        }
        else {
            bulletsscontainer.style.display = "none";
            localStorage.setItem("bullets-option", "none");
        }
        handleActive(e);//give it event
    });

})
//reset btn
document.querySelector(".reset-options").onclick = function () {
    localStorage.removeItem("bullets-option");
    localStorage.removeItem("color-option");
    localStorage.removeItem("backgroun_option");
    window.location.reload();
}
// Toggle Menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    // Stop Propagation
    e.stopPropagation();

    // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");

    // Toggle Class "open" On Links
    tLinks.classList.toggle("open");

};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {

        // Check If Menu Is Open
        if (tLinks.classList.contains("open")) {

            // Toggle Class "menu-active" On Button
            toggleBtn.classList.toggle("menu-active");

            // Toggle Class "open" On Links
            tLinks.classList.toggle("open");

        }

    }

});

// Stop Propagation On Menu 
tLinks.onclick = function (e) {
    e.stopPropagation();
}