uniform mat4 u_translateMatrix;

attribute vec2 a_position;

void main () {
    gl_Position = u_translateMatrix * vec4(a_position, 0.0, 1.0);
    gl_PointSize = 20.0;
}