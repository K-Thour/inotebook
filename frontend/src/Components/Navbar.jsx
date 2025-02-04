import { Link, useLocation } from 'react-router'
function Navbar() {
  let location = useLocation();
  return (
  <nav className="nav nav-pills nav-justified bg-dark" style={{position:"sticky",top:"0",zIndex:"1000",backgroundColor:"white"}} >
  <Link className={`nav-link text-white  ${location.pathname==="/"?"active":"null"}`} aria-current="page" to="/" >Home</Link>
  <Link className={`nav-link text-white ${location.pathname==="/about"?"active":"null"}`} to="/about" >About</Link>
</nav>
  )
}

export default Navbar