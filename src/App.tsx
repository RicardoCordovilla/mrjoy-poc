import './App.css';
import { Container } from './components/Container';
import { IssueGet } from './types/issues';
import { useGetData } from './utils/api/hooks/useGetData';

function App() {

  const { data: issues } = useGetData<IssueGet[]>('/issues', ['issues'])

  return (
    <div className="App">
      <Container
        items={issues}
      />
    </div>
  )
}

export default App
