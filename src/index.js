import { createRoot } from 'react-dom/client';

import './style.css';
import TodoApp from './components/TodoApp';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<TodoApp />);
