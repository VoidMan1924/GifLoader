let APIKEY = "RqvdCxrTevb01yBQAPxAgkIcJAx8Mp6E";
let offsets = {};
document.addEventListener("DOMContentLoaded", init);
function init() {
	document.getElementById("btnSearch").addEventListener("click", ev => {
		ev.preventDefault(); //to stop the page reload
		let str = document.getElementById("search").value.trim();
		if (str in offsets) {
			if (offsets[str] < 4999){
				offsets[str] = offsets[str] + 5;
			}
			if (offsets[str] > 4999){
				offsets[str] = 4999;
			}
		}
		else{
			offsets[str] = 0;
		}
		let offset = offsets[str]
		let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=5&offset=${offset}&q=`;
		url = url.concat(str);
		console.log(url);
		fetch(url)
			.then(response => response.json())
			.then(content => {
			//  data, pagination, meta
			console.log(content.data);
			console.log("META", content.meta);
				for (let i = 0; i < 5; i++) {
					let fig = document.createElement('figure');
					let img = document.createElement('img');
					let fc = document.createElement('figcaption');
					img.src = content.data[i].images.downsized.url;
					img.alt = content.data[i].title;
					fc.textContent = content.data[i].title;
					fig.appendChild(img);
					fig.appendChild(fc);
					let out = document.querySelector(".out");
					out.insertAdjacentElement('afterbegin', fig);
				}
				document.querySelector("#search").value = "";
			})
			.catch(err => {
				console.error(err);
			});
	});
}
