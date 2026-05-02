<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Simbionte Programador Nocturno</title>
  <style>
    body {
      margin: 0;
      background: #111;
      color: #eee;
      font-family: system-ui, sans-serif;
      overflow: hidden;
    }
    canvas {
      display: block;
    }
    #hint {
      position: fixed;
      left: 16px;
      bottom: 16px;
      max-width: 520px;
      padding: 12px 14px;
      background: rgba(0,0,0,.55);
      border: 1px solid rgba(255,255,255,.18);
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <canvas id="game"></canvas>
  <div id="hint">
    Arrastra el punto de fuga hasta que las líneas verdes encajen. Las líneas rojas son sospechosas.
    Pulsa <b>N</b> para cambiar de nivel.
  </div>
  <script type="module" src="./src/main.js"></script>
</body>
</html>
