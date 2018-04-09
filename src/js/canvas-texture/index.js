const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

// document.body.appendChild(canvas)

canvas.width = 512
canvas.height = 256

let fontSize = 100
let fillColor = '#fff'

export const canvasTexture = {

    setFontSize (val) {
        fontSize = val
    },

    setFillColor (val) {
        fillColor = val
    },

    drawText (string) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = fillColor
        ctx.font = `${fontSize}px Space Mono`
        ctx.textAlign = 'center'
        ctx.fillText(string, canvas.width / 2, canvas.height / 2)

        const idata = ctx.getImageData(0, 0, canvas.width, canvas.height)
        return idata
    }

}