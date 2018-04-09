export const bindFramebuffer = (gl, framebuffer, texture) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
    if (!framebuffer) return
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
}