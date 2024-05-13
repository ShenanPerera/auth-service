import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/role/enums/role.enum';

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
