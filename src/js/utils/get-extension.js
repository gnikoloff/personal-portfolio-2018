import '../vendor/oes-vertex-array-object-polyfill'

const extensions = []

export const getExtension = (gl, extName) => {
    const ext = extensions.find(ext => ext.name === extName)
    if (ext) return ext.extension

    const newExt = {
        name: extName,
        extension: gl.getExtension(extName)
    }
    extensions.push(newExt)
    
    // console.log(`Enabled WebGL extension: ${extName}`)

    return newExt.extension
} 