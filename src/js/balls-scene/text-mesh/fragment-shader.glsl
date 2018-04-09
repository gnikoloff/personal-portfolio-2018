precision highp float;

uniform sampler2D u_diffuse;

varying vec2 v_uv;

void main () {
    vec2 uv = v_uv;
    // uv.x = 1.0 - uv.x;
    uv.y = 1.0 - uv.y;
    gl_FragColor = texture2D(u_diffuse, uv);
}