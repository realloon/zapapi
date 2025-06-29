export function renderPage(data: Map<string, unknown[]>) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        line-height: 1.6;
        max-width: 600px;
        margin-inline: auto;
        @media (prefers-color-scheme: dark) {
          color: #fff;
          background-color: #121212;
        }
      }
    </style>
  </head>
  <body>
    <h1 style="font-family: Monaco, monospace">zapapi</h1>
    <p>✧(๑• v•๑) ✧</p>
    <ul style="list-style: none; padding: 0">
      ${Array.from(data.keys())
        .map(
          key =>
            `<li><a style="color: #009688" href="${key}">${key}</a> - ${
              data.get(key)!.length
            } items</li>`
        )
        .join('')}
    </ul>
  </body>
  </html>
  `
}
