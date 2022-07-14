import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { v4 as uuid } from "uuid"

import { Agent } from "./healthAgent.entity";
import { Address } from "./address.entity";

@Entity()
export class HomeVisit {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({
        length: 50,
        nullable: true
    })
    status: string

    @Column({
        length: 500
    })
    message: string

    @ManyToOne(() => Agent, (agent) => agent.id)
    @JoinColumn({ name: "agent_id" })
    agent_id: Agent
    
    @ManyToOne(() => Address, (address) => address.id)
    @JoinColumn({ name: "address_id" })
    address_id: Address

}