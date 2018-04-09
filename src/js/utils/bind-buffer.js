export const bindBuffer = (gl, buffer, props) => {
    const {
        bufferType,
        attribLocation,
        attribType,
        itemsPerVert
    } = props

    gl.bindBuffer(bufferType, buffer)
    if (!buffer) return
    gl.enableVertexAttribArray(attribLocation)
    gl.vertexAttribPointer(attribLocation, itemsPerVert, attribType, false, 0, 0)
    gl.bindBuffer(bufferType, null)
}
