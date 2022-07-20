import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from "typeorm";
import { HomeVisit } from "./homeVisit.entity";
import { Address } from "./address.entity";

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

  @Column({nullable:true})
  activationToken:string
  
  @Column({ nullable: true })
  token_reset_password: string;

  @OneToMany(() => Address, (Address) => Address.agent)
  address: Address[];
}
