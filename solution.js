var inputs = readline().split(' ');
const surfaceN = parseInt(inputs[0]);
let flatX1 = 0, flatX2 = 0, flatY = 0;
let prevX = -1, prevY = -1;

for (let i = 0; i < surfaceN; i++) {
    var inputs = readline().split(' ');
    const landX = parseInt(inputs[0]);
    const landY = parseInt(inputs[1]);

    if (landY === prevY) {
        flatX1 = prevX;
        flatX2 = landX;
        flatY = landY;
    }
    prevX = landX;
    prevY = landY;
}
