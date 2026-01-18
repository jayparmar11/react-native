import { defineConfig } from 'orval'

export default defineConfig({
  app: {
    input: 'http://localhost:5000/doc',
    output: {
      mode: 'tags-split',
      clean: true,
      httpClient: 'axios',
      target: './generated/client',
      schemas: './generated/model',
      optionsParamRequired: './generated/model/params',
      client: 'react-query',
      override: {
        mutator: {
          path: './axios-client.ts',
          name: 'customInstance',
        },
      },
    },
  },
})
