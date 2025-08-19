class Lookup {
    // private Cache: Map<string, any>;

}

if (!(global as any).lookup) {
    (global as any).lookup = new Lookup();
}

export default (global as any).lookup;