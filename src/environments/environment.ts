// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    localStoragePrefix: 'mycookingbook',
    apiUrl: "http://localhost:4200/api" // In dev, we use the proxy to fetch the api. This is not the
                                        // case with prod server has we don't have access to the proxy.

};
