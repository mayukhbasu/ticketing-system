import { stopReportingRuntimeErrors } from "react-error-overlay";
if (process.env.NODE_ENV === "development") {
  stopReportingRuntimeErrors(); // disables error overlays
}

export default () => {
    return <h1>Landing Page</h1>;
  };
  