import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Quiz extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numberQuestion: number

  @column()
  public question: string

  @column()
  public choiceA: string

  @column()
  public choiceB: string

  @column()
  public choiceC: string

  @column()
  public choiceD: string

  @column()
  public answer: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
