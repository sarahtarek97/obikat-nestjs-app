import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

// import { Customer } from '../customers/customers.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;
}
