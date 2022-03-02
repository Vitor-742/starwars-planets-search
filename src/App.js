import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Filters from './components/Filters';
import MyProvider from './components/MyProvider';

function App() {
  return (
    <MyProvider>
      <Header />
      <Filters />
      <Content />
    </MyProvider>
  );
}

export default App;
