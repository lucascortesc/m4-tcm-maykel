import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique, JoinColumn } from "typeorm";
import { Family } from "./family.entity";

@Entity("pacient")
@Unique(["cpf"])
export class Pacient {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 11 })
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
    length: 11,
  })
  tel: string;

  @Column({ nullable: false })
  is_owner: boolean;

  @ManyToOne(() => Family, {
    eager: true,
  })
  @JoinColumn({ name: "family_id" })
  family: Family;
}
