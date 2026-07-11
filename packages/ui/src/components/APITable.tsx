interface APIEndpointProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  description?: string;
  version?: string;
}

interface APIParamProps {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

interface APITableProps {
  endpoints?: APIEndpointProps[];
  props?: APIParamProps[];
}

export function APITable({ endpoints, props }: APITableProps) {
  if (endpoints) {
    return (
      <div className="api-table-wrapper">
        <table className="api-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Description</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((ep) => (
              <tr key={`${ep.method}-${ep.path}`}>
                <td>
                  <span
                    className={`api-method-badge api-method-${ep.method.toLowerCase()}`}
                  >
                    {ep.method}
                  </span>
                </td>
                <td>
                  <code className="api-path">{ep.path}</code>
                </td>
                <td>{ep.description}</td>
                <td>
                  {ep.version && (
                    <span className="api-version-tag">{ep.version}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (props) {
    return (
      <div className="api-table-wrapper">
        <table className="api-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Required</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((p) => (
              <tr key={p.name}>
                <td>
                  <code className="param-name">{p.name}</code>
                  {p.required && <span className="param-required">*</span>}
                </td>
                <td>
                  <span className="param-type">{p.type}</span>
                </td>
                <td>{p.required ? "Yes" : "No"}</td>
                <td>
                  <code className="param-default">{p.default ?? "—"}</code>
                </td>
                <td>{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}
