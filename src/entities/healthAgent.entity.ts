import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";
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
  isActive: boolean;
}
