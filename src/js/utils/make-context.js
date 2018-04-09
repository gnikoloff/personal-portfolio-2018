export const makeWebGLContext = (canvas) => {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
        
        return
    }
    return gl
}