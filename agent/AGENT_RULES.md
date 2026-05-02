export const levels = [
  {
    name: "Sala I - El punto que no existe",
    target: { x: 640, y: 240 },
    lines: [
      { a: { x: 120, y: 720 }, b: { x: 640, y: 240 }, real: true },
      { a: { x: 1160, y: 720 }, b: { x: 640, y: 240 }, real: true },
      { a: { x: 280, y: 720 }, b: { x: 640, y: 240 }, real: true },
      { a: { x: 1000, y: 720 }, b: { x: 640, y: 240 }, real: true },
      { a: { x: 240, y: 180 }, b: { x: 640, y: 240 }, real: true },
      { a: { x: 1040, y: 180 }, b: { x: 640, y: 240 }, real: true },
      { a: { x: 100, y: 420 }, b: { x: 530, y: 170 }, real: false },
      { a: { x: 1180, y: 420 }, b: { x: 760, y: 150 }, real: false }
    ]
  },
  {
    name: "Sala II - Reflejo contaminado",
    target: { x: 640, y: 260 },
    lines: [
      { a: { x: 80, y: 720 }, b: { x: 640, y: 260 }, real: true },
      { a: { x: 1200, y: 720 }, b: { x: 640, y: 260 }, real: true },
      { a: { x: 380, y: 720 }, b: { x: 640, y: 260 }, real: true },
      { a: { x: 900, y: 720 }, b: { x: 640, y: 260 }, real: true },
      { a: { x: 450, y: 120 }, b: { x: 640, y: 260 }, real: true },
      { a: { x: 830, y: 120 }, b: { x: 640, y: 260 }, real: true },
      { a: { x: 1020, y: 360 }, b: { x: 770, y: 210 }, real: false },
      { a: { x: 1040, y: 500 }, b: { x: 720, y: 310 }, real: false }
    ]
  }
];
