import { RecipesEffects } from './recipes.effects';
import { ErrorHandlingEffects } from './error-handling.effect';

export const recipesEffects: any[] = [ RecipesEffects, ErrorHandlingEffects ];
// Exporting all content from the folder.
export * from './recipes.effects';
export * from './error-handling.effect';

