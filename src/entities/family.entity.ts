import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("family")
export class Family {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
