import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import GlobalLoader from './GlobalLoader'
import { getTodos, postTodo } from './my-api'

export default function QuickStart() {
  const queryClient = useQueryClient()

  const query = useQuery('todos', getTodos)

  const mutation = useMutation(postTodo, {
    // 성공하면 바로바로 업데이트해줌
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  if (query.isLoading) {
    return 'Loading...'
  }
  if (query.error) {
    return 'Error...'
  }

  return (
    <div>
      {/* {query.isFetching ? <h1>Refresh!!</h1> : null} */}
      <GlobalLoader />
      <ul>
        {query.data.map((todo) => {
          return <li key={todo.id}>{todo.title}</li>
        })}
      </ul>
      <button
        onClick={() =>
          mutation.mutate({
            id: Date.now(),
            title: 'Learn React-Query',
          })
        }
      >
        Add Todo
      </button>
    </div>
  )
}
