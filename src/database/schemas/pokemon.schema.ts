import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Stat, StatSchema } from './stat.schema';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Pokemon extends Document {
  @Prop({ index: true })
  name: string;

  @Prop()
  number: number;

  @Prop()
  types: string[];

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop()
  abilities: string[];

  @Prop()
  image: string;

  @Prop()
  experience: number;

  @Prop({ type: StatSchema })
  stats: Stat;

  @Prop()
  moves: string[];
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
