(function () {
	"use strict";
	var toggle = document.querySelector(".menu-toggle");
	var menu = document.getElementById("menu");
	if (!toggle || !menu) { return; }
	var mobile = window.matchMedia("(max-width: 800px)");
	function setExpanded(expanded) {
		toggle.setAttribute("aria-expanded", String(expanded));
		menu.hidden = !expanded;
	}
	function syncMenu() {
		toggle.hidden = !mobile.matches;
		setExpanded(!mobile.matches);
	}
	toggle.addEventListener("click", function () {
		setExpanded(toggle.getAttribute("aria-expanded") !== "true");
	});
	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape" && mobile.matches && !menu.hidden) {
			setExpanded(false);
			toggle.focus();
		}
	});
	menu.addEventListener("click", function (event) {
		if (mobile.matches && event.target.closest("a")) { setExpanded(false); }
	});
	if (mobile.addEventListener) { mobile.addEventListener("change", syncMenu); }
	else { mobile.addListener(syncMenu); }
	syncMenu();
}());
