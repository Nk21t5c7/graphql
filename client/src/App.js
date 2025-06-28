import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Title from './components/layout/Title';
import AddPersonContainer from './components/containers/AddPersonContainer'
import AddCarContainer from './components/containers/AddCarContainer';
import RecordContainer from './components/containers/RecordContainer';
import LearnMoreContainer from './components/containers/LearnMoreContainer';


const client = new ApolloClient({
  uri: 'http://localhost:4002/graphql',
  cache: new InMemoryCache()

})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Title />
          <Routes>
            <Route path='/' element={
              <>
                <AddPersonContainer />
                <AddCarContainer />
                <RecordContainer />
              </>
            } />
            <Route path='/people/:id' element={
              <LearnMoreContainer />
            }/>
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
