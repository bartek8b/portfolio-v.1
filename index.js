// COLOR SCHEME

const themeDark = window.matchMedia("(prefers-color-scheme: dark)");
const checkbox = document.querySelector("#toggleTheme");

function applyTheme(isThemeDark) {
	if (isThemeDark) {
		document.documentElement.setAttribute("data-theme", "dark");
		checkbox.checked = true;
	} else {
		document.documentElement.setAttribute("data-theme", "light");
		checkbox.checked = false;
	}
}

function handleColorScheme() {
	applyTheme(themeDark.matches);
}
function handleToggleChange() {
	applyTheme(checkbox.checked);
	localStorage.setItem("theme", checkbox.checked ? "dark" : "light");
}

document.addEventListener("DOMContentLoaded", () => {
	const savedTheme = localStorage.getItem("theme");
	if (savedTheme) {
		applyTheme(savedTheme === "dark");
	} else {
		handleColorScheme();
	}
	checkbox.addEventListener("change", handleToggleChange);
});
themeDark.addEventListener("change", handleColorScheme);

// ANIMATION ON SCROLL

const items = document.querySelectorAll(".grid-items");

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add("visible");
			observer.unobserve(entry.target);
		}
	});
});

items.forEach(item => {
	observer.observe(item);
});

// HEADER VISIBLE ON SCROLL

let lastScrollTop = 0;

window.addEventListener("scroll", () => {
	let header = document.getElementById("header");
	let scrollBtn = document.getElementById("scroll-to-top-btn");
	let scrollToTop = window.pageYOffset || document.documentElement.scrollTop;

	if (scrollToTop > lastScrollTop) {
		header.style.top = "-100%";
		scrollBtn.style.bottom = "2%";
	} else {
		header.style.top = "0";
		scrollBtn.style.bottom = "-100%";
	}
	lastScrollTop = scrollToTop;
});

// NAVBAR MOBILE
let menu = document.getElementById("menu");
let barsBtn = document.getElementById("menuBars");
let xBtn = document.getElementById("xButton");
let icons = document.querySelectorAll(".sweep-icon");

function showNavbar() {
	barsBtn.style.display = "none";
	xBtn.style.display = "flex";
	menu.style.display = "flex";
	menu.classList.remove("translate-out");
	menu.classList.add("translate-in");
}

function hideNavbar() {
	barsBtn.style.display = "flex";
	xBtn.style.display = "none";
	menu.classList.add("translate-out");
	menu.classList.remove("translate-in");
}

function updateWidth() {
	const windowWidth = window.innerWidth;

	if (windowWidth > 768) {
		menu.style.display = "flex";
		barsBtn.style.display = "none";
		xBtn.style.display = "none";
		menu.classList.remove("translate-out");
		menu.classList.add("translate-in");
	} else {
		barsBtn.style.display = "flex";
		menu.style.display = "none";
		xBtn.style.display = "none";
		menu.classList.add("translate-out");
		menu.classList.remove("translate-in");
	}
}

window.addEventListener("resize", updateWidth);
window.addEventListener("scroll", updateWidth);

// PRIVACY POLICY

const privacyPolicyLink = document.querySelector("#privacy-policy-link");
const main = document.querySelector("main");
const privacyPolicyDisplay = document.querySelector("#privacy-policy");
const privacyPolicyClose = document.querySelector("#close-privacy-policy");

privacyPolicyLink.addEventListener("click", () => {
	main.style.display = "none";
	privacyPolicyDisplay.style.display = "flex";
});

privacyPolicyClose.addEventListener("click", () => {
	main.style.display = "grid";
	privacyPolicyDisplay.style.display = "none";
});

// SCROLL HINT 

document.querySelectorAll('.big-content[id$="-display"]').forEach(display => {
    let hintShown = false;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hintShown && display.scrollWidth > display.clientWidth) {
                const children = Array.from(display.children);
                if (children.length > 1) {
                    const secondChild = children[1];
                    const shift = secondChild.offsetLeft;

                    display.scrollTo({ left: shift, behavior: 'smooth' });
                    setTimeout(() => {
                        display.scrollTo({ left: 0, behavior: 'smooth' });
                    }, 700); // animatin time in ms
                }
                hintShown = true;
                observer.unobserve(display); 
            }
        });
    }, { threshold: .4 }); // trigger when ...% container is visible

    observer.observe(display);
});

// LOGO/PHOTO FLIP - OFF

// function flip() {
// 	let image = document.getElementById("logo-photo-container");
// 	let logoSrc = image.getAttribute("src");
// 	const animation = [
// 		{ offset: 0, transform: "scale(0, 1)", opacity: 0 },
// 		{ offset: 0.1, transform: "scale(0.5, 1)", opacity: 0.9 },
// 		{ offset: 0.2, transform: "scale(1, 1)", opacity: 1 },
// 		{ offset: 0.8, transform: "scale(1, 1)", opacity: 1 },
// 		{ offset: 0.9, transform: "scale(0.5, 1)", opacity: 0.9 },
// 		{ offset: 1, transform: "scale(0, 1)", opacity: 0 },
// 	];
// 	const options = { duration: 5000, fill: "both" };

// 	if (logoSrc === "images/logo.png") {
// 		image.setAttribute("src", "images/photo.jpg");
// 		image.animate(animation, options);
// 	} else {
// 		image.setAttribute("src", "images/logo.png");
// 		image.animate(animation, options);
// 	}
// }

// window.onload = () => {
// 	flip();
// 	setInterval(flip, 5000);
// };
