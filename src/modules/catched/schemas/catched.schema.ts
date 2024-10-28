import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Pokemon } from '../../pokemon/schemas/pokemon.schema';

@Schema({
  timestamps: true,
})
export class Catched {
  @Prop()
  nickname: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' })
  pokemon: Pokemon;
}

export const CatchedSchema = SchemaFactory.createForClass(Catched);
