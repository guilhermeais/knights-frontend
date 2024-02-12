import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import Knights from "~/store/knights.store";

let knights: Knights;

function initializeStores(store: Store<any>): void {
  knights = getModule(Knights, store);
}

export { initializeStores, knights };
