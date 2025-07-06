import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MetadataProvider } from './hooks/useMetadata.tsx'

createRoot(document.getElementById("root")!).render(
  <MetadataProvider>
    <App />
  </MetadataProvider>
);
