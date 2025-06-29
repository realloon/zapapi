import { serve } from 'bun'
import {
  loadDatabase,
  renderPage,
  responseJSON,
  responseNotFound,
} from './modules'

// Constant
const PORT = 9000

const data = await loadDatabase()

serve({
  port: PORT,
  routes: {
    '/': new Response(renderPage(data), {
      headers: { 'Content-Type': 'text/html' },
    }),

    '/:resource': {
      GET: req => {
        // TODO: support for query parameters
        const { resource } = req.params
        const table = data.get(resource)

        return table
          ? responseJSON(table)
          : responseNotFound(`Resource '${resource}' not found.`)
      },

      POST: async req => {
        const { resource } = req.params
        const table = data.get(resource)

        if (!table) {
          return responseNotFound(`Resource '${resource}' not found.`)
        }

        const body = await req.json()
        const id = body.id ?? Date.now() // TODO: use auto-increment

        // Check if item with this ID already exists
        const isExists = table.some(value => value.id == id)
        if (isExists) {
          return responseJSON(
            { message: 'Item with this ID already exists.', code: 409 },
            409
          )
        }

        const newItem = Object.assign(body, { id })

        table.push(newItem) // don't need to rewrite db.json
        return responseJSON(newItem, 201)
      },
    },

    '/:resource/:id': {
      GET: req => {
        const { resource, id } = req.params
        const table = data.get(resource)

        if (!table) {
          return responseNotFound(`Resource '${resource}' not found.`)
        }

        const item = table.find(value => String(value.id) === id)
        return item
          ? responseJSON(item)
          : responseNotFound('Item not found.')
      },

      PUT: async req => {
        const { resource, id } = req.params
        const table = data.get(resource)

        if (!table) {
          return responseNotFound(`Resource '${resource}' not found.`)
        }

        const item = table.find(value => String(value.id) === id)
        if (!item) {
          return responseNotFound('Item not found.')
        }

        const body = await req.json()

        if (!body.id || String(body.id) !== id) {
          return responseJSON(
            {
              message:
                'Request body must include an "id" matching the URL.',
              code: 400,
            },
            400
          )
        }

        const updatedItem = body
        table[table.indexOf(item)] = updatedItem // index is always >= 0, because we checked above
        // don't need to rewrite db.json
        return responseJSON(updatedItem)
      },

      DELETE: req => {
        const { resource, id } = req.params
        const table = data.get(resource)

        if (!table) {
          return responseNotFound(`Resource '${resource}' not found.`)
        }

        const item = table.find(value => String(value.id) === id)
        if (!item) {
          return responseNotFound('Item not found.')
        }

        table.splice(table.indexOf(item), 1) // don't need to rewrite db.json

        return responseJSON({ message: 'Deleted successfully' })
      },
    },

    '/*': responseNotFound(),
  },
})

console.log(`\x1b[90mzapapi on: \x1b[0m\x1b[1;32mhttp://localhost:${PORT}`)
