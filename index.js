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
	let scrollToTop = window.pageYOffset || document.documentElement.scrollTop;

	if (scrollToTop > lastScrollTop) {
		header.style.top = "-100%";
	} else {
		header.style.top = "0";
	}
	lastScrollTop = scrollToTop;
});

// LOGO/PHOTO FLIP

let image = document.getElementById("logo-photo-container");


function flip() {
	let src = image.getAttribute("src");
	if (src === "images/logo.png") {
		image.setAttribute("src", "images/photo.jpg");
		image.animate(
			[{ transform: "rotateZ(-180deg)" }, { transform: "rotateZ(0deg)" }],
			{ duration: 500, fill: "forwards" }
		);
	} else {
		image.setAttribute("src", "images/logo.png");
		image.animate(
			[{ transform: "rotateZ(180deg)" }, { transform: "rotateZ(0deg)" }],
			{ duration: 500, fill: "forwards" }
		);
	}
}

window.onload = () => {
	setInterval(flip, 5000);
};
