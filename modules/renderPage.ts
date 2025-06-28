export function renderPage(data: Map<string, unknown[]>) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
      </head>
      <body style="max-width: 600px; margin-inline: auto; line-height: 1.5;">
        <h1 style="font-family: Monaco, monospace;">zapapi</h1>
        <p>✧(๑• v•๑) ✧</p>
        <ul style="list-style: none; padding: 0;">
          ${Array.from(data.keys())
            .map(
              resource =>
                `<li><a style="color: #003388; font-weight: bold;" href="/${resource}">/${resource}</a> - ${
                  data.get(resource)?.length ?? 0
                } items</li>`
            )
            .join('')}
        </ul>
      </body>
    </html>
  `
}
