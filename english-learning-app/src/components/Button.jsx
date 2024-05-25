import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({text, to, className, type="link", onClick}) => {
  return (
    <div className='w-full flex '>
      {type === "link" ? <Link to={to} className={'w-full text-center p-4 bg-textBlue text-purpleWhite font-medium rounded-2xl ' + className}>{text}</Link> : <button onClick={onClick} className={'w-full text-center p-4 bg-textBlue text-purpleWhite font-medium rounded-2xl ' + className}>{text}</button>}
    </div>
  )
}

export default Button
