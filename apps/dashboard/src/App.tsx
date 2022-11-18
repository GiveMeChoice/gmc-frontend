import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import './styles.css';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Navbar />
    </div>
  );
}

export default App;
