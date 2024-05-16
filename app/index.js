import React from 'react';
import { createRoot } from 'react-dom/client';
import { datadogRum } from '@datadog/browser-rum';
import App from "./Component";

datadogRum.init({
    applicationId: "thisisanapplicationid",
    clientToken: "thisisafaketoken",
    site: "datadoghq.com",
    service: "my-service",
    env: "dev",
    sessionSampleRate: 100,
    traceSampleRate: 100,
    trackResources: true,
    trackLongTasks: true,
    allowedTracingUrls: [
      () => true,
    ],
});

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<App />);