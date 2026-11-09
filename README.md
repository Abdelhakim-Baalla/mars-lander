# Mars Lander

[![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A514-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Status](https://img.shields.io/badge/status-not%20started-lightgrey)]()

Episode 2 of the Mars Lander trilogy: land the shuttle on the flat area of the
surface while **minimising fuel consumption**.

`solution.js` is intentionally empty — this repository is the starting point.

---

## Rules

### Environment

- Zone: **7000 m wide × 3000 m high**.
- Gravity: **3.711 m/s²**, no atmosphere.
- One flat landing area, at least 1000 m wide, somewhere on the surface.

### Control

Each second the program outputs:

```
rotate power
```

- `rotate` ∈ `[-90, 90]` — tilt angle in degrees.
- `power` ∈ `[0, 4]` — thrust in m/s², consuming **1 litre of fuel per second per
  power unit**.
- The commanded values are rate-limited: the actual angle changes by at most
  **±15°** per turn, the actual power by at most **±1** per turn.

Thrust `4` in a vertical position roughly cancels Mars gravity — a power of `4` is
needed to hover.

### Successful landing

All four must hold at touchdown:

| Condition | Limit |
|---|---|
| Ground | must be the flat area |
| Tilt | `0°` |
| Vertical speed | `≤ 40 m/s` in absolute value |
| Horizontal speed | `≤ 20 m/s` in absolute value |

---

## Input / Output

**Initialization**

```
surfaceN
landX landY      × surfaceN
```

The points describe the surface, chained from `x = 0` to `x = 6999`. The flat area
is the pair of consecutive points with the same `Y`.

**Each turn**

```
X Y hSpeed vSpeed fuel rotate power
```

**Each turn, output**

```
rotate power
```

**Constraints:** `2 ≤ surfaceN < 30`, `0 ≤ X < 7000`, `0 ≤ Y < 3000`,
`-500 < hSpeed, vSpeed < 500`, `0 ≤ fuel ≤ 2000`, 100 ms per turn.

---

## Plan

- [ ] parse the surface and locate the flat landing segment
- [ ] read the per-turn state
- [ ] stabilise horizontal speed toward the landing zone
- [ ] control the descent speed within the limits
- [ ] keep enough fuel for the final vertical burn
- [ ] tune the controller to reduce litres used

---

## Author

**Abdelhakim Baalla**

- GitHub: [https://github.com/Abdelhakim-Baalla](https://github.com/Abdelhakim-Baalla)

## License

Released under the [MIT License](./LICENSE).
