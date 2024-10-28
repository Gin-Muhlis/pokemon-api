import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Stat, StatSchema } from './stat.schema';

@Schema({
  timestamps: true,
})
export class Pokemon {
  @Prop()
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
  experiece: number;

  @Prop({ type: StatSchema })
  stats: Stat;

  @Prop()
  moves: string[];
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
