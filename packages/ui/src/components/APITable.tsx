interface APIProp {
  name: string
  type: string
  required?: boolean
  default?: string
  description: string
}

export function APITable({ props }: { props: APIProp[] }) {
  return (
    <table className="api-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((p) => (
          <tr key={p.name}>
            <td>
              <span className="param-name">{p.name}</span>
              {p.required && <span className="param-required"> *</span>}
            </td>
            <td><span className="param-type">{p.type}</span></td>
            <td><span className="param-default">{p.default ?? '—'}</span></td>
            <td><span className="param-desc">{p.description}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
