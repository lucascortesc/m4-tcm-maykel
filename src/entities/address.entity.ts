import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Agent } from "./healthAgent.entity";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @OneToOne((_type) => Agent, {
    eager: true,
  })
  @JoinColumn()
  agent: Agent;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
