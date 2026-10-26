import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import { useLocalize } from '../../i18n.jsx';

// Links that know the language of the page: an internal path such as
// '/contact' becomes '/ar/contact' on the Arabic site, so the copy can keep
// plain paths and no component has to think about it.

export default function Link({ to, ...rest }) {
  const l = useLocalize();
  return <RouterLink to={l(to)} {...rest} />;
}

export function NavLink({ to, ...rest }) {
  const l = useLocalize();
  return <RouterNavLink to={l(to)} {...rest} />;
}
