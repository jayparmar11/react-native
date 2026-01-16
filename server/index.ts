import { serve } from '@hono/node-server'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import { cors } from 'hono/cors'
import fs from 'node:fs/promises'

// --- 1. DATA STORAGE LOGIC ---
const DB_FILE = './students.json'

async function getStudents(): Promise<any[]> {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function saveStudents(students: any[]) {
  await fs.writeFile(DB_FILE, JSON.stringify(students, null, 2))
}

// --- 2. SCHEMAS (OpenAPI Definitions) ---
const StudentSchema = z
  .object({
    id: z.string().openapi({ example: '17123456789' }),
    name: z.string().openapi({ example: 'John Doe' }),
    email: z.string().email().openapi({ example: 'john@example.com' }),
  })
  .openapi('Student')

const CreateStudentSchema = StudentSchema.omit({ id: true })

const ParamsSchema = z.object({
  id: z.string().openapi({ param: { name: 'id', in: 'path' }, example: '123' }),
})

// --- 3. APP SETUP ---
const app = new OpenAPIHono()
app.use('*', cors())

// --- 4. CRUD ROUTES ---

// [READ ALL] GET /students
app.openapi(
  createRoute({
    method: 'get',
    path: '/students',
    operationId: 'getStudents',
    responses: {
      200: {
        content: { 'application/json': { schema: z.array(StudentSchema) } },
        description: 'Retrieve all students',
      },
    },
  }),
  async (c) => {
    const students = await getStudents()
    return c.json(students)
  }
)

// [READ SINGLE] GET /students/:id
app.openapi(
  createRoute({
    method: 'get',
    path: '/students/{id}',
    operationId: 'getStudentById',
    request: { params: ParamsSchema },
    responses: {
      200: {
        content: { 'application/json': { schema: StudentSchema } },
        description: 'Student found',
      },
      404: { description: 'Student not found' },
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    const students = await getStudents()
    const student = students.find((s) => s.id === id)
    if (!student) return c.json({ message: 'Not found' }, 404)
    return c.json(student)
  }
)

// [CREATE] POST /students
app.openapi(
  createRoute({
    method: 'post',
    path: '/students',
    operationId: 'createStudent',
    request: { body: { content: { 'application/json': { schema: CreateStudentSchema } } } },
    responses: {
      201: {
        content: { 'application/json': { schema: StudentSchema } },
        description: 'Student created',
      },
    },
  }),
  async (c) => {
    const data = c.req.valid('json')
    const students = await getStudents()
    const newStudent = { ...data, id: Date.now().toString() }
    students.push(newStudent)
    await saveStudents(students)
    return c.json(newStudent, 201)
  }
)

// [UPDATE] PUT /students/:id
app.openapi(
  createRoute({
    method: 'put',
    path: '/students/{id}',
    operationId: 'updateStudent',
    request: {
      params: ParamsSchema,
      body: { content: { 'application/json': { schema: CreateStudentSchema } } },
    },
    responses: {
      200: {
        content: { 'application/json': { schema: StudentSchema } },
        description: 'Student updated',
      },
      404: { description: 'Student not found' },
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    const data = c.req.valid('json')
    const students = await getStudents()

    const index = students.findIndex((s) => s.id === id)
    if (index === -1) return c.json({ message: 'Not found' }, 404)

    const updatedStudent = { ...students[index], ...data }
    students[index] = updatedStudent

    await saveStudents(students)
    return c.json(updatedStudent)
  }
)

// [DELETE] DELETE /students/:id
app.openapi(
  createRoute({
    method: 'delete',
    path: '/students/{id}',
    operationId: 'deleteStudent',
    request: { params: ParamsSchema },
    responses: {
      200: { description: 'Student deleted' },
      404: { description: 'Student not found' },
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    const students = await getStudents()
    const filtered = students.filter((s) => s.id !== id)

    if (students.length === filtered.length) return c.json({ message: 'Not found' }, 404)

    await saveStudents(filtered)
    return c.json({ message: 'Deleted' })
  }
)

// --- 5. OPENAPI & UI ---
app.doc('/doc', {
  openapi: '3.0.0',
  info: { title: 'Student Management API', version: '1.0.0' },
})

app.get('/reference', apiReference({ spec: { url: '/doc' } }))

console.log('Server running on http://localhost:5000')
console.log('API Docs available at http://localhost:5000/reference')

serve({ fetch: app.fetch, port: 5000 })
