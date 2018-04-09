export const makeFramebuffer = (gl, props) => {
    const {
        colorAttachment, 
        texture
    } = props
    const framebuffer = gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, colorAttachment, gl.TEXTURE_2D, texture, 0)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    
    return framebuffer
}