export const makeTexture = (gl, props) => {
    const {
        width,
        height,
        image
    } = props

    const texture = gl.createTexture()

    const level          = 0
    const internalFormat = gl.RGBA
    const border         = 0
    const format         = gl.RGBA
    const type           = gl.UNSIGNED_BYTE
    
    gl.bindTexture(gl.TEXTURE_2D, texture)        
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    if (image) {
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, format, type, image)
    } else {
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, image)
    }

    gl.bindTexture(gl.TEXTURE_2D, null)
    return texture                    
}