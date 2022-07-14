import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from "typeorm";
import { HomeVisit } from "./homeVisit.entity";
@Entity("agents")
@Unique(["email"])
export class Agent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 158 })
  name: string;

  @Column({ length: 158 })
  email: string;

  @Column()
  password: string;

  @Column()
  isactive: boolean;
}