import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

  @Prop()
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };

  @Prop()
  moves: string[];
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
