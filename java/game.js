let matrix = null
let running = null

init(10, 10, 10)



function init (columns, rows, mines) {

    matrix = getMatrix(columns, rows)
    running = true

    for (let i = 0; i < mines; i++){
        setRandomMine(matrix)
    }


    update()
}

function update () {
    if (!running) {
        return
    }
    const gameElement = matrixToHtml(matrix)
    const appElement = document.querySelector('#app')

    appElement.innerHTML = ''
    appElement.append(gameElement)

    appElement
        .querySelectorAll('img')
        .forEach(imgElement => {
            imgElement.addEventListener('mousedown', mousedownHandler)
            imgElement.addEventListener('mouseup', mouseupHandler)
            imgElement.addEventListener('mouseleave', mouseleaveHandler)
        })

    if (isLosing(matrix)) {
        alert("Вы проиграли")
        running = false
    }
    else if (isWin(matrix)) {
        alert("Победа")
        running = false
    }
}

function  mousedownHandler (event) {
    const info = getInfo(event)

    if (info.left) {
        info.cell.left = true
    }

    if (info.right) {
        info.cell.right = true
    }

    if(info.cell.left && info.cell.right) {
        bothHandler(info.cell)
    }
    update()
}

function mouseupHandler (event) {
    const info = getInfo(event)

    const both = info.cell.left && info.cell.right && (info.left || info.right)
    const leftMouse = !both && info.cell.left && info.left
    const rightMouse = !both && info.cell.right && info.right

    if (both) {
        forEach(matrix, x => x.poten = false)
    }

    if (info.left) {
        info.cell.left = false
    }

    if (info.right) {
        info.cell.right = false
    }

    if (leftMouse) {
        leftHandler(info.cell)
    }

    else if (rightMouse) {
        rightHandler(info.cell)
    }
    update()
}

function mouseleaveHandler (event) {
    const info = getInfo(event)

    info.cell.left = false
    info.cell.right = false

    update()
}
function getInfo (event) {
    const element = event.target
    const cellId = parseInt(element.getAttribute('data-cell-id'))

    return {
        left: event.which === 1,
        right: event.which === 3,
        cell: getCellById(matrix, cellId)
    }
}
function leftHandler (cell) {
    if (cell.show || cell.flag) {
        return
    }

    cell.show = true
    showSpread(matrix, cell.x, cell.y)
}

function rightHandler (cell) {
    if (!cell.show) {
        cell.flag = !cell.flag
    }
}

function bothHandler (cell) {
    if (!cell.show || !cell.number) {
        return
    }

    const cells = getAroundCells(matrix, cell.x, cell.y)
    const flags = cells.filter(x => x.flag).length

    if (flags === cell.number) {
        cells
            .filter(x => !x.flag && !x.show)
            .forEach(cell => {
                cell.show = true
                showSpread(matrix, cell.x, cell.y)
            })
    }

    else {
        cells
            .filter(x => !x.flag && !x.show)
            .forEach(cell => cell.poten = true)
    }
}