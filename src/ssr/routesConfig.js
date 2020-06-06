import LandingComponent from '../pages/landing/components/LandingComponent';

import {
	LANDING_ROUTE,
} from '../setup/webClientEndPoints';

export default [
	{
		path: LANDING_ROUTE,
		component: LandingComponent,
		exact: true,
	}
];