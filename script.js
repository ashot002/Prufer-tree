
// let prufer = [1, 1, 3, 5, 5]
const mutq = document.getElementById("inp")
const create = document.getElementById("create")

// let prufer = [6, 6, 4, 3, 1, 4,3]

function getPruferTree(prufer) {
	if (!Array.isArray(prufer) || prufer.some(el => isNaN(el))) {
		throw new Error("sumethign whent wrong")
	}
	let checks = []
	let tree = {}
	let length = prufer.length + 2

	for (let i = 1; i <= length; i++) {
		checks.push(i)
	}
	console.log(checks);
	let checkIndex = []
	let ogt = [...prufer]
	let mnacac = [...checks]

	code: for (let i = 0; i < prufer.length; i++) {
		check: for (let j = 0; j < checks.length; j++) {
			//[7, 5, 7, 7, 5, 1]
			//[1, 2, 3, 4, 5, 6, 7, 8]
			if (ogt.includes(checks[j]) || checkIndex.includes(j)) {
				continue check;
			}
			if (Object.keys(tree).includes(checks[j].toString())) {
				tree[checks[j]].push(prufer[i])
			}
			else if (!Array.isArray(tree[prufer[i]])) {
				tree[prufer[i]] = []
				tree[prufer[i]].push(checks[j])
			}
			else {
				tree[prufer[i]].push(checks[j])
			}


			checkIndex.push(j)
			ogt.splice(ogt.indexOf(prufer[i]), 1)
			mnacac.splice(mnacac.indexOf(checks[j]), 1)
			continue code
		}
	}

	if (mnacac.length > 0) {
		for (let i = 1; i < mnacac.length; i++) {
			if (!Array.isArray(tree[mnacac[0]])) {
				tree[mnacac[0]] = []
			}
			tree[mnacac[0]].push(mnacac[i])
		}
	}
	return tree
}

const canvas = document.getElementById("pruferCanvas");
const ctx = canvas.getContext("2d");
// ctx.arc(20, 300, 10, Math.PI * 2, false)
const window_width = window.innerWidth
const window_height = window.innerHeight

canvas.width = window_width / 2
canvas.height = window_height / 2

// let randomX = Math.floor(Math.random() * window_width)
// let randomY = Math.floor(Math.random() * window_height)

function random(min, max) {
	let rand = min + Math.random() * (max - min);
	return Math.round(rand);
}


function Gic(urdic, ur, cordinats) {
	ctx.beginPath();
	ctx.moveTo(cordinats[urdic][0], cordinats[urdic][1]);
	ctx.lineTo(cordinats[ur][0], cordinats[ur][1])
	ctx.stroke()
	ctx.closePath();
}



function CreateGagat(x, y, text) {
	ctx.beginPath();
	ctx.arc(x, y, 15, 0, Math.PI * 2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.fillStyle = "black";
	ctx.font = "bold 24px sans-self";
	// console.log(text);
	ctx.fillText(text, x - 5, y + 5);
	ctx.closePath()
}


function CreateGrafPrufer(prufer) {

	const tree = getPruferTree(prufer)
	const prufer_num = Object.values(tree).flat().concat(Object.keys(tree))
	let cordinats = {}

	for (const num of prufer_num) {
		cordinats[num] = [random(0, window_width / 2), random(0, window_height / 2,)]
	}
	for (let gagat in cordinats) {
		CreateGagat(cordinats[gagat][0], cordinats[gagat][1], gagat)
	}

	for (let gagat in tree) {

		for (const urdex of tree[gagat]) {
			Gic(gagat, urdex, cordinats)
		}
	}


}



create.onclick = function (params) {
	let prufer = mutq.value.trim().split(",").map(el => +el).filter(el => el)
	// try {

	console.log(getPruferTree(prufer))

	try {
		if (prufer.some(el => el <= 0)) {
			throw new Error("Պետք է կոդի թվերը մեծ լինեն 0 ից")

		}
		else if (prufer.length == 0) {
			throw new Error("Լրացեք դաշտը")
		}
		else {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			CreateGrafPrufer(prufer)
		}
	}
	
	catch (er) {
			let eror = document.getElementById("er")
			eror.style.visibility = "visible"
			eror.innerHTML = er
		}


	
}