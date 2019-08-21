/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// import "./App.css";
import SearchInput from './components/SearchInput';

function App() {
  return (
    <div className="App">
      <SearchInput
        dataList={[{ foo: 'One', bar: 'Two' }, { foo: 'Three', bar: 'Four' }]}
        searchKey={['foo']}
        searchItem={true}
        alignSearchItem="right"
      />
    </div>
  );
}

export default App;
