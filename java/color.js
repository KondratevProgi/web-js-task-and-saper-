let random = $("div",".randombox")
setInterval(rColor,100)

let col = ["red","green","blue"]

function rColor() {
   let rand = getRandomInt(random.length)
   random.eq(rand-1).css("background",col[getRandomInt(col.length)])

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


