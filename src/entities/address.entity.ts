import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Agent } from "./healthAgent.entity";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
    length: 2,
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

  @Column()
  street: string;

  @ManyToOne(() => Agent, {
    eager: true,
  })
  @JoinColumn({ name: "agent_id" })
  agent: Agent;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
