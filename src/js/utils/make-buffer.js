export const makeBuffer = (gl, props) => {
    const {
        bufferType,
        typedArray,
        drawType
    } = props
    
    const buffer = gl.createBuffer()
    gl.bindBuffer(bufferType, buffer)
    gl.bufferData(bufferType, typedArray, drawType)
    // gl.bindBuffer(bufferType, null)
    
    return buffer
}