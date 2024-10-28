import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Stat {
  @Prop()
  hp: number;

  @Prop()
  attack: number;

  @Prop()
  defense: number;

  @Prop()
  specialAttack: number;

  @Prop()
  specialDefense: number;

  @Prop()
  speed: number;
}

export const StatSchema = SchemaFactory.createForClass(Stat);
