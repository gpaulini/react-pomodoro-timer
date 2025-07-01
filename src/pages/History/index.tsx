import { useContext } from 'react'
import { HistoryContainer, HistoryList, Status } from './styles'
import { formatDistanceToNow, formatDuration, formatRelative } from 'date-fns'
import { CyclesContext } from '../../contexts/CyclesContext'

export const History = () => {
  const { cycles } = useContext(CyclesContext)
  const cyclesByMostRecentFirst = cycles.sort((a, b) => {
    return (new Date(b.startDate)).getTime() - (new Date(a.startDate)).getTime()
  })

  return (
    <HistoryContainer>
      <h1>My History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Started At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
            cyclesByMostRecentFirst.length
              ? cyclesByMostRecentFirst.map(cyc => {
                  return (
                    <tr
                      key={cyc.id}
                      title={`
                        Started ${formatRelative(cyc.startDate, new Date())}
                      `}
                    >
                      <td>{cyc.task}</td>
                      <td>
                        {formatDuration({ minutes: cyc.minutesAmount })}
                      </td>
                      <td>
                        {formatDistanceToNow(cyc.startDate, {
                          addSuffix: true,
                        })}
                      </td>
                      <td><Status $status={cyc.status} /></td>
                    </tr>
                  )
                })
              : <tr><td colSpan={4}>No tasks found</td></tr>
            }
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
