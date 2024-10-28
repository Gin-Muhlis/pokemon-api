import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Pokemon } from '../../pokemon/schemas/pokemon.schema';

@Schema({
  timestamps: true,
})
export class History {
  @Prop()
  nickname: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' })
  pokemon: Pokemon;
}

export const HistorySchema = SchemaFactory.createForClass(History);