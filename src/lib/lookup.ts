class Lookup {
    // private Cache: Map<string, any>;

}



const globalForLookup = globalThis as unknown as { lookup?: Lookup };
const lookup = globalForLookup.lookup || new Lookup();
globalForLookup.lookup = lookup;

export default lookup;