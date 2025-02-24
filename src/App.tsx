import './App.css';
import { Example } from './components/dnd-formkit/Example';
import { IssueGet } from './types/issues';
import { useGetData } from './utils/api/hooks/useGetData';

function App() {

  const { data: issues } = useGetData<IssueGet[]>('/issues', ['issues'])

  return (
    <div className="App">
      <Example />
    </div>
  )
}

export default App
