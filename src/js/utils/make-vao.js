import { makeBuffer } from './make-buffer'
import { bindBuffer } from './bind-buffer'
import { getExtension } from './get-extension'

export const makeVAO = (gl, attribs) => {
    const rtn = {
        vaoExtension: getExtension(gl, 'OES_vertex_array_object'),
        buffers: [],
        vao: null
    }
    
    if (rtn.vaoExtension) {
        rtn.vao = rtn.vaoExtension.createVertexArrayOES()
        rtn.vaoExtension.bindVertexArrayOES(rtn.vao)
    }
 
    rtn.buffers = attribs.map(attrib => {
        const buffer = makeBuffer(gl, attrib)
        if (attrib.bufferType !== gl.ELEMENT_ARRAY_BUFFER) {
            bindBuffer(gl, buffer, attrib)
        }
        return buffer
    })

    if (rtn.vaoExtension) {
        rtn.vaoExtension.bindVertexArrayOES(null)
    }

    return rtn

}