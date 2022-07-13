import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("address")
export class Address {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({
    nullable: false,
    length: 158,
  })
  state: string;

  @Column({
    nullable: false,
    length: 158,
  })
  city: string;

  @Column({
    nullable: false,
  })
  cep: string;

  @Column({
    nullable: false,
    type: "int",
  })
  number: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
