// Ahmet Deniz Sezgin — 2300005633

import { expect, test } from 'vitest'
import { FILTERS } from './filter'
import { initialState, taskReducer, type State } from './taskReducer'

function makeState(): State {
  return {
    tasks: [
      { id: 'dexter-izle', title: 'Dexter Ressurection izle', status: 'todo' },
      { id: 'visionquest-bitir', title: 'VisionQuest bitir', status: 'in-progress' },
      { id: 'marti-basarimi', title: 'how to fish martı başarımı', status: 'done' },
    ],
    filter: 'done',
    past: [],
  }
}

test('add', () => {
  const before = structuredClone(initialState)
  const next = taskReducer(initialState, {
    type: 'add',
    id: 'Minecraft',
    title: 'Modlu sunucu kurulacak',
  })

  expect(next.tasks).toEqual([
    { id: 'Minecraft', title: 'Modlu sunucu kurulacak', status: 'todo' },
  ])
  expect(initialState).toEqual(before)
})

test('remove', () => {
  const state = makeState()
  const next = taskReducer(state, { type: 'remove', id: 'visionquest-bitir' })

  expect(next.tasks).toEqual([state.tasks[0], state.tasks[2]])
})

test('advance', () => {
  const first = taskReducer(makeState(), { type: 'advance', id: 'dexter-izle' })
  const second = taskReducer(first, { type: 'advance', id: 'dexter-izle' })
  const third = taskReducer(second, { type: 'advance', id: 'dexter-izle' })

  expect(first.tasks[0].status).toBe('in-progress')
  expect(second.tasks[0].status).toBe('done')
  expect(third.tasks[0].status).toBe('todo')
})

test('setFilter', () => {
  const state = makeState()
  for (const filter of FILTERS) {
    const next = taskReducer(state, { type: 'setFilter', filter })
    expect(next.filter).toBe(filter)
    expect(next.tasks).toEqual(state.tasks)
    expect(next.past).toEqual(state.past)
  }
})

test('clearDone', () => {
  const state = makeState()
  const next = taskReducer(state, { type: 'clearDone' })

  expect(next.tasks).toEqual([state.tasks[0], state.tasks[1]])
  expect(next.filter).toBe('done')
})

test('undo', () => {
  const state = makeState()
  const cleared = taskReducer(state, { type: 'clearDone' })
  const restored = taskReducer(cleared, { type: 'undo' })

  expect(restored).toEqual(state)
})
