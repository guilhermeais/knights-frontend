import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { KnightAttributesEnum } from "~/models/enums/knight-attributes";
import type { Weapon } from "~/models/weapon.model";

@Module({
  name: "weapons",
  stateFactory: true,
  namespaced: true,
})
export default class Weapons extends VuexModule {
  private weapons: Weapon[] = [];

  get $all() {
    return this.weapons;
  }

  @Mutation
  SET_WEAPONS(weapons: Weapon[]) {
    this.weapons = weapons;
  }

  @Action
  fetchAll() {
    const weapons: Weapon[] = [
      {
        name: "Sword",
        attr: KnightAttributesEnum.STRENGTH,
        mod: 10,
        image: 'https://images.unsplash.com/photo-1600081729801-fd151cba450f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: "Axe",
        attr: KnightAttributesEnum.STRENGTH,
        mod: 15,
        image: 'https://images.unsplash.com/photo-1501623364001-70bfe454b916?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: "Bow",
        attr: KnightAttributesEnum.DEXTERITY,
        mod: 10,
        image: 'https://img.freepik.com/fotos-premium/testemunhe-a-diversidade-do-tiro-com-arco-medieval-com-arco-00734-00_883586-80929.jpg'
      },
      {
        name: "Dagger",
        attr: KnightAttributesEnum.DEXTERITY,
        mod: 5,
        image: 'https://crealandia.com/wp-content/uploads/2022/04/ANT00227.jpg'
      },
    ];

    this.context.commit(this.SET_WEAPONS.name, weapons);
  }
}
