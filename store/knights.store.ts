import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import type { Knight, SimpleKnight } from "~/models/knight.model";
import { $axios } from "@/utils/nuxt-instance";

@Module({
  name: "knights",
  stateFactory: true,
  namespaced: true,
})
export default class Knights extends VuexModule {
  private knights: SimpleKnight[] = [];
  private knight: Knight | null = null;

  get $aKnight() {
    return this.knight;
  }

  get $all() {
    return this.knights;
  }

  @Mutation
  SET_A_KNIGHT(knight: Knight) {
    this.knight = knight;
  }

  @Mutation
  SET_ALL_KNIGHTS(knights: SimpleKnight[]) {
    this.knights = knights;
  }

  @Action
  async fetchAll() {
    const knights = await $axios.$get("/knights");
    this.context.commit(this.SET_ALL_KNIGHTS.name, knights);
  }

  @Action
  async fetchOne(id: number) {
    const knight = await $axios.$get(`/knights/${id}`);
    this.context.commit(this.SET_A_KNIGHT.name, knight);
  }
}
