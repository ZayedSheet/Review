/**
 * Globally available data via react context
 */

import {createContext} from 'react';

// User Context will contain info on currently logged in user
const UserContext = createContext(false);

export default UserContext;