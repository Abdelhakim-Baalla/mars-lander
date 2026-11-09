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

while (true) {
    var inputs = readline().split(' ');
    const X = parseInt(inputs[0]);
    const Y = parseInt(inputs[1]);
    const hSpeed = parseInt(inputs[2]);
    const vSpeed = parseInt(inputs[3]);
    const fuel = parseInt(inputs[4]);
    const rotate = parseInt(inputs[5]);
    const power = parseInt(inputs[6]);

    let targetAngle = 0;
    let targetPower = 0;

    const isOverZone = (X >= flatX1 && X <= flatX2);

    if (!isOverZone) {
        let targetHSpeed = (X < flatX1) ? 35 : -35;

        targetAngle = Math.round((hSpeed - targetHSpeed) * 1.5);
        targetAngle = Math.max(-45, Math.min(45, targetAngle));

        if (vSpeed < -20) {
            targetAngle = 0;
        }

        if (vSpeed < -15 || Math.abs(targetAngle) > 20) {
            targetPower = 4;
        } else {
            targetPower = 3;
        }
    }
    else {
        targetAngle = Math.round(hSpeed * 2);
        targetAngle = Math.max(-45, Math.min(45, targetAngle));

        if (vSpeed <= -35 || Math.abs(hSpeed) > 15) {
            targetPower = 4;
        } else {
            targetPower = 3;
        }
    }

    console.log(targetAngle + ' ' + targetPower);
}
