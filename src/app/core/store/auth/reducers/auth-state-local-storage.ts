import { User } from "../../../../models/user.model";
import { environment } from '../../../../../environments/environment';

/**
 * Returns undefined if there is no user in the local storage.
 */
export function getUserFromStorage(): User | undefined  {
    try {
        const serializedState = localStorage.getItem(environment.localStoragePrefix + ".user");
        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    }
    catch (error) {
        console.log("Local storage is not enabled... Setting blank initial state.");
        return undefined;
    }
}
