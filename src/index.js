import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.scss';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);