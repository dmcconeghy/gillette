
import './App.css';
import Header from './Header'
import ProductTable from './ProductTable';





function App() {
return (
    <div className="App">
      <div className="Appwrapper">
        <Header />
        <ProductTable productIdArray={[5,10,18,26]}/>
      </div>
    </div>
  )
}

export default App
