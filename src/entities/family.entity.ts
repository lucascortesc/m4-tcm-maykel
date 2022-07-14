import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./address.entity";

@Entity("family")
export class Family {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @OneToOne((type) => Address, {
    eager: true,
  })
  @JoinColumn({ name: "address_id" })
  address: Address;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
