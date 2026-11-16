// Ahmet Deniz Sezgin — 2300005633

import { expect, test } from 'vitest'
import { countByFilter, filterTasks } from './filter'
import type { Filter, Task } from './taskReducer'

const tasks: Task[] = [
  { id: 'dexter-izle', title: 'Dexter Ressurection izle', status: 'todo' },
  { id: 'marti-basarimi', title: 'how to fish martı başarımı', status: 'done' },
  { id: 'visionquest-bitir', title: 'VisionQuest bitir', status: 'in-progress' },
  { id: 'fan', title: 'bilgisayara fan alınacak ve takılacak', status: 'todo' },
  { id: 'mouse', title: 'mouse alınacak', status: 'in-progress' },
  { id: 'displayport-kablo', title: 'type c den displayport kablo alınacak', status: 'todo' },
]

const cases: { filter: Filter; ids: string[] }[] = [
  { filter: 'all', ids: ['dexter-izle', 'marti-basarimi', 'visionquest-bitir', 'fan', 'mouse', 'displayport-kablo'] },
  { filter: 'todo', ids: ['dexter-izle', 'fan', 'displayport-kablo'] },
  { filter: 'in-progress', ids: ['visionquest-bitir', 'mouse'] },
  { filter: 'done', ids: ['marti-basarimi'] },
]

test('filterTasks', () => {
  for (const { filter, ids } of cases) {
    expect(filterTasks(tasks, filter).map((task) => task.id)).toEqual(ids)
  }
})

test('countByFilter', () => {
  expect(countByFilter(tasks)).toEqual({ all: 6, todo: 3, 'in-progress': 2, done: 1 })
})
