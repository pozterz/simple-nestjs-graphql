import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true
})
export class Products extends Model<Products> {
  @Column name: string
  @Column price: number
}