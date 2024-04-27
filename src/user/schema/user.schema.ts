import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop({unique: true})
    userId: string;

    @Prop({required : true})
    fullName: string;
    
    @Prop({unique: true})
    email: string;
    
    @Prop({required : true})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);


