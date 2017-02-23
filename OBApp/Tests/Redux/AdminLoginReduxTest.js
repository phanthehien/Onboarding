import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/AdminLoginRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.adminLoginRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.adminLoginSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.adminLoginFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
