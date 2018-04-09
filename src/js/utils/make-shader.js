export const makeShader = (gl, type, shaderSource) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, shaderSource)
    gl.compileShader(shader)
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader

    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
}