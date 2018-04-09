export const makeProgram = (gl, vertexShader, fragmentShader, doValidate = true) => {
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log(`Error linking program: ${gl.getProgramInfoLog(program)}`)
        gl.deleteProgram(program)
        return
    }
    if (doValidate) {
        gl.validateProgram(program)
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            console.log(`Error validating program: ${gl.getProgramInfoLog(program)}`)
            return
        }
    }
    
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    
    return program
}