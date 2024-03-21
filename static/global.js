console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

// part 3: automatic navigaion menu
// let pages = {
// 	"": "Home",
// 	/* add the rest of your pages here */
// 	"projects": "Projects",
// 	"resume": "Resume",
// 	"contact": "Contact",
// };
let pages = [
	{url: "./", title: "Home"},
	{url: "projects", title: "Projects"},
	// add the rest of your pages here
	{url: "resume", title: "Resume"},
	{url: "contact", title: "Contact"},
	{url: "meta", title: "Meta"},

];

let nav = document.createElement("nav");
nav.classList.add('nav-bar')
document.body.prepend(nav);

for (let p of pages) {
	let url = p.url;
	let title = p.title;


	let a = document.createElement("a");
	a.href = url;
	a.textContent = title;
	// console.log(a.host, location.host, a.pathname, location.pathname)
	// check for current
	if (a.host === location.host && a.pathname === location.pathname) {
		a.classList.add("current");
	} else {
		a.target = "_blank";
	}
	// a.classList.toggle("current", a.host === location.host && a.pathname === location.pathname);

	a.classList.add('nav-link')

	nav.append(a);
}

// step 4: dark mode
// document.body.insertAdjacentHTML("afterbegin", `
// 	<label class="color-scheme">
// 		Theme:
// 		<select>
// 			<option value='light dark'> Automatic </option>
// 			<option value='light'> Light </option>
// 			<option value='dark'>  Dark </option>
// 		</select>
// 	</label>`
// );

// const select =  document.querySelector("select");
// console.log(select)
// select.addEventListener("input", function (event) {
// 	console.log("color scheme changed to", event.target.value);
// 	document.documentElement.style.setProperty("color-scheme", event.target.value);
// 	// save preference
// 	localStorage.colorScheme = event.target.value;

// });

// if ("colorScheme" in localStorage) {
// 	document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);
// 	select.value = localStorage.colorScheme;
// }







