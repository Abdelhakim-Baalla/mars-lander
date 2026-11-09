const surfaceN = parseInt(readline());
const pts = [];
for (let i = 0; i < surfaceN; i++) {
    const p = readline().split(' ').map(Number);
    pts.push(p);
}

let flatX1 = 0, flatX2 = 0, flatY = 0;
for (let i = 1; i < surfaceN; i++) {
    if (pts[i][1] === pts[i - 1][1] && pts[i][0] - pts[i - 1][0] > flatX2 - flatX1) {
        flatX1 = pts[i - 1][0];
        flatX2 = pts[i][0];
        flatY = pts[i][1];
    }
}

function groundMax(xa, xb) {
    const lo = Math.min(xa, xb), hi = Math.max(xa, xb);
    let m = 0;
    for (let i = 1; i < surfaceN; i++) {
        const [x1, y1] = pts[i - 1], [x2, y2] = pts[i];
        if (x2 < lo || x1 > hi) continue;
        const a = Math.max(lo, x1), b = Math.min(hi, x2);
        const ya = y1 + (y2 - y1) * (a - x1) / (x2 - x1);
        const yb = y1 + (y2 - y1) * (b - x1) / (x2 - x1);
        m = Math.max(m, ya, yb);
    }
    return m;
}

const G = 3.711;
const ZONE_MARGIN = 150;
const CLEARANCE = 150;
const MAX_HSPEED = 75;
const BRAKE_ACC = 1.1;

while (true) {
    const [X, Y, hSpeed, vSpeed, fuel, rotate, power] = readline().split(' ').map(Number);

    const targetX = Math.max(flatX1 + ZONE_MARGIN, Math.min(flatX2 - ZONE_MARGIN, X));
    const dx = targetX - X;
    const overZone = X >= flatX1 + 50 && X <= flatX2 - 50;
    const height = Y - flatY;

    const targetHSpeed = Math.sign(dx)  *Math.min(MAX_HSPEED, Math.sqrt(2*  BRAKE_ACC * Math.abs(dx)));
    let angle = (hSpeed - targetHSpeed) * 1.5;

    const floorAlt = overZone
        ? flatY
        : Math.max(flatY, groundMax(X, targetX)) + CLEARANCE;
    const h = Math.max(0, Y - floorAlt);

    const minVSpeed = overZone
        ? -Math.min(55, Math.sqrt(36  *36 + 2*  0.2 * h))
        : -Math.sqrt(2  *0.15*  h);

    let maxAngle;
    if (vSpeed < minVSpeed + 2) maxAngle = 12;
    else if (vSpeed < minVSpeed + 8) maxAngle = 21;
    else maxAngle = 45;
    angle = Math.max(-maxAngle, Math.min(maxAngle, Math.round(angle)));

    let targetPower;
    if (vSpeed < minVSpeed + 8) targetPower = 4;
    else if (Math.abs(angle) > 10) targetPower = 4;
    else targetPower = vSpeed < minVSpeed + 14 ? 3 : 0;

    if (overZone && height < 120 + 3 * Math.abs(vSpeed)) {
        angle = 0;
        targetPower = vSpeed < -30 ? 4 : 3;
    }

    console.log(angle + ' ' + targetPower);
}
