precision highp float;

uniform sampler2D u_textures[3];
uniform sampler2D u_ballsTexture;
uniform float u_texMixFactor;
uniform float u_ballsSimMixFactor;

varying vec2 v_uv;

void main () {
    float f = u_texMixFactor * 3.0;
    vec2 uv = v_uv;
    uv.x = 1.0 - uv.x;
    vec4 texColor1 = texture2D(u_textures[0], uv);
    vec4 texColor2 = texture2D(u_textures[1], uv);
    vec4 texColor3 = texture2D(u_textures[2], uv);

    vec4 projectColor = mix(texColor1, mix(
        texColor2, texColor3, clamp(f, 1.0, 2.0)
    ), clamp(f, 0.0, 1.0));

    vec4 ballsColor = texture2D(u_ballsTexture, v_uv);
    
    gl_FragColor = mix(projectColor, ballsColor, u_ballsSimMixFactor);
}