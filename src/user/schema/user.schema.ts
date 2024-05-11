import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/role/enums/role.enum';

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
