import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import { Family } from "./family.entity";

@Entity("pacient")
@Unique(["cpf"])
export class Pacient {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 11})
  cpf: string;

  @Column({
    length: 158,
    nullable: false,
  })
  name: string;

  @Column({
    length: 158,
    nullable: false,
  })
  last_name: string;

  @Column()
  age: number;

  @Column({
    length: 11
  })
  tel: string;

  @Column({ nullable: false })
  isOwner: boolean;

  @ManyToOne(() => Family)
  family: Family;

}
