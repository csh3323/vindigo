import { VueConstructor } from 'vue';
import Vue from 'vue';

/**
 * The Registry takes care of maintaining all dynamically
 * registered content and functionality.
 */
export class ClientRegistry {

    constructor() {

    }

    /**
     * Register a new global Vue component
     * 
     * @param name The component name
     * @param component The component definition
     */
    public registerComponent(name: string, component: VueConstructor<Vue>) {
        Vue.component(name, component);
    }

}