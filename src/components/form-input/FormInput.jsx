import { useId } from 'react'

export default function FormInput({ handleChange, label, ...otherProps }) {
  const id = useId()
  const hasValue = Boolean(otherProps.value)

  return (
    <div className="group">
      <input
        id={id}
        className="form-input"
        onChange={handleChange}
        {...otherProps}
      />
      {label ? (
        <label htmlFor={id} className={`form-label${hasValue ? ' shrink' : ''}`}>
          {label}
        </label>
      ) : null}
    </div>
  )
}