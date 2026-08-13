(function () {
	"use strict";

	var page = document.querySelector(".publications-page");
	if (!page) {
		return;
	}

	var venueAliases = [
		[/Empirical Software Engineering/i, "EMSE"],
		[/Transactions on Software Engineering and Methodology/i, "TOSEM"],
		[/Information and Software Technology/i, "IST"],
		[/Automated Software Engineering/i, "ASE"],
		[/Science of Computer Programming/i, "SCP"],
		[/IEEE Transactions on Software Engineering/i, "TSE"],
		[/IEEE Software/i, "IEEE Software"],
		[/Transactions on Computer-Human Interaction/i, "TOCHI"],
		[/International Journal of Human.Computer Interaction/i, "IJHCI"],
		[/Journal of Internet Services and Applications/i, "JISA"],
		[/Journal of Systems and Software/i, "JSS"],
		[/Computer Supported Cooperative Work/i, "JCSCW"],
		[/Software Quality Journal/i, "SQJ"],
		[/Journal of Software.*Evolution and Process/i, "JSEP"],
		[/Software: Practice and Experience/i, "SPE"],
		[/Journal of Interactive Learning Research/i, "JILR"],
		[/International Journal of Cooperative Information Systems/i, "IJCIS"],
		[/Brazilian Journal of Computers in Education/i, "RBIE"],
		[/Informática na Educação/i, "RIE"],
		[/IEEE Latin American Transactions/i, "IEEE LATAM"],
		[/Journal of the Brazilian Computer Society/i, "JBCS"],
		[/Computing and Informatics/i, "CAI"],
		[/Expert Systems with Applications/i, "ESWA"],
		[/Computers and Education/i, "C&E"],
		[/Open Learning Journal/i, "Open Learning"],
		[/Service Oriented Computing and Applications/i, "SOCA"]
	];

	var venueFullNames = {
		"ACM CSCW": "ACM Conference on Computer-Supported Cooperative Work and Social Computing",
		"AIware": "ACM International Conference on AI-Powered Software",
		"AMCIS": "Americas Conference on Information Systems",
		"ASE": "Automated Software Engineering",
		"BotSE": "International Workshop on Bots in Software Engineering",
		"C&E": "Computers & Education",
		"CAI": "Computing and Informatics",
		"CHASE": "International Conference on Cooperative and Human Aspects of Software Engineering",
		"CHI": "ACM Conference on Human Factors in Computing Systems",
		"CONVERSATION": "International Workshop on Chatbot Research",
		"CONVERSATIONS": "International Workshop on Chatbot Research",
		"CRIWG": "International Conference on Collaboration and Technology",
		"CSAC": "International Workshop on Computer Supported Activity Coordination",
		"CSCL": "International Conference on Computer-Supported Collaborative Learning",
		"CSCW": "ACM Conference on Computer-Supported Cooperative Work and Social Computing",
		"CSCWD": "International Conference on Computer Supported Cooperative Work in Design",
		"CSEE&T": "Conference on Software Engineering Education and Training",
		"CSMR": "European Conference on Software Maintenance and Reengineering",
		"CUI": "ACM Conference on Conversational User Interfaces",
		"CompEd": "ACM Global Computing Education Conference",
		"EMSE": "Empirical Software Engineering",
		"ESEJ": "Empirical Software Engineering Journal",
		"ESELAW": "Experimental Software Engineering Latin American Workshop",
		"ESEM": "ACM/IEEE International Symposium on Empirical Software Engineering and Measurement",
		"ESWA": "Expert Systems with Applications",
		"FIE": "Frontiers in Education Conference",
		"FORGE": "ACM International Conference on AI Foundation Models and Software Engineering",
		"FSE": "ACM International Conference on the Foundations of Software Engineering",
		"HAI": "ACM International Conference on Human-Agent Interaction",
		"HICSS": "Hawaii International Conference on System Sciences",
		"I3E": "IFIP Conference on E-Commerce, E-Business, and E-Government",
		"ICITS": "International Conference on Intelligent Tutoring Systems",
		"ICPC": "International Conference on Program Comprehension",
		"ICSE": "IEEE/ACM International Conference on Software Engineering",
		"ICSE SEIP": "IEEE/ACM International Conference on Software Engineering - Software Engineering in Practice Track",
		"ICSE SEIS": "IEEE/ACM International Conference on Software Engineering - Software Engineering in Society Track",
		"ICSME": "IEEE International Conference on Software Maintenance and Evolution",
		"ICWS": "IEEE International Conference on Web Services",
		"IEEE LATAM": "IEEE Latin America Transactions",
		"IJCIS": "International Journal of Cooperative Information Systems",
		"IJHCI": "International Journal of Human-Computer Interaction",
		"IJWSR": "International Journal of Web Services Research",
		"ISSRE": "IEEE International Symposium on Software Reliability Engineering",
		"IST": "Information and Software Technology",
		"ITiCSE": "ACM Conference on Innovation and Technology in Computer Science Education",
		"IWPSE": "International Workshop on Principles of Software Evolution",
		"IWPSE-EVOL '11": "International Workshop on Principles of Software Evolution and ERCIM Workshop on Software Evolution",
		"JBCS": "Journal of the Brazilian Computer Society",
		"JCSCW": "Computer Supported Cooperative Work",
		"JILR": "Journal of Interactive Learning Research",
		"JISA": "Journal of Internet Services and Applications",
		"JSS": "Journal of Systems and Software",
		"MSR": "International Conference on Mining Software Repositories",
		"MTD": "International Workshop on Managing Technical Debt",
		"NCA": "IEEE International Symposium on Network Computing and Applications",
		"NEXGSD": "Workshop on Global Software Development in a CSCW Perspective",
		"OSS": "International Conference on Open Source Systems",
		"OpenSym": "International Symposium on Open Collaboration",
		"PLoP": "Conference on Pattern Languages of Programs",
		"PROMISE": "International Conference on Predictive Models and Data Analytics in Software Engineering",
		"RSSE": "International Workshop on Recommendation Systems for Software Engineering",
		"SANER": "IEEE International Conference on Software Analysis, Evolution and Reengineering",
		"SBES": "Brazilian Symposium on Software Engineering",
		"SBSC": "Brazilian Symposium on Collaborative Systems",
		"SCAM": "IEEE International Working Conference on Source Code Analysis and Manipulation",
		"SCP": "Science of Computer Programming",
		"SEAA": "Euromicro Conference on Software Engineering and Advanced Applications",
		"SOCA": "Service Oriented Computing and Applications",
		"SQJ": "Software Quality Journal",
		"SQM": "International Workshop on Software Quality and Maintainability",
		"SoHeal": "International Workshop on Software Health",
		"TOCHI": "ACM Transactions on Computer-Human Interaction",
		"TOSEM": "ACM Transactions on Software Engineering and Methodology",
		"TSE": "IEEE Transactions on Software Engineering",
		"VL/HCC": "IEEE Symposium on Visual Languages and Human-Centric Computing",
		"WSL": "International Free Software Workshop"
	};

	function clean(value) {
		return (value || "").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
	}

	function normalizeTitle(value) {
		return clean(value)
			.toLowerCase()
			.normalize("NFKD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-z0-9]+/g, " ")
			.replace(/^\s+|\s+$/g, "");
	}

	function getVenue(rawVenue, fullText, year) {
		var venue = clean(rawVenue).replace(/[.,;:]+$/g, "");
		var source = venue || fullText;
		var withYear = source.match(/\b((?:(?:ACM|IEEE)\s+)?[A-Z][A-Z/&.-]{1,14}(?:\s+[A-Z][A-Z/&.-]{1,14}){0,2})\s+(20\d{2})\b/);
		var acronym = source.match(/\(([A-Z][A-Z/&.-]{1,14})\)/);

		if (withYear) {
			return clean(withYear[1]) + " " + withYear[2];
		}

		if (venue && acronym) {
			venue = acronym[1];
		} else {
			for (var i = 0; i < venueAliases.length; i += 1) {
				if (venueAliases[i][0].test(source)) {
					venue = venueAliases[i][1];
					break;
				}
			}
			if (!venue && acronym) {
				venue = acronym[1];
			}
		}

		if (!venue || venue.length > 34) {
			venue = /,\s*in:/i.test(fullText) ? "Book chapter" : "Selected publication";
		}

		return /20\d{2}/.test(venue) ? venue : venue + " " + year;
	}

	function getVenueFullName(venue, rawVenue) {
		var label = clean(venue).replace(/\s+(?:19|20)\d{2}$/i, "").replace(/[.,;:]+$/g, "");
		var raw = clean(rawVenue).replace(/^[“"]|[”"]$/g, "").replace(/[.,;:]+$/g, "");
		var acronym = raw.match(/\(([A-Z][A-Z/&.-]{1,14})\)/);
		var key = acronym ? acronym[1] : label;

		if (venueFullNames[label]) {
			return venueFullNames[label];
		}
		if (venueFullNames[key]) {
			return venueFullNames[key];
		}
		if (raw && !/^Selected publication$/i.test(raw)) {
			return clean(raw.replace(/\s*\([A-Z][A-Z/&.-]{1,14}\)\s*(?:Journal)?$/i, ""));
		}
		return label;
	}

	function createElement(tag, className, text) {
		var element = document.createElement(tag);
		if (className) {
			element.className = className;
		}
		if (typeof text === "string") {
			element.textContent = text;
		}
		return element;
	}

	function enhancePublication(item, year) {
		var citationLink = item.querySelector("a");
		if (!citationLink) {
			return null;
		}

		var text = clean(citationLink.textContent);
		var yearsInCitation = text.match(/\b(?:19|20)\d{2}\b/g);
		var publicationYear = year === "Before 2010" && yearsInCitation ? yearsInCitation[yearsInCitation.length - 1] : year;
		var quoteMatch = text.match(/[“"](.+?)[”"]/);
		var doiMatch = text.match(/10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i);
		var title = quoteMatch ? clean(quoteMatch[1]) : text;
		var verifiedDoi = window.publicationDois && window.publicationDois[normalizeTitle(title)];
		var doi = verifiedDoi || (doiMatch ? doiMatch[0].replace(/[.,;]+$/g, "") : "");
		var authors = quoteMatch ? clean(text.slice(0, quoteMatch.index).replace(/,\s*$/, "")) : "";
		var venueMarker = item.querySelector("strong, b");
		var venue = getVenue(venueMarker ? venueMarker.textContent : "", text, publicationYear);
		var venueFullName = getVenueFullName(venue, venueMarker ? venueMarker.textContent : "");
		var href = citationLink.getAttribute("href") || "";
		var isPdf = /\.pdf(?:$|[?#])/i.test(href);

		item.removeAttribute("id");
		item.className = "publication-item";
		item.setAttribute("data-search", normalizeTitle([title, authors, venue, doi, publicationYear].join(" ")));

		var article = createElement("article", "publication-card");
		if (isPdf) {
			article.className += " publication-card-clickable";
			article.setAttribute("data-pdf-href", href);
			article.addEventListener("click", function (event) {
				if (event.defaultPrevented || event.button !== 0 || event.target.closest("a")) {
					return;
				}

				if (event.metaKey || event.ctrlKey || event.shiftKey) {
					window.open(href, "_blank", "noopener");
					return;
				}

				window.location.href = href;
			});
		}
		var body = createElement("div", "publication-body");
		var titleHeading = createElement("h3", "publication-title");
		var titleContent;

		if (href && href !== "#") {
			titleContent = createElement("a", "", title);
			titleContent.setAttribute("href", href);
			if (/^https?:/i.test(href) && !/^https?:\/\/(?:dx\.)?doi\.org\//i.test(href)) {
				titleContent.setAttribute("target", "_blank");
				titleContent.setAttribute("rel", "noopener");
			}
		} else {
			titleContent = document.createTextNode(title);
		}
		titleHeading.appendChild(titleContent);
		body.appendChild(titleHeading);

		if (authors) {
			body.appendChild(createElement("p", "publication-authors", authors));
		}

		var details = createElement("div", "publication-details");
		var venueLabel = createElement("span", "publication-venue", venue);
		venueLabel.setAttribute("data-tooltip", venueFullName);
		venueLabel.setAttribute("aria-label", venue + ": " + venueFullName);
		venueLabel.setAttribute("tabindex", "0");
		details.appendChild(venueLabel);
		if (doi) {
			var doiText = createElement("a", "publication-doi-text", "DOI " + doi);
			doiText.setAttribute("href", "https://doi.org/" + doi);
			doiText.setAttribute("aria-label", "Open DOI record: " + doi);
			details.appendChild(doiText);
		}
		body.appendChild(details);
		article.appendChild(body);

		var actions = createElement("div", "publication-actions");
		if (isPdf) {
			var pdfLink = createElement("a", "publication-action publication-pdf", "PDF");
			pdfLink.setAttribute("href", href);
			pdfLink.setAttribute("aria-label", "Open PDF: " + title);
			actions.appendChild(pdfLink);
		}
		if (doi) {
			var doiLink = createElement("a", "publication-action", "DOI");
			doiLink.setAttribute("href", "https://doi.org/" + doi);
			doiLink.setAttribute("aria-label", "Open DOI record: " + doi);
			actions.appendChild(doiLink);
		}
		if (actions.children.length) {
			article.appendChild(actions);
		}

		item.textContent = "";
		item.appendChild(article);
		return item;
	}

	var yearHeadings = Array.prototype.filter.call(page.children, function (child) {
		var label = clean(child.textContent);
		return child.tagName === "H2" && (/^20\d{2}$/.test(label) || label === "Before 2010");
	});
	var publicationItems = [];

	yearHeadings.forEach(function (heading) {
		var year = clean(heading.textContent);
		var list = heading.nextElementSibling;
		if (!list || list.tagName !== "UL") {
			return;
		}

		heading.className = "publication-year";
		heading.id = year === "Before 2010" ? "year-before-2010" : "year-" + year;
		list.removeAttribute("id");
		list.className = "publication-list";
		list.setAttribute("data-year", year);

		Array.prototype.forEach.call(list.querySelectorAll("li"), function (item) {
			var enhanced = enhancePublication(item, year);
			if (enhanced) {
				publicationItems.push(enhanced);
			}
		});
	});

	Array.prototype.forEach.call(page.children, function (child) {
		if (child.tagName === "P" && !clean(child.textContent) && !child.children.length) {
			child.parentNode.removeChild(child);
		}
	});

	var yearNavigation = document.getElementById("publication-years");
	yearHeadings.slice(0, 7).forEach(function (heading) {
		var yearLink = createElement("a", "publication-year-link", clean(heading.textContent));
		yearLink.setAttribute("href", "#" + heading.id);
		yearNavigation.appendChild(yearLink);
	});
	if (yearHeadings.length > 7) {
		var earlierLink = createElement("a", "publication-year-link", "Earlier");
		earlierLink.setAttribute("href", "#" + yearHeadings[7].id);
		yearNavigation.appendChild(earlierLink);
	}

	var search = document.getElementById("publication-search");
	var results = document.getElementById("publication-results");

	function filterPublications() {
		var query = normalizeTitle(search.value);
		var visibleCount = 0;

		publicationItems.forEach(function (item) {
			var visible = !query || item.getAttribute("data-search").indexOf(query) !== -1;
			item.hidden = !visible;
			if (visible) {
				visibleCount += 1;
			}
		});

		yearHeadings.forEach(function (heading) {
			var list = heading.nextElementSibling;
			var hasVisibleItems = list && Array.prototype.some.call(list.querySelectorAll(".publication-item"), function (item) {
				return !item.hidden;
			});
			heading.hidden = !hasVisibleItems;
			if (list) {
				list.hidden = !hasVisibleItems;
			}
		});

		results.textContent = query ? visibleCount + (visibleCount === 1 ? " match" : " matches") : publicationItems.length + " selected papers";
	}

	search.addEventListener("input", filterPublications);
	filterPublications();
}());
