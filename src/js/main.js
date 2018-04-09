import '../scss/imports.scss'

import './vendor/fulltilt'
import Gyronorm from 'gyronorm'

import { makeWebGLContext } from './utils/make-context'
import { makeFramebuffer } from './utils/make-framebuffer'
import { bindFramebuffer } from './utils/bind-framebuffer'
import { makeTexture } from './utils/make-texture'

import { BallsScene } from './balls-scene'
import { ImageGallery } from './image-gallery'
import { PostFX } from './postfx-plane'

const dpr = window.devicePixelRatio || 1
let w = window.innerWidth * dpr
let h = window.innerHeight * dpr
let elapsedTimeMs = 0

const canvas = document.createElement('canvas')
const gl = makeWebGLContext(canvas)

let ballsSimulation

let ballsTexture = makeTexture(gl, {
    width: w,
    height: h,
    image: null
})
let ballsFramebuffer = makeFramebuffer(gl, {
    colorAttachment: gl.COLOR_ATTACHMENT0,
    texture: ballsTexture
})

let fadeTexture = makeTexture(gl, {
    width: w,
    height: h,
    image: null
})
let fadeFramebuffer = makeFramebuffer(gl, {
    colorAttachment: gl.COLOR_ATTACHMENT0,
    texture: resultTexture
})
const fadeMesh = new PostFX(gl, {
    width:  2,
    height: 2,

    shaderBits: {
        fragmentShader: {
            body: `
                uv.x = 1.0 - uv.x;
                uv.y = 1.0 - uv.y;
                vec4 fadeColor = vec4(vec3(0.835), 1.0);
                gl_FragColor = mix(texture2D(u_diffuse, uv), fadeColor, 0.3);
            `
        }
    }
})

let resultTexture = makeTexture(gl, {
    width: w,
    height: h,
    image: null
})
let resultFramebuffer = makeFramebuffer(gl, {
    colorAttachment: gl.COLOR_ATTACHMENT0,
    texture: resultTexture
})
const resultMesh = new PostFX(gl, {
    width:  2,
    height: 2,

    shaderBits: {
        fragmentShader: {
            body: `
                uv.x = 1.0 - uv.x;
                uv.y = 1.0 - uv.y;
                gl_FragColor = texture2D(u_diffuse, uv);
            `
        }
    }
})

const aspect = w / h
let gallery

const imageResources = [
    `/assets/projects/codesketch-texture.png`,
    `/assets/projects/archive-texture.png`,
    `/assets/projects/archive-texture.png`,
]

loadImageResources(imageResources, images => {
    let w = 1
    let h = 1

    if (window.innerWidth < 800) {
        w = 1.5
    } else if (window.innerWidth > 800 && window.innerWidth < 1050) {
        w = 1.3
    }

    if (window.innerHeight < 450) {
        h = 1.3
    } else if (window.innerHeight > 450 && window.innerHeight < 600) {
        h = 1.175
    } 
    
    gallery = new ImageGallery(gl, {
        images,
        width:  w,
        height: h,
        widthSegments:  Math.round(20 * aspect),
        heightSegments: Math.round(12 * aspect)
    })
})

init()
function init () {
    
    canvas.width = w
    canvas.height = h
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    document.querySelector('.scene-container').appendChild(canvas)

    WebFont.load({
        google: {
            families: ['Space Mono']
        },
        active: () => {
            ballsSimulation = new BallsScene(gl, {
                skills: [ 
                    'skills:', 'webgl', 'glsl', 'vue', 'react', 
                    'canvas2d', 'svg', 'threejs', 'wp', 
                    'express', 'webpack', 'git' 
                ]
            })
        }
    })

    
    const gn = new Gyronorm()
    gn.init().then(() => {
        gn.start(data => {

            data.do.gamma *= -1

            // console.log(`alpha: ${data.do.alpha}`)
            // console.log(`gamma: ${data.do.gamma}`)
            
            if (gallery) gallery.onMouseMove({
                x: data.do.alpha * 0.01,
                y: data.do.beta  * 0.01 
            })
            
        })
    }).catch(error => {
        
    })

    attachListeners()
    introAnimation()
}

function hasClass (element, className) {
    return (` ${element.className} `).indexOf(` ${className} `) > -1
}

function attachListeners () {
    window.addEventListener('resize', onResize)
    window.requestAnimationFrame(onRenderFrame)
    document.body.addEventListener('mousemove', e => {
    if (!gallery) return
    gallery.onMouseMove({
        x: e.pageX / w,
        y: e.pageY / h
    })

    })
    const projectList = document.querySelector('.projects-list')
    projectList.addEventListener('mousemove', onMouseMove, false)
    projectList.addEventListener('mouseleave', onMouseLeave, false)
}

function introAnimation () {
    const animateIns = [...document.querySelectorAll('.animate-in')]
    let idx = 0
    const interval = setInterval(() => {
        if (idx >= animateIns.length) {
            clearInterval(interval)
            return
        }
        animateIns[idx].className += ' visible'
        idx += 1
    }, 50)
}

function onMouseMove (e) {
    const count = document.querySelector('.projects-list').children.length
    if (e.target.nodeName === 'LI') {
        const idx = parseInt(e.target.getAttribute('data-index'))
        gallery.setTextureIndex(idx)  
        gallery.hover()
    } 
}

function onMouseLeave (e) {
    gallery.unHover()
}

function loadImageResources (resources, cb) {
    const imgs = []
    resources.forEach((resource, i) => {
        const img = document.createElement('img')
        img.i = i
        img.onload = e => {
            if (i === resources.length - 1) {
                cb(imgs.sort((a, b) => a.i - b.i))
            }
        }
        img.src = resource
        imgs.push(img)
    })
}

function onResize () {
    w = canvas.width = window.innerWidth * dpr
    h = canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    gl.bindTexture(gl.TEXTURE_2D, fadeTexture)    
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)

    gl.bindTexture(gl.TEXTURE_2D, resultTexture)    
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)

    gl.bindTexture(gl.TEXTURE_2D, ballsTexture)    
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
    gl.bindTexture(gl.TEXTURE_2D, null)


}

function onRenderFrame () {
    window.requestAnimationFrame(onRenderFrame)
    const now = window.performance.now() / 1000
    const dt = now - elapsedTimeMs
    elapsedTimeMs = now

    gl.viewport(0, 0, w, h)
    gl.clearColor(0.9, 0.9, 0.9, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // render skills balls texture
    
    bindFramebuffer(gl, ballsFramebuffer, ballsTexture)
    if (ballsSimulation) ballsSimulation.renderFrame(gl, dt, now)

    // render main scene
    
    bindFramebuffer(gl, fadeFramebuffer, fadeTexture)
    if (gallery) gallery.renderFrame(gl, dt, now, ballsTexture)
    
    bindFramebuffer(gl, resultFramebuffer, resultTexture)
    fadeMesh.renderFrame(gl, dt, now, fadeTexture)

    bindFramebuffer(gl, null)
    resultMesh.renderFrame(gl, dt, now, resultTexture)


    swapBuffers()

}

function swapBuffers () {
    let temp = resultFramebuffer
    resultFramebuffer = fadeFramebuffer
    fadeFramebuffer = temp
    temp = resultTexture
    resultTexture = fadeTexture
    fadeTexture = temp
}