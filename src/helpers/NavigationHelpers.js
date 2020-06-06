import { useHistory } from 'react-router-dom';
const history = useHistory();

export const navigateToPageWithPath = (pathTo) => {
  history.push(pathTo);
}