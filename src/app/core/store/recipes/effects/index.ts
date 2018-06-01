import { RecipesEffects } from './recipes.effects';
import { ErrorHandlingEffects } from './error-handling.effect';

export const effects: any[] = [ RecipesEffects, ErrorHandlingEffects ];
// Exporting all content from the folder.
export * from './recipes.effects';
export * from './error-handling.effect';

